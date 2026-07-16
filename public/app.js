const api = '/api';
let token = localStorage.getItem('teamInformaticsToken');
let currentUser = JSON.parse(localStorage.getItem('teamInformaticsUser') || 'null');
let surveys = [];
const $ = (id) => document.getElementById(id);

function message(text, error = false) { $('message').textContent = text; $('message').style.color = error ? '#b3261e' : '#176441'; }
async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${api}${path}`, { ...options, headers });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
function setSession(data) { token = data.token; currentUser = data.user; localStorage.setItem('teamInformaticsToken', token); localStorage.setItem('teamInformaticsUser', JSON.stringify(currentUser)); showDashboard(); }
function parseQuestions(text) { return text.split('\n').filter(Boolean).map(line => { const [prompt, type = 'rating', required = 'false'] = line.split('|').map(x => x.trim()); return { prompt, type, required: required === 'true' }; }); }
function questionText(questions) { return questions.map(q => `${q.prompt}|${q.type}|${q.required}`).join('\n'); }
async function loadSurveys() {
  surveys = await request('/surveys'); const list = $('survey-list'); list.innerHTML = '';
  if (!surveys.length) list.innerHTML = '<p>No surveys yet. Create the first one.</p>';
  surveys.forEach(survey => { const node = $('survey-template').content.cloneNode(true); node.querySelector('.badge').textContent = survey.status; node.querySelector('.survey-title').textContent = survey.title; node.querySelector('.survey-description').textContent = survey.description || 'No description provided.'; node.querySelector('.survey-department').textContent = survey.department; node.querySelector('.question-count').textContent = `${survey.questions.length} question(s)`; node.querySelector('.edit').onclick = () => editSurvey(survey); node.querySelector('.delete').onclick = () => deleteSurvey(survey); list.append(node); });
}
function editSurvey(survey) { $('survey-form').classList.remove('hidden'); $('form-title').textContent = 'Edit healthcare survey'; $('survey-id').value = survey._id; $('title').value = survey.title; $('department').value = survey.department; $('description').value = survey.description || ''; $('status').value = survey.status; $('questions').value = questionText(survey.questions); window.scrollTo({ top: 0, behavior: 'smooth' }); }
async function deleteSurvey(survey) { if (!confirm(`Delete “${survey.title}”?`)) return; try { await request(`/surveys/${survey._id}`, { method: 'DELETE' }); message('Survey deleted.'); loadSurveys(); } catch (e) { message(e.message, true); } }
function resetForm() { $('survey-form').reset(); $('survey-id').value = ''; $('survey-form').classList.add('hidden'); }
async function showDashboard() { $('auth-card').classList.add('hidden'); $('dashboard').classList.remove('hidden'); $('logout').classList.remove('hidden'); $('welcome').textContent = `Signed in as ${currentUser.name} (${currentUser.role})`; try { await loadSurveys(); } catch (e) { message(e.message, true); } }
$('login-form').onsubmit = async (e) => { e.preventDefault(); try { setSession(await request('/auth/login', { method:'POST', body:JSON.stringify({ email:$('login-email').value, password:$('login-password').value }) })); } catch (err) { alert(err.message); } };
$('register-form').onsubmit = async (e) => { e.preventDefault(); try { setSession(await request('/auth/register', { method:'POST', body:JSON.stringify({ name:$('register-name').value, email:$('register-email').value, password:$('register-password').value }) })); } catch (err) { alert(err.message); } };
$('new-survey').onclick = () => { resetForm(); $('survey-form').classList.remove('hidden'); };
$('cancel').onclick = resetForm;
$('logout').onclick = () => { localStorage.clear(); token = null; currentUser = null; location.reload(); };
$('survey-form').onsubmit = async (e) => { e.preventDefault(); const id = $('survey-id').value; const body = { title:$('title').value, department:$('department').value, description:$('description').value, status:$('status').value, questions:parseQuestions($('questions').value) }; try { await request(id ? `/surveys/${id}` : '/surveys', { method:id ? 'PATCH' : 'POST', body:JSON.stringify(body) }); message(id ? 'Survey updated.' : 'Survey created.'); resetForm(); loadSurveys(); } catch (err) { message(err.message, true); } };
if (token && currentUser) showDashboard();

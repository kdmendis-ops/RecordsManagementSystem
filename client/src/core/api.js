const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('teamInformaticsToken');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers }
  });
  const rawBody = response.status === 204 ? '' : await response.text();
  let data = null;
  try { data = rawBody ? JSON.parse(rawBody) : null; } catch { data = null; }
  if (!data && !response.ok) {
    throw new Error('The Team Informatics API is unavailable. Start the backend with npm run dev in the project root, then try again.');
  }
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// CRUD for surveys, with role-based access (admins manage everything, others only their own).
const Survey = require('../models/Survey');

// True if the user is an admin or the survey's original creator.
const canManage = (survey, user) => user.role === 'admin' || survey.createdBy.toString() === user.id;

// Create a survey owned by the logged-in user.
exports.createSurvey = async (req, res, next) => { try { res.status(201).json(await Survey.create({ ...req.body, createdBy: req.user.id })); } catch (error) { next(error); } };

// List surveys: patients (or anonymous visitors) only see published ones; staff/admin see all.
exports.getSurveys = async (req, res, next) => { try {
  const filter = req.user ? (req.user.role === 'patient' ? { status: 'published' } : {}) : { status: 'published' };
  res.json(await Survey.find(filter).populate('createdBy', 'name email').sort('-createdAt'));
} catch (error) { next(error); } };

// Get one survey; non-published surveys are only visible to their manager.
exports.getSurvey = async (req, res, next) => { try {
  const survey = await Survey.findById(req.params.id).populate('createdBy', 'name email');
  if (!survey) return res.status(404).json({ message: 'Survey not found' });
  if (survey.status !== 'published' && (!req.user || !canManage(survey, req.user))) return res.status(403).json({ message: 'Survey is not available' });
  res.json(survey);
} catch (error) { next(error); } };

// Update a survey (owner or admin only).
exports.updateSurvey = async (req, res, next) => { try {
  const survey = await Survey.findById(req.params.id);
  if (!survey) return res.status(404).json({ message: 'Survey not found' });
  if (!canManage(survey, req.user)) return res.status(403).json({ message: 'Not allowed' });
  Object.assign(survey, req.body); await survey.save(); res.json(survey);
} catch (error) { next(error); } };

// Delete a survey (owner or admin only).
exports.deleteSurvey = async (req, res, next) => { try {
  const survey = await Survey.findById(req.params.id);
  if (!survey) return res.status(404).json({ message: 'Survey not found' });
  if (!canManage(survey, req.user)) return res.status(403).json({ message: 'Not allowed' });
  await survey.deleteOne(); res.status(204).send();
} catch (error) { next(error); } };

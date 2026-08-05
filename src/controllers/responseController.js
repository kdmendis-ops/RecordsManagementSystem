// Handles submitting and reading survey responses.
const Response = require('../models/Response');
const Survey = require('../models/Survey');

// Submit a response; only allowed on published surveys. Works for anonymous or logged-in users.
exports.createResponse = async (req, res, next) => { try {
  const survey = await Survey.findById(req.body.survey);
  if (!survey || survey.status !== 'published') return res.status(400).json({ message: 'Responses can only be added to published surveys' });
  res.status(201).json(await Response.create({ ...req.body, submittedBy: req.user ? req.user.id : undefined }));
} catch (error) { next(error); } };

// List responses for a survey (survey owner or admin only).
exports.getResponses = async (req, res, next) => { try {
  const survey = await Survey.findById(req.params.surveyId);
  if (!survey) return res.status(404).json({ message: 'Survey not found' });
  if (req.user.role !== 'admin' && survey.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
  res.json(await Response.find({ survey: survey._id }).sort('-createdAt'));
} catch (error) { next(error); } };

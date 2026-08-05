// A patient/user's submitted answers to a single survey.
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  // Each answer references a question by its subdocument _id (see Survey.questions).
  answers: [{ questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, value: { type: String, required: true } }],
  // Free-text name, used when the respondent isn't a logged-in user.
  patientName: { type: String, trim: true },
  // Set only if the respondent was authenticated (createResponse allows anonymous submissions).
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);

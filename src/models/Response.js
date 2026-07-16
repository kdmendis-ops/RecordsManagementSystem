const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [{ questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, value: { type: String, required: true } }],
  patientName: { type: String, trim: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);

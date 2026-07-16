const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true, trim: true },
  type: { type: String, enum: ['rating', 'text', 'yes-no'], default: 'rating' },
  required: { type: Boolean, default: false },
  options: [{ type: String, trim: true }]
}, { _id: true });

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  department: { type: String, required: true, trim: true },
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
  questions: { type: [questionSchema], validate: [(items) => items.length > 0, 'A survey needs at least one question'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);

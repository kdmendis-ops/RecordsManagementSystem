const mongoose = require('mongoose');

// A single question within a survey. Keeps its own _id so responses can
// reference which question an answer belongs to.
const questionSchema = new mongoose.Schema({
  prompt: { type: String, required: true, trim: true },
  type: { type: String, enum: ['rating', 'text', 'yes-no'], default: 'rating' },
  required: { type: Boolean, default: false },
  options: [{ type: String, trim: true }]
}, { _id: true });

// A survey made up of one or more questions, owned by the staff/admin who created it.
const surveySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  department: { type: String, required: true, trim: true },
  // draft: only visible to its creator/admins. published: publicly visible. closed: no longer accepting responses.
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
  questions: { type: [questionSchema], validate: [(items) => items.length > 0, 'A survey needs at least one question'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);

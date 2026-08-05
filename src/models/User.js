const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  // select: false keeps the hash out of normal queries; use .select('+password') to fetch it.
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['patient', 'staff', 'admin'], default: 'staff' }
}, { timestamps: true });

// Hash the password before saving, but only when it's new or changed.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compares a plaintext password against the stored hash (used during login).
userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// CRUD for user accounts. Route-level middleware (see userRoutes.js) already
// requires a logged-in user and restricts listing to admins.
const User = require('../models/User');

// List all users (admin only, enforced in the route).
exports.getUsers = async (req, res, next) => { try { res.json(await User.find().select('-password')); } catch (error) { next(error); } };

// Get one user by id.
exports.getUser = async (req, res, next) => { try {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
} catch (error) { next(error); } };

// Update name/email (admin, or the user updating their own profile).
exports.updateUser = async (req, res, next) => { try {
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) return res.status(403).json({ message: 'Not allowed' });
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true, runValidators: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
} catch (error) { next(error); } };

// Delete a user (admin, or the user deleting their own account).
exports.deleteUser = async (req, res, next) => { try {
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) return res.status(403).json({ message: 'Not allowed' });
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
} catch (error) { next(error); } };

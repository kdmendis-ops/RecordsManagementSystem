// Auth middleware: verifies JWTs and enforces role-based access on routes.
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../../config/config');

// Requires a valid "Bearer <token>" header; attaches the matching user to req.user.
exports.protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Please log in to continue' });
    const decoded = jwt.verify(header.split(' ')[1], jwtSecret);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User no longer exists' });
    next();
  } catch (error) { next({ statusCode: 401, message: 'Invalid or expired token' }); }
};

// Returns a middleware that only lets through users whose role is in the allowed list.
// Must run after `protect`, since it relies on req.user.
exports.authorize = (...roles) => (req, res, next) => roles.includes(req.user.role)
  ? next()
  : res.status(403).json({ message: 'You do not have permission for this action' });

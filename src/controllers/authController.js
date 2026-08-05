// Handles registration, login, and reading the current user (auth endpoints).
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn } = require('../../config/config');

// Signs a JWT carrying the user's id and role.
const tokenFor = (user) => jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
// Strips sensitive/internal fields before sending a user back to the client.
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

// Creates a new user (defaults to 'staff' role) and returns a login token.
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role: role || 'staff' });
    res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
};

// Verifies email/password and returns a login token.
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Incorrect email or password' });
    res.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
};

// Returns the currently authenticated user (set by the `protect` middleware).
exports.me = (req, res) => res.json({ user: publicUser(req.user) });

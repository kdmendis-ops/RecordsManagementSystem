// Connects to MongoDB using the URI from app config.
const mongoose = require('mongoose');
const { mongoUri } = require('../../config/config');

module.exports = () => mongoose.connect(mongoUri);

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/team-informatics',
  jwtSecret: process.env.JWT_SECRET || 'replace_this_in_your_env_file',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

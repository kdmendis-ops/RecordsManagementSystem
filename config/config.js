require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://kdmendis_db_user:QJ7F3mv3zTpZgE2e@cluster27227.csahrv4.mongodb.net/?appName=Cluster27227',
  jwtSecret: process.env.JWT_SECRET || 'replace_this_in_your_env_file',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

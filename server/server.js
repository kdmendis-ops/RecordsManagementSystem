require('dotenv').config();
const app = require('./express');
const connectDatabase = require('../src/config/database');
const { port } = require('../config/config');

connectDatabase()
  .then(() => app.listen(port, () => console.log(`Team Informatics API running on port ${port}`)))
  .catch((error) => { console.error(error.message); process.exit(1); });

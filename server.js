require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');

const port = process.env.PORT || 5001;

connectDatabase()
  .then(() => app.listen(port, () => console.log(`Team Informatics is running at http://localhost:${port}`)))
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });

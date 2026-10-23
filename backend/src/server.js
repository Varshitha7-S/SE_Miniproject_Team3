require('dotenv').config();
const { createApp } = require('./app');
const { connectDB } = require('./config/db');

const port = process.env.PORT || 5001;

connectDB()
  .then(() => {
    if (String(process.env.AUTH_ENABLED || 'true').toLowerCase() !== 'false' && !process.env.JWT_SECRET) {
      throw new Error('AUTH_ENABLED is true but JWT_SECRET is not set (see .env.example)');
    }
    createApp().listen(port, () => console.log(`HMS API listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to start:', err.message);
    process.exit(1);
  });

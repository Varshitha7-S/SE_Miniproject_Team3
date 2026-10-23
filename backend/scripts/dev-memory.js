// Runs the API against a throw-away in-memory MongoDB seeded from test-data/*.csv.
// For trying the app without installing MongoDB. Data is lost when the process stops.
// Auth is off by default here; set AUTH_ENABLED=true to try the login flow (admin / admin12345).
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri('hms');
  process.env.AUTH_ENABLED = process.env.AUTH_ENABLED || 'false';
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'dev-memory-secret';
  require('dotenv').config();
  const { connectDB } = require('../src/config/db');
  const { Admin } = require('../src/models');
  const { createApp } = require('../src/app');
  const { seed } = require('./seed');
  await connectDB();
  await seed();
  await Admin.create({ username: 'admin', passwordHash: await bcrypt.hash('admin12345', 10) });
  const port = process.env.PORT || 5001;
  createApp().listen(port, () => console.log(`HMS API (in-memory DB) on http://localhost:${port}`));
  process.on('SIGINT', async () => { await mongod.stop(); process.exit(0); });
})();

// Creates (or resets the password of) an admin. Reads ADMIN_USERNAME / ADMIN_PASSWORD from .env.
// Passwords are stored only as bcrypt hashes. Usage: npm run create-admin
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { connectDB } = require('../src/config/db');
const { Admin } = require('../src/models');

(async () => {
  const { ADMIN_USERNAME: username, ADMIN_PASSWORD: password } = process.env;
  if (!username || !password || password.length < 8) throw new Error('Set ADMIN_USERNAME and an ADMIN_PASSWORD of at least 8 characters in .env');
  await connectDB();
  await Admin.findOneAndUpdate({ username }, { passwordHash: await bcrypt.hash(password, 10) }, { upsert: true });
  console.log(`Admin "${username}" is ready`);
  await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });

// Loads the fictional baseline dataset from ../test-data/*.csv into MongoDB.
// WARNING: wipes students, rooms and allocations first. Usage: npm run seed
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('../src/config/db');
const { Student, Room, Allocation, Counter } = require('../src/models');

function readCsv(name) {
  const file = path.join(__dirname, '..', '..', 'test-data', name);
  const [header, ...lines] = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/);
  const cols = header.split(',');
  return lines.map((l) => Object.fromEntries(l.split(',').map((val, i) => [cols[i], val])));
}

async function seed() {
  await Promise.all([Student.deleteMany({}), Room.deleteMany({}), Allocation.deleteMany({}), Counter.deleteMany({})]);

  await Student.insertMany(readCsv('students.csv').map((s) => ({ ...s, year: Number(s.year) })));
  const allocations = readCsv('allocations.csv');
  const activeByRoom = {};
  allocations.filter((a) => a.status === 'Active').forEach((a) => { activeByRoom[a.roomId] = (activeByRoom[a.roomId] || 0) + 1; });
  await Room.insertMany(
    readCsv('rooms.csv').map((r) => ({
      roomId: r.roomId,
      roomNumber: r.roomNumber,
      block: r.block,
      floor: Number(r.floor),
      capacity: Number(r.capacity),
      occupancy: activeByRoom[r.roomId] || 0, // derived from allocations so the two can never disagree
    })),
  );
  await Allocation.insertMany(allocations.map((a) => ({ ...a, endDate: a.endDate || null })));
  await Counter.create({ _id: 'allocation', seq: allocations.length });

  console.log(`Seeded ${await Student.countDocuments()} students, ${await Room.countDocuments()} rooms, ${await Allocation.countDocuments()} allocations`);
}

module.exports = { seed };

if (require.main === module) {
  connectDB()
    .then(seed)
    .then(() => mongoose.disconnect())
    .catch((e) => { console.error(e.message); process.exit(1); });
}

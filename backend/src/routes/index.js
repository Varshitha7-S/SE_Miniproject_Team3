const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student, Room, Allocation, Admin } = require('../models');
const { requireAuth, authEnabled, wrap } = require('../middleware');
const { notFound, conflict, AppError } = require('../utils/errors');
const v = require('../utils/validators');
const service = require('../services/allocationService');

const router = express.Router();

// ---------- Auth (HMS-019) ----------
// Pre-computed hash so unknown usernames cost the same as wrong passwords (no user enumeration by timing).
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

router.get('/auth/status', (_req, res) => res.json({ authEnabled: authEnabled() }));

router.post(
  '/auth/login',
  wrap(async (req, res) => {
    const { username, password } = v.validateLogin(req.body);
    const admin = await Admin.findOne({ username });
    const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH);
    if (!admin || !ok) throw new AppError(401, 'Invalid username or password');
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
    const token = jwt.sign({ sub: admin.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
    res.json({ token, username: admin.username });
  }),
);

// Everything below requires a valid token when AUTH_ENABLED=true.
router.use(requireAuth);

// ---------- Students (HMS-002..005, 022, 023) ----------
router.get(
  '/students',
  wrap(async (req, res) => {
    const search = v.queryString(req.query, 'search');
    const filter = search
      ? { $or: [{ studentId: new RegExp(v.escapeRegex(search), 'i') }, { fullName: new RegExp(v.escapeRegex(search), 'i') }] }
      : {};
    res.json(await Student.find(filter).sort({ studentId: 1 }).limit(1000));
  }),
);

router.post(
  '/students',
  wrap(async (req, res) => {
    const data = v.validateStudentCreate(req.body);
    if (await Student.exists({ studentId: data.studentId })) throw conflict(`Student ID ${data.studentId} already exists`);
    try {
      res.status(201).json(await Student.create(data));
    } catch (err) {
      if (err.code === 11000) throw conflict(`Student ID ${data.studentId} already exists`);
      throw err;
    }
  }),
);

router.get(
  '/students/:studentId',
  wrap(async (req, res) => {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) throw notFound(`Student ${req.params.studentId} not found`);
    const active = await Allocation.findOne({ studentId: student.studentId, status: 'Active' });
    res.json({ ...student.toJSON(), activeAllocation: active ? active.toJSON() : null });
  }),
);

router.put(
  '/students/:studentId',
  wrap(async (req, res) => {
    const data = v.validateStudentUpdate(req.body);
    const student = await Student.findOneAndUpdate({ studentId: req.params.studentId }, data, { new: true, runValidators: true });
    if (!student) throw notFound(`Student ${req.params.studentId} not found`);
    res.json(student);
  }),
);

router.patch(
  '/students/:studentId/fee',
  wrap(async (req, res) => {
    const data = v.validateFee(req.body);
    const student = await Student.findOneAndUpdate({ studentId: req.params.studentId }, data, { new: true });
    if (!student) throw notFound(`Student ${req.params.studentId} not found`);
    res.json(student);
  }),
);

router.get(
  '/students/:studentId/allocations',
  wrap(async (req, res) => {
    if (!(await Student.exists({ studentId: req.params.studentId }))) throw notFound(`Student ${req.params.studentId} not found`);
    res.json(await Allocation.find({ studentId: req.params.studentId }).sort({ startDate: -1, allocationId: -1 }));
  }),
);

// ---------- Rooms (HMS-006, 007, 013) ----------
router.get(
  '/rooms',
  wrap(async (req, res) => {
    const availability = v.queryString(req.query, 'availability', { allowed: ['available', 'full'] });
    const filter = {};
    if (availability === 'available') filter.$expr = { $lt: ['$occupancy', '$capacity'] };
    if (availability === 'full') filter.$expr = { $gte: ['$occupancy', '$capacity'] };
    res.json(await Room.find(filter).sort({ roomNumber: 1 }));
  }),
);

router.post(
  '/rooms',
  wrap(async (req, res) => {
    const data = v.validateRoomCreate(req.body);
    const roomId = `R${data.roomNumber}`;
    if (await Room.exists({ roomNumber: data.roomNumber })) throw conflict(`Room number ${data.roomNumber} already exists`);
    try {
      res.status(201).json(await Room.create({ ...data, roomId }));
    } catch (err) {
      if (err.code === 11000) throw conflict(`Room number ${data.roomNumber} already exists`);
      throw err;
    }
  }),
);

router.get(
  '/rooms/:roomId',
  wrap(async (req, res) => {
    const room = await Room.findOne({ roomId: req.params.roomId });
    if (!room) throw notFound(`Room ${req.params.roomId} not found`);
    res.json(room);
  }),
);

// ---------- Allocations (HMS-008..013, 018) ----------
router.get(
  '/allocations',
  wrap(async (req, res) => {
    const filter = {};
    const status = v.queryString(req.query, 'status', { allowed: v.ALLOCATION_STATUSES });
    const roomId = v.queryString(req.query, 'roomId', { max: 20 });
    const studentId = v.queryString(req.query, 'studentId', { max: 20 });
    if (status) filter.status = status;
    if (roomId) filter.roomId = roomId;
    if (studentId) filter.studentId = studentId;
    res.json(await Allocation.find(filter).sort({ allocationId: 1 }).limit(1000));
  }),
);

router.post(
  '/allocations',
  wrap(async (req, res) => {
    res.status(201).json(await service.allocate(v.validateAllocationCreate(req.body)));
  }),
);

router.patch(
  '/allocations/:id/vacate',
  wrap(async (req, res) => {
    res.json(await service.vacate(req.params.id, v.validateVacate(req.body).endDate));
  }),
);

router.patch(
  '/allocations/:id/change-room',
  wrap(async (req, res) => {
    res.json(await service.changeRoom(req.params.id, v.validateChangeRoom(req.body)));
  }),
);

// ---------- Dashboard (HMS-014) ----------
router.get(
  '/dashboard',
  wrap(async (_req, res) => {
    const [totalStudents, activeStudents, rooms, activeAllocations] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: 'Active' }),
      Room.find().lean(),
      Allocation.countDocuments({ status: 'Active' }),
    ]);
    const totalCapacity = rooms.reduce((s, r) => s + r.capacity, 0);
    const totalOccupied = rooms.reduce((s, r) => s + r.occupancy, 0);
    const fullRooms = rooms.filter((r) => r.occupancy >= r.capacity).length;
    res.json({
      totalStudents,
      activeStudents,
      totalRooms: rooms.length,
      fullRooms,
      availableRooms: rooms.length - fullRooms,
      totalCapacity,
      totalOccupied,
      freeCapacity: totalCapacity - totalOccupied,
      activeAllocations,
    });
  }),
);

module.exports = router;

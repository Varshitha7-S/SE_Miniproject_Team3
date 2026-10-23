const mongoose = require('mongoose');
const { STUDENT_STATUSES, FEE_STATUSES, ALLOCATION_STATUSES } = require('../utils/validators');

const clean = {
  versionKey: false,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret._id;
      delete ret.passwordHash;
      return ret;
    },
  },
};

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1, max: 6 },
    status: { type: String, enum: STUDENT_STATUSES, default: 'Active' },
    feeAmount: { type: Number, min: 0, default: 0 },
    feeStatus: { type: String, enum: FEE_STATUSES, default: 'Pending' },
  },
  { ...clean, timestamps: true },
);
studentSchema.index({ fullName: 1 });

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomNumber: { type: String, required: true, unique: true, trim: true },
    block: { type: String, required: true, trim: true },
    floor: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    // Maintained atomically by allocationService; always equals the count of Active allocations.
    occupancy: { type: Number, default: 0, min: 0 },
  },
  { ...clean, timestamps: true },
);
roomSchema.set('toJSON', {
  ...clean.toJSON,
  transform: (doc, ret) => {
    clean.toJSON.transform(doc, ret);
    ret.remainingCapacity = ret.capacity - ret.occupancy;
    ret.status = ret.occupancy >= ret.capacity ? 'Full' : 'Available';
    return ret;
  },
});

const allocationSchema = new mongoose.Schema(
  {
    allocationId: { type: String, required: true, unique: true },
    studentId: { type: String, required: true, index: true },
    roomId: { type: String, required: true, index: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    status: { type: String, enum: ALLOCATION_STATUSES, default: 'Active' },
  },
  { ...clean, timestamps: true },
);
// Database-level guarantee: at most one Active allocation per student (even under concurrent requests).
allocationSchema.index({ studentId: 1 }, { unique: true, partialFilterExpression: { status: 'Active' }, name: 'one_active_per_student' });

const counterSchema = new mongoose.Schema({ _id: String, seq: { type: Number, default: 0 } }, { versionKey: false });

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { ...clean, timestamps: true },
);

module.exports = {
  Student: mongoose.model('Student', studentSchema),
  Room: mongoose.model('Room', roomSchema),
  Allocation: mongoose.model('Allocation', allocationSchema),
  Counter: mongoose.model('Counter', counterSchema),
  Admin: mongoose.model('Admin', adminSchema),
};

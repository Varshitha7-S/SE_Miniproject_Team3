const { Student, Room, Allocation, Counter } = require('../models');
const { notFound, conflict, badRequest } = require('../utils/errors');
const { today } = require('../utils/validators');

const isDuplicateKey = (err) => err && err.code === 11000;

async function nextAllocationId() {
  const c = await Counter.findOneAndUpdate({ _id: 'allocation' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
  return `AL${String(c.seq).padStart(3, '0')}`;
}

// Atomically takes one seat. The $expr guard makes "check capacity + increment" a single
// operation, so concurrent requests can never push occupancy above capacity.
function reserveSeat(roomId) {
  return Room.findOneAndUpdate({ roomId, $expr: { $lt: ['$occupancy', '$capacity'] } }, { $inc: { occupancy: 1 } }, { new: true });
}

function releaseSeat(roomId) {
  return Room.findOneAndUpdate({ roomId, occupancy: { $gt: 0 } }, { $inc: { occupancy: -1 } }, { new: true });
}

async function loadStudentAndRoom(studentId, roomId) {
  const [student, room] = await Promise.all([Student.findOne({ studentId }), Room.findOne({ roomId })]);
  if (!student) throw notFound(`Student ${studentId} not found`);
  if (!room) throw notFound(`Room ${roomId} not found`);
  if (student.status !== 'Active') throw conflict(`Student ${studentId} is not active and cannot be allocated a room`);
  return { student, room };
}

async function allocate({ studentId, roomId, startDate }) {
  await loadStudentAndRoom(studentId, roomId);

  const existing = await Allocation.findOne({ studentId, status: 'Active' });
  if (existing) throw conflict(`Student ${studentId} already has an active allocation in room ${existing.roomId}`);

  const reserved = await reserveSeat(roomId);
  if (!reserved) throw conflict(`Room ${roomId} is full`);

  try {
    return await Allocation.create({
      allocationId: await nextAllocationId(),
      studentId,
      roomId,
      startDate: startDate || today(),
      status: 'Active',
    });
  } catch (err) {
    await releaseSeat(roomId);
    if (isDuplicateKey(err)) throw conflict(`Student ${studentId} already has an active allocation`);
    throw err;
  }
}

async function vacate(allocationId, endDate) {
  const alloc = await Allocation.findOneAndUpdate(
    { allocationId, status: 'Active' },
    { status: 'Vacated', endDate: endDate || today() },
    { new: true },
  );
  if (!alloc) {
    const exists = await Allocation.exists({ allocationId });
    if (!exists) throw notFound(`Allocation ${allocationId} not found`);
    throw conflict(`Allocation ${allocationId} is already vacated`);
  }
  if (alloc.endDate < alloc.startDate) {
    // Roll back: an end date before the start date would be a contradictory record.
    await Allocation.updateOne({ allocationId }, { status: 'Active', endDate: null });
    throw badRequest('End date cannot be before the start date', { endDate: 'End date cannot be before the start date' });
  }
  await releaseSeat(alloc.roomId);
  return alloc;
}

async function changeRoom(allocationId, { roomId: newRoomId, startDate }) {
  const current = await Allocation.findOne({ allocationId });
  if (!current) throw notFound(`Allocation ${allocationId} not found`);
  if (current.status !== 'Active') throw conflict(`Allocation ${allocationId} is already vacated`);
  if (current.roomId === newRoomId) throw conflict(`Student ${current.studentId} is already in room ${newRoomId}`);
  await loadStudentAndRoom(current.studentId, newRoomId);

  const when = startDate || today();
  if (when < current.startDate) {
    throw badRequest('Start date cannot be before the current allocation start date', { startDate: 'Start date cannot be before the current allocation start date' });
  }

  const reserved = await reserveSeat(newRoomId);
  if (!reserved) throw conflict(`Room ${newRoomId} is full`);

  const closed = await Allocation.findOneAndUpdate({ allocationId, status: 'Active' }, { status: 'Vacated', endDate: when }, { new: true });
  if (!closed) {
    await releaseSeat(newRoomId);
    throw conflict(`Allocation ${allocationId} is already vacated`);
  }
  await releaseSeat(closed.roomId);

  try {
    return await Allocation.create({
      allocationId: await nextAllocationId(),
      studentId: closed.studentId,
      roomId: newRoomId,
      startDate: when,
      status: 'Active',
    });
  } catch (err) {
    // Best-effort restore of the original allocation so the student is never left without a record.
    await Allocation.updateOne({ allocationId }, { status: 'Active', endDate: null });
    await reserveSeat(closed.roomId);
    await releaseSeat(newRoomId);
    if (isDuplicateKey(err)) throw conflict(`Student ${closed.studentId} already has an active allocation`);
    throw err;
  }
}

module.exports = { allocate, vacate, changeRoom };

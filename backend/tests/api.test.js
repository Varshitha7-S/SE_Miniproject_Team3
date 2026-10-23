process.env.NODE_ENV = 'test';
process.env.AUTH_ENABLED = 'false';
process.env.JWT_SECRET = 'test-secret';

const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createApp } = require('../src/app');
const { connectDB } = require('../src/config/db');
const { Student, Room, Allocation, Admin, Counter } = require('../src/models');

let mongod;
let app;

const student = (n, extra = {}) => ({
  studentId: `S${n}`,
  fullName: `Student ${n}`,
  email: `s${n}@example.com`,
  phone: '9876543210',
  course: 'CSE',
  year: 2,
  ...extra,
});
const room = (n, capacity = 2) => ({ roomNumber: String(n), block: 'A', floor: 1, capacity });

const mkStudents = async (...ns) => { for (const n of ns) await request(app).post('/api/students').send(student(n)).expect(201); };
const mkRoom = async (n, cap) => (await request(app).post('/api/rooms').send(room(n, cap)).expect(201)).body;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await connectDB(mongod.getUri());
  app = createApp();
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
beforeEach(async () => {
  await Promise.all([Student.deleteMany({}), Room.deleteMany({}), Allocation.deleteMany({}), Admin.deleteMany({}), Counter.deleteMany({})]);
});

// Occupancy shown to the admin must always equal the number of Active allocation records.
async function expectConsistent() {
  for (const r of await Room.find()) {
    const active = await Allocation.countDocuments({ roomId: r.roomId, status: 'Active' });
    expect(r.occupancy).toBe(active);
    expect(r.occupancy).toBeLessThanOrEqual(r.capacity);
  }
}

describe('Students (HMS-002..005)', () => {
  test('creates, lists and views a student', async () => {
    const res = await request(app).post('/api/students').send(student(1)).expect(201);
    expect(res.body.studentId).toBe('S1');
    expect(res.body.status).toBe('Active');
    expect((await request(app).get('/api/students').expect(200)).body).toHaveLength(1);
    const one = await request(app).get('/api/students/S1').expect(200);
    expect(one.body.email).toBe('s1@example.com');
    expect(one.body.activeAllocation).toBeNull();
  });

  test('duplicate studentId is rejected with 409', async () => {
    await mkStudents(1);
    const res = await request(app).post('/api/students').send(student(1)).expect(409);
    expect(res.body.error).toMatch(/already exists/);
  });

  test('unknown student returns 404', async () => {
    await request(app).get('/api/students/NOPE').expect(404);
    await request(app).put('/api/students/NOPE').send({ fullName: 'x' }).expect(404);
  });

  test('update persists and studentId cannot change', async () => {
    await mkStudents(1);
    await request(app).put('/api/students/S1').send({ fullName: 'New Name', year: 3 }).expect(200);
    const got = (await request(app).get('/api/students/S1')).body;
    expect(got.fullName).toBe('New Name');
    expect(got.year).toBe(3);
    await request(app).put('/api/students/S1').send({ studentId: 'S9' }).expect(400);
    await request(app).put('/api/students/S1').send({}).expect(400);
  });

  test('search by id or name, case-insensitive, no-match is empty', async () => {
    await request(app).post('/api/students').send(student(1, { fullName: 'Aarav Mehta' })).expect(201);
    await request(app).post('/api/students').send(student(2, { fullName: 'Diya Sharma' })).expect(201);
    expect((await request(app).get('/api/students?search=aarav')).body.map((s) => s.studentId)).toEqual(['S1']);
    expect((await request(app).get('/api/students?search=s2')).body.map((s) => s.studentId)).toEqual(['S2']);
    expect((await request(app).get('/api/students?search=zzz')).body).toEqual([]);
    // regex metacharacters are treated literally
    expect((await request(app).get('/api/students?search=.*')).body).toEqual([]);
  });
});

describe('Validation (HMS-015, HMS-016)', () => {
  test.each([
    ['missing fields', {}, ['studentId', 'fullName', 'email', 'phone', 'course', 'year']],
    ['bad email', student(1, { email: 'nope' }), ['email']],
    ['bad phone', student(1, { phone: 'abc' }), ['phone']],
    ['year out of range', student(1, { year: 9 }), ['year']],
    ['non-numeric year', student(1, { year: 'two' }), ['year']],
    ['bad status', student(1, { status: 'Hacked' }), ['status']],
    ['negative fee', student(1, { feeAmount: -5 }), ['feeAmount']],
    ['object injected as string', student(1, { fullName: { $gt: '' } }), ['fullName']],
    ['illegal id chars', student(1, { studentId: 'a b/../' }), ['studentId']],
  ])('rejects %s with field-level errors and saves nothing', async (_n, body, fields) => {
    const res = await request(app).post('/api/students').send(body).expect(400);
    for (const f of fields) expect(res.body.fields).toHaveProperty(f);
    expect(await Student.countDocuments()).toBe(0);
  });

  test('rejects invalid rooms', async () => {
    for (const bad of [{ ...room(1), capacity: 0 }, { ...room(1), capacity: -3 }, { ...room(1), capacity: 'x' }, { ...room(1), capacity: 1.5 }, { block: 'A' }]) {
      await request(app).post('/api/rooms').send(bad).expect(400);
    }
    expect(await Room.countDocuments()).toBe(0);
  });

  test('rejects malformed allocation payloads without changing data', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 2);
    for (const bad of [{}, { studentId: 'S1' }, { studentId: 'S1', roomId: r.roomId, startDate: 'yesterday' }, { studentId: { $ne: null }, roomId: r.roomId }]) {
      await request(app).post('/api/allocations').send(bad).expect(400);
    }
    expect(await Allocation.countDocuments()).toBe(0);
    await expectConsistent();
  });

  test('rejects invalid query parameters', async () => {
    await request(app).get('/api/allocations?status=Bogus').expect(400);
    await request(app).get('/api/rooms?availability=maybe').expect(400);
    await request(app).get('/api/students?search[$ne]=x').expect(400);
  });
});

describe('Rooms (HMS-006, 007, 013)', () => {
  test('creates a room and shows capacity, occupancy, remaining', async () => {
    const r = await mkRoom(101, 3);
    expect(r).toMatchObject({ roomId: 'R101', capacity: 3, occupancy: 0, remainingCapacity: 3, status: 'Available' });
  });

  test('duplicate room number is rejected with 409', async () => {
    await mkRoom(101, 2);
    await request(app).post('/api/rooms').send(room(101, 5)).expect(409);
  });

  test('availability filter', async () => {
    await mkStudents(1);
    const a = await mkRoom(1, 1);
    await mkRoom(2, 2);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId }).expect(201);
    expect((await request(app).get('/api/rooms?availability=full')).body.map((r) => r.roomId)).toEqual(['R1']);
    expect((await request(app).get('/api/rooms?availability=available')).body.map((r) => r.roomId)).toEqual(['R2']);
    expect((await request(app).get('/api/rooms')).body).toHaveLength(2);
  });
});

describe('Allocation (HMS-008..012, HMS-018)', () => {
  test('allocates and updates occupancy', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 2);
    const res = await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId, startDate: '2026-08-01' }).expect(201);
    expect(res.body).toMatchObject({ allocationId: 'AL001', studentId: 'S1', roomId: 'R101', status: 'Active', endDate: null });
    expect((await request(app).get('/api/rooms/R101')).body.occupancy).toBe(1);
    expect((await request(app).get('/api/students/S1')).body.activeAllocation.roomId).toBe('R101');
    await expectConsistent();
  });

  test('unknown student or room is 404 and creates nothing', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 2);
    await request(app).post('/api/allocations').send({ studentId: 'GHOST', roomId: r.roomId }).expect(404);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: 'R999' }).expect(404);
    expect(await Allocation.countDocuments()).toBe(0);
  });

  test('inactive students cannot be allocated', async () => {
    await request(app).post('/api/students').send(student(1, { status: 'Inactive' })).expect(201);
    const r = await mkRoom(101, 2);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId }).expect(409);
  });

  test('full room is rejected with a clear message (HMS-009), boundary fills last seat', async () => {
    await mkStudents(1, 2, 3);
    const r = await mkRoom(101, 2);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId }).expect(201);
    await request(app).post('/api/allocations').send({ studentId: 'S2', roomId: r.roomId }).expect(201); // final seat
    const res = await request(app).post('/api/allocations').send({ studentId: 'S3', roomId: r.roomId }).expect(409);
    expect(res.body.error).toMatch(/full/i);
    expect(await Allocation.countDocuments({ studentId: 'S3' })).toBe(0);
    await expectConsistent();
  });

  test('second active allocation per student is rejected (HMS-010)', async () => {
    await mkStudents(1);
    const a = await mkRoom(101, 2);
    const b = await mkRoom(102, 2);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId }).expect(201);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: b.roomId }).expect(409);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId }).expect(409);
    await expectConsistent();
  });

  test('vacate ends allocation, frees capacity, and cannot be repeated (HMS-012)', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 1);
    const a = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId, startDate: '2026-08-01' })).body;
    const res = await request(app).patch(`/api/allocations/${a.allocationId}/vacate`).send({ endDate: '2026-09-01' }).expect(200);
    expect(res.body).toMatchObject({ status: 'Vacated', endDate: '2026-09-01' });
    expect((await request(app).get('/api/rooms/R101')).body).toMatchObject({ occupancy: 0, status: 'Available' });
    await request(app).patch(`/api/allocations/${a.allocationId}/vacate`).send({}).expect(409);
    await request(app).patch('/api/allocations/AL999/vacate').send({}).expect(404);
    await expectConsistent();
  });

  test('vacate with an end date before the start date is rejected and changes nothing', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 1);
    const a = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId, startDate: '2026-08-10' })).body;
    await request(app).patch(`/api/allocations/${a.allocationId}/vacate`).send({ endDate: '2026-08-01' }).expect(400);
    expect((await Allocation.findOne({ allocationId: a.allocationId })).status).toBe('Active');
    await expectConsistent();
  });

  test('a vacated student can be allocated again and history is kept (HMS-023)', async () => {
    await mkStudents(1);
    const r = await mkRoom(101, 2);
    const a = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId, startDate: '2026-01-01' })).body;
    await request(app).patch(`/api/allocations/${a.allocationId}/vacate`).send({ endDate: '2026-02-01' }).expect(200);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: r.roomId, startDate: '2026-03-01' }).expect(201);
    const hist = (await request(app).get('/api/students/S1/allocations').expect(200)).body;
    expect(hist.map((h) => h.status)).toEqual(['Active', 'Vacated']);
    await request(app).get('/api/students/NOPE/allocations').expect(404);
  });

  test('change room closes old allocation and records a new one (HMS-011)', async () => {
    await mkStudents(1);
    const a = await mkRoom(101, 1);
    const b = await mkRoom(102, 1);
    const first = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId, startDate: '2026-08-01' })).body;
    const res = await request(app).patch(`/api/allocations/${first.allocationId}/change-room`).send({ roomId: b.roomId, startDate: '2026-09-01' }).expect(200);
    expect(res.body).toMatchObject({ roomId: 'R102', status: 'Active', startDate: '2026-09-01' });
    expect((await Allocation.findOne({ allocationId: first.allocationId })).toJSON()).toMatchObject({ status: 'Vacated', endDate: '2026-09-01' });
    expect((await Room.findOne({ roomId: 'R101' })).occupancy).toBe(0);
    expect((await Room.findOne({ roomId: 'R102' })).occupancy).toBe(1);
    await expectConsistent();
  });

  test('change room to a full room, same room, or an old allocation is rejected and nothing changes', async () => {
    await mkStudents(1, 2);
    const a = await mkRoom(101, 1);
    const b = await mkRoom(102, 1);
    const s1 = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId })).body;
    await request(app).post('/api/allocations').send({ studentId: 'S2', roomId: b.roomId }).expect(201);
    await request(app).patch(`/api/allocations/${s1.allocationId}/change-room`).send({ roomId: b.roomId }).expect(409);
    await request(app).patch(`/api/allocations/${s1.allocationId}/change-room`).send({ roomId: a.roomId }).expect(409);
    await request(app).patch(`/api/allocations/${s1.allocationId}/change-room`).send({ roomId: 'R999' }).expect(404);
    await request(app).patch('/api/allocations/AL999/change-room').send({ roomId: b.roomId }).expect(404);
    expect((await Allocation.findOne({ allocationId: s1.allocationId })).status).toBe('Active');
    await expectConsistent();
  });

  test('concurrent requests never overbook a room', async () => {
    await mkStudents(...Array.from({ length: 12 }, (_, i) => i + 1));
    const r = await mkRoom(101, 3);
    const results = await Promise.all(
      Array.from({ length: 12 }, (_, i) => request(app).post('/api/allocations').send({ studentId: `S${i + 1}`, roomId: r.roomId })),
    );
    expect(results.filter((x) => x.status === 201)).toHaveLength(3);
    expect(results.filter((x) => x.status === 409)).toHaveLength(9);
    expect(await Allocation.countDocuments({ status: 'Active' })).toBe(3);
    await expectConsistent();
  });

  test('concurrent duplicate requests for one student create exactly one allocation', async () => {
    await mkStudents(1);
    const a = await mkRoom(101, 5);
    const b = await mkRoom(102, 5);
    const results = await Promise.all(
      [a, b, a, b, a, b].map((rm) => request(app).post('/api/allocations').send({ studentId: 'S1', roomId: rm.roomId })),
    );
    expect(results.filter((x) => x.status === 201)).toHaveLength(1);
    expect(await Allocation.countDocuments({ studentId: 'S1', status: 'Active' })).toBe(1);
    await expectConsistent();
  });

  test('filter allocations by status, room and student (HMS-013)', async () => {
    await mkStudents(1, 2);
    const a = await mkRoom(101, 2);
    const x = (await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId })).body;
    await request(app).post('/api/allocations').send({ studentId: 'S2', roomId: a.roomId });
    await request(app).patch(`/api/allocations/${x.allocationId}/vacate`).send({});
    expect((await request(app).get('/api/allocations?status=Active')).body).toHaveLength(1);
    expect((await request(app).get('/api/allocations?status=Vacated')).body[0].studentId).toBe('S1');
    expect((await request(app).get('/api/allocations?roomId=R101')).body).toHaveLength(2);
    expect((await request(app).get('/api/allocations?studentId=S2')).body).toHaveLength(1);
  });
});

describe('Dashboard (HMS-014)', () => {
  test('summary agrees with stored records', async () => {
    await mkStudents(1, 2, 3);
    const a = await mkRoom(101, 2);
    await mkRoom(102, 3);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: a.roomId });
    await request(app).post('/api/allocations').send({ studentId: 'S2', roomId: a.roomId });
    const d = (await request(app).get('/api/dashboard').expect(200)).body;
    expect(d).toEqual({
      totalStudents: 3, activeStudents: 3, totalRooms: 2, fullRooms: 1, availableRooms: 1,
      totalCapacity: 5, totalOccupied: 2, freeCapacity: 3, activeAllocations: 2,
    });
  });
});

describe('Fees (HMS-022)', () => {
  test('records fee amount and status, rejects invalid values', async () => {
    await mkStudents(1);
    expect((await request(app).get('/api/students/S1')).body.feeStatus).toBe('Pending');
    const res = await request(app).patch('/api/students/S1/fee').send({ feeAmount: 45000, feeStatus: 'Paid' }).expect(200);
    expect(res.body).toMatchObject({ feeAmount: 45000, feeStatus: 'Paid' });
    await request(app).patch('/api/students/S1/fee').send({ feeStatus: 'Maybe' }).expect(400);
    await request(app).patch('/api/students/S1/fee').send({ feeAmount: -1, feeStatus: 'Paid' }).expect(400);
    await request(app).patch('/api/students/NOPE/fee').send({ feeStatus: 'Paid' }).expect(404);
  });
});

describe('Error handling (HMS-017)', () => {
  test('malformed JSON, unknown routes and server faults return consistent JSON with no stack trace', async () => {
    const bad = await request(app).post('/api/students').set('Content-Type', 'application/json').send('{"studentId": ').expect(400);
    expect(bad.body).toEqual({ error: 'Malformed JSON in request body' });
    const nf = await request(app).get('/api/nope').expect(404);
    expect(Object.keys(nf.body)).toEqual(['error']);

    const spy = jest.spyOn(Student, 'find').mockImplementation(() => { throw new Error('secret db detail at /srv/app/db.js:42'); });
    const res = await request(app).get('/api/students').expect(500);
    spy.mockRestore();
    expect(res.body).toEqual({ error: 'Internal server error' });
    expect(JSON.stringify(res.body)).not.toMatch(/secret|\.js|stack/i);
  });
});

describe('Authentication (HMS-019)', () => {
  beforeAll(() => { process.env.AUTH_ENABLED = 'true'; });
  afterAll(() => { process.env.AUTH_ENABLED = 'false'; });

  test('unauthenticated requests are denied, login works, passwords are hashed', async () => {
    await Admin.create({ username: 'admin', passwordHash: await bcrypt.hash('correct-horse', 10) });
    expect((await Admin.findOne({ username: 'admin' })).passwordHash).not.toContain('correct-horse');

    await request(app).get('/api/students').expect(401);
    await request(app).post('/api/students').send(student(1)).expect(401);
    await request(app).post('/api/allocations').send({ studentId: 'S1', roomId: 'R1' }).expect(401);
    await request(app).get('/api/students').set('Authorization', 'Bearer garbage').expect(401);

    await request(app).post('/api/auth/login').send({ username: 'admin', password: 'wrong' }).expect(401);
    await request(app).post('/api/auth/login').send({ username: 'ghost', password: 'whatever' }).expect(401);
    const login = await request(app).post('/api/auth/login').send({ username: 'admin', password: 'correct-horse' }).expect(200);
    expect(login.body.token).toBeTruthy();
    expect(JSON.stringify(login.body)).not.toMatch(/hash/i);

    const h = { Authorization: `Bearer ${login.body.token}` };
    await request(app).post('/api/students').set(h).send(student(1)).expect(201);
    await request(app).get('/api/students').set(h).expect(200);
    expect((await request(app).get('/api/health')).status).toBe(200);
  });
});

describe('Performance (HMS-020)', () => {
  test('list and search respond in under 3 s on demo-sized data, 10 times each', async () => {
    await Student.insertMany(Array.from({ length: 500 }, (_, i) => student(i + 1)));
    await Room.insertMany(Array.from({ length: 100 }, (_, i) => ({ roomId: `R${i}`, roomNumber: String(i), block: 'A', floor: 1, capacity: 2 })));
    for (const url of ['/api/students', '/api/students?search=Student 42', '/api/rooms', '/api/allocations', '/api/dashboard']) {
      for (let i = 0; i < 10; i++) {
        const t = Date.now();
        await request(app).get(url).expect(200);
        expect(Date.now() - t).toBeLessThan(3000);
      }
    }
  });
});

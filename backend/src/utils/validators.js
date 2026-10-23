const { badRequest } = require('./errors');

const STUDENT_STATUSES = ['Active', 'Inactive'];
const FEE_STATUSES = ['Paid', 'Pending'];
const ALLOCATION_STATUSES = ['Active', 'Vacated'];

const ID_PATTERN = /^[A-Za-z0-9_-]{1,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s]{7,15}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Collects field-level messages so the UI can show them next to each input.
class Checker {
  constructor(body) {
    this.body = body && typeof body === 'object' && !Array.isArray(body) ? body : {};
    this.errors = {};
    this.value = {};
  }

  fail(field, message) {
    if (!this.errors[field]) this.errors[field] = message;
  }

  has(field) {
    const v = this.body[field];
    return v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '');
  }

  string(field, { required = true, max = 100, pattern, patternMessage, label = field } = {}) {
    if (!this.has(field)) {
      if (required) this.fail(field, `${label} is required`);
      return;
    }
    const raw = this.body[field];
    if (typeof raw !== 'string') return this.fail(field, `${label} must be text`);
    const v = raw.trim();
    if (v.length > max) return this.fail(field, `${label} must be at most ${max} characters`);
    if (pattern && !pattern.test(v)) return this.fail(field, patternMessage || `${label} is invalid`);
    this.value[field] = v;
  }

  oneOf(field, allowed, { required = false, label = field } = {}) {
    if (!this.has(field)) {
      if (required) this.fail(field, `${label} is required`);
      return;
    }
    const v = this.body[field];
    if (typeof v !== 'string' || !allowed.includes(v)) {
      return this.fail(field, `${label} must be one of: ${allowed.join(', ')}`);
    }
    this.value[field] = v;
  }

  integer(field, { required = true, min, max, label = field } = {}) {
    if (!this.has(field)) {
      if (required) this.fail(field, `${label} is required`);
      return;
    }
    const raw = this.body[field];
    const n = typeof raw === 'number' ? raw : typeof raw === 'string' && /^-?\d+$/.test(raw.trim()) ? Number(raw) : NaN;
    if (!Number.isInteger(n)) return this.fail(field, `${label} must be a whole number`);
    if (min !== undefined && n < min) return this.fail(field, `${label} must be at least ${min}`);
    if (max !== undefined && n > max) return this.fail(field, `${label} must be at most ${max}`);
    this.value[field] = n;
  }

  number(field, { required = true, min, label = field } = {}) {
    if (!this.has(field)) {
      if (required) this.fail(field, `${label} is required`);
      return;
    }
    const raw = this.body[field];
    const n = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : NaN;
    if (!Number.isFinite(n)) return this.fail(field, `${label} must be a number`);
    if (min !== undefined && n < min) return this.fail(field, `${label} must be at least ${min}`);
    this.value[field] = n;
  }

  date(field, { required = false, label = field } = {}) {
    if (!this.has(field)) {
      if (required) this.fail(field, `${label} is required`);
      return;
    }
    const v = this.body[field];
    if (typeof v !== 'string' || !DATE_PATTERN.test(v.trim()) || Number.isNaN(Date.parse(v.trim()))) {
      return this.fail(field, `${label} must be a valid date (YYYY-MM-DD)`);
    }
    this.value[field] = v.trim();
  }

  done() {
    if (Object.keys(this.errors).length) {
      throw badRequest('Validation failed', this.errors);
    }
    return this.value;
  }
}

function studentFields(c, { partial }) {
  const req = !partial;
  c.string('fullName', { required: req, max: 100, label: 'Full name' });
  c.string('email', { required: req, max: 120, pattern: EMAIL_PATTERN, patternMessage: 'Email must be a valid address', label: 'Email' });
  c.string('phone', { required: req, max: 15, pattern: PHONE_PATTERN, patternMessage: 'Phone must be 7-15 digits', label: 'Phone' });
  c.string('course', { required: req, max: 50, label: 'Course' });
  c.integer('year', { required: req, min: 1, max: 6, label: 'Year' });
  c.oneOf('status', STUDENT_STATUSES, { label: 'Status' });
  c.number('feeAmount', { required: false, min: 0, label: 'Fee amount' });
  c.oneOf('feeStatus', FEE_STATUSES, { label: 'Fee status' });
}

function validateStudentCreate(body) {
  const c = new Checker(body);
  c.string('studentId', { max: 20, pattern: ID_PATTERN, patternMessage: 'Student ID may contain letters, digits, - and _ only', label: 'Student ID' });
  studentFields(c, { partial: false });
  return c.done();
}

function validateStudentUpdate(body) {
  const c = new Checker(body);
  if (c.body.studentId !== undefined) c.fail('studentId', 'Student ID cannot be changed');
  studentFields(c, { partial: true });
  const value = c.done();
  if (!Object.keys(value).length) throw badRequest('No updatable fields supplied');
  return value;
}

function validateFee(body) {
  const c = new Checker(body);
  c.number('feeAmount', { required: false, min: 0, label: 'Fee amount' });
  c.oneOf('feeStatus', FEE_STATUSES, { required: true, label: 'Fee status' });
  return c.done();
}

function validateRoomCreate(body) {
  const c = new Checker(body);
  c.string('roomNumber', { max: 10, pattern: /^[A-Za-z0-9-]{1,10}$/, patternMessage: 'Room number may contain letters, digits and - only', label: 'Room number' });
  c.string('block', { max: 10, label: 'Block' });
  c.integer('floor', { min: 0, max: 100, label: 'Floor' });
  c.integer('capacity', { min: 1, max: 20, label: 'Capacity' });
  return c.done();
}

function validateAllocationCreate(body) {
  const c = new Checker(body);
  c.string('studentId', { max: 20, pattern: ID_PATTERN, label: 'Student ID' });
  c.string('roomId', { max: 20, pattern: ID_PATTERN, label: 'Room ID' });
  c.date('startDate', { label: 'Start date' });
  return c.done();
}

function validateVacate(body) {
  const c = new Checker(body);
  c.date('endDate', { label: 'End date' });
  return c.done();
}

function validateChangeRoom(body) {
  const c = new Checker(body);
  c.string('roomId', { max: 20, pattern: ID_PATTERN, label: 'Room ID' });
  c.date('startDate', { label: 'Start date' });
  return c.done();
}

function validateLogin(body) {
  const c = new Checker(body);
  c.string('username', { max: 50, label: 'Username' });
  c.string('password', { max: 128, label: 'Password' });
  return c.done();
}

// Query-string params must be plain strings (blocks operator injection like ?status[$ne]=x).
function queryString(query, name, { allowed, max = 100 } = {}) {
  const v = query[name];
  if (v === undefined || v === '') return undefined;
  if (typeof v !== 'string') throw badRequest(`Invalid query parameter: ${name}`);
  const t = v.trim();
  if (t.length > max) throw badRequest(`Query parameter ${name} is too long`);
  if (allowed && !allowed.includes(t)) throw badRequest(`${name} must be one of: ${allowed.join(', ')}`);
  return t;
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const today = () => new Date().toISOString().slice(0, 10);

module.exports = {
  STUDENT_STATUSES,
  FEE_STATUSES,
  ALLOCATION_STATUSES,
  validateStudentCreate,
  validateStudentUpdate,
  validateFee,
  validateRoomCreate,
  validateAllocationCreate,
  validateVacate,
  validateChangeRoom,
  validateLogin,
  queryString,
  escapeRegex,
  today,
};

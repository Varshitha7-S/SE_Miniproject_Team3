// Client-side checks mirror the server rules (the server remains the source of truth).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+\-\s]{7,15}$/;
const ID = /^[A-Za-z0-9_-]{1,20}$/;

const blank = (v) => v === undefined || v === null || String(v).trim() === '';

export function validateStudent(f, { isNew }) {
  const e = {};
  if (isNew) {
    if (blank(f.studentId)) e.studentId = 'Student ID is required';
    else if (!ID.test(f.studentId.trim())) e.studentId = 'Student ID may contain letters, digits, - and _ only';
  }
  if (blank(f.fullName)) e.fullName = 'Full name is required';
  if (blank(f.email)) e.email = 'Email is required';
  else if (!EMAIL.test(f.email.trim())) e.email = 'Email must be a valid address';
  if (blank(f.phone)) e.phone = 'Phone is required';
  else if (!PHONE.test(f.phone.trim())) e.phone = 'Phone must be 7-15 digits';
  if (blank(f.course)) e.course = 'Course is required';
  if (blank(f.year)) e.year = 'Year is required';
  else if (!/^\d+$/.test(String(f.year)) || +f.year < 1 || +f.year > 6) e.year = 'Year must be a whole number from 1 to 6';
  return e;
}

export function validateRoom(f) {
  const e = {};
  if (blank(f.roomNumber)) e.roomNumber = 'Room number is required';
  else if (!/^[A-Za-z0-9-]{1,10}$/.test(f.roomNumber.trim())) e.roomNumber = 'Room number may contain letters, digits and - only';
  if (blank(f.block)) e.block = 'Block is required';
  if (blank(f.floor)) e.floor = 'Floor is required';
  else if (!/^\d+$/.test(String(f.floor))) e.floor = 'Floor must be a whole number (0 or more)';
  if (blank(f.capacity)) e.capacity = 'Capacity is required';
  else if (!/^\d+$/.test(String(f.capacity)) || +f.capacity < 1) e.capacity = 'Capacity must be a positive whole number';
  return e;
}

import React, { useState } from 'react';
import { api } from '../api.js';
import { Badge, Banner, Field, useFlash, useLoad } from '../ui.jsx';

function AllocateForm({ students, rooms, onDone }) {
  const [studentId, setStudentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setFormError('');
    const local = {};
    if (!studentId) local.studentId = 'Choose a student';
    if (!roomId) local.roomId = 'Choose a room';
    setErrors(local);
    if (Object.keys(local).length) return;
    try {
      await api.allocate({ studentId, roomId });
      setStudentId(''); setRoomId('');
      onDone(`Allocated ${studentId} to ${roomId}`);
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(err.message); // e.g. "Room R101 is full"
    }
  }
  return (
    <form className="card" onSubmit={submit} noValidate aria-label="Allocate student">
      <h3>Allocate a student to a room</h3>
      <Banner kind="error">{formError}</Banner>
      <div className="fields">
        <Field label="Student" name="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} error={errors.studentId}>
          <select><option value="">Select…</option>{students.filter((s) => s.status === 'Active').map((s) => <option key={s.studentId} value={s.studentId}>{s.studentId} – {s.fullName}</option>)}</select>
        </Field>
        <Field label="Room" name="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} error={errors.roomId}>
          <select><option value="">Select…</option>{rooms.map((r) => <option key={r.roomId} value={r.roomId}>{r.roomNumber} – {r.occupancy}/{r.capacity}{r.status === 'Full' ? ' (full)' : ''}</option>)}</select>
        </Field>
      </div>
      <div className="row" style={{ marginTop: '.8rem' }}><button className="btn">Allocate</button></div>
    </form>
  );
}

export default function Allocations() {
  const [status, setStatus] = useState('Active');
  const [roomFilter, setRoomFilter] = useState('');
  const [moving, setMoving] = useState(null); // allocation being moved
  const [target, setTarget] = useState('');
  const [flash, setFlash, clear] = useFlash();
  const students = useLoad(() => api.students(), []);
  const rooms = useLoad(() => api.rooms(), []);
  const allocs = useLoad(() => api.allocations({ status, roomId: roomFilter }), [status, roomFilter]);

  const refresh = () => { rooms.reload(); allocs.reload(); students.reload(); };
  const ok = (m) => { setFlash('success', m); refresh(); };
  const fail = (e) => { setFlash('error', e.message); refresh(); };

  async function vacate(a) {
    if (!window.confirm(`Vacate ${a.studentId} from ${a.roomId}?`)) return;
    clear();
    try { await api.vacate(a.allocationId); ok(`${a.studentId} vacated from ${a.roomId}`); } catch (e) { fail(e); }
  }
  async function move() {
    if (!target) return setFlash('error', 'Choose the new room');
    try { await api.changeRoom(moving.allocationId, target); setMoving(null); setTarget(''); ok(`${moving.studentId} moved to ${target}`); } catch (e) { fail(e); }
  }

  return (
    <section>
      <h2>Allocations</h2>
      <Banner kind={flash.kind}>{flash.text}</Banner>
      {students.data && rooms.data && <AllocateForm students={students.data} rooms={rooms.data} onDone={ok} />}
      {moving && (
        <div className="card row">
          <strong>Move {moving.studentId} from {moving.roomId} to:</strong>
          <select aria-label="New room" value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">Select…</option>
            {rooms.data.filter((r) => r.roomId !== moving.roomId).map((r) => <option key={r.roomId} value={r.roomId}>{r.roomNumber} – {r.occupancy}/{r.capacity}</option>)}
          </select>
          <button className="btn sm" onClick={move}>Move</button>
          <button className="btn sec sm" onClick={() => { setMoving(null); setTarget(''); }}>Cancel</button>
        </div>
      )}
      <div className="card row">
        <Field label="Status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <select><option value="">All</option><option>Active</option><option>Vacated</option></select>
        </Field>
        <Field label="Room" name="roomFilter" value={roomFilter} onChange={(e) => setRoomFilter(e.target.value)}>
          <select><option value="">All rooms</option>{rooms.data && rooms.data.map((r) => <option key={r.roomId} value={r.roomId}>{r.roomNumber}</option>)}</select>
        </Field>
      </div>
      <Banner kind="error">{allocs.error}</Banner>
      {allocs.loading && <p className="muted">Loading…</p>}
      {allocs.data && allocs.data.length === 0 && <p className="empty">No allocations match this filter.</p>}
      {allocs.data && allocs.data.length > 0 && (
        <div className="card table-wrap"><table>
          <thead><tr><th>ID</th><th>Student</th><th>Room</th><th>From</th><th>To</th><th>Status</th><th></th></tr></thead>
          <tbody>{allocs.data.map((a) => (
            <tr key={a.allocationId}>
              <td>{a.allocationId}</td><td>{a.studentId}</td><td>{a.roomId}</td><td>{a.startDate}</td><td>{a.endDate || '—'}</td>
              <td><Badge kind={a.status === 'Active' ? 'ok' : ''}>{a.status}</Badge></td>
              <td>{a.status === 'Active' && <div className="row"><button className="btn sm" onClick={() => setMoving(a)}>Change room</button><button className="btn danger sm" onClick={() => vacate(a)}>Vacate</button></div>}</td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </section>
  );
}

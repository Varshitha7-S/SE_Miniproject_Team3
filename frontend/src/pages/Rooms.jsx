import React, { useState } from 'react';
import { api } from '../api.js';
import { validateRoom } from '../validation.js';
import { Badge, Banner, Field, useFlash, useLoad } from '../ui.jsx';

function RoomForm({ onSaved, onCancel }) {
  const [f, setF] = useState({ roomNumber: '', block: '', floor: '', capacity: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const set = (e) => setF({ ...f, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setFormError('');
    const local = validateRoom(f);
    setErrors(local);
    if (Object.keys(local).length) return;
    try {
      await api.createRoom({ roomNumber: f.roomNumber, block: f.block, floor: Number(f.floor), capacity: Number(f.capacity) });
      onSaved('Room added');
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(err.message);
    }
  }
  return (
    <form className="card" onSubmit={submit} noValidate aria-label="Add room">
      <h3>Add room</h3>
      <Banner kind="error">{formError}</Banner>
      <div className="fields">
        <Field label="Room number" name="roomNumber" value={f.roomNumber} onChange={set} error={errors.roomNumber} />
        <Field label="Block" name="block" value={f.block} onChange={set} error={errors.block} />
        <Field label="Floor" name="floor" value={f.floor} onChange={set} error={errors.floor} inputMode="numeric" />
        <Field label="Capacity" name="capacity" value={f.capacity} onChange={set} error={errors.capacity} inputMode="numeric" />
      </div>
      <div className="row" style={{ marginTop: '.8rem' }}>
        <button className="btn">Save</button>
        <button type="button" className="btn sec" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function Rooms() {
  const [availability, setAvailability] = useState('');
  const [adding, setAdding] = useState(false);
  const [flash, setFlash] = useFlash();
  const { data, loading, error, reload } = useLoad(() => api.rooms(availability), [availability]);

  return (
    <section>
      <div className="row spread"><h2>Rooms</h2><button className="btn" onClick={() => setAdding(true)}>Add room</button></div>
      <Banner kind={flash.kind}>{flash.text}</Banner>
      {adding && <RoomForm onCancel={() => setAdding(false)} onSaved={(m) => { setAdding(false); setFlash('success', m); reload(); }} />}
      <div className="card row">
        <Field label="Show" name="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <select><option value="">All rooms</option><option value="available">With free space</option><option value="full">Full only</option></select>
        </Field>
      </div>
      <Banner kind="error">{error}</Banner>
      {loading && <p className="muted">Loading…</p>}
      {data && data.length === 0 && <p className="empty">No rooms match this filter.</p>}
      {data && data.length > 0 && (
        <div className="card table-wrap"><table>
          <thead><tr><th>Room</th><th>Block</th><th>Floor</th><th>Capacity</th><th>Occupied</th><th>Free</th><th>Status</th></tr></thead>
          <tbody>{data.map((r) => (
            <tr key={r.roomId}>
              <td>{r.roomNumber} <span className="muted">({r.roomId})</span></td><td>{r.block}</td><td>{r.floor}</td>
              <td>{r.capacity}</td><td>{r.occupancy}</td><td>{r.remainingCapacity}</td>
              <td><Badge kind={r.status === 'Full' ? 'bad' : 'ok'}>{r.status}</Badge></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { api } from '../api.js';
import { validateStudent } from '../validation.js';
import { Badge, Banner, Field, useFlash, useLoad } from '../ui.jsx';

const EMPTY = { studentId: '', fullName: '', email: '', phone: '', course: '', year: '', status: 'Active' };

function StudentForm({ initial, isNew, onSaved, onCancel }) {
  const [f, setF] = useState(initial || EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (e) => setF({ ...f, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setFormError('');
    const local = validateStudent(f, { isNew });
    setErrors(local);
    if (Object.keys(local).length) return;
    setBusy(true);
    try {
      const body = { fullName: f.fullName, email: f.email, phone: f.phone, course: f.course, year: Number(f.year), status: f.status };
      if (isNew) await api.createStudent({ ...body, studentId: f.studentId });
      else await api.updateStudent(initial.studentId, body);
      onSaved(isNew ? 'Student created' : 'Student updated');
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={submit} noValidate aria-label={isNew ? 'Add student' : 'Edit student'}>
      <h3>{isNew ? 'Add student' : `Edit ${initial.studentId}`}</h3>
      <Banner kind="error">{formError}</Banner>
      <div className="fields">
        {isNew && <Field label="Student ID" name="studentId" value={f.studentId} onChange={set} error={errors.studentId} />}
        <Field label="Full name" name="fullName" value={f.fullName} onChange={set} error={errors.fullName} />
        <Field label="Email" name="email" type="email" value={f.email} onChange={set} error={errors.email} />
        <Field label="Phone" name="phone" value={f.phone} onChange={set} error={errors.phone} />
        <Field label="Course" name="course" value={f.course} onChange={set} error={errors.course} />
        <Field label="Year (1-6)" name="year" value={f.year} onChange={set} error={errors.year} inputMode="numeric" />
        <Field label="Status" name="status" value={f.status} onChange={set} error={errors.status}>
          <select><option>Active</option><option>Inactive</option></select>
        </Field>
      </div>
      <div className="row" style={{ marginTop: '.8rem' }}>
        <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <button type="button" className="btn sec" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function FeeEditor({ student, onSaved }) {
  const [amount, setAmount] = useState(student.feeAmount ?? 0);
  const [status, setStatus] = useState(student.feeStatus || 'Pending');
  const [err, setErr] = useState('');
  async function save(e) {
    e.preventDefault();
    setErr('');
    if (amount === '' || Number.isNaN(Number(amount)) || Number(amount) < 0) return setErr('Fee amount must be 0 or more');
    try { await api.updateFee(student.studentId, { feeAmount: Number(amount), feeStatus: status }); onSaved('Fee updated'); } catch (e2) { setErr(e2.message); }
  }
  return (
    <form onSubmit={save} className="row" aria-label="Fee">
      <Field label="Fee amount" name="feeAmount" value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" />
      <Field label="Payment status" name="feeStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
        <select><option>Pending</option><option>Paid</option></select>
      </Field>
      <button className="btn sm">Save fee</button>
      {err && <span className="err" role="alert">{err}</span>}
    </form>
  );
}

function StudentDetail({ id, onClose, onChanged }) {
  const { data: s, loading, error, reload } = useLoad(() => api.student(id), [id]);
  const hist = useLoad(() => api.studentAllocations(id), [id]);
  const [editing, setEditing] = useState(false);
  const [flash, setFlash] = useFlash();
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <Banner kind="error">{error}</Banner>;
  if (editing) return <StudentForm initial={{ ...s, year: String(s.year) }} onCancel={() => setEditing(false)} onSaved={(m) => { setEditing(false); setFlash('success', m); reload(); hist.reload(); onChanged(); }} />;
  return (
    <div className="card">
      <div className="row spread"><h3>{s.fullName} <Badge kind={s.status === 'Active' ? 'ok' : 'warn'}>{s.status}</Badge></h3><button className="btn sec sm" onClick={onClose}>Close</button></div>
      <Banner kind={flash.kind}>{flash.text}</Banner>
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '.25rem 1rem', margin: 0 }}>
        <dt>Student ID</dt><dd>{s.studentId}</dd>
        <dt>Email</dt><dd>{s.email}</dd>
        <dt>Phone</dt><dd>{s.phone}</dd>
        <dt>Course / Year</dt><dd>{s.course} / {s.year}</dd>
        <dt>Current room</dt><dd>{s.activeAllocation ? `${s.activeAllocation.roomId} (since ${s.activeAllocation.startDate})` : 'Not allocated'}</dd>
      </dl>
      <div className="row" style={{ margin: '.8rem 0' }}><button className="btn sm" onClick={() => setEditing(true)}>Edit details</button></div>
      <FeeEditor key={`${s.feeAmount}-${s.feeStatus}`} student={s} onSaved={(m) => { setFlash('success', m); reload(); }} />
      <h3 style={{ marginTop: '1rem' }}>Allocation history</h3>
      {hist.data && hist.data.length === 0 && <p className="empty">No allocations yet.</p>}
      {hist.data && hist.data.length > 0 && (
        <div className="table-wrap"><table>
          <thead><tr><th>ID</th><th>Room</th><th>From</th><th>To</th><th>Status</th></tr></thead>
          <tbody>{hist.data.map((a) => (
            <tr key={a.allocationId}><td>{a.allocationId}</td><td>{a.roomId}</td><td>{a.startDate}</td><td>{a.endDate || '—'}</td><td><Badge kind={a.status === 'Active' ? 'ok' : ''}>{a.status}</Badge></td></tr>
          ))}</tbody>
        </table></div>
      )}
    </div>
  );
}

export default function Students() {
  const [query, setQuery] = useState('');
  const [applied, setApplied] = useState('');
  const [mode, setMode] = useState(null); // null | 'new'
  const [openId, setOpenId] = useState(null);
  const [flash, setFlash, clear] = useFlash();
  const { data, loading, error, reload } = useLoad(() => api.students(applied), [applied]);

  return (
    <section>
      <div className="row spread"><h2>Students</h2><button className="btn" onClick={() => { setMode('new'); clear(); }}>Add student</button></div>
      <Banner kind={flash.kind}>{flash.text}</Banner>
      {mode === 'new' && <StudentForm isNew onCancel={() => setMode(null)} onSaved={(m) => { setMode(null); setFlash('success', m); reload(); }} />}
      {openId && <StudentDetail id={openId} onClose={() => setOpenId(null)} onChanged={reload} />}
      <form className="row card" role="search" onSubmit={(e) => { e.preventDefault(); setApplied(query.trim()); }}>
        <Field label="Search by student ID or name" name="search" value={query} onChange={(e) => setQuery(e.target.value)} maxLength={100} />
        <button className="btn" style={{ alignSelf: 'end' }}>Search</button>
        {applied && <button type="button" className="btn sec" style={{ alignSelf: 'end' }} onClick={() => { setQuery(''); setApplied(''); }}>Clear</button>}
      </form>
      <Banner kind="error">{error}</Banner>
      {loading && <p className="muted">Loading…</p>}
      {data && data.length === 0 && <p className="empty">{applied ? `No students match “${applied}”.` : 'No students yet. Add the first one.'}</p>}
      {data && data.length > 0 && (
        <div className="card table-wrap"><table>
          <thead><tr><th>ID</th><th>Name</th><th>Course</th><th>Year</th><th>Status</th><th>Fee</th><th></th></tr></thead>
          <tbody>{data.map((s) => (
            <tr key={s.studentId}>
              <td>{s.studentId}</td><td>{s.fullName}</td><td>{s.course}</td><td>{s.year}</td>
              <td><Badge kind={s.status === 'Active' ? 'ok' : 'warn'}>{s.status}</Badge></td>
              <td><Badge kind={s.feeStatus === 'Paid' ? 'ok' : 'warn'}>{s.feeStatus}</Badge></td>
              <td><button className="btn sm" onClick={() => setOpenId(s.studentId)}>View</button></td>
            </tr>
          ))}</tbody>
        </table></div>
      )}
    </section>
  );
}

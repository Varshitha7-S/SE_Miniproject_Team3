import React, { useEffect, useState } from 'react';
import { api, getToken, setToken } from './api.js';
import { Banner, Field } from './ui.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import Rooms from './pages/Rooms.jsx';
import Allocations from './pages/Allocations.jsx';

const PAGES = { Dashboard, Students, Rooms, Allocations };

function Login({ onLoggedIn }) {
  const [f, setF] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    const local = {};
    if (!f.username.trim()) local.username = 'Username is required';
    if (!f.password) local.password = 'Password is required';
    setErrors(local);
    if (Object.keys(local).length) return;
    try {
      const { token } = await api.login(f.username.trim(), f.password);
      setToken(token);
      onLoggedIn();
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <form className="card login" onSubmit={submit} noValidate aria-label="Admin login">
      <h2>Hostel Management System</h2>
      <p className="muted">Sign in as an administrator.</p>
      <Banner kind="error">{error}</Banner>
      <div style={{ display: 'grid', gap: '.75rem' }}>
        <Field label="Username" name="username" value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} error={errors.username} autoComplete="username" />
        <Field label="Password" name="password" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} error={errors.password} autoComplete="current-password" />
        <button className="btn">Sign in</button>
      </div>
    </form>
  );
}

export default function App() {
  const [page, setPage] = useState('Dashboard');
  const [authEnabled, setAuthEnabled] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!getToken());
  const [bootError, setBootError] = useState('');

  useEffect(() => {
    api.authStatus().then((s) => setAuthEnabled(s.authEnabled)).catch((e) => setBootError(e.message));
    const out = () => setLoggedIn(false);
    window.addEventListener('hms-logout', out);
    return () => window.removeEventListener('hms-logout', out);
  }, []);

  if (bootError) return <main><Banner kind="error">{bootError}</Banner></main>;
  if (authEnabled === null) return <main><p className="muted">Loading…</p></main>;
  if (authEnabled && !loggedIn) return <Login onLoggedIn={() => setLoggedIn(true)} />;

  const Page = PAGES[page];
  return (
    <>
      <header className="top">
        <h1>Hostel Management System</h1>
        <nav aria-label="Main">
          {Object.keys(PAGES).map((p) => (
            <button key={p} aria-current={p === page ? 'page' : undefined} onClick={() => setPage(p)}>{p}</button>
          ))}
          {authEnabled && <button onClick={() => { setToken(null); setLoggedIn(false); }}>Sign out</button>}
        </nav>
      </header>
      <main><Page key={page} /></main>
    </>
  );
}

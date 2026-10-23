import React from 'react';
import { api } from '../api.js';
import { Banner, useLoad } from '../ui.jsx';

const tiles = [
  ['totalStudents', 'Total students'],
  ['activeStudents', 'Active students'],
  ['totalRooms', 'Total rooms'],
  ['availableRooms', 'Rooms with space'],
  ['fullRooms', 'Full rooms'],
  ['totalCapacity', 'Total capacity'],
  ['totalOccupied', 'Occupied beds'],
  ['freeCapacity', 'Free beds'],
];

export default function Dashboard() {
  const { data, loading, error } = useLoad(api.dashboard);
  return (
    <section>
      <h2>Dashboard</h2>
      <Banner kind="error">{error}</Banner>
      {loading && <p className="muted">Loading…</p>}
      {data && (
        <div className="grid">
          {tiles.map(([k, label]) => (
            <div className="stat" key={k}><b>{data[k]}</b><span>{label}</span></div>
          ))}
        </div>
      )}
    </section>
  );
}

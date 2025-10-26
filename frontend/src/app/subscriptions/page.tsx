'use client';
import { useEffect, useState } from 'react';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://your-railway-url.up.railway.app/subscriptions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setSubscriptions);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Subscriptions</h1>
      {subscriptions.map((s: any) => (
        <div key={s.id} className="border p-2 mb-2">
          <p>Interval: {s.interval}, Status: {s.status}</p>
        </div>
      ))}
    </div>
  );
}
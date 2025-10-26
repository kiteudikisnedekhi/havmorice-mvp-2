'use client';
import { useEffect, useState } from 'react';

export default function Tracking() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://your-railway-url.up.railway.app/operations/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setDeliveries);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Delivery Tracking</h1>
      {deliveries.map((d: any) => (
        <div key={d.id} className="border p-2 mb-2">
          <p>Order {d.id}: {d.status}</p>
          {d.location_lat && <p>Location: {d.location_lat}, {d.location_lng}</p>}
        </div>
      ))}
    </div>
  );
}
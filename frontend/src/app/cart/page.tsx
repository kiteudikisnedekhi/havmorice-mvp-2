'use client';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://your-railway-url.up.railway.app/cart', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setCart);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Cart</h1>
      {cart.map((item: any) => (
        <div key={item.id} className="border p-2 mb-2">
          {item.name}
        </div>
      ))}
    </div>
  );
}
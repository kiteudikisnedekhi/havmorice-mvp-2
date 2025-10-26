'use client';
import { useState } from 'react';

export default function Checkout() {
  const [cartId, setCartId] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  const checkout = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://your-railway-url.up.railway.app/payments/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartId, paymentMethod }),
    });
    if (res.ok) alert('Payment successful');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Checkout</h1>
      <input
        value={cartId}
        onChange={(e) => setCartId(Number(e.target.value))}
        placeholder="Cart ID"
        className="border p-2"
      />
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border p-2 ml-2">
        <option value="wallet">Wallet</option>
        <option value="razorpay">Razorpay</option>
      </select>
      <button onClick={checkout} className="bg-red-500 text-white p-2 ml-2">Checkout</button>
    </div>
  );
}
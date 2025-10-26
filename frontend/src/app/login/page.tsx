'use client';
import { useState } from 'react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    const res = await fetch('https://your-railway-url.up.railway.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    if (res.ok) setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch('https://your-railway-url.up.railway.app/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    }
  };

  return (
    <div className="p-4">
      {step === 1 ? (
        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="border p-2"
          />
          <button onClick={sendOtp} className="bg-blue-500 text-white p-2 ml-2">Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            className="border p-2"
          />
          <button onClick={verifyOtp} className="bg-green-500 text-white p-2 ml-2">Verify</button>
        </div>
      )}
    </div>
  );
}
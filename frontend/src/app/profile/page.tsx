'use client';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://your-railway-url.up.railway.app/referrals/rewards', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setRewards);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Profile</h1>
      <h2>HGCoins Rewards</h2>
      {rewards.map((r: any) => (
        <div key={r.id} className="border p-2 mb-2">
          <p>Referrer: {r.referrer_id}, Coins: {r.reward_hg_coins}</p>
        </div>
      ))}
    </div>
  );
}
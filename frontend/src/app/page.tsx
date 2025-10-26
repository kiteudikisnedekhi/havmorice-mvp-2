'use client';
import { useEffect, useState } from 'react';

export default function Catalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://your-railway-url.up.railway.app/catalog/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Products</h1>
      {products.map((p: any) => (
        <div key={p.id} className="border p-2 mb-2">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
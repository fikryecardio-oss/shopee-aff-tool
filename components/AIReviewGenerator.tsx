'use client';

import { useState } from 'react';

export default function AIReviewGenerator() {
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    tone: 'jujur dan informatif',
    target: 'pengguna yang mencari kualitas terbaik',
    includeProsCons: true,
  });

  const generateReview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: {
            name: formData.productName,
            price: parseInt(formData.price) || 0,
          },
          tone: formData.tone,
          target: formData.target,
          includeProsCons: formData.includeProsCons,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDraft(data.review);
      } else {
        alert('Gagal generate: ' + data.error);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl border">
      <h2 className="text-xl font-bold">🤖 AI Review Generator</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Contoh: Serum Vitamin C"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="150000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tone Konten</label>
        <select
          value={formData.tone}
          onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="jujur dan informatif">Jujur & Informatif</option>
          <option value="storytelling">Storytelling</option>
          <option value="perbandingan">Perbandingan Produk</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Target Audiens</label>
        <input
          type="text"
          value={formData.target}
          onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="mahasiswa, ibu rumah tangga, dll"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.includeProsCons}
          onChange={(e) => setFormData({ ...formData, includeProsCons: e.target.checked })}
        />
        <span>Sertakan Kelebihan & Kekurangan</span>
      </label>

      <button
        onClick={generateReview}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded font-medium transition"
      >
        {loading ? '⏳ Generating...' : '✨ Generate Review'}
      </button>

      {draft && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">📝 Draft Review:</label>
          <textarea
            value={draft}
            readOnly
            rows={10}
            className="w-full p-3 border rounded font-mono text-sm bg-gray-50"
          />
          <button
            onClick={() => navigator.clipboard.writeText(draft)}
            className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm"
          >
            📋 Copy ke Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
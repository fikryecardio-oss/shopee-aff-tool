'use client';

import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState({
    labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
    clicks: [12, 19, 15, 25, 22, 30],
    conversions: [1, 2, 1, 3, 2, 4],
    commission: [5000, 10000, 5000, 15000, 10000, 20000],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">📈 Dashboard Analytics</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">
            {metrics.clicks.reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-blue-600">Total Klik</div>
        </div>
        <div className="bg-green-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-green-700">
            {metrics.conversions.reduce((a, b) => a + b, 0)}
          </div>
          <div className="text-sm text-green-600">Konversi</div>
        </div>
        <div className="bg-orange-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-orange-700">
            Rp {metrics.commission.reduce((a, b) => a + b, 0).toLocaleString('id-ID')}
          </div>
          <div className="text-sm text-orange-600">Total Komisi</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl">
          <div className="text-2xl font-bold text-purple-700">
            {(metrics.conversions.reduce((a, b) => a + b, 0) / metrics.clicks.reduce((a, b) => a + b, 0) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-purple-600">Conversion Rate</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl border">
          <h3 className="font-semibold mb-4">📊 Klik & Konversi</h3>
          <div className="h-64">
            <Line
              data={{
                labels: metrics.labels,
                datasets: [
                  {
                    label: 'Klik',
                    data: metrics.clicks,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                  },
                  {
                    label: 'Konversi',
                    data: metrics.conversions,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <h3 className="font-semibold mb-4">💰 Komisi per Jam</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: metrics.labels,
                datasets: [
                  {
                    label: 'Komisi (Rb)',
                    data: metrics.commission.map(c => c / 1000),
                    backgroundColor: '#f97316',
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
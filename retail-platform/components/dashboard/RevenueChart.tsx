'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { SalesDataPoint } from '@/lib/types';

interface Props {
  data: SalesDataPoint[];
  accentColor?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-xs">
      <p className="font-semibold text-gray-800 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold text-gray-900">
            {p.name === 'Margin' ? `${p.value}%` : `$${p.value?.toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export function RevenueChart({ data, accentColor = '#16a34a' }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis
          yAxisId="left" orientation="left"
          tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
        />
        <YAxis
          yAxisId="right" orientation="right"
          tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} domain={[0, 60]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          formatter={(v) => <span className="text-gray-600">{v}</span>}
        />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill={`${accentColor}20`} stroke={accentColor} strokeWidth={1} radius={[4, 4, 0, 0]} />
        <Bar yAxisId="left" dataKey="profit" name="Profit" fill="#3b82f620" stroke="#3b82f6" strokeWidth={1} radius={[4, 4, 0, 0]} />
        <Line yAxisId="right" type="monotone" dataKey="profit_margin" name="Margin" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

'use client';

import { TrendingUp, Shirt, Package, RefreshCw, RotateCcw } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StockHealthTable } from '@/components/dashboard/StockHealthTable';
import { useInventory } from '@/hooks/useInventory';
import { getSalesData, returnRateData } from '@/lib/data';
import { calcMetrics } from '@/lib/analytics';

const salesData = getSalesData('clothes');
const PIE_COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#64748b'];

const ReturnTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-800 mb-1">Size {d.size}</p>
      <p className="text-gray-500">Returns: <span className="font-semibold text-red-600">{d.rate}%</span></p>
      <p className="text-gray-500">{d.returns} of {d.total_sold} sold</p>
    </div>
  );
};

export default function ClothesDashboard() {
  const { inventory } = useInventory('clothes');
  const metrics = calcMetrics(salesData, inventory, 24.6);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Sector Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Fashion</h1>
          <p className="text-sm text-gray-500 mt-1">Apparel, footwear & accessories analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Revenue (Apr)', value: `$${(metrics.revenue_30d / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-slate-600', bg: 'bg-slate-50', delta: '+12.8%' },
          { label: 'Items Sold', value: metrics.orders_30d.toLocaleString(), icon: Shirt, color: 'text-blue-600', bg: 'bg-blue-50', delta: '+9.2%' },
          { label: 'Avg Order Value', value: `$${metrics.avg_order_value.toFixed(0)}`, icon: Package, color: 'text-green-600', bg: 'bg-green-50', delta: '+6.4%' },
          { label: 'Sell-Through', value: `${metrics.sell_through_rate.toFixed(1)}%`, icon: RefreshCw, color: 'text-amber-600', bg: 'bg-amber-50', delta: '+3.1%' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">{k.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{k.delta}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${k.bg}`}>
                    <Icon size={18} className={k.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Analysis — 2024</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">Sales (Bar) vs Profit Margin % (Line)</p>
          </CardHeader>
          <CardContent>
            <RevenueChart data={salesData} accentColor="#334155" />
          </CardContent>
        </Card>

        {/* Return Rates Pie Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <RotateCcw size={15} className="text-red-500" />
              <CardTitle>Return Rates by Size</CardTitle>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Higher sizes show significantly elevated return rates</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={returnRateData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  dataKey="rate"
                  nameKey="size"
                  label={({ size, rate }) => `${size}: ${rate}%`}
                  labelLine={false}
                >
                  {returnRateData.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ReturnTooltip />} />
                <Legend
                  formatter={(v) => <span className="text-xs text-gray-600">Size {v}</span>}
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Insight */}
            <div className="mt-4 p-3 bg-red-50 rounded-xl">
              <p className="text-xs font-semibold text-red-800 mb-1">Size XL–XXL Alert</p>
              <p className="text-xs text-red-600">Return rates of 26.9% and 40.8% suggest sizing inconsistency. Recommend fit review with supplier.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader><CardTitle>Size Return Rate Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {returnRateData.map((d, i) => (
              <div key={d.size} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700 w-10">Size {d.size}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${d.rate}%`, background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                </div>
                <div className="w-36 text-right">
                  <span className={`text-sm font-bold ${d.rate > 25 ? 'text-red-600' : d.rate > 15 ? 'text-amber-600' : 'text-green-600'}`}>{d.rate}%</span>
                  <span className="text-xs text-gray-400 ml-2">{d.returns}/{d.total_sold}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Stock Health — Sorted by Depletion Rate</CardTitle></CardHeader>
        <CardContent className="px-0">
          <StockHealthTable data={inventory} />
        </CardContent>
      </Card>
    </div>
  );
}

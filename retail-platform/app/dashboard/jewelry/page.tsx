'use client';

import { TrendingUp, Gem, Package, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StockHealthTable } from '@/components/dashboard/StockHealthTable';
import { LogisticsTracker } from '@/components/dashboard/LogisticsTracker';
import { useLogisticsSync } from '@/hooks/useLogisticsSync';
import { useInventory } from '@/hooks/useInventory';
import { getSalesData, logisticsOrders } from '@/lib/data';
import { calcMetrics } from '@/lib/analytics';

const salesData = getSalesData('jewelry');

export default function JewelryDashboard() {
  const { inventory } = useInventory('jewelry');
  const { status: syncStatus, refetch } = useLogisticsSync('jewelry');
  const metrics = calcMetrics(salesData, inventory, 42.8);
  const jwOrders = logisticsOrders.filter(o => o.tenant_id === 'jewelry');

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Sector Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Jewelry</h1>
          <p className="text-sm text-gray-500 mt-1">Fine jewelry, gemstones & luxury timepieces</p>
        </div>
        <button onClick={refetch} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw size={14} className={syncStatus === 'loading' ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Revenue (Apr)', value: `$${(metrics.revenue_30d / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-amber-700', bg: 'bg-amber-50', delta: '+28.4%' },
          { label: 'Pieces Sold', value: metrics.orders_30d.toLocaleString(), icon: Gem, color: 'text-yellow-700', bg: 'bg-yellow-50', delta: '+11.2%' },
          { label: 'Avg Order Value', value: `$${metrics.avg_order_value.toFixed(0)}`, icon: Package, color: 'text-green-600', bg: 'bg-green-50', delta: '+15.8%' },
          { label: 'Logistics Efficiency', value: `${metrics.logistics_efficiency_hours.toFixed(1)}h`, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', delta: '-8.2h' },
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

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Profit Analysis — 2024</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">Seasonal peaks at Christmas & Valentine&apos;s</p>
          </CardHeader>
          <CardContent>
            <RevenueChart data={salesData} accentColor="#b45309" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Certification Status</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { cert: 'GIA-2381940284', item: 'Solitaire Diamond Ring', status: 'verified' },
                { cert: 'IGI-8842019371', item: 'Tennis Bracelet', status: 'verified' },
                { cert: 'AGS-7749204812', item: 'Pearl Necklace', status: 'pending' },
                { cert: 'GIA-4417382901', item: 'Sapphire Earrings', status: 'verified' },
                { cert: 'COSC-8812937461', item: 'Chronograph Watch', status: 'verified' },
              ].map(c => (
                <div key={c.cert} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${c.status === 'verified' ? 'bg-green-500' : 'bg-amber-400'}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-gray-500">{c.cert}</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{c.item}</p>
                  </div>
                  <span className={`text-xs font-semibold ml-auto shrink-0 ${c.status === 'verified' ? 'text-green-600' : 'text-amber-600'}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Health — Sorted by Depletion Rate</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <StockHealthTable data={inventory} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logistics Tracker</CardTitle>
          <p className="text-xs text-gray-400 mt-0.5">Secure courier chain from origin to display</p>
        </CardHeader>
        <CardContent>
          <LogisticsTracker orders={jwOrders} />
        </CardContent>
      </Card>
    </div>
  );
}

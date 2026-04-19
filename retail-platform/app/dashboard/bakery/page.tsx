'use client';

import { useState } from 'react';
import { TrendingUp, Croissant, Package, Thermometer, RefreshCw, Flame, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StockHealthTable } from '@/components/dashboard/StockHealthTable';
import { useInventory } from '@/hooks/useInventory';
import { getSalesData, ovenStatuses, rawMaterials, bakeryProducts } from '@/lib/data';
import { calcMetrics } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const salesData = getSalesData('bakery');

const ovenStatusStyle: Record<string, { bg: string; text: string; dot: string }> = {
  baking: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  preheating: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  idle: { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-300' },
  maintenance: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
};

export default function BakeryDashboard() {
  const { inventory, materials, recordProduction } = useInventory('bakery');
  const metrics = calcMetrics(salesData, inventory, 8.4);
  const [prodQty, setProdQty] = useState<Record<string, number>>({});
  const [log, setLog] = useState<string[]>([]);

  const handleProduce = (productId: string) => {
    const product = bakeryProducts.find(p => p.id === productId);
    if (!product?.metadata.raw_materials) return;
    const qty = prodQty[productId] ?? 1;
    recordProduction(productId, qty, product.metadata.raw_materials);
    setLog(prev => [`Produced ${qty}x ${product.name} — materials consumed`, ...prev.slice(0, 4)]);
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Sector Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Bakery</h1>
          <p className="text-sm text-gray-500 mt-1">Artisan breads, viennoiserie & patisserie</p>
        </div>
      </div>

      {/* Live Oven Status Bar */}
      <Card className="mb-6 border-orange-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-orange-500" />
            <CardTitle>Live Oven Status</CardTitle>
            <span className="ml-auto text-xs text-gray-400">{new Date().toLocaleTimeString()}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {ovenStatuses.map(oven => {
              const style = ovenStatusStyle[oven.status];
              const readyMin = oven.ready_at
                ? Math.max(0, Math.round((new Date(oven.ready_at).getTime() - Date.now()) / 60000))
                : null;
              return (
                <div key={oven.id} className={cn('rounded-xl p-4', style.bg)}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn('w-2 h-2 rounded-full oven-active', style.dot)} />
                    <span className="text-xs font-semibold text-gray-700">{oven.label}</span>
                  </div>
                  <div className="mb-2">
                    <span className={cn('text-xs font-bold uppercase tracking-wide', style.text)}>{oven.status}</span>
                  </div>
                  {oven.current_batch && (
                    <p className="text-xs text-gray-600 font-medium mb-2 truncate">{oven.current_batch}</p>
                  )}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Thermometer size={11} />
                      {oven.temp_celsius}°C
                    </div>
                    {readyMin !== null && (
                      <span className={cn('font-semibold', style.text)}>
                        {readyMin}m left
                      </span>
                    )}
                  </div>
                  {oven.status === 'baking' && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{oven.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full oven-active" style={{ width: `${oven.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Revenue (Apr)', value: `$${(metrics.revenue_30d / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', delta: '+9.4%' },
          { label: 'Items Sold', value: metrics.orders_30d.toLocaleString(), icon: Croissant, color: 'text-amber-600', bg: 'bg-amber-50', delta: '+6.1%' },
          { label: 'Avg Order Value', value: `$${metrics.avg_order_value.toFixed(2)}`, icon: Package, color: 'text-green-600', bg: 'bg-green-50', delta: '+3.2%' },
          { label: 'Sell-Through', value: `${metrics.sell_through_rate.toFixed(1)}%`, icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-50', delta: '+4.8%' },
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
        {/* Revenue Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Profit Analysis — 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={salesData} accentColor="#ea580c" />
          </CardContent>
        </Card>

        {/* Production Calculator */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Croissant size={15} className="text-orange-500" />
              <CardTitle>Production Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {bakeryProducts.slice(0, 4).map(p => (
                <div key={p.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-xs font-medium text-gray-700 flex-1 truncate">{p.name}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setProdQty(q => ({ ...q, [p.id]: Math.max(1, (q[p.id] ?? 1) - 1) }))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100">
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-semibold w-5 text-center">{prodQty[p.id] ?? 1}</span>
                    <button onClick={() => setProdQty(q => ({ ...q, [p.id]: (q[p.id] ?? 1) + 1 }))}
                      className="w-6 h-6 rounded flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-100">
                      <Plus size={11} />
                    </button>
                  </div>
                  <button onClick={() => handleProduce(p.id)}
                    className="text-xs font-semibold px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                    Produce
                  </button>
                </div>
              ))}
            </div>
            {log.length > 0 && (
              <div className="border-t border-gray-100 pt-3 space-y-1.5">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Recent</p>
                {log.map((entry, i) => (
                  <p key={i} className="text-xs text-gray-500 leading-relaxed">{entry}</p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Raw Materials */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Raw Materials Stock</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {materials.map(mat => {
              const pct = Math.min(100, (mat.stock / (mat.reorder_point * 4)) * 100);
              const critical = mat.stock < mat.reorder_point;
              return (
                <div key={mat.id} className={cn('p-4 rounded-xl', critical ? 'bg-red-50' : 'bg-gray-50')}>
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{mat.name}</p>
                    {critical && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full shrink-0 ml-2">LOW</span>}
                  </div>
                  <p className="text-lg font-bold text-gray-800 mb-2">{mat.stock.toFixed(1)} <span className="text-xs text-gray-400 font-normal">{mat.unit}</span></p>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', critical ? 'bg-red-500' : 'bg-orange-400')} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5">Reorder at {mat.reorder_point} {mat.unit}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Product Stock Health</CardTitle></CardHeader>
        <CardContent className="px-0">
          <StockHealthTable data={inventory} />
        </CardContent>
      </Card>
    </div>
  );
}

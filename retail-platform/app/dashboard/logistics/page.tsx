'use client';

import { useState } from 'react';
import { Truck, RefreshCw, Package, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogisticsTracker } from '@/components/dashboard/LogisticsTracker';
import { Badge } from '@/components/ui/badge';
import { logisticsOrders } from '@/lib/data';
import { calcLogisticsEfficiency } from '@/lib/analytics';
import { useLogisticsSync } from '@/hooks/useLogisticsSync';
import type { TenantId } from '@/lib/types';

const tenantColors: Record<TenantId, string> = {
  supermarket: 'text-green-600 bg-green-50',
  jewelry: 'text-amber-700 bg-amber-50',
  bakery: 'text-orange-600 bg-orange-50',
  clothes: 'text-slate-600 bg-slate-100',
};

const tenantBadge: Record<TenantId, React.ReactNode> = {
  supermarket: <Badge variant="success">Supermarket</Badge>,
  jewelry: <Badge variant="luxury">Jewelry</Badge>,
  bakery: <Badge variant="warning">Bakery</Badge>,
  clothes: <Badge>Fashion</Badge>,
};

const statusBadge = {
  pending: <Badge>Pending</Badge>,
  dispatched: <Badge variant="info">Dispatched</Badge>,
  in_transit: <Badge variant="warning">In Transit</Badge>,
  arrived: <Badge variant="success">Arrived</Badge>,
  shelved: <Badge variant="success">Shelved</Badge>,
};

export default function LogisticsDashboard() {
  const [filter, setFilter] = useState<TenantId | 'all'>('all');
  const { status: syncStatus, refetch } = useLogisticsSync('supermarket', 60000);

  const filtered = filter === 'all' ? logisticsOrders : logisticsOrders.filter(o => o.tenant_id === filter);
  const activeCount = logisticsOrders.filter(o => o.status === 'in_transit' || o.status === 'dispatched').length;
  const totalValue = logisticsOrders.reduce((s, o) => s + o.total_value, 0);

  const avgEfficiency = logisticsOrders
    .filter(o => o.dispatched_at && o.actual_delivery)
    .reduce((sum, o, _, arr) => sum + calcLogisticsEfficiency(o.dispatched_at!, o.actual_delivery!) / arr.length, 0);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Logistics</p>
          <h1 className="text-3xl font-bold text-gray-900">Logistics Tracker</h1>
          <p className="text-sm text-gray-500 mt-1">Cross-sector delivery status & efficiency metrics</p>
        </div>
        <button onClick={refetch} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <RefreshCw size={14} className={syncStatus === 'loading' ? 'animate-spin' : ''} />
          Sync with API
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Active Deliveries', value: activeCount, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Shipments', value: logisticsOrders.length, icon: Package, color: 'text-gray-600', bg: 'bg-gray-100' },
          { label: 'Total Value in Transit', value: `$${totalValue.toLocaleString()}`, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Avg Delivery Time', value: `${avgEfficiency.toFixed(1)}h`, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">{k.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{k.value}</p>
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

      {/* All Orders Table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Shipments</CardTitle>
            <div className="flex gap-2">
              {(['all', 'supermarket', 'jewelry', 'bakery', 'clothes'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-colors ${
                    filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Order', 'Supplier', 'Sector', 'Items', 'Value', 'ETA', 'Driver', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{order.id}</td>
                  <td className="px-4 py-3.5 font-medium text-gray-900">{order.supplier}</td>
                  <td className="px-4 py-3.5">{tenantBadge[order.tenant_id]}</td>
                  <td className="px-4 py-3.5 text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                  <td className="px-4 py-3.5 font-semibold text-gray-900">${order.total_value.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-gray-500 text-xs">
                    {new Date(order.estimated_delivery).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3.5 text-gray-500">{order.driver ?? '—'}</td>
                  <td className="px-4 py-3.5">{statusBadge[order.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Vertical Stepper Trackers */}
      <div className="grid grid-cols-2 gap-6">
        {['supermarket', 'bakery'].map(tenantId => {
          const orders = logisticsOrders.filter(o => o.tenant_id === tenantId && o.status !== 'shelved');
          return (
            <Card key={tenantId}>
              <CardHeader>
                <CardTitle className="capitalize">{tenantId} — Delivery Chain</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0
                  ? <LogisticsTracker orders={orders} />
                  : <p className="text-sm text-gray-400">No active deliveries</p>
                }
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Webhook Info */}
      <div className="mt-6 p-5 bg-gray-900 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle size={14} className="text-amber-400" />
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">API Bridge</p>
        </div>
        <p className="text-sm text-gray-300 mb-3">
          When a truck is marked as <strong className="text-white">arrived</strong> in the logistics system,
          it sends a <code className="text-amber-300 bg-gray-800 px-1.5 py-0.5 rounded text-xs">POST</code> webhook
          to <code className="text-amber-300 bg-gray-800 px-1.5 py-0.5 rounded text-xs">/api/logistics/webhook</code>.
          The retail inventory updates automatically via the shared Supabase <code className="text-amber-300 bg-gray-800 px-1.5 py-0.5 rounded text-xs">inventory</code> table.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400">
          {`POST /api/logistics/webhook\n{ "order_id": "lo-001", "tenant_id": "supermarket", "status": "arrived",\n  "actual_delivery": "2024-04-19T11:45:00Z" }`}
        </div>
      </div>
    </div>
  );
}

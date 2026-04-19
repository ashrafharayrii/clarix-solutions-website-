'use client';

import { useState } from 'react';
import { TrendingUp, ShoppingCart, Package, Truck, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StockHealthTable } from '@/components/dashboard/StockHealthTable';
import { LogisticsTracker } from '@/components/dashboard/LogisticsTracker';
import { useLogisticsSync } from '@/hooks/useLogisticsSync';
import { useInventory } from '@/hooks/useInventory';
import { getSalesData, logisticsOrders } from '@/lib/data';
import { calcMetrics } from '@/lib/analytics';

const salesData = getSalesData('supermarket');

export default function SupermarketDashboard() {
  const { inventory } = useInventory('supermarket');
  const { incomingStock, status: syncStatus, lastSync, refetch } = useLogisticsSync('supermarket');

  const metrics = calcMetrics(salesData, inventory, 16.2);
  const criticalItems = inventory.filter(i => i.status === 'critical' || i.status === 'low');
  const smOrders = logisticsOrders.filter(o => o.tenant_id === 'supermarket');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Sector Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Supermarket</h1>
          <p className="text-sm text-gray-500 mt-1">Fresh produce, dairy, meat & grocery analytics</p>
        </div>
        <div className="flex items-center gap-3">
          {syncStatus === 'synced' && lastSync && (
            <span className="text-xs text-gray-400">Synced {lastSync.toLocaleTimeString()}</span>
          )}
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={14} className={syncStatus === 'loading' ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Incoming Stock Alert */}
      {incomingStock.length > 0 && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5 mb-6">
          <Truck size={16} className="text-blue-600 shrink-0" />
          <span className="text-sm font-medium text-blue-800">
            {incomingStock.length} delivery{incomingStock.length !== 1 ? 's' : ''} incoming from logistics.
          </span>
          <span className="text-xs text-blue-600 ml-auto">Auto-sync enabled</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Revenue (Apr)', value: `$${(metrics.revenue_30d / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', delta: '+7.2%' },
          { label: 'Orders (Apr)', value: metrics.orders_30d.toLocaleString(), icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50', delta: '+4.8%' },
          { label: 'Sell-Through', value: `${metrics.sell_through_rate.toFixed(1)}%`, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', delta: '+2.1%' },
          { label: 'Inv. Turnover', value: `${metrics.inventory_turnover.toFixed(1)}x`, icon: RefreshCw, color: 'text-purple-600', bg: 'bg-purple-50', delta: '+0.4x' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">{k.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{k.delta} vs last month</p>
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

      {/* Revenue Chart + Alerts */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Profit Analysis — 2024</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">Sales (Bar) vs Profit Margin % (Line)</p>
          </CardHeader>
          <CardContent>
            <RevenueChart data={salesData} accentColor="#16a34a" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Stock Alerts</CardTitle>
              {criticalItems.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                  {criticalItems.length}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {criticalItems.length === 0 ? (
              <p className="text-sm text-gray-400">All items healthy</p>
            ) : (
              <div className="space-y-3">
                {criticalItems.map(item => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{item.product_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.stock} units · reorder at {item.reorder_point}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stock Health Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Health — Sorted by Depletion Rate</CardTitle>
          <p className="text-xs text-gray-400 mt-0.5">Click column headers to sort</p>
        </CardHeader>
        <CardContent className="px-0">
          <StockHealthTable data={inventory} />
        </CardContent>
      </Card>

      {/* Logistics Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Logistics Tracker</CardTitle>
          <p className="text-xs text-gray-400 mt-0.5">Warehouse → Transit → Shelf</p>
        </CardHeader>
        <CardContent>
          <LogisticsTracker orders={smOrders} />
        </CardContent>
      </Card>
    </div>
  );
}

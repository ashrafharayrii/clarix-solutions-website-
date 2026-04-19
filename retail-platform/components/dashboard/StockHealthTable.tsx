'use client';

import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { InventoryItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SortKey = keyof Pick<InventoryItem, 'product_name' | 'stock' | 'depletion_rate' | 'units_sold_30d' | 'status'>;

const statusBadge: Record<InventoryItem['status'], React.ReactNode> = {
  healthy: <Badge variant="success">Healthy</Badge>,
  low: <Badge variant="warning">Low Stock</Badge>,
  critical: <Badge variant="danger">Critical</Badge>,
  overstock: <Badge variant="info">Overstock</Badge>,
};

interface Props { data: InventoryItem[]; }

export function StockHealthTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('depletion_rate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...data].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown size={13} className="text-gray-400" />;
    return sortDir === 'asc' ? <ArrowUp size={13} className="text-gray-800" /> : <ArrowDown size={13} className="text-gray-800" />;
  };

  const daysLeft = (item: InventoryItem) =>
    item.depletion_rate > 0 ? Math.floor(item.stock / item.depletion_rate) : 999;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {([
              ['product_name', 'Product'],
              ['category', 'Category'],
              ['stock', 'Stock'],
              ['depletion_rate', 'Depletion Rate'],
              ['units_sold_30d', 'Sold 30d'],
              ['status', 'Status'],
            ] as [SortKey, string][]).map(([key, label]) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-gray-800"
              >
                <div className="flex items-center gap-1.5">
                  {label}
                  <SortIcon k={key} />
                </div>
              </th>
            ))}
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Days Left
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, i) => {
            const days = daysLeft(item);
            const depletionPct = Math.min(100, (item.stock / (item.reorder_point * 3)) * 100);
            return (
              <tr key={item.id} className={cn('border-b border-gray-50 hover:bg-gray-50/60 transition-colors', i % 2 === 0 ? '' : 'bg-gray-50/30')}>
                <td className="px-4 py-3.5 font-medium text-gray-900">{item.product_name}</td>
                <td className="px-4 py-3.5 text-gray-500">{item.category}</td>
                <td className="px-4 py-3.5 font-mono text-gray-800 font-semibold">{item.stock.toLocaleString()}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', depletionPct < 25 ? 'bg-red-500' : depletionPct < 60 ? 'bg-amber-400' : 'bg-green-500')}
                        style={{ width: `${depletionPct}%` }}
                      />
                    </div>
                    <span className="text-gray-600 text-xs">{item.depletion_rate.toFixed(1)}/day</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-gray-600">{item.units_sold_30d.toLocaleString()}</td>
                <td className="px-4 py-3.5">{statusBadge[item.status]}</td>
                <td className="px-4 py-3.5">
                  <span className={cn('font-semibold', days <= 7 ? 'text-red-600' : days <= 14 ? 'text-amber-600' : 'text-green-600')}>
                    {days >= 999 ? '—' : `${days}d`}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import { CheckCircle2, Circle, Loader2, Package, Truck, Warehouse, ShoppingBag } from 'lucide-react';
import type { LogisticsOrder, LogisticsStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const statusToStep: Record<LogisticsOrder['status'], number> = {
  pending: 0,
  dispatched: 1,
  in_transit: 2,
  arrived: 3,
  shelved: 4,
};

const steps = [
  { label: 'Purchase Order', desc: 'Order raised with supplier', icon: Package },
  { label: 'Dispatched', desc: 'Goods loaded and departed', icon: Warehouse },
  { label: 'In Transit', desc: 'Vehicle en route', icon: Truck },
  { label: 'Arrived', desc: 'Delivered to receiving dock', icon: CheckCircle2 },
  { label: 'Shelved', desc: 'Stocked and live in inventory', icon: ShoppingBag },
];

function StepNode({ step, idx, currentStep, timestamp }: {
  step: typeof steps[0]; idx: number; currentStep: number; timestamp?: string;
}) {
  const Icon = step.icon;
  const done = idx < currentStep;
  const active = idx === currentStep;
  const future = idx > currentStep;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all',
          done ? 'bg-green-600 border-green-600' : active ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'
        )}>
          {active
            ? <Loader2 size={16} className="text-white animate-spin" />
            : done
              ? <CheckCircle2 size={16} className="text-white" />
              : <Icon size={16} className={future ? 'text-gray-300' : 'text-gray-400'} />
          }
        </div>
        {idx < steps.length - 1 && (
          <div className={cn('w-0.5 flex-1 mt-1', done ? 'bg-green-500' : active ? 'bg-blue-200' : 'bg-gray-100')} style={{ minHeight: 32 }} />
        )}
      </div>
      <div className="pb-6">
        <p className={cn('text-sm font-semibold', done || active ? 'text-gray-900' : 'text-gray-400')}>
          {step.label}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
        {timestamp && (done || active) && (
          <p className="text-xs text-blue-600 font-medium mt-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
}

export function LogisticsTracker({ orders }: { orders: LogisticsOrder[] }) {
  if (!orders.length) {
    return <p className="text-sm text-gray-400 py-4 text-center">No active logistics orders</p>;
  }

  return (
    <div className="space-y-8">
      {orders.map(order => {
        const currentStep = statusToStep[order.status];
        const timestamps = [
          undefined,
          order.dispatched_at ? format(new Date(order.dispatched_at), 'dd MMM, HH:mm') : undefined,
          undefined,
          order.actual_delivery ? format(new Date(order.actual_delivery), 'dd MMM, HH:mm') : format(new Date(order.estimated_delivery), 'ETA: dd MMM, HH:mm'),
          order.actual_delivery ? undefined : undefined,
        ];

        return (
          <div key={order.id} className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{order.id}</p>
                <p className="font-semibold text-gray-900 mt-0.5">{order.supplier}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''} · ${order.total_value.toLocaleString()}
                </p>
              </div>
              <span className={cn(
                'text-xs font-semibold px-2.5 py-1 rounded-full',
                order.status === 'shelved' ? 'bg-green-100 text-green-700' :
                order.status === 'arrived' ? 'bg-blue-100 text-blue-700' :
                order.status === 'in_transit' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              )}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div>
              {steps.map((step, idx) => (
                <StepNode key={step.label} step={step} idx={idx} currentStep={currentStep} timestamp={timestamps[idx]} />
              ))}
            </div>

            {order.driver && (
              <div className="flex items-center gap-2 mt-2 pt-4 border-t border-gray-200">
                <Truck size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">{order.driver} · {order.truck_id}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

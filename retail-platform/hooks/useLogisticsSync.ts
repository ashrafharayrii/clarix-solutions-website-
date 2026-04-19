'use client';

import { useState, useEffect, useCallback } from 'react';
import type { LogisticsOrder, TenantId } from '@/lib/types';
import { logisticsOrders } from '@/lib/data';

interface SyncState {
  orders: LogisticsOrder[];
  incomingStock: LogisticsOrder[];
  status: 'idle' | 'loading' | 'synced' | 'error';
  lastSync: Date | null;
}

export function useLogisticsSync(tenantId: TenantId, pollIntervalMs = 30000) {
  const [state, setState] = useState<SyncState>({
    orders: [],
    incomingStock: [],
    status: 'idle',
    lastSync: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, status: 'loading' }));

    try {
      // In production: replace with actual API call or Supabase realtime subscription
      // const { data } = await supabase.from('logistics_orders').select('*').eq('tenant_id', tenantId);
      await new Promise(r => setTimeout(r, 800)); // simulate network latency

      const tenantOrders = logisticsOrders.filter(o => o.tenant_id === tenantId);
      const incoming = tenantOrders.filter(o =>
        o.status === 'dispatched' || o.status === 'in_transit' || o.status === 'arrived'
      );

      setState({
        orders: tenantOrders,
        incomingStock: incoming,
        status: 'synced',
        lastSync: new Date(),
      });
    } catch {
      setState(prev => ({ ...prev, status: 'error' }));
    }
  }, [tenantId]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchData, pollIntervalMs]);

  return { ...state, refetch: fetchData };
}

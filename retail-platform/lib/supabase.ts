import { createClient } from '@supabase/supabase-js';
import type { TenantId, Product, InventoryItem, LogisticsOrder } from './types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Client is safe to call even without env vars in mock mode
export const supabase = url && key ? createClient(url, key) : null;

// ─── Typed query helpers ─────────────────────────────────────────────────────
// These are no-ops when Supabase is not configured (falls back to mock data)

export async function fetchProducts(tenantId: TenantId): Promise<Product[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('name');
  if (error) { console.error(error); return null; }
  return data;
}

export async function fetchInventory(tenantId: TenantId): Promise<InventoryItem[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('tenant_id', tenantId);
  if (error) { console.error(error); return null; }
  return data;
}

export async function fetchLogisticsOrders(tenantId: TenantId): Promise<LogisticsOrder[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('logistics_orders')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('estimated_delivery', { ascending: true });
  if (error) { console.error(error); return null; }
  return data;
}

// Webhook receiver helper — call from a Next.js Route Handler
export async function handleLogisticsWebhook(payload: {
  order_id: string;
  tenant_id: TenantId;
  status: LogisticsOrder['status'];
  actual_delivery?: string;
}) {
  if (!supabase) return { error: 'Supabase not configured' };
  const { error } = await supabase
    .from('logistics_orders')
    .update({ status: payload.status, actual_delivery: payload.actual_delivery })
    .eq('id', payload.order_id);
  return { error };
}

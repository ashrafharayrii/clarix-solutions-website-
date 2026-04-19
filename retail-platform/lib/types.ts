export type TenantId = 'supermarket' | 'jewelry' | 'bakery' | 'clothes';

export interface Tenant {
  id: TenantId;
  name: string;
  slug: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
}

// ─── Multi-Tenant Product Schema ─────────────────────────────────────────────

export interface Product {
  id: string;
  tenant_id: TenantId;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  category: string;
  sku: string;
  stock: number;
  reorder_point: number;
  units_sold_30d: number;
  cost_price: number;
  metadata: ProductMetadata;
  created_at: string;
  updated_at: string;
}

export interface ProductMetadata {
  // Supermarket-specific
  expiry?: string;          // ISO date string
  weight?: string;
  origin?: string;
  is_organic?: boolean;

  // Jewelry-specific
  material?: string;
  carat?: string;
  certification_number?: string;
  certification_url?: string; // simulated PDF path

  // Bakery-specific
  ingredients?: string[];
  allergens?: string[];
  bake_duration_min?: number;
  raw_materials?: Array<{ material_id: string; quantity_per_unit: number }>;

  // Clothes-specific
  sizes?: string[];
  colors?: Array<{ name: string; hex: string }>;
  material_composition?: string;
  return_rate_by_size?: Record<string, number>;
  gender?: 'Men' | 'Women' | 'Unisex';
}

// ─── Inventory ───────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: string;
  tenant_id: TenantId;
  product_id: string;
  product_name: string;
  category: string;
  stock: number;
  reorder_point: number;
  units_sold_7d: number;
  units_sold_30d: number;
  cost_price: number;
  depletion_rate: number; // units/day avg
  last_restocked: string;
  status: 'healthy' | 'low' | 'critical' | 'overstock';
}

export interface RawMaterial {
  id: string;
  name: string;
  unit: string;
  stock: number;
  reorder_point: number;
  cost_per_unit: number;
}

// ─── Bakery-specific ─────────────────────────────────────────────────────────

export interface OvenStatus {
  id: string;
  label: string;
  status: 'baking' | 'idle' | 'maintenance' | 'preheating';
  current_batch?: string;
  temp_celsius: number;
  ready_at?: string;
  progress: number; // 0-100
}

export interface ProductionEntry {
  product_id: string;
  product_name: string;
  quantity: number;
  materials_consumed: Array<{ name: string; consumed: number; unit: string }>;
  timestamp: string;
}

// ─── Logistics ───────────────────────────────────────────────────────────────

export type LogisticsStatus = 'pending' | 'dispatched' | 'in_transit' | 'arrived' | 'shelved';

export interface LogisticsOrder {
  id: string;
  tenant_id: TenantId;
  supplier: string;
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    unit_cost: number;
  }>;
  status: LogisticsStatus;
  dispatched_at?: string;
  estimated_delivery: string;
  actual_delivery?: string;
  total_value: number;
  driver?: string;
  truck_id?: string;
  notes?: string;
}

export interface LogisticsStep {
  label: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  active: boolean;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface SalesDataPoint {
  date: string;        // 'Jan', 'Feb', etc.
  revenue: number;
  cost: number;
  profit: number;
  orders: number;
  profit_margin: number;
}

export interface ReturnRateBySize {
  size: string;
  returns: number;
  total_sold: number;
  rate: number;
}

export interface AnalyticsMetrics {
  sell_through_rate: number;
  inventory_turnover: number;
  logistics_efficiency_hours: number;
  revenue_30d: number;
  profit_30d: number;
  orders_30d: number;
  avg_order_value: number;
}

// ─── Clothes-specific ────────────────────────────────────────────────────────

export interface SizeColorSelection {
  size: string | null;
  color: string | null;
}

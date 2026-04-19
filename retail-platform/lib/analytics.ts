import type { InventoryItem, SalesDataPoint, AnalyticsMetrics } from './types';

export function calcSellThroughRate(unitsSold: number, totalInventory: number): number {
  if (totalInventory === 0) return 0;
  return Math.min(100, (unitsSold / totalInventory) * 100);
}

export function calcInventoryTurnover(costOfGoodsSold: number, avgInventoryValue: number): number {
  if (avgInventoryValue === 0) return 0;
  return costOfGoodsSold / avgInventoryValue;
}

export function calcLogisticsEfficiency(dispatchedAt: string, deliveredAt: string): number {
  const diff = new Date(deliveredAt).getTime() - new Date(dispatchedAt).getTime();
  return diff / (1000 * 60 * 60); // hours
}

export function calcDepletionRate(unitsSold7d: number): number {
  return unitsSold7d / 7;
}

export function calcDaysUntilStockout(stock: number, depletionRate: number): number {
  if (depletionRate === 0) return 999;
  return Math.floor(stock / depletionRate);
}

export function calcInventoryStatus(stock: number, reorderPoint: number): InventoryItem['status'] {
  if (stock === 0) return 'critical';
  if (stock < reorderPoint * 0.5) return 'critical';
  if (stock < reorderPoint) return 'low';
  if (stock > reorderPoint * 4) return 'overstock';
  return 'healthy';
}

export function calcMetrics(
  salesData: SalesDataPoint[],
  inventory: InventoryItem[],
  logisticsEfficiencyHours = 18.4
): AnalyticsMetrics {
  const last30 = salesData.slice(-6); // using monthly data, last 6 months approximated
  const revenue_30d = last30.at(-1)?.revenue ?? 0;
  const profit_30d = last30.at(-1)?.profit ?? 0;
  const orders_30d = last30.at(-1)?.orders ?? 0;
  const avg_order_value = orders_30d > 0 ? revenue_30d / orders_30d : 0;

  const totalStock = inventory.reduce((s, i) => s + i.stock, 0);
  const totalSold = inventory.reduce((s, i) => s + i.units_sold_30d, 0);
  const sell_through_rate = calcSellThroughRate(totalSold, totalStock + totalSold);

  const cogsSurrogate = inventory.reduce((s, i) => s + i.units_sold_30d * i.cost_price, 0);
  const avgInvValue = inventory.reduce((s, i) => s + i.stock * i.cost_price, 0);
  const inventory_turnover = calcInventoryTurnover(cogsSurrogate, avgInvValue);

  return {
    sell_through_rate,
    inventory_turnover,
    logistics_efficiency_hours: logisticsEfficiencyHours,
    revenue_30d,
    profit_30d,
    orders_30d,
    avg_order_value,
  };
}

export function isDaysToCriticalExpiry(expiryDate: string, thresholdDays = 3): boolean {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffDays = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= thresholdDays;
}

export function fmt(n: number, prefix = '$'): string {
  return prefix + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

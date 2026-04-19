'use client';

import { useState, useCallback } from 'react';
import type { InventoryItem, RawMaterial, TenantId } from '@/lib/types';
import { buildInventory, bakeryProducts, rawMaterials } from '@/lib/data';
import {
  supermarketProducts, jewelryProducts, clothesProducts,
} from '@/lib/data';

const productsByTenant = {
  supermarket: supermarketProducts,
  jewelry: jewelryProducts,
  bakery: bakeryProducts,
  clothes: clothesProducts,
};

export function useInventory(tenantId: TenantId) {
  const [inventory, setInventory] = useState<InventoryItem[]>(() =>
    buildInventory(productsByTenant[tenantId])
  );
  const [materials, setMaterials] = useState<RawMaterial[]>(rawMaterials);

  // Subtract raw materials when bakery produces an item
  const recordProduction = useCallback((
    productId: string,
    quantity: number,
    rawMaterialUsage: Array<{ material_id: string; quantity_per_unit: number }>
  ) => {
    setMaterials(prev =>
      prev.map(mat => {
        const usage = rawMaterialUsage.find(u => u.material_id === mat.id);
        if (!usage) return mat;
        return { ...mat, stock: Math.max(0, mat.stock - usage.quantity_per_unit * quantity) };
      })
    );
    setInventory(prev =>
      prev.map(item =>
        item.product_id === productId
          ? { ...item, stock: item.stock + quantity }
          : item
      )
    );
  }, []);

  // Apply logistics delivery — increase stock when goods arrive
  const applyDelivery = useCallback((
    deliveredItems: Array<{ product_id: string; quantity: number }>
  ) => {
    setInventory(prev =>
      prev.map(item => {
        const delivery = deliveredItems.find(d => d.product_id === item.product_id);
        if (!delivery) return item;
        const newStock = item.stock + delivery.quantity;
        return {
          ...item,
          stock: newStock,
          status: newStock >= item.reorder_point ? 'healthy' : item.status,
          last_restocked: new Date().toISOString(),
        };
      })
    );
  }, []);

  const sellUnit = useCallback((productId: string, qty = 1) => {
    setInventory(prev =>
      prev.map(item =>
        item.product_id === productId
          ? { ...item, stock: Math.max(0, item.stock - qty), units_sold_7d: item.units_sold_7d + qty }
          : item
      )
    );
  }, []);

  return { inventory, materials, recordProduction, applyDelivery, sellUnit, setInventory };
}

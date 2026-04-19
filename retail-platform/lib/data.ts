import type {
  Product, InventoryItem, LogisticsOrder, SalesDataPoint,
  OvenStatus, RawMaterial, ReturnRateBySize,
} from './types';
import { calcInventoryStatus } from './analytics';

// ─── Supermarket Products ─────────────────────────────────────────────────────
export const supermarketProducts: Product[] = [
  {
    id: 'sm-001', tenant_id: 'supermarket', name: 'Organic Hass Avocados', sku: 'SM-AV-001',
    description: 'Perfectly ripe Hass avocados, certified organic. Rich, creamy texture ideal for salads and spreads.',
    price: 1.49, compare_at_price: 1.99, images: ['https://images.unsplash.com/photo-1601039641847-7857b994d704?w=600&h=400&fit=crop'],
    category: 'Fresh Produce', stock: 240, reorder_point: 80, units_sold_30d: 960, cost_price: 0.65,
    metadata: { expiry: new Date(Date.now() + 2 * 864e5).toISOString(), weight: '200g each', origin: 'Mexico', is_organic: true },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-002', tenant_id: 'supermarket', name: 'Roma Tomatoes', sku: 'SM-TM-001',
    description: 'Sun-ripened Roma tomatoes with vibrant color and full-bodied flavor. Perfect for sauces and salads.',
    price: 0.89, images: ['https://images.unsplash.com/photo-1561136594-7f68af7bbd3f?w=600&h=400&fit=crop'],
    category: 'Fresh Produce', stock: 580, reorder_point: 150, units_sold_30d: 1420, cost_price: 0.38,
    metadata: { expiry: new Date(Date.now() + 5 * 864e5).toISOString(), weight: '1 kg bag', origin: 'Spain' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-003', tenant_id: 'supermarket', name: 'Atlantic Salmon Fillet', sku: 'SM-SF-001',
    description: 'Fresh-caught Atlantic salmon, sustainably sourced. Omega-3 rich with a delicate, mild flavor.',
    price: 12.99, compare_at_price: 15.99, images: ['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop'],
    category: 'Seafood & Meat', stock: 48, reorder_point: 30, units_sold_30d: 210, cost_price: 7.20,
    metadata: { expiry: new Date(Date.now() + 1.5 * 864e5).toISOString(), weight: '500g', origin: 'Norway' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-004', tenant_id: 'supermarket', name: 'Aged Cheddar Block', sku: 'SM-CD-001',
    description: 'Extra sharp 18-month aged cheddar. Complex, crystalline texture with a bold, tangy finish.',
    price: 6.49, images: ['https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&h=400&fit=crop'],
    category: 'Dairy & Eggs', stock: 180, reorder_point: 60, units_sold_30d: 340, cost_price: 3.10,
    metadata: { expiry: new Date(Date.now() + 45 * 864e5).toISOString(), weight: '400g', origin: 'UK' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-005', tenant_id: 'supermarket', name: 'Whole Grain Sourdough', sku: 'SM-BK-001',
    description: 'Artisan-style whole grain sourdough with a crisp crust and open crumb. Made with ancient grains.',
    price: 4.29, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'],
    category: 'Bakery', stock: 62, reorder_point: 40, units_sold_30d: 580, cost_price: 1.80,
    metadata: { expiry: new Date(Date.now() + 2.5 * 864e5).toISOString(), weight: '800g' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-006', tenant_id: 'supermarket', name: 'Cold-Pressed Orange Juice', sku: 'SM-OJ-001',
    description: 'Pure cold-pressed juice from Valencia oranges. No added sugars, no preservatives.',
    price: 5.99, images: ['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=400&fit=crop'],
    category: 'Beverages', stock: 140, reorder_point: 50, units_sold_30d: 420, cost_price: 2.40,
    metadata: { expiry: new Date(Date.now() + 4 * 864e5).toISOString(), weight: '1L', origin: 'Spain', is_organic: true },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-007', tenant_id: 'supermarket', name: 'Free-Range Chicken Breast', sku: 'SM-CK-001',
    description: 'British free-range chicken breast. Air-chilled for superior texture and natural flavor.',
    price: 8.99, images: ['https://images.unsplash.com/photo-1604503468506-a8da13d11c83?w=600&h=400&fit=crop'],
    category: 'Seafood & Meat', stock: 95, reorder_point: 50, units_sold_30d: 480, cost_price: 4.50,
    metadata: { expiry: new Date(Date.now() + 2 * 864e5).toISOString(), weight: '600g pack', origin: 'UK' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'sm-008', tenant_id: 'supermarket', name: 'Baby Spinach Bag', sku: 'SM-SP-001',
    description: 'Tender baby spinach leaves, triple-washed and ready to eat. Packed with iron and folate.',
    price: 2.49, images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop'],
    category: 'Fresh Produce', stock: 210, reorder_point: 80, units_sold_30d: 780, cost_price: 0.95,
    metadata: { expiry: new Date(Date.now() + 3 * 864e5).toISOString(), weight: '150g bag', is_organic: true },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
];

// ─── Jewelry Products ─────────────────────────────────────────────────────────
export const jewelryProducts: Product[] = [
  {
    id: 'jw-001', tenant_id: 'jewelry', name: 'Solitaire Diamond Ring', sku: 'JW-DR-001',
    description: 'A timeless 1.2-carat round brilliant diamond set in polished 18K white gold. GIA certified, VS1 clarity, G color.',
    price: 4850, compare_at_price: 5200,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop'],
    category: 'Rings', stock: 12, reorder_point: 5, units_sold_30d: 4, cost_price: 2800,
    metadata: { material: '18K White Gold', carat: '1.2ct', certification_number: 'GIA-2381940284', certification_url: '/certs/JW-DR-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'jw-002', tenant_id: 'jewelry', name: 'Pavé Diamond Tennis Bracelet', sku: 'JW-TB-001',
    description: 'Forty brilliant-cut diamonds, 3.8 carats total weight, set in seamless 14K white gold. A statement of refined elegance.',
    price: 3200,
    images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=400&fit=crop'],
    category: 'Bracelets', stock: 8, reorder_point: 4, units_sold_30d: 3, cost_price: 1850,
    metadata: { material: '14K White Gold', carat: '3.8ct total', certification_number: 'IGI-8842019371', certification_url: '/certs/JW-TB-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'jw-003', tenant_id: 'jewelry', name: 'South Sea Pearl Necklace', sku: 'JW-PN-001',
    description: 'Hand-selected Australian South Sea pearls, 11–13mm, graduated strand with 18K gold clasp. Exceptional luster.',
    price: 2750,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop'],
    category: 'Necklaces', stock: 6, reorder_point: 3, units_sold_30d: 2, cost_price: 1400,
    metadata: { material: '18K Gold, South Sea Pearls', certification_number: 'AGS-7749204812', certification_url: '/certs/JW-PN-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'jw-004', tenant_id: 'jewelry', name: 'Sapphire & Diamond Earrings', sku: 'JW-SE-001',
    description: 'Ceylon blue sapphires framed by brilliant-cut diamond halos. Set in platinum for enduring brilliance.',
    price: 1890,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=400&fit=crop'],
    category: 'Earrings', stock: 15, reorder_point: 5, units_sold_30d: 6, cost_price: 980,
    metadata: { material: 'Platinum', carat: '1.4ct sapphire, 0.6ct diamond', certification_number: 'GIA-4417382901', certification_url: '/certs/JW-SE-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'jw-005', tenant_id: 'jewelry', name: 'Swiss Chronograph Watch', sku: 'JW-WC-001',
    description: 'Swiss-made automatic movement, sapphire crystal, 18K rose gold case, alligator strap. 50m water resistant.',
    price: 6400, compare_at_price: 7100,
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop'],
    category: 'Watches', stock: 5, reorder_point: 2, units_sold_30d: 2, cost_price: 3800,
    metadata: { material: '18K Rose Gold', certification_number: 'COSC-8812937461', certification_url: '/certs/JW-WC-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'jw-006', tenant_id: 'jewelry', name: 'Emerald Cut Aquamarine Ring', sku: 'JW-AR-001',
    description: 'A 3.1-carat aquamarine in an Art Deco-inspired platinum setting with diamond baguette shoulders.',
    price: 2100,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop'],
    category: 'Rings', stock: 9, reorder_point: 4, units_sold_30d: 3, cost_price: 1100,
    metadata: { material: 'Platinum', carat: '3.1ct aquamarine', certification_number: 'AGL-2290183740', certification_url: '/certs/JW-AR-001.pdf' },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
];

// ─── Bakery Products ──────────────────────────────────────────────────────────
export const bakeryProducts: Product[] = [
  {
    id: 'bk-001', tenant_id: 'bakery', name: 'Classic Sourdough Boule', sku: 'BK-SD-001',
    description: 'Long-fermented sourdough with an open crumb and shattering crust. Baked fresh each morning.',
    price: 7.50, images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'],
    category: 'Artisan Breads', stock: 24, reorder_point: 10, units_sold_30d: 680, cost_price: 2.80,
    metadata: {
      ingredients: ['Organic flour', 'Water', 'Sourdough starter', 'Sea salt'],
      allergens: ['Gluten'], bake_duration_min: 45,
      raw_materials: [{ material_id: 'rm-001', quantity_per_unit: 0.4 }, { material_id: 'rm-003', quantity_per_unit: 0.005 }],
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'bk-002', tenant_id: 'bakery', name: 'Butter Croissant', sku: 'BK-CR-001',
    description: 'Laminated with 84% fat butter, our croissant has 72 flaky layers and a honeyed, buttery interior.',
    price: 3.20, images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop'],
    category: 'Viennoiserie', stock: 48, reorder_point: 20, units_sold_30d: 1240, cost_price: 0.95,
    metadata: {
      ingredients: ['Flour', 'Butter', 'Milk', 'Sugar', 'Yeast', 'Salt'],
      allergens: ['Gluten', 'Dairy', 'Eggs'], bake_duration_min: 22,
      raw_materials: [{ material_id: 'rm-001', quantity_per_unit: 0.12 }, { material_id: 'rm-002', quantity_per_unit: 0.08 }, { material_id: 'rm-004', quantity_per_unit: 0.003 }],
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'bk-003', tenant_id: 'bakery', name: 'Dark Chocolate Fondant', sku: 'BK-CF-001',
    description: 'Warm 70% Valrhona chocolate fondant with a liquid centre. Made to order, served with crème fraîche.',
    price: 6.80, images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop'],
    category: 'Patisserie', stock: 18, reorder_point: 8, units_sold_30d: 390, cost_price: 2.20,
    metadata: {
      ingredients: ['Valrhona 70% dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour'],
      allergens: ['Gluten', 'Dairy', 'Eggs'], bake_duration_min: 12,
      raw_materials: [{ material_id: 'rm-001', quantity_per_unit: 0.06 }, { material_id: 'rm-002', quantity_per_unit: 0.05 }, { material_id: 'rm-005', quantity_per_unit: 0.07 }],
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'bk-004', tenant_id: 'bakery', name: 'Cinnamon Pecan Scroll', sku: 'BK-CS-001',
    description: 'Brioche dough layered with brown butter, roasted pecans, and Ceylon cinnamon. Glazed and baked to golden.',
    price: 4.50, images: ['https://images.unsplash.com/photo-1620286209024-7e12e87d7f80?w=600&h=400&fit=crop'],
    category: 'Viennoiserie', stock: 32, reorder_point: 12, units_sold_30d: 720, cost_price: 1.40,
    metadata: {
      ingredients: ['Brioche dough', 'Butter', 'Brown sugar', 'Pecans', 'Ceylon cinnamon'],
      allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree nuts'], bake_duration_min: 28,
      raw_materials: [{ material_id: 'rm-001', quantity_per_unit: 0.15 }, { material_id: 'rm-002', quantity_per_unit: 0.06 }, { material_id: 'rm-004', quantity_per_unit: 0.002 }],
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'bk-005', tenant_id: 'bakery', name: 'Seeded Rye Loaf', sku: 'BK-RY-001',
    description: 'Dense Nordic-style rye bread with sunflower seeds, linseed, and pumpkin seeds. High in fibre.',
    price: 6.20, images: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=400&fit=crop'],
    category: 'Artisan Breads', stock: 15, reorder_point: 8, units_sold_30d: 310, cost_price: 2.30,
    metadata: {
      ingredients: ['Rye flour', 'Water', 'Seeds', 'Salt', 'Sourdough starter'],
      allergens: ['Gluten'], bake_duration_min: 60,
      raw_materials: [{ material_id: 'rm-006', quantity_per_unit: 0.35 }, { material_id: 'rm-003', quantity_per_unit: 0.004 }],
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
];

// ─── Clothes Products ─────────────────────────────────────────────────────────
export const clothesProducts: Product[] = [
  {
    id: 'cl-001', tenant_id: 'clothes', name: 'Merino Wool Blazer', sku: 'CL-BL-001',
    description: 'Tailored in 100% Merino wool, this blazer offers effortless structure with four-season versatility.',
    price: 289, compare_at_price: 340,
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=400&fit=crop'],
    category: 'Outerwear', stock: 95, reorder_point: 30, units_sold_30d: 124, cost_price: 98,
    metadata: {
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Charcoal', hex: '#374151' }, { name: 'Navy', hex: '#1e3a5f' }, { name: 'Camel', hex: '#c8914a' }],
      material_composition: '100% Merino Wool', gender: 'Women',
      return_rate_by_size: { XS: 4.2, S: 6.1, M: 8.4, L: 14.2, XL: 18.6 },
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'cl-002', tenant_id: 'clothes', name: 'Selvedge Denim Jeans', sku: 'CL-JN-001',
    description: 'Japanese selvedge denim, 13.5oz weight, straight cut. Develops a unique patina over time.',
    price: 185,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop'],
    category: 'Bottoms', stock: 142, reorder_point: 50, units_sold_30d: 198, cost_price: 62,
    metadata: {
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: [{ name: 'Raw Indigo', hex: '#2e4172' }, { name: 'Black', hex: '#0a0a0a' }],
      material_composition: '100% Cotton Selvedge', gender: 'Men',
      return_rate_by_size: { '28': 3.1, '30': 4.8, '32': 5.9, '34': 9.2, '36': 16.4, '38': 21.8 },
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'cl-003', tenant_id: 'clothes', name: 'Linen Summer Dress', sku: 'CL-DR-001',
    description: 'Relaxed-fit linen midi dress with a functional wrap silhouette. Naturally breathable for warm months.',
    price: 149, compare_at_price: 175,
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=400&fit=crop'],
    category: 'Dresses', stock: 78, reorder_point: 25, units_sold_30d: 148, cost_price: 45,
    metadata: {
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Sand', hex: '#c8a96e' }, { name: 'Sage', hex: '#87a98a' }, { name: 'White', hex: '#f9f9f7' }],
      material_composition: '100% French Linen', gender: 'Women',
      return_rate_by_size: { XS: 5.0, S: 7.2, M: 6.1, L: 10.8, XL: 15.3, XXL: 22.1 },
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'cl-004', tenant_id: 'clothes', name: 'Oxford Button-Down Shirt', sku: 'CL-SH-001',
    description: 'Classic Oxford cloth button-down. Woven in Portugal, pre-washed for immediate comfort.',
    price: 95,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop'],
    category: 'Tops', stock: 210, reorder_point: 60, units_sold_30d: 312, cost_price: 28,
    metadata: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'White', hex: '#f9f9f7' }, { name: 'Sky Blue', hex: '#7bb8d4' }, { name: 'Pale Pink', hex: '#e8b4b8' }],
      material_composition: '100% Cotton Oxford', gender: 'Men',
      return_rate_by_size: { S: 3.8, M: 4.2, L: 5.6, XL: 11.3, XXL: 19.7 },
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
  {
    id: 'cl-005', tenant_id: 'clothes', name: 'Leather Chelsea Boots', sku: 'CL-BT-001',
    description: 'Full-grain leather Chelsea boots with a Goodyear welt. Resoleable, built to last decades.',
    price: 320,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop'],
    category: 'Footwear', stock: 56, reorder_point: 20, units_sold_30d: 84, cost_price: 115,
    metadata: {
      sizes: ['UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11'],
      colors: [{ name: 'Tan', hex: '#b5813e' }, { name: 'Dark Brown', hex: '#3d1f0d' }, { name: 'Black', hex: '#0a0a0a' }],
      material_composition: 'Full-Grain Leather, Leather Sole', gender: 'Unisex',
      return_rate_by_size: { UK6: 7.2, UK7: 5.8, UK8: 4.1, UK9: 5.2, UK10: 9.4, UK11: 13.6 },
    },
    created_at: '2024-01-01', updated_at: '2024-04-18',
  },
];

// ─── Inventory ────────────────────────────────────────────────────────────────
export function buildInventory(products: Product[]): InventoryItem[] {
  return products.map(p => {
    const depletion_rate = p.units_sold_30d / 30;
    return {
      id: `inv-${p.id}`,
      tenant_id: p.tenant_id,
      product_id: p.id,
      product_name: p.name,
      category: p.category,
      stock: p.stock,
      reorder_point: p.reorder_point,
      units_sold_7d: Math.round(p.units_sold_30d / 4.3),
      units_sold_30d: p.units_sold_30d,
      cost_price: p.cost_price,
      depletion_rate,
      last_restocked: '2024-04-10',
      status: calcInventoryStatus(p.stock, p.reorder_point),
    };
  });
}

// ─── Raw Materials (Bakery) ───────────────────────────────────────────────────
export const rawMaterials: RawMaterial[] = [
  { id: 'rm-001', name: 'Organic Plain Flour', unit: 'kg', stock: 84, reorder_point: 30, cost_per_unit: 1.20 },
  { id: 'rm-002', name: 'Normandy Butter', unit: 'kg', stock: 22, reorder_point: 10, cost_per_unit: 8.50 },
  { id: 'rm-003', name: 'Sea Salt', unit: 'kg', stock: 12, reorder_point: 5, cost_per_unit: 0.90 },
  { id: 'rm-004', name: 'Instant Yeast', unit: 'kg', stock: 3.2, reorder_point: 2, cost_per_unit: 12.00 },
  { id: 'rm-005', name: 'Valrhona 70% Chocolate', unit: 'kg', stock: 8.4, reorder_point: 4, cost_per_unit: 28.00 },
  { id: 'rm-006', name: 'Rye Flour', unit: 'kg', stock: 35, reorder_point: 15, cost_per_unit: 1.60 },
  { id: 'rm-007', name: 'Whole Eggs', unit: 'doz', stock: 28, reorder_point: 10, cost_per_unit: 3.80 },
];

// ─── Oven Status ──────────────────────────────────────────────────────────────
export const ovenStatuses: OvenStatus[] = [
  { id: 'ov-01', label: 'Deck Oven 1', status: 'baking', current_batch: 'Classic Sourdough Boule', temp_celsius: 240, ready_at: new Date(Date.now() + 18 * 60000).toISOString(), progress: 62 },
  { id: 'ov-02', label: 'Deck Oven 2', status: 'baking', current_batch: 'Butter Croissants', temp_celsius: 195, ready_at: new Date(Date.now() + 7 * 60000).toISOString(), progress: 85 },
  { id: 'ov-03', label: 'Convection Oven', status: 'preheating', temp_celsius: 160, progress: 40 },
  { id: 'ov-04', label: 'Rack Oven', status: 'idle', temp_celsius: 22, progress: 0 },
];

// ─── Logistics Orders ─────────────────────────────────────────────────────────
export const logisticsOrders: LogisticsOrder[] = [
  {
    id: 'lo-001', tenant_id: 'supermarket', supplier: 'VegFarm Direct', total_value: 4800,
    status: 'in_transit', dispatched_at: '2024-04-18T06:00:00Z', estimated_delivery: '2024-04-19T10:00:00Z',
    driver: 'Carlos Mendes', truck_id: 'TRK-04',
    items: [{ product_id: 'sm-001', product_name: 'Organic Hass Avocados', quantity: 400, unit_cost: 0.65 }, { product_id: 'sm-008', product_name: 'Baby Spinach Bag', quantity: 300, unit_cost: 0.95 }],
  },
  {
    id: 'lo-002', tenant_id: 'bakery', supplier: 'Millstone Flour Co.', total_value: 980,
    status: 'arrived', dispatched_at: '2024-04-17T08:00:00Z', estimated_delivery: '2024-04-18T12:00:00Z', actual_delivery: '2024-04-18T11:45:00Z',
    driver: 'Aisha Nkosi', truck_id: 'TRK-07',
    items: [{ product_id: 'rm-001', product_name: 'Organic Plain Flour', quantity: 200, unit_cost: 1.20 }, { product_id: 'rm-006', product_name: 'Rye Flour', quantity: 80, unit_cost: 1.60 }],
  },
  {
    id: 'lo-003', tenant_id: 'jewelry', supplier: 'Gem Couriers International', total_value: 28000,
    status: 'shelved', dispatched_at: '2024-04-15T09:00:00Z', estimated_delivery: '2024-04-17T16:00:00Z', actual_delivery: '2024-04-17T15:30:00Z',
    driver: 'Private Escort', truck_id: 'SEC-01',
    items: [{ product_id: 'jw-001', product_name: 'Solitaire Diamond Ring', quantity: 4, unit_cost: 2800 }, { product_id: 'jw-004', product_name: 'Sapphire & Diamond Earrings', quantity: 6, unit_cost: 980 }],
  },
  {
    id: 'lo-004', tenant_id: 'clothes', supplier: 'Nordic Textiles B.V.', total_value: 18400,
    status: 'dispatched', dispatched_at: '2024-04-19T04:00:00Z', estimated_delivery: '2024-04-21T14:00:00Z',
    driver: 'Petra Hoffman', truck_id: 'TRK-12',
    items: [{ product_id: 'cl-001', product_name: 'Merino Wool Blazer', quantity: 40, unit_cost: 98 }, { product_id: 'cl-003', product_name: 'Linen Summer Dress', quantity: 60, unit_cost: 45 }],
  },
  {
    id: 'lo-005', tenant_id: 'supermarket', supplier: 'Atlantic Fisheries Ltd.', total_value: 6200,
    status: 'pending', estimated_delivery: '2024-04-20T08:00:00Z',
    items: [{ product_id: 'sm-003', product_name: 'Atlantic Salmon Fillet', quantity: 120, unit_cost: 7.20 }],
  },
];

// ─── Sales Data (Monthly 2024–2025) ──────────────────────────────────────────
export function getSalesData(tenantId: string): SalesDataPoint[] {
  const base: Record<string, number[]> = {
    supermarket: [84000, 91000, 98000, 102000, 109000, 114000, 108000, 121000, 118000, 126000, 132000, 138000],
    jewelry:     [28000, 31000, 42000, 36000, 39000, 45000, 33000, 38000, 52000, 60000, 68000, 92000],
    bakery:      [18000, 19500, 21000, 22400, 24100, 23800, 22900, 24400, 25600, 26800, 28100, 29900],
    clothes:     [42000, 38000, 45000, 52000, 61000, 58000, 63000, 71000, 68000, 74000, 88000, 94000],
  };
  const revenues = base[tenantId] ?? base.supermarket;
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return revenues.map((rev, i) => {
    const cost = Math.round(rev * 0.58);
    const profit = rev - cost;
    const orders = Math.round(rev / 14.8);
    return { date: labels[i], revenue: rev, cost, profit, orders, profit_margin: Math.round((profit / rev) * 100) };
  });
}

// ─── Return Rate Data (Clothes) ───────────────────────────────────────────────
export const returnRateData: ReturnRateBySize[] = [
  { size: 'XS', returns: 48, total_sold: 320, rate: 15.0 },
  { size: 'S', returns: 82, total_sold: 640, rate: 12.8 },
  { size: 'M', returns: 94, total_sold: 820, rate: 11.5 },
  { size: 'L', returns: 128, total_sold: 700, rate: 18.3 },
  { size: 'XL', returns: 156, total_sold: 580, rate: 26.9 },
  { size: 'XXL', returns: 98, total_sold: 240, rate: 40.8 },
];

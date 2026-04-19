'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shirt, ShoppingBag, ChevronRight, Check, LayoutDashboard, Filter } from 'lucide-react';
import { clothesProducts } from '@/lib/data';
import type { Product, SizeColorSelection } from '@/lib/types';
import { cn } from '@/lib/utils';

type CartItem = { product: Product; selection: SizeColorSelection; qty: number };

function SizeColorMatrix({ product, selection, onChange }: {
  product: Product;
  selection: SizeColorSelection;
  onChange: (s: SizeColorSelection) => void;
}) {
  return (
    <div className="space-y-4">
      {product.metadata.sizes && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Size</p>
          <div className="flex flex-wrap gap-1.5">
            {product.metadata.sizes.map(size => (
              <button
                key={size}
                onClick={() => onChange({ ...selection, size })}
                className={cn(
                  'h-8 min-w-[2rem] px-2 text-xs font-semibold rounded-lg border transition-all',
                  selection.size === size
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.metadata.colors && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Color{selection.color ? `: ${selection.color}` : ''}
          </p>
          <div className="flex gap-2">
            {product.metadata.colors.map(color => (
              <button
                key={color.name}
                onClick={() => onChange({ ...selection, color: color.name })}
                title={color.name}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center',
                  selection.color === color.name ? 'border-gray-900 scale-110' : 'border-gray-200 hover:border-gray-400'
                )}
                style={{ background: color.hex }}
              >
                {selection.color === color.name && (
                  <Check size={12} className="text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Dresses', 'Footwear'];

export default function ClothesPage() {
  const [category, setCategory] = useState('All');
  const [gender, setGender] = useState<'All' | 'Men' | 'Women' | 'Unisex'>('All');
  const [selections, setSelections] = useState<Record<string, SizeColorSelection>>({});
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered = clothesProducts.filter(p => {
    const matchesCat = category === 'All' || p.category === category;
    const matchesGender = gender === 'All' || p.metadata.gender === gender;
    return matchesCat && matchesGender;
  });

  const getSelection = (id: string): SizeColorSelection => selections[id] ?? { size: null, color: null };

  const addToCart = (product: Product) => {
    const sel = getSelection(product.id);
    if (!sel.size || !sel.color) return;
    setCart(prev => {
      const key = `${product.id}-${sel.size}-${sel.color}`;
      const existing = prev.find(i => `${i.product.id}-${i.selection.size}-${i.selection.color}` === key);
      return existing
        ? prev.map(i => (`${i.product.id}-${i.selection.size}-${i.selection.color}` === key) ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { product, selection: sel, qty: 1 }];
    });
  };

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <Shirt size={15} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-none">Meridian</div>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5">Considered Fashion</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 mx-auto">
            {categories.filter(c => c !== 'All').map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`text-sm font-medium transition-colors ${category === cat ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}>
                {cat}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/clothes" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
              <LayoutDashboard size={13} /> Dashboard
            </Link>
            <button className="relative flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors">
              <ShoppingBag size={15} />
              Bag
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=500&fit=crop"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-900/40 flex items-center px-16">
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-[4px] mb-4">New Collection 2024</p>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Wear What<br />
              <span className="text-slate-300">Lasts</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-sm">Premium materials, considered design. Built to outlast trends.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 shrink-0">
            <Filter size={13} />
            Filter:
          </div>
          <div className="flex gap-2">
            {(['All', 'Men', 'Women', 'Unisex'] as const).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  gender === g ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                {g}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-gray-200 mx-2 shrink-0" />
          <div className="flex gap-1.5">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  category === cat ? 'bg-slate-800 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-400 mb-6">{filtered.length} products</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => {
            const sel = getSelection(product.id);
            const canAdd = sel.size !== null && sel.color !== null;

            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.compare_at_price && (
                    <div className="absolute top-3 left-3 text-[10px] font-bold bg-red-600 text-white px-2.5 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {product.metadata.gender && (
                    <div className="absolute top-3 right-3 text-[10px] font-medium bg-white/90 text-gray-700 px-2 py-1 rounded-full">
                      {product.metadata.gender}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-1">{product.metadata.material_composition}</p>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                  {/* Size/Color Matrix */}
                  <div className="mb-5 pb-5 border-b border-gray-50">
                    <SizeColorMatrix
                      product={product}
                      selection={sel}
                      onChange={s => setSelections(prev => ({ ...prev, [product.id]: s }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.compare_at_price && (
                        <span className="text-sm text-gray-400 line-through mr-2">${product.compare_at_price}</span>
                      )}
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!canAdd}
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-colors',
                        canAdd
                          ? 'bg-slate-800 text-white hover:bg-slate-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      )}
                    >
                      {canAdd ? (
                        <><ShoppingBag size={13} /> Add to Bag</>
                      ) : (
                        <>Select Options</>
                      )}
                    </button>
                  </div>

                  {!canAdd && (sel.size || sel.color) && (
                    <p className="text-[10px] text-amber-600 mt-2 flex items-center gap-1">
                      <ChevronRight size={10} />
                      {!sel.size ? 'Select a size' : 'Select a color'} to add
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

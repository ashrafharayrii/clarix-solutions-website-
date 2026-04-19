'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Croissant, Clock, Leaf, AlertCircle, ShoppingBag, LayoutDashboard, Thermometer, Flame } from 'lucide-react';
import { bakeryProducts, ovenStatuses } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const categories = ['All', 'Artisan Breads', 'Viennoiserie', 'Patisserie'];

type CartItem = { product: Product; qty: number };

const ovenDot: Record<string, string> = {
  baking: 'bg-red-500',
  preheating: 'bg-amber-400',
  idle: 'bg-gray-300',
  maintenance: 'bg-blue-400',
};

export default function BakeryPage() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered = category === 'All' ? bakeryProducts : bakeryProducts.filter(p => p.category === category);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      return existing
        ? prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { product, qty: 1 }];
    });
  };

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const activeBaking = ovenStatuses.filter(o => o.status === 'baking' || o.status === 'preheating');

  return (
    <div className="min-h-screen bg-cream">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-cream border-b border-wheat/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-wheat rounded-lg flex items-center justify-center">
              <Croissant size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-gray-900 text-sm leading-none">La Maison</div>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5">Artisan Bakery</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 mx-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`text-sm font-medium transition-colors ${category === cat ? 'text-wheat' : 'text-gray-500 hover:text-gray-900'}`}>
                {cat}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/bakery" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1">
              <LayoutDashboard size={13} /> Dashboard
            </Link>
            <button className="relative flex items-center gap-2 px-4 py-2 bg-wheat text-white text-sm font-semibold rounded-xl hover:bg-wheat-dark transition-colors">
              <ShoppingBag size={15} />
              Order
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Live Oven Status Bar */}
      <div className="bg-gray-900 text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Flame size={14} className="text-orange-400" />
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Live Ovens</span>
          </div>
          {ovenStatuses.map(oven => {
            const readyMin = oven.ready_at
              ? Math.max(0, Math.round((new Date(oven.ready_at).getTime() - Date.now()) / 60000))
              : null;
            return (
              <div key={oven.id} className="flex items-center gap-2 shrink-0 text-xs">
                <div className={cn('w-2 h-2 rounded-full', ovenDot[oven.status], oven.status === 'baking' ? 'oven-active' : '')} />
                <span className="text-gray-300 font-medium">{oven.label}</span>
                {oven.current_batch && (
                  <span className="text-gray-500">— {oven.current_batch}</span>
                )}
                <div className="flex items-center gap-1 text-gray-500">
                  <Thermometer size={10} />
                  {oven.temp_celsius}°C
                </div>
                {readyMin !== null && oven.status === 'baking' && (
                  <span className="text-amber-400 font-semibold">Ready in {readyMin}m</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=500&fit=crop"
          alt="Artisan bread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/80 via-amber-900/50 to-transparent flex items-center px-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={13} className="text-amber-300" />
              <span className="text-amber-300 text-xs font-semibold uppercase tracking-[3px]">Baked Fresh Daily</span>
            </div>
            <h1 className="font-display text-5xl font-bold text-white mb-2 leading-tight">
              The Art of<br />
              <span className="text-amber-300">Honest Bread</span>
            </h1>
            <p className="text-amber-100/70 text-sm mt-2 max-w-sm">Long-fermented, hand-shaped, stone-baked. No shortcuts.</p>

            {activeBaking.length > 0 && (
              <div className="flex items-center gap-2 mt-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 w-fit">
                <div className="w-2 h-2 rounded-full bg-red-400 oven-active" />
                <span className="text-white text-xs font-medium">
                  {activeBaking.length} batch{activeBaking.length !== 1 ? 'es' : ''} baking now
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-wheat text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-wheat/50 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-wheat/10 shadow-sm hover:shadow-lg transition-shadow group">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">{product.category}</span>
                  {product.metadata.bake_duration_min && (
                    <span className="flex items-center gap-1 text-[10px] font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                      <Clock size={9} /> {product.metadata.bake_duration_min}min
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-base mb-1.5">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">{product.description}</p>

                {/* Allergens */}
                {product.metadata.allergens && product.metadata.allergens.length > 0 && (
                  <div className="flex items-start gap-1.5 mb-4">
                    <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-gray-400">Contains: {product.metadata.allergens.join(', ')}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-wheat text-white text-sm font-semibold rounded-xl hover:bg-wheat-dark transition-colors"
                  >
                    <ShoppingBag size={13} />
                    Order
                  </button>
                </div>

                {product.stock < 10 && (
                  <p className="text-[10px] text-red-500 font-medium mt-2">Only {product.stock} left today</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

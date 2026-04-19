'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Leaf, Tag, LayoutDashboard, X, Plus, Minus, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supermarketProducts } from '@/lib/data';
import { isDaysToCriticalExpiry } from '@/lib/analytics';
import type { Product } from '@/lib/types';

const categories = ['All', 'Fresh Produce', 'Seafood & Meat', 'Dairy & Eggs', 'Bakery', 'Beverages'];

type CartItem = { product: Product; qty: number };

export default function SupermarketPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = supermarketProducts.filter(p => {
    const matchesCat = category === 'All' || p.category === category;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <ShoppingCart size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-none">FreshMart</div>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5">Premium Grocery</div>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-auto relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 bg-gray-50"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/dashboard/supermarket" className="hidden md:flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors">
              <ShoppingCart size={15} />
              Cart
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
      <section className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=400&fit=crop"
          alt="Fresh produce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-900/50 to-transparent flex items-center px-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={14} className="text-green-300" />
              <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">Freshness Guaranteed</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Farm to Table,</h1>
            <h1 className="text-4xl font-bold text-green-300">Every Single Day.</h1>
            <p className="text-green-100/80 mt-3 text-sm">Sourced fresh daily from trusted producers worldwide</p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">{filtered.length} products</p>
          {search && (
            <button onClick={() => setSearch('')} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800">
              <X size={12} /> Clear search
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(product => {
            const isQuickSale = product.metadata.expiry
              ? isDaysToCriticalExpiry(product.metadata.expiry, 3)
              : false;
            const cartItem = cart.find(i => i.product.id === product.id);

            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {isQuickSale && (
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-red-600 text-white px-2 py-1 rounded-full">
                        <Zap size={9} /> Quick Sale
                      </span>
                    )}
                    {product.metadata.is_organic && (
                      <span className="flex items-center gap-1 text-[10px] font-bold bg-green-600 text-white px-2 py-1 rounded-full">
                        <Leaf size={9} /> Organic
                      </span>
                    )}
                    {product.compare_at_price && !isQuickSale && (
                      <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-1 rounded-full">Sale</span>
                    )}
                  </div>
                  {product.metadata.origin && (
                    <span className="absolute bottom-2 right-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded-full">
                      {product.metadata.origin}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                  {product.metadata.expiry && (
                    <p className={`text-[10px] font-medium mb-2 ${isQuickSale ? 'text-red-600' : 'text-gray-400'}`}>
                      {isQuickSale ? 'Exp. soon · ' : 'Best before: '}
                      {new Date(product.metadata.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`font-bold text-base ${isQuickSale ? 'text-red-600' : 'text-gray-900'}`}>
                        ${isQuickSale ? (product.price * 0.7).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      {(product.compare_at_price || isQuickSale) && (
                        <span className="text-xs text-gray-400 line-through ml-1.5">${product.price.toFixed(2)}</span>
                      )}
                      {product.metadata.weight && (
                        <span className="text-[10px] text-gray-400 ml-1">/ {product.metadata.weight}</span>
                      )}
                    </div>

                    {cartItem ? (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(product.id, -1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{cartItem.qty}</span>
                        <button onClick={() => updateQty(product.id, 1)} className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700">
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(product)} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                        <Plus size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="w-96 bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Your Cart ({itemCount})</h2>
              <button onClick={() => setCartOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-12">Your cart is empty</p>
              ) : cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">${item.product.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-100">
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs hover:bg-green-700">
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

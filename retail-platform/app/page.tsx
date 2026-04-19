import Link from 'next/link';
import { ShoppingCart, Gem, Croissant, Shirt, LayoutDashboard, ArrowRight } from 'lucide-react';

const portals = [
  {
    id: 'supermarket',
    label: 'Supermarket',
    desc: 'Fresh produce, dairy, meat & grocery',
    href: '/supermarket',
    dashboard: '/dashboard/supermarket',
    icon: ShoppingCart,
    color: 'from-green-600 to-emerald-700',
    bg: 'bg-green-50',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
  },
  {
    id: 'jewelry',
    label: 'Jewelry',
    desc: 'Certified fine jewelry & luxury timepieces',
    href: '/jewelry',
    dashboard: '/dashboard/jewelry',
    icon: Gem,
    color: 'from-yellow-700 to-amber-800',
    bg: 'bg-amber-50',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=500&fit=crop',
  },
  {
    id: 'bakery',
    label: 'Bakery',
    desc: 'Artisan breads, pastries & patisserie',
    href: '/bakery',
    dashboard: '/dashboard/bakery',
    icon: Croissant,
    color: 'from-amber-600 to-orange-700',
    bg: 'bg-orange-50',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop',
  },
  {
    id: 'clothes',
    label: 'Fashion',
    desc: 'Curated apparel, footwear & accessories',
    href: '/clothes',
    dashboard: '/dashboard/clothes',
    icon: Shirt,
    color: 'from-slate-600 to-slate-800',
    bg: 'bg-slate-50',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=500&fit=crop',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Enterprise Platform</div>
          <h1 className="text-2xl font-bold text-gray-900">Retail Hub</h1>
        </div>
        <Link
          href="/dashboard/supermarket"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <LayoutDashboard size={15} />
          Management Console
        </Link>
      </header>

      {/* Portal Grid */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Select a storefront</p>
          <h2 className="text-4xl font-bold text-gray-900">Four Retail Fronts.</h2>
          <h2 className="text-4xl font-bold text-gray-400">One Platform.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img src={p.img} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 h-48 bg-gradient-to-b from-transparent to-black/40" />
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${p.bg} mb-3`}>
                        <Icon size={13} className="text-gray-700" />
                        <span className="text-xs font-semibold text-gray-700">{p.label}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{p.label} Store</h3>
                      <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={p.href}
                      className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${p.color} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      Visit Store
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={p.dashboard}
                      className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

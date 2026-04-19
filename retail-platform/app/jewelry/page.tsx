'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gem, Shield, Award, ChevronRight, X, FileText, LayoutDashboard, ExternalLink } from 'lucide-react';
import { jewelryProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

function CertModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gray-950 px-7 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <Shield size={15} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Certification Document</p>
              <p className="text-white font-semibold text-sm">{product.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* PDF Viewer Simulation */}
        <div className="bg-gray-100 p-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            {/* Document header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Gemological Institute of America</p>
                <p className="text-2xl font-bold text-gray-900">Diamond Grading Report</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Report Number</p>
                <p className="font-mono font-bold text-gray-900">{product.metadata.certification_number}</p>
              </div>
            </div>
            <div className="px-8 py-6 grid grid-cols-2 gap-6 text-sm">
              {[
                ['Shape & Cut', 'Round Brilliant'],
                ['Carat Weight', product.metadata.carat ?? '—'],
                ['Color Grade', 'G'],
                ['Clarity Grade', 'VS1'],
                ['Cut Grade', 'Excellent'],
                ['Polish', 'Excellent'],
                ['Symmetry', 'Excellent'],
                ['Fluorescence', 'None'],
                ['Material', product.metadata.material ?? '—'],
                ['Date of Issue', 'March 2024'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-8 py-5 bg-green-50 border-t border-green-100 flex items-center gap-2">
              <Award size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-800">Authenticity Verified — GIA Certified</span>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-3">
            <a href="#" className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              <ExternalLink size={13} /> Download PDF
            </a>
            <button onClick={onClose} className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Watches'];

export default function JewelryPage() {
  const [category, setCategory] = useState('All');
  const [certProduct, setCertProduct] = useState<Product | null>(null);

  const filtered = category === 'All' ? jewelryProducts : jewelryProducts.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-obsidian text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-obsidian/95 backdrop-blur-sm border-b border-white/8">
        <div className="max-w-7xl mx-auto px-8 h-18 flex items-center gap-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 to-amber-800 rounded-lg flex items-center justify-center">
              <Gem size={15} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-base tracking-widest uppercase">Aurum</div>
              <div className="text-[10px] text-gray-500 tracking-widest uppercase">Fine Jewelry</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 mx-auto">
            {categories.filter(c => c !== 'All').map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-sm transition-colors ${category === cat ? 'text-amber-400' : 'text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/dashboard/jewelry" className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5">
              <LayoutDashboard size={13} /> Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=900&fit=crop"
          alt="Luxury Jewelry"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-amber-600" />
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-[4px]">Est. 1891</span>
            <div className="h-px w-12 bg-amber-600" />
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Crafted for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">
              Eternity
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Each piece carries a certified provenance. GIA & IGI authenticated, every gemstone verified, every setting hand-crafted.
          </p>
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-yellow-700 to-amber-800 text-white font-semibold rounded-full hover:opacity-90 transition-opacity luxury-pulse"
          >
            Explore Collection
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-obsidian-mid border-y border-white/8 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-10">
          {[
            { icon: Shield, text: 'GIA & IGI Certified' },
            { icon: Award, text: 'Authenticated Provenance' },
            { icon: FileText, text: 'Full Certification Included' },
            { icon: Gem, text: 'Conflict-Free Gemstones' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-3 text-sm text-gray-300">
                <Icon size={16} className="text-amber-500" />
                {item.text}
              </div>
            );
          })}
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="max-w-7xl mx-auto px-8 py-20">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-amber-700 text-white'
                  : 'border border-white/10 text-gray-400 hover:border-amber-700/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(product => (
            <div key={product.id} className="group bg-obsidian-soft border border-white/8 rounded-2xl overflow-hidden hover:border-amber-700/50 transition-all duration-300">
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-gray-900">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {product.compare_at_price && (
                  <div className="absolute top-3 left-3 text-[10px] font-bold bg-amber-700 text-white px-2 py-1 rounded-full">
                    Special Price
                  </div>
                )}

                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest">{product.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-white text-lg mb-2 leading-snug">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3">{product.description}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                  {product.metadata.material && (
                    <span className="text-xs text-gray-500">{product.metadata.material}</span>
                  )}
                  {product.metadata.carat && (
                    <span className="text-xs text-amber-600">{product.metadata.carat}</span>
                  )}
                </div>

                {/* Price + Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-600 line-through mr-2">${product.compare_at_price.toLocaleString()}</span>
                    )}
                    <span className="text-2xl font-bold text-white">${product.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setCertProduct(product)}
                    className="flex items-center gap-1.5 flex-1 justify-center py-2.5 border border-amber-700/50 text-amber-400 text-xs font-semibold rounded-xl hover:border-amber-500 hover:text-amber-300 transition-colors"
                  >
                    <FileText size={13} />
                    View Certification
                  </button>
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-yellow-700 to-amber-800 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity">
                    Enquire
                  </button>
                </div>

                {/* Cert Number */}
                {product.metadata.certification_number && (
                  <p className="text-[10px] font-mono text-gray-600 mt-3 text-center">
                    {product.metadata.certification_number}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cert Modal */}
      {certProduct && <CertModal product={certProduct} onClose={() => setCertProduct(null)} />}
    </div>
  );
}

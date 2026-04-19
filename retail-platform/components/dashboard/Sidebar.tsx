'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingCart, Gem, Croissant, Shirt,
  Truck, BarChart2, Package, Users, ChevronRight, Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sectors = [
  { id: 'supermarket', label: 'Supermarket', icon: ShoppingCart, color: 'text-green-600', dot: 'bg-green-500' },
  { id: 'jewelry', label: 'Jewelry', icon: Gem, color: 'text-amber-600', dot: 'bg-amber-500' },
  { id: 'bakery', label: 'Bakery', icon: Croissant, color: 'text-orange-600', dot: 'bg-orange-500' },
  { id: 'clothes', label: 'Fashion', icon: Shirt, color: 'text-slate-600', dot: 'bg-slate-500' },
];

const tools = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard/supermarket' },
  { label: 'Revenue', icon: BarChart2, href: '#revenue' },
  { label: 'Inventory', icon: Package, href: '#inventory' },
  { label: 'Logistics', icon: Truck, href: '/dashboard/logistics' },
  { label: 'Customers', icon: Users, href: '#customers' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Enterprise</div>
        <div className="text-white font-bold text-xl tracking-tight">Retail Platform</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3">
        {/* Sectors */}
        <div className="mb-2 px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
          Sectors
        </div>
        {sectors.map(s => {
          const Icon = s.icon;
          const active = pathname.includes(s.id);
          return (
            <Link
              key={s.id}
              href={`/dashboard/${s.id}`}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 group transition-colors',
                active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon size={16} className={cn(active ? s.color : 'text-gray-500 group-hover:text-gray-300')} />
              <span className="text-sm font-medium flex-1">{s.label}</span>
              {active && <ChevronRight size={14} className="text-gray-400" />}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 mx-3 border-t border-white/10" />

        {/* Tools */}
        <div className="mb-2 px-3 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
          Tools
        </div>
        {tools.map(t => {
          const Icon = t.icon;
          const active = t.href !== '#revenue' && t.href !== '#inventory' && t.href !== '#customers' && pathname === t.href;
          return (
            <Link
              key={t.label}
              href={t.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors',
                active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{t.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
          <Home size={15} />
          Back to Portal
        </Link>
      </div>
    </aside>
  );
}

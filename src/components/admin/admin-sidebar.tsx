
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  Award, 
  FileText, 
  Star, 
  Ticket, 
  LogOut,
  Droplets,
  ChevronRight,
  Plus,
  Wrench,
  Zap,
  Home,
  Building2,
  Factory,
  Beaker
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { 
    label: 'Asset Catalog', 
    icon: Package,
    children: [
      { label: 'Domestic Hub', href: '/admin/products?cat=Domestic+Products', icon: Home },
      { label: 'Commercial Hub', href: '/admin/products?cat=Commercial+Products', icon: Zap },
      { label: 'Institutional Hub', href: '/admin/products?cat=Institutional+Products', icon: Building2 },
      { label: 'Industrial Hub', href: '/admin/products?cat=Industrial+Products', icon: Factory },
      { label: 'Spares & Parts', href: '/admin/products?cat=Components+%26+Spare+Parts', icon: Wrench },
      { label: 'Filters & Chemicals', href: '/admin/products?cat=Filters+%26+Chemicals', icon: Beaker },
    ]
  },
  { label: 'Gallery Hub', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Brand Partners', href: '/admin/brands', icon: Award },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Invoice Ledger', href: '/admin/invoices', icon: FileText },
  { label: 'Customer Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Coupons & Offers', href: '/admin/coupons', icon: Ticket },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { auth } = useAuth();
  const [isProductsOpen, setIsProductsOpen] = useState(pathname.includes('/admin/products'));

  return (
    <aside className="hidden md:flex w-72 flex-col bg-slate-900 text-white sticky top-0 h-screen">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <Droplets className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-black font-headline text-lg uppercase tracking-tight leading-none">Admin Hub</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Aqua Safe RO Works</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          if (item.children) {
            return (
              <Collapsible
                key={item.label}
                open={isProductsOpen}
                onOpenChange={setIsProductsOpen}
                className="space-y-1"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-12 rounded-xl hover:bg-white/5 font-bold uppercase tracking-widest text-[10px]"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </div>
                    <ChevronRight className={cn("h-3 w-3 transition-transform", isProductsOpen && "rotate-90")} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <span className={cn(
                        "flex items-center h-10 px-4 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors hover:bg-white/5",
                        pathname === child.href || (pathname === '/admin/products' && new URLSearchParams(child.href.split('?')[1]).get('cat') === new URLSearchParams(window.location.search).get('cat')) 
                          ? "bg-white/10 text-primary border-l-2 border-primary" 
                          : "text-slate-400"
                      )}>
                        {child.label}
                      </span>
                    </Link>
                  ))}
                  <Link href="/admin/products/new">
                    <span className="flex items-center h-10 px-4 rounded-lg text-[9px] font-black uppercase tracking-wider text-green-400 hover:bg-green-400/10">
                      <Plus className="h-3 w-3 mr-2" /> Add New Asset
                    </span>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-12 rounded-xl hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] transition-all",
                  pathname === item.href ? "bg-primary text-white hover:bg-primary shadow-lg shadow-primary/20" : "text-slate-400"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Button
          onClick={() => auth && signOut(auth)}
          variant="ghost"
          className="w-full justify-start h-12 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 font-bold uppercase tracking-widest text-[10px]"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout Hub
        </Button>
      </div>
    </aside>
  );
}

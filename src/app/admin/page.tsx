
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { 
  Package, 
  Image as ImageIcon, 
  FileText, 
  Award, 
  TrendingUp, 
  Users,
  Clock,
  ArrowRight,
  Plus,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const firestore = useFirestore();
  
  // Memoize references to prevent infinite render loops
  const productsRef = useMemo(() => firestore ? collection(firestore, 'products') : null, [firestore]);
  const invoicesRef = useMemo(() => firestore ? collection(firestore, 'invoices') : null, [firestore]);
  const galleryRef = useMemo(() => firestore ? collection(firestore, 'gallery') : null, [firestore]);
  const reviewsRef = useMemo(() => firestore ? collection(firestore, 'reviews') : null, [firestore]);

  const { data: products } = useCollection(productsRef);
  const { data: invoices } = useCollection(invoicesRef);
  const { data: gallery } = useCollection(galleryRef);
  const { data: reviews } = useCollection(reviewsRef);

  const stats = [
    { label: 'Total Products', value: products?.length || 0, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Invoices', value: invoices?.length || 0, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Gallery Items', value: gallery?.length || 0, icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Customer Reviews', value: reviews?.length || 0, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">System <span className="text-primary">Overview</span></h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time operational analytics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all group">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-2xl transition-colors", stat.bg, stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="border-slate-100 text-[10px] font-black uppercase text-slate-400">Total</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black font-headline text-slate-900 tracking-tighter">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[2.5rem] bg-white">
          <CardHeader className="p-8 flex flex-row items-center justify-between border-b border-slate-50">
            <CardTitle className="font-black font-headline text-lg uppercase tracking-tight">Recent <span className="text-primary">Operations</span></CardTitle>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary">
              View Activity <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase">System Maintenance Update</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none">Success</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <CardHeader className="p-8">
            <CardTitle className="font-black font-headline text-lg uppercase tracking-tight">Quick <span className="text-primary">Actions</span></CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            <Button asChild className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs border-none shadow-xl shadow-primary/20">
              <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs">
              <Link href="/admin/invoices"><FileText className="mr-2 h-4 w-4" /> Issue Invoice</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full h-14 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-xs">
              <Link href="/gallery"><ImageIcon className="mr-2 h-4 w-4" /> Manage Media</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

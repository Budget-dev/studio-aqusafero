
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  Package, 
  Loader2,
  LayoutGrid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useMemo, Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function AdminProductsInner() {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat');
  const firestore = useFirestore();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const productsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'products'),
      ...(cat ? [where('category', '==', cat)] : [])
    );
  }, [firestore, cat]);

  const { data: products, loading } = useCollection(productsQuery);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Are you sure you want to delete this technical asset?')) {
      try {
        await deleteDoc(doc(firestore, 'products', id));
        toast({ title: 'Product Deleted', description: 'Asset record has been removed.' });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Delete Failed' });
      }
    }
  };

  const filtered = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku?.toLowerCase().includes(search.toLowerCase()) ||
    p.subcategory?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">
            {cat || 'Global'} <span className="text-primary">Catalog</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing {filtered?.length || 0} catalog entries</p>
        </div>
        <Button asChild className="h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl border-none">
          <Link href="/admin/products/new"><Plus className="mr-2 h-4 w-4" /> Add New Asset</Link>
        </Button>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name, SKU, or hub subcategory..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold"
            />
          </div>
          {!cat && (
            <Badge variant="outline" className="h-14 rounded-2xl px-6 border-slate-100 font-black uppercase text-[10px] tracking-widest flex gap-2">
              <LayoutGrid className="h-4 w-4 text-primary" /> Master Hub View
            </Badge>
          )}
        </div>

        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none h-14 hover:bg-transparent">
              <TableHead className="font-black text-[9px] uppercase tracking-widest pl-8">Asset Details</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Price</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Subcategory</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="text-right pr-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Hub Data...</TableCell></TableRow>
            ) : filtered?.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">No matching entries found</TableCell></TableRow>
            ) : filtered?.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/50 border-slate-50 h-20 transition-colors group">
                <TableCell className="pl-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center p-2 relative overflow-hidden">
                      {p.images?.[0] ? (
                        <img src={p.images[0].url} alt={p.name} className="object-contain" />
                      ) : (
                        <Package className="h-5 w-5 text-slate-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1">{p.name}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.sku || 'NO SKU'}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-black text-slate-900">₹{p.offerPrice || p.price}</span>
                </TableCell>
                <TableCell className="text-center">
                   <Badge variant="outline" className="font-black uppercase text-[8px] tracking-widest border-slate-100 px-2 py-0.5">
                     {p.subcategory || 'General'}
                   </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={cn(
                    "font-black uppercase text-[8px] tracking-widest border-none px-2",
                    p.stock > 5 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  )}>
                    {p.stock > 5 ? 'Healthy' : 'Low Stock'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white text-slate-400">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-2xl border-slate-100">
                      <DropdownMenuItem asChild className="rounded-xl h-11 font-black uppercase text-[9px] tracking-widest cursor-pointer">
                        <Link href={`/admin/products/edit/${p.id}`}><Edit2 className="mr-2 h-3.5 w-3.5" /> Edit Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(p.id)}
                        className="rounded-xl h-11 font-black uppercase text-[9px] tracking-widest text-red-500 hover:text-red-600 focus:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Asset
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function AdminProductsList() {
  return (
    <Suspense fallback={
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AdminProductsInner />
    </Suspense>
  )
}

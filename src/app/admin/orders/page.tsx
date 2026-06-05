
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { 
  Package, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Truck, 
  Clock,
  User,
  Smartphone,
  CreditCard,
  Image as ImageIcon
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
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AdminOrdersPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const ordersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: orders, loading } = useCollection<any>(ordersQuery);

  const updateStatus = async (id: string, status: string) => {
    if (!firestore) return;
    try {
      await updateDoc(doc(firestore, 'orders', id), { status });
      toast({ title: 'Status Updated', description: `Order is now ${status}.` });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update Failed' });
    }
  };

  const filtered = orders?.filter(ord => 
    ord.customerName?.toLowerCase().includes(search.toLowerCase()) || 
    ord.orderId?.toLowerCase().includes(search.toLowerCase()) ||
    ord.phone?.includes(search)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Order <span className="text-primary">Registry</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Reviewing technical sales and verification data</p>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by ID, name, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none h-14">
              <TableHead className="font-black text-[9px] uppercase tracking-widest pl-8">Purchase Details</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest">Client Identity</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Payment Info</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Status Hub</TableHead>
              <TableHead className="text-right pr-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Master Ledger...</TableCell></TableRow>
            ) : filtered?.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">No purchase records found</TableCell></TableRow>
            ) : filtered?.map((ord) => (
              <TableRow key={ord.id} className="hover:bg-slate-50/50 transition-colors h-24">
                <TableCell className="pl-8">
                  <div>
                    <p className="font-black text-slate-900 uppercase text-xs">{ord.orderId}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">₹{ord.total?.toLocaleString()} • {ord.items?.length} Items</p>
                    <p className="text-[8px] text-slate-300 font-bold uppercase mt-1">{new Date(ord.createdAt).toLocaleString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase leading-none">{ord.customerName}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{ord.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[8px] tracking-widest">
                      {ord.paymentMethod}
                    </Badge>
                    {ord.paymentReference && (
                      <Button variant="ghost" size="sm" asChild className="h-7 text-[8px] font-black uppercase text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-0">
                        <a href={ord.paymentReference} target="_blank" rel="noopener noreferrer">
                          <ImageIcon className="mr-1 h-3 w-3" /> View Proof
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={cn(
                    "font-black uppercase text-[8px] tracking-widest border-none px-2",
                    ord.status === 'Confirmed' ? "bg-green-100 text-green-700" : 
                    ord.status === 'Shipped' ? "bg-blue-100 text-blue-700" :
                    "bg-amber-100 text-amber-700"
                  )}>
                    {ord.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    {ord.status === 'Pending' && (
                      <Button onClick={() => updateStatus(ord.id, 'Confirmed')} variant="outline" size="sm" className="h-9 rounded-xl border-green-200 text-green-600 font-black uppercase text-[9px] tracking-widest">
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Confirm Payment
                      </Button>
                    )}
                    {ord.status === 'Confirmed' && (
                      <Button onClick={() => updateStatus(ord.id, 'Shipped')} variant="outline" size="sm" className="h-9 rounded-xl border-blue-200 text-blue-600 font-black uppercase text-[9px] tracking-widest">
                        <Truck className="mr-1.5 h-3.5 w-3.5" /> Mark Shipped
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

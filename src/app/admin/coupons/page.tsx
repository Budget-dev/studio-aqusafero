'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { 
  Plus, 
  Trash2, 
  Ticket, 
  Percent,
  Calendar,
  Loader2,
  Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function AdminCouponsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    expiry: '',
    active: true
  });

  const couponsRef = useMemo(() => firestore ? collection(firestore, 'coupons') : null, [firestore]);
  const { data: coupons, loading } = useCollection(couponsRef);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setSubmitting(true);

    try {
      await addDoc(collection(firestore, 'coupons'), {
        ...newCoupon,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Coupon Created', description: 'Commercial offer is now live.' });
      setIsAddOpen(false);
      setNewCoupon({ code: '', discount: 0, expiry: '', active: true });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Setup Failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    if (!firestore) return;
    try {
      await updateDoc(doc(firestore, 'coupons', id), { active: !current });
      toast({ title: `Coupon ${!current ? 'Enabled' : 'Disabled'}` });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update Failed' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Permanently remove this commercial coupon?')) {
      try {
        await deleteDoc(doc(firestore, 'coupons', id));
        toast({ title: 'Coupon Removed' });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Delete Failed' });
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Coupons & <span className="text-primary">Offers</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing technical discounts and commercial incentives</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2rem] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-black font-headline uppercase tracking-tight">New Incentive Entry</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Coupon Code</Label>
                <Input 
                  required 
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                  placeholder="e.g. AQUASAFE20"
                  className="h-12 rounded-xl bg-slate-50 border-none font-black uppercase"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Discount Percentage (%)</Label>
                <Input 
                  type="number" required 
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({...newCoupon, discount: parseInt(e.target.value) || 0})}
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Expiry Date</Label>
                <Input 
                  type="date" required
                  value={newCoupon.expiry}
                  onChange={(e) => setNewCoupon({...newCoupon, expiry: e.target.value})}
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deploy Incentive"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons?.map((coupon: any) => (
            <Card key={coupon.id} className={cn(
              "border-none shadow-sm rounded-3xl overflow-hidden transition-all bg-white border border-slate-100",
              !coupon.active && "opacity-60"
            )}>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <Switch 
                    checked={coupon.active} 
                    onCheckedChange={() => toggleActive(coupon.id, coupon.active)}
                  />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{coupon.code}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Percent className="h-3 w-3" /> {coupon.discount}% Off Technical Spares
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Expires: {coupon.expiry}</span>
                  </div>
                  <Button 
                    onClick={() => handleDelete(coupon.id)}
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {coupons?.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <Ticket className="h-12 w-12 text-slate-200 mx-auto" />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Incentive pool empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

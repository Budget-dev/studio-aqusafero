'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  User, 
  FileText, 
  Calendar as CalendarIcon,
  Calculator,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function NewInvoicePage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    invoiceNo: `ASRO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
    items: [{ description: '', qty: 1, price: 0 }],
    total: 0
  });

  // Calculate total whenever items change
  useEffect(() => {
    const newTotal = formData.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    setFormData(prev => ({ ...prev, total: newTotal }));
  }, [formData.items]);

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', qty: 1, price: 0 }]
    });
  };

  const handleRemoveItem = (index: number) => {
    if (formData.items.length === 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    (newItems[index] as any)[field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setLoading(true);

    try {
      await addDoc(collection(firestore, 'invoices'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Invoice Registered', description: 'Sale record has been successfully committed to the ledger.' });
      router.push('/admin/invoices');
    } catch (e) {
      toast({ variant: 'destructive', title: 'Ledger Sync Failed', description: 'Check your administrative permissions.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Generate <span className="text-primary">Invoice</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Technical Sales & Billing Registry</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Client & Metadata */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Client Registry</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Customer Identity *</Label>
                  <Input 
                    required 
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    placeholder="e.g. Reliance Industries Ltd"
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Invoice ID (System)</Label>
                  <Input 
                    disabled 
                    value={formData.invoiceNo}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold opacity-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Issue Date</Label>
                  <Input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Payment Status</Label>
                  <Select onValueChange={(val) => setFormData({...formData, status: val})} defaultValue="Pending">
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Pending">Payment Pending</SelectItem>
                      <SelectItem value="Paid">Cleared / Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-800 text-white p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Sale Components</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.items.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 items-end animate-in slide-in-from-left-2">
                  <div className="flex-1 space-y-2 w-full">
                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Technical Item Description</Label>
                    <Input 
                      placeholder="e.g. 250 LPH RO Plant Installation"
                      value={item.description}
                      onChange={(e) => updateItem(i, 'description', e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                  </div>
                  <div className="w-full md:w-24 space-y-2">
                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Qty</Label>
                    <Input 
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(i, 'qty', parseInt(e.target.value) || 0)}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                  </div>
                  <div className="w-full md:w-40 space-y-2">
                    <Label className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Unit Price (₹)</Label>
                    <Input 
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(i, 'price', parseFloat(e.target.value) || 0)}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveItem(i)}
                    className="text-red-400 hover:text-red-500 hover:bg-red-50 shrink-0 mb-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddItem}
                className="w-full h-12 rounded-xl border-dashed border-slate-200 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:border-primary hover:text-primary transition-all"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Line Item
              </Button>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white overflow-hidden sticky top-24">
            <CardHeader className="p-8 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Financial Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">Subtotal (INR)</span>
                  <span className="font-bold">₹{formData.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span className="text-[10px] font-black uppercase tracking-widest">GST (Inclusive)</span>
                  <span className="font-bold">₹0</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black uppercase tracking-widest text-primary">Final Amount</span>
                  <span className="text-3xl font-black font-headline">₹{formData.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Professional Integrity</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  Upon publication, this invoice will be assigned a permanent ID and archived in the administrative sales ledger for accounting compliance.
                </p>
              </div>

              <Button 
                type="submit"
                disabled={loading || formData.total === 0 || !formData.customerName}
                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 border-none transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Finalize & Archive Sale"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </form>
    </div>
  );
}

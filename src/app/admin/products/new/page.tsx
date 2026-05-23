
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  Upload, 
  Plus, 
  X,
  FileText,
  Info,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function AddProductPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Commercial',
    type: 'Product',
    brand: '',
    price: 0,
    offerPrice: 0,
    sku: '',
    stock: 10,
    description: '',
    featured: false,
    specifications: [{ key: '', value: '' }],
    images: [{ url: '', caption: '' }],
    videos: [{ url: '', caption: '' }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setLoading(true);

    try {
      await addDoc(collection(firestore, 'products'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast({ title: 'Product Published', description: 'System database updated successfully.' });
      router.push('/admin/products');
    } catch (e) {
      toast({ variant: 'destructive', title: 'Publication Failed', description: 'Database sync error.' });
    } finally {
      setLoading(false);
    }
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Add <span className="text-primary">Catalog Entry</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Create a new high-performance system or spare</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Basic Info */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Primary Specifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Product Title *</Label>
                <Input 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                  placeholder="e.g. Industrial RO Plant 500 LPH" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val})} defaultValue="Commercial">
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Domestic">Domestic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Type</Label>
                  <Select onValueChange={(val) => setFormData({...formData, type: val})} defaultValue="Product">
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Main Unit / Product</SelectItem>
                      <SelectItem value="Spare">Technical Spare Part</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Description</Label>
                <Textarea 
                  className="min-h-[160px] rounded-2xl bg-slate-50 border-none font-bold p-6" 
                  placeholder="Technical breakdown and performance metrics..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Technical Data Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.specifications.map((spec, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Input 
                    placeholder="Parameter (e.g. Voltage)" 
                    value={spec.key}
                    onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input 
                    placeholder="Value (e.g. 240V AC)" 
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setFormData({...formData, specifications: formData.specifications.filter((_, idx) => idx !== i)})}
                    className="text-red-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({...formData, specifications: [...formData.specifications, { key: '', value: '' }]})}
                className="w-full h-12 rounded-xl border-dashed border-slate-200 font-black uppercase text-[10px] tracking-widest text-slate-400"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Technical Param
              </Button>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          {/* Inventory & Pricing */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white">
            <CardHeader className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Inventory Controls</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Price</Label>
                  <Input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Offer Price</Label>
                  <Input 
                    type="number" 
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({...formData, offerPrice: parseFloat(e.target.value)})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Stock Units</Label>
                <Input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-900">Featured System</p>
                  <p className="text-[9px] font-bold text-slate-400">Show on homepage solutions</p>
                </div>
                <Switch 
                  checked={formData.featured}
                  onCheckedChange={(val) => setFormData({...formData, featured: val})}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 border-none transition-all"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
            Publish to Hub
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

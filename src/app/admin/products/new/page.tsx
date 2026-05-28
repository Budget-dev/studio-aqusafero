
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X,
  FileText,
  ShieldCheck,
  Settings,
  Loader2,
  LayoutGrid,
  Zap,
  Star
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const CATEGORIES = [
  "Domestic Products",
  "Commercial Products",
  "Institutional Products",
  "Industrial Products",
  "Components & Spare Parts",
  "Filters & Chemicals"
];

const SUBCATEGORIES: Record<string, string[]> = {
  "Components & Spare Parts": ["Pumps", "Valves", "Membranes", "Housings", "Connectors", "Motors", "UV Components", "RO Spare Parts"],
  "Filters & Chemicals": ["Sediment Filters", "Carbon Filters", "RO Membranes", "UF Filters", "Industrial Filters", "Water Treatment Chemicals", "Cleaning Chemicals", "Dosing Solutions", "Industrial Chemical Solutions"],
  "Domestic Products": ["RO Purifiers", "Alkaline Systems", "Softeners", "UV/UF Units"],
  "Commercial Products": ["RO Plants", "Softeners", "Chillers", "Dispensers"],
  "Institutional Products": ["Plant Solutions", "Central Purification", "Public Dispensers"],
  "Industrial Products": ["Industrial Plants", "Effluent Treatment", "Sewage Treatment", "ZLD Systems"]
};

export default function AddProductPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Domestic Products',
    subcategory: '',
    type: 'Product',
    brand: 'AquaSafe',
    price: 0,
    offerPrice: 0,
    sku: '',
    stock: 10,
    description: '',
    shortDescription: '',
    featured: false,
    rating: 5,
    specifications: [{ key: '', value: '' }],
    images: [{ url: '', caption: '' }],
    videos: [{ url: '', caption: '' }],
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
      toast({ title: 'Blueprint Registered', description: 'Technical catalog successfully updated.' });
      router.push('/admin/products');
    } catch (e) {
      toast({ variant: 'destructive', title: 'Publication Failed', description: 'Check database connectivity.' });
    } finally {
      setLoading(false);
    }
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const addSpec = () => setFormData({...formData, specifications: [...formData.specifications, { key: '', value: '' }]});
  const removeSpec = (i: number) => setFormData({...formData, specifications: formData.specifications.filter((_, idx) => idx !== i)});

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Register <span className="text-primary">Technical Asset</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Add components or plants to the engineering hub</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {/* Identity Hub */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Technical Identity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Full Product Title *</Label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20" 
                    placeholder="e.g. 500 LPH RO Plant (Industrial)" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Engineering Slug (Auto)</Label>
                  <Input disabled value={formData.slug} className="h-14 rounded-2xl bg-slate-50 border-none font-bold opacity-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Primary Hub Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val, subcategory: ''})} value={formData.category}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Technical Subcategory</Label>
                  <Select onValueChange={(val) => setFormData({...formData, subcategory: val})} value={formData.subcategory}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select Sector Filter" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {(SUBCATEGORIES[formData.category] || []).map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Primary Image URL (Public)</Label>
                <Input 
                  required 
                  value={formData.images[0].url}
                  onChange={(e) => {
                    const imgs = [...formData.images];
                    imgs[0].url = e.target.value;
                    setFormData({...formData, images: imgs});
                  }}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                  placeholder="https://sirv.com/asset.png" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Brief Summary</Label>
                <Input 
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                  placeholder="One-line technical brief..." 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Deep Technical Analysis</Label>
                <Textarea 
                  className="min-h-[160px] rounded-2xl bg-slate-50 border-none font-bold p-6 focus:ring-2 focus:ring-primary/20" 
                  placeholder="Detailed engineering breakdown..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Matrix Specs */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-800 text-white p-8">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Engineering Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.specifications.map((spec, i) => (
                <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2">
                  <Input 
                    placeholder="Parameter (e.g. TDS Rejection)" 
                    value={spec.key}
                    onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input 
                    placeholder="Value (e.g. 98%)" 
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeSpec(i)}
                    className="text-red-400 hover:text-red-500 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addSpec}
                className="w-full h-12 rounded-xl border-dashed border-slate-200 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:border-primary hover:text-primary transition-all"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Parameter Entry
              </Button>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Logistics Hub</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Rate (₹)</Label>
                  <Input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Offer Rate (₹)</Label>
                  <Input type="number" value={formData.offerPrice} onChange={(e) => setFormData({...formData, offerPrice: parseFloat(e.target.value)})} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">SKU ID</Label>
                  <Input value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none font-bold uppercase" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Units in Stock</Label>
                  <Input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                </div>
              </div>

              <Separator className="bg-slate-50" />

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-900">Featured Hub Asset</p>
                  <p className="text-[9px] font-bold text-slate-400">Display prominently on homepage</p>
                </div>
                <Switch checked={formData.featured} onCheckedChange={(v) => setFormData({...formData, featured: v})} />
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg shadow-2xl shadow-primary/20 border-none transition-all"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : <><Save className="mr-3 h-6 w-6" /> Commit Blueprint</>}
          </Button>
        </aside>
      </form>
    </div>
  );
}

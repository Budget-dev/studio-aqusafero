
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
  Settings,
  Image as ImageIcon,
  Video as VideoIcon,
  Tag,
  Star,
  Search,
  Loader2
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
    tags: '',
    specifications: [{ key: '', value: '' }],
    images: [{ url: '', caption: '' }],
    videos: [{ url: '', caption: '' }],
    seo: { title: '', description: '' }
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
      toast({ title: 'System Published', description: 'Technical catalog successfully updated.' });
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

  const updateAsset = (index: number, type: 'images' | 'videos', field: 'url' | 'caption', value: string) => {
    const assets = [...formData[type]];
    assets[index][field] = value;
    setFormData({ ...formData, [type]: assets });
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Technical <span className="text-primary">Catalog Entry</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Publish high-performance water treatment assets</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">System Identity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Product Title *</Label>
                  <Input 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20" 
                    placeholder="e.g. Industrial RO Plant 500 LPH" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">URL Slug (Auto)</Label>
                  <Input 
                    disabled 
                    value={formData.slug}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold opacity-50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Primary Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val, subcategory: ''})} value={formData.category}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Subcategory</Label>
                  <Select onValueChange={(val) => setFormData({...formData, subcategory: val})} value={formData.subcategory}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select Hub Subcategory" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {(SUBCATEGORIES[formData.category] || []).map(sub => (
                        <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Asset Type</Label>
                  <Select onValueChange={(val) => setFormData({...formData, type: val as any})} value={formData.type}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Product">Main Unit / Plant</SelectItem>
                      <SelectItem value="Spare Part">Technical Spare / Part</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Brand Hub</Label>
                  <Input 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                    placeholder="e.g. AquaSafe / Dow / CRI" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Short Brief</Label>
                <Input 
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                  placeholder="One-line technical summary..." 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Deep Technical Analysis</Label>
                <Textarea 
                  className="min-h-[160px] rounded-2xl bg-slate-50 border-none font-bold p-6 focus:ring-2 focus:ring-primary/20" 
                  placeholder="Comprehensive breakdown of flow rates, membrane capacity, and engineering standards..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-900 text-white p-8">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Engineering Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.specifications.map((spec, i) => (
                <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2">
                  <Input 
                    placeholder="Parameter (e.g. Recovery Rate)" 
                    value={spec.key}
                    onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input 
                    placeholder="Value (e.g. 50-60%)" 
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setFormData({...formData, specifications: formData.specifications.filter((_, idx) => idx !== i)})}
                    className="text-red-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({...formData, specifications: [...formData.specifications, { key: '', value: '' }]})}
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
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Logistics Control</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Base Rate (₹)</Label>
                  <Input 
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Offer Rate (₹)</Label>
                  <Input 
                    type="number" 
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({...formData, offerPrice: parseFloat(e.target.value)})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">SKU ID</Label>
                  <Input 
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold uppercase" 
                  />
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
              </div>

              <Separator className="bg-slate-100" />

              <div className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Featured Asset</p>
                  <p className="text-[9px] font-bold text-slate-400 leading-tight">Highlight on homepage solutions</p>
                </div>
                <Switch 
                  checked={formData.featured}
                  onCheckedChange={(val) => setFormData({...formData, featured: val})}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">System Rating (1-5)</Label>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-400 fill-current" />
                  <Input 
                    type="number" 
                    min={1} max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-lg shadow-2xl shadow-primary/20 border-none transition-all"
          >
            {loading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <><Save className="mr-3 h-6 w-6" /> Publish Entry</>
            )}
          </Button>
        </aside>
      </form>
    </div>
  );
}

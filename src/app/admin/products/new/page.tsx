'use client';

import { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  LayoutGrid,
  Upload,
  Info,
  Layers,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

const CATEGORY_GUIDES: Record<string, string> = {
  "Industrial Products": "Focus on high-capacity scale. Recommended banner: 1920x800px.",
  "Components & Spare Parts": "Focus on mechanical detail. Use clear product-on-white backgrounds.",
  "Domestic Products": "Lifestyle-oriented visuals. Show the unit in modern environments.",
  "Filters & Chemicals": "Clear packaging shots or technical media diagrams recommended."
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
    specifications: [{ key: '', value: '' }],
    images: {
      thumbnail: '',
      hover: '',
      bannerDesktop: '',
      bannerMobile: '',
      gallery: [] as string[]
    }
  });

  useEffect(() => {
    const slug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  }, [formData.name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    if (!formData.name || !formData.images.thumbnail) {
      toast({ variant: 'destructive', title: 'Action Required', description: 'Product title and primary image are mandatory.' });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, 'products'), {
        ...formData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast({ title: 'Success', description: 'Technical asset has been added to the master ledger.' });
      router.push('/admin/products');
    } catch (e) {
      toast({ variant: 'destructive', title: 'System Error', description: 'Failed to commit asset to the database.' });
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

  const addGalleryImage = () => {
    setFormData({ ...formData, images: { ...formData.images, gallery: [...formData.images.gallery, ''] } });
  };

  const updateGalleryImage = (index: number, value: string) => {
    const newGallery = [...formData.images.gallery];
    newGallery[index] = value;
    setFormData({ ...formData, images: { ...formData.images, gallery: newGallery } });
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = formData.images.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, images: { ...formData.images, gallery: newGallery } });
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Sticky Command Bar */}
      <div className="sticky top-0 z-50 -mx-4 md:-mx-8 px-4 md:px-8 py-4 bg-white/80 backdrop-blur-md border-b flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-black font-headline text-slate-900 uppercase tracking-tight leading-none">New Product Registry</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SaaS Asset Management Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.back()} className="font-bold uppercase text-[10px] tracking-widest">Discard</Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
            className="h-11 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 border-none transition-all"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        <div className="lg:col-span-8 space-y-8">
          {/* Identity HUB */}
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Product Identity</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Classification & descriptions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Product Title</Label>
                <Input 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-primary/20 text-lg" 
                  placeholder="Enter Product Name" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Primary Hub Category</Label>
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
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Technical Subcategory</Label>
                  <Select onValueChange={(val) => setFormData({...formData, subcategory: val})} value={formData.subcategory}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select Product Subcategory" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {(SUBCATEGORIES[formData.category] || []).map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Short Description</Label>
                <Input 
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                  placeholder="Enter one-line technical summary" 
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Technical Overview</Label>
                <Textarea 
                  className="min-h-[160px] rounded-2xl bg-slate-50 border-none font-bold p-6 focus:ring-2 focus:ring-primary/20 text-sm leading-relaxed" 
                  placeholder="Enter comprehensive engineering details..." 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Assets HUB */}
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Visual Identity</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Product media hub</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex gap-4 items-start">
                <Info className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-sky-900 tracking-wider">Visual Guide</p>
                  <p className="text-xs font-bold text-sky-600/80">{CATEGORY_GUIDES[formData.category] || "Ensure high-contrast, professional product photography."}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <LayoutGrid className="h-3 w-3" /> Primary Product Image (URL)
                    </Label>
                    <Input 
                      required 
                      value={formData.images.thumbnail}
                      onChange={(e) => setFormData({...formData, images: { ...formData.images, thumbnail: e.target.value }})}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                      placeholder="Paste main image URL" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <Layers className="h-3 w-3" /> Catalog Hover Visual (URL)
                    </Label>
                    <Input 
                      value={formData.images.hover}
                      onChange={(e) => setFormData({...formData, images: { ...formData.images, hover: e.target.value }})}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                      placeholder="Paste hover image URL" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <Monitor className="h-3 w-3" /> Desktop Banner (URL)
                    </Label>
                    <Input 
                      value={formData.images.bannerDesktop}
                      onChange={(e) => setFormData({...formData, images: { ...formData.images, bannerDesktop: e.target.value }})}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                      placeholder="Paste desktop banner URL" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <Smartphone className="h-3 w-3" /> Mobile Optimized Banner (URL)
                    </Label>
                    <Input 
                      value={formData.images.bannerMobile}
                      onChange={(e) => setFormData({...formData, images: { ...formData.images, bannerMobile: e.target.value }})}
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold text-xs" 
                      placeholder="Paste mobile banner URL" 
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-50" />

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Multi-Asset Gallery</Label>
                <div className="grid grid-cols-1 gap-4">
                  {formData.images.gallery.map((url, i) => (
                    <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2">
                      <Input 
                        placeholder="Additional Technical Image URL" 
                        value={url}
                        onChange={(e) => updateGalleryImage(i, e.target.value)}
                        className="h-12 rounded-xl bg-slate-50 border-none font-bold text-xs flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeGalleryImage(i)}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addGalleryImage}
                    className="w-full h-14 rounded-2xl border-dashed border-slate-200 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all gap-2"
                  >
                    <Upload className="h-4 w-4" /> Append Gallery Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          {/* Inventory & Pricing */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden sticky top-24">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-600 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Inventory & Pricing</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Logistics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Standard Rate (₹)</Label>
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
                  <Input value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-none font-bold uppercase" placeholder="AQ-XXXX" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Stock Level</Label>
                  <Input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                </div>
              </div>

              <Separator className="bg-slate-50" />

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Highlight Asset</p>
                    <p className="text-[9px] font-bold text-slate-400">Featured collection</p>
                  </div>
                  <Switch checked={formData.featured} onCheckedChange={(v) => setFormData({...formData, featured: v})} />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 -skew-x-12 translate-x-10 -translate-y-10" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 relative z-10">System Visibility</p>
                <p className="text-xs font-bold leading-relaxed text-slate-300 relative z-10">Assets are immediately published to the master catalog upon saving.</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Specifications HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-600 text-white">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-sm">Engineering Matrix</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold tracking-widest">Technical parameters</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {formData.specifications.map((spec, i) => (
                <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2">
                  <Input 
                    placeholder="Parameter (e.g. TDS Rejection)" 
                    value={spec.key}
                    onChange={(e) => updateSpec(i, 'key', e.target.value)}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold flex-1"
                  />
                  <Input 
                    placeholder="Value (e.g. 98%)" 
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeSpec(i)}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addSpec}
                className="w-full h-16 rounded-2xl border-dashed border-slate-200 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:border-amber-500 hover:text-amber-500 transition-all"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Parameter Entry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


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
  Search
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
      toast({ variant: 'destructive', title: 'Publication Failed', description: 'Database sync error. Check security permissions.' });
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
          {/* Core Info */}
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val})} defaultValue="Commercial">
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Commercial">Commercial / Industrial</SelectItem>
                      <SelectItem value="Domestic">Domestic / Residential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Asset Type</Label>
                  <Select onValueChange={(val) => setFormData({...formData, type: val})} defaultValue="Product">
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Product">Main Unit / Plant</SelectItem>
                      <SelectItem value="Spare">Technical Spare Part</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Brand Hub</Label>
                  <Input 
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="h-14 rounded-2xl bg-slate-50 border-none font-bold" 
                    placeholder="e.g. Dow / Pentair" 
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

          {/* Technical Matrix */}
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

          {/* Multi-Media Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-slate-800 text-white p-6">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Image Assets</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.images.map((img, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative">
                    <Input 
                      placeholder="Image URL (Public)" 
                      value={img.url}
                      onChange={(e) => updateAsset(i, 'images', 'url', e.target.value)}
                      className="h-10 rounded-lg border-none font-bold text-xs"
                    />
                    <Input 
                      placeholder="Asset Caption" 
                      value={img.caption}
                      onChange={(e) => updateAsset(i, 'images', 'caption', e.target.value)}
                      className="h-10 rounded-lg border-none font-bold text-xs"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setFormData({...formData, images: [...formData.images, { url: '', caption: '' }]})}
                  className="w-full text-primary font-black uppercase text-[9px] tracking-widest"
                >
                  <Plus className="mr-2 h-3 w-3" /> Add Image Slot
                </Button>
              </CardContent>
            </Card>

            {/* Videos */}
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-slate-800 text-white p-6">
                <div className="flex items-center gap-3">
                  <VideoIcon className="h-4 w-4 text-primary" />
                  <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">Technical Videos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.videos.map((vid, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative">
                    <Input 
                      placeholder="YouTube / Video URL" 
                      value={vid.url}
                      onChange={(e) => updateAsset(i, 'videos', 'url', e.target.value)}
                      className="h-10 rounded-lg border-none font-bold text-xs"
                    />
                    <Input 
                      placeholder="Video Caption" 
                      value={vid.caption}
                      onChange={(e) => updateAsset(i, 'videos', 'caption', e.target.value)}
                      className="h-10 rounded-lg border-none font-bold text-xs"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setFormData({...formData, videos: formData.videos.filter((_, idx) => idx !== i)})}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setFormData({...formData, videos: [...formData.videos, { url: '', caption: '' }]})}
                  className="w-full text-primary font-black uppercase text-[9px] tracking-widest"
                >
                  <Plus className="mr-2 h-3 w-3" /> Add Video Slot
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          {/* Commercial Logistics */}
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

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Technical Tags</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input 
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="Separate with commas..."
                    className="h-12 pl-10 rounded-xl bg-slate-50 border-none font-bold" 
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

          {/* SEO Hub */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-primary" />
                <CardTitle className="font-black font-headline uppercase tracking-tight text-xs">SEO Matrix</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">SEO Title</Label>
                <Input 
                  value={formData.seo.title}
                  onChange={(e) => setFormData({...formData, seo: {...formData.seo, title: e.target.value}})}
                  className="h-10 rounded-lg bg-slate-50 border-none font-bold text-xs" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">SEO Description</Label>
                <Textarea 
                  value={formData.seo.description}
                  onChange={(e) => setFormData({...formData, seo: {...formData.seo, description: e.target.value}})}
                  className="rounded-lg bg-slate-50 border-none font-bold text-xs p-3" 
                />
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

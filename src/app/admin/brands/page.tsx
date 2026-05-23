
'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { 
  Plus, 
  Trash2, 
  Award, 
  ExternalLink,
  Loader2,
  Globe
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

export default function AdminBrandsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newBrand, setNewBrand] = useState({
    name: '',
    logoUrl: '',
    description: '',
    website: '',
    featured: false
  });

  const brandsRef = useMemo(() => firestore ? collection(firestore, 'brands') : null, [firestore]);
  const { data: brands, loading } = useCollection(brandsRef);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setSubmitting(true);

    try {
      await addDoc(collection(firestore, 'brands'), {
        ...newBrand,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Brand Added', description: 'Technical partner list updated.' });
      setIsAddOpen(false);
      setNewBrand({ name: '', logoUrl: '', description: '', website: '', featured: false });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Check security permissions.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Permanently remove this technical partner?')) {
      try {
        await deleteDoc(doc(firestore, 'brands', id));
        toast({ title: 'Partner Removed' });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Delete Failed' });
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Brand <span className="text-primary">Partners</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing technical component manufacturers</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2rem] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-black font-headline uppercase tracking-tight">New Partner Identity</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Brand Name</Label>
                <Input 
                  required 
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                  placeholder="e.g. Dow Filmtec"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Logo URL (Public)</Label>
                <Input 
                  required 
                  value={newBrand.logoUrl}
                  onChange={(e) => setNewBrand({...newBrand, logoUrl: e.target.value})}
                  placeholder="https://sirv.com/logo.png"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Official Website</Label>
                <Input 
                  value={newBrand.website}
                  onChange={(e) => setNewBrand({...newBrand, website: e.target.value})}
                  placeholder="https://brand.com"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Brief Engineering Profile</Label>
                <Input 
                  required
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({...newBrand, description: e.target.value})}
                  placeholder="e.g. Global leader in membrane technology..."
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-900 tracking-wider">Featured Partner</p>
                  <p className="text-[9px] font-bold text-slate-400">Display prominently in catalog</p>
                </div>
                <Switch 
                  checked={newBrand.featured}
                  onCheckedChange={(v) => setNewBrand({...newBrand, featured: v})}
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalize Partner Registration"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands?.map((brand: any) => (
            <Card key={brand.id} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-xl transition-all bg-white border border-slate-100">
              <CardContent className="p-6 space-y-4">
                <div className="relative aspect-video rounded-xl bg-slate-50 flex items-center justify-center p-4">
                  <img src={brand.logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain" />
                  {brand.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-white border-none uppercase text-[8px] font-black tracking-widest">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase">{brand.name}</h3>
                    <div className="flex gap-1">
                      {brand.website && (
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary">
                          <a href={brand.website} target="_blank" rel="noopener noreferrer"><Globe className="h-3.5 w-3.5" /></a>
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDelete(brand.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed line-clamp-2">
                    {brand.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {brands?.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <Award className="h-12 w-12 text-slate-200 mx-auto" />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">No partners registered</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

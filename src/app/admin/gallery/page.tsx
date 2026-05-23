
'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  X,
  Search,
  Upload,
  Loader2
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AdminGalleryPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newItem, setNewItem] = useState({
    url: '',
    type: 'image',
    description: '',
    category: 'Installation'
  });

  const galleryRef = useMemo(() => firestore ? collection(firestore, 'gallery') : null, [firestore]);
  const { data: items, loading } = useCollection(galleryRef);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setSubmitting(true);

    try {
      await addDoc(collection(firestore, 'gallery'), {
        ...newItem,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Media Added', description: 'Gallery hub has been updated.' });
      setIsAddOpen(false);
      setNewItem({ url: '', type: 'image', description: '', category: 'Installation' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Check security permissions.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Permanently remove this technical asset?')) {
      try {
        await deleteDoc(doc(firestore, 'gallery', id));
        toast({ title: 'Asset Removed' });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Delete Failed' });
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Gallery <span className="text-primary">Hub</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing industrial site documentation and media</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Add Media Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2rem] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-black font-headline uppercase tracking-tight">Technical Asset Upload</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Resource URL (Public)</Label>
                <Input 
                  required 
                  value={newItem.url}
                  onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                  placeholder="https://sirv.com/your-image.jpg"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Media Type</Label>
                  <Select value={newItem.type} onValueChange={(v) => setNewItem({...newItem, type: v})}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Category</Label>
                  <Select value={newItem.category} onValueChange={(v) => setNewItem({...newItem, category: v})}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Installation">Installation</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="STP/ETP">STP/ETP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Technical Description</Label>
                <Input 
                  required
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="e.g. 500 LPH Plant Commissioning at Pharma Site"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finalize Upload"}
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
          {items?.map((item: any) => (
            <Card key={item.id} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-xl transition-all">
              <CardContent className="p-0 relative aspect-square">
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <VideoIcon className="h-12 w-12 text-white/20" />
                  </div>
                ) : (
                  <img src={item.url} alt={item.description} className="w-full h-full object-cover" />
                )}
                
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleDelete(item.id)}
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Badge className="bg-primary text-white border-none uppercase text-[8px] font-black tracking-widest mb-2">
                      {item.category}
                    </Badge>
                    <p className="text-white text-xs font-bold leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {items?.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <ImageIcon className="h-12 w-12 text-slate-200 mx-auto" />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Hub Storage Empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

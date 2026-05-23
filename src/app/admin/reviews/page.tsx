
'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { 
  Plus, 
  Trash2, 
  Star, 
  CheckCircle,
  Clock,
  Loader2,
  MessageSquare,
  User
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
import { cn } from '@/lib/utils';

export default function AdminReviewsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    status: 'Approved'
  });

  const reviewsRef = useMemo(() => firestore ? collection(firestore, 'reviews') : null, [firestore]);
  const { data: reviews, loading } = useCollection(reviewsRef);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setSubmitting(true);

    try {
      await addDoc(collection(firestore, 'reviews'), {
        ...newReview,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Feedback Recorded', description: 'Review hub updated.' });
      setIsAddOpen(false);
      setNewReview({ customerName: '', rating: 5, comment: '', status: 'Approved' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Post Failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    if (!firestore) return;
    const newStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
    try {
      await updateDoc(doc(firestore, 'reviews', id), { status: newStatus });
      toast({ title: `Review ${newStatus}` });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Update Failed' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (confirm('Permanently remove this customer feedback?')) {
      try {
        await deleteDoc(doc(firestore, 'reviews', id));
        toast({ title: 'Review Removed' });
      } catch (e) {
        toast({ variant: 'destructive', title: 'Delete Failed' });
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Technical <span className="text-primary">Reviews</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing customer satisfaction and feedback</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" /> Add Manual Review
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2rem] sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-black font-headline uppercase tracking-tight">Customer Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Customer Identity</Label>
                <Input 
                  required 
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({...newReview, customerName: e.target.value})}
                  placeholder="e.g. Operations Manager, TechPharma"
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Technical Rating (1-5)</Label>
                <Input 
                  type="number" min="1" max="5" required 
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400">Testimonial Brief</Label>
                <Input 
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="e.g. The RO plant setup was efficient and precise..."
                  className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publish Feedback"}
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
          {reviews?.map((review: any) => (
            <Card key={review.id} className="border-none shadow-sm rounded-3xl overflow-hidden bg-white border border-slate-100">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-4 w-4", i < review.rating ? "fill-current" : "text-slate-200")} />
                    ))}
                  </div>
                  <Badge className={cn(
                    "text-[8px] font-black uppercase tracking-widest border-none px-2",
                    review.status === 'Approved' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {review.status}
                  </Badge>
                </div>
                
                <p className="text-sm font-bold text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase">{review.customerName}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified Customer</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => toggleStatus(review.id, review.status)}
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-xl text-slate-300 hover:text-primary"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => handleDelete(review.id)}
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-xl text-slate-300 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {reviews?.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <MessageSquare className="h-12 w-12 text-slate-200 mx-auto" />
              <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Feedback hub empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

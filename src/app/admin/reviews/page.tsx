
'use client';

import { Star } from 'lucide-react';

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[60vh] flex flex-col items-center justify-center">
      <div className="p-6 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 flex flex-col items-center gap-6">
        <div className="h-16 w-16 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500">
          <Star className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black font-headline uppercase tracking-tight">Customer Reviews</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Technical Feedback Hub Incoming</p>
        </div>
      </div>
    </div>
  );
}


'use client';

import { Award } from 'lucide-react';

export default function AdminBrandsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[60vh] flex flex-col items-center justify-center">
      <div className="p-6 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 flex flex-col items-center gap-6">
        <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
          <Award className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black font-headline uppercase tracking-tight">Brand Partnerships</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Strategic Hub Module Incoming</p>
        </div>
      </div>
    </div>
  );
}

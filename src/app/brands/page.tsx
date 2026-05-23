
"use client"

import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import { ShieldCheck, Award, Zap, CheckCircle2, Loader2, Info } from "lucide-react";
import Image from "next/image";

export default function BrandsPage() {
  const firestore = useFirestore();
  
  const brandsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "brands"), orderBy("name", "asc"));
  }, [firestore]);

  const { data: brands, loading } = useCollection(brandsQuery);

  return (
    <div className="min-h-screen py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <Award className="h-4 w-4" />
            Strategic Partnerships
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline text-slate-900 tracking-tight">Our Trusted Brands</h1>
          <p className="text-slate-600 text-lg font-bold">
            We partner with the world's leading technology providers to ensure every AquaSafe installation delivers unmatched purity and performance.
          </p>
        </div>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Technical Partners...</p>
          </div>
        ) : brands && brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand: any, i) => (
              <div key={brand.id} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 -skew-x-12 translate-x-12 pointer-events-none group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-8">
                  <Image 
                    src={brand.logoUrl} 
                    alt={brand.name} 
                    fill 
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black font-headline text-slate-900 uppercase leading-none">{brand.name}</h3>
                    {brand.featured && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded">
                        Tier 1 Partner
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed">
                    {brand.description}
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certified Technical Partner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[3rem] border border-slate-100 space-y-6">
            <Info className="h-12 w-12 text-slate-200 mx-auto" />
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Partner Registry Empty</p>
          </div>
        )}

        {/* Technical Excellence Banner */}
        <div className="mt-24 p-12 md:p-16 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black font-headline leading-tight uppercase">Engineering Only with the Best</h2>
              <p className="text-xl font-bold text-slate-400 leading-relaxed max-w-lg">
                We believe that the foundation of high-purity water lies in the components we use. That's why we never compromise on brand quality.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest">100% Genuine Spares</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest">High Efficiency Systems</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[
                "Membranes", "High-Pressure Pumps", "Control Systems", "Filtration Media"
               ].map((item, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                   <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Category {i+1}</p>
                   <p className="text-lg font-black font-headline uppercase">{item}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

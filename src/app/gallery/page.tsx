
"use client"

import { useCollection, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import InteractiveBentoGallery, { type MediaItemType } from "@/components/ui/bento-gallery";
import { Loader2, ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const firestore = useFirestore();
  
  const galleryQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "gallery"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: items, loading } = useCollection(galleryQuery);

  // Transform Firestore data to Bento Gallery format
  const galleryData: MediaItemType[] = useMemo(() => {
    if (!items) return [];
    return items.map((item: any, index: number) => ({
      id: item.id,
      type: item.type || 'image',
      title: item.category || 'Technical Installation',
      desc: item.description || '',
      url: item.url,
      // Create a pattern for spans based on index
      span: index % 5 === 0 ? 'sm:col-span-2 sm:row-span-4' : 
            index % 3 === 0 ? 'sm:col-span-2 sm:row-span-3' : 'sm:col-span-1 sm:row-span-2'
    }));
  }, [items]);

  return (
    <div className="min-h-screen py-20 bg-white">
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Media Hub...</p>
        </div>
      ) : galleryData.length > 0 ? (
        <InteractiveBentoGallery 
          title="Technical Installation Gallery" 
          description="A visual journey through our technical excellence in water and wastewater treatment projects."
          mediaItems={galleryData}
        />
      ) : (
        <div className="container mx-auto px-4 max-w-4xl text-center py-20 space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto text-slate-200">
            <ImageIcon className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Gallery Empty</h2>
          <p className="text-slate-500 font-bold max-w-sm mx-auto">
            Our engineering team is currently documenting new site installations. Please check back soon for technical updates.
          </p>
        </div>
      )}
      
      {/* Bottom CTA */}
      <div className="container mx-auto px-4 max-w-4xl mt-20 text-center">
        <div className="p-12 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
          <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight text-gradient uppercase">Inspired by our engineering?</h2>
          <p className="text-slate-600 font-bold max-w-lg mx-auto leading-relaxed">
            Every installation we do is custom-engineered to solve specific water quality challenges. Get in touch for your technical assessment.
          </p>
          <a 
            href="/contact" 
            className="inline-flex h-12 items-center px-8 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[11px] hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}

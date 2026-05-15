
"use client"

import InteractiveBentoGallery, { type MediaItemType } from "@/components/ui/bento-gallery";

const GALLERY_DATA: MediaItemType[] = [
  {
    id: 1,
    type: 'image',
    title: 'Industrial RO Installation',
    desc: 'Large scale 10,000 LPH RO plant for a pharmaceutical manufacturing unit in Visakhapatnam.',
    url: 'https://picsum.photos/seed/ro-ind-1/1200/800',
    span: 'sm:col-span-2 sm:row-span-4'
  },
  {
    id: 2,
    type: 'image',
    title: 'Hospital Water System',
    desc: 'Pure water system designed for a local multispecialty hospital.',
    url: 'https://picsum.photos/seed/ro-hosp/800/600',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 3,
    type: 'image',
    title: 'Compact STP Unit',
    desc: 'New evolution of sewage wastewater treatment for high-rise residential buildings.',
    url: 'https://picsum.photos/seed/stp-comp/800/600',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 4,
    type: 'image',
    title: 'Commercial RO Plant',
    desc: 'Professional RO setup for a leading hotel chain, providing crystal clear water.',
    url: 'https://picsum.photos/seed/comm-ro-2/800/600',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 5,
    type: 'image',
    title: 'Effluent Treatment Plant',
    desc: 'Customized ETP plant for industrial chemical processing units.',
    url: 'https://picsum.photos/seed/etp-3/800/600',
    span: 'sm:col-span-2 sm:row-span-3'
  },
  {
    id: 6,
    type: 'image',
    title: 'Domestic Under-sink Setup',
    desc: 'Sleek and compact residential RO installation for modern kitchens.',
    url: 'https://picsum.photos/seed/dom-under/600/800',
    span: 'sm:col-span-1 sm:row-span-3'
  },
  {
    id: 7,
    type: 'image',
    title: 'Power Plant Filtration',
    desc: 'High-performance filtration system for a major power generation facility.',
    url: 'https://picsum.photos/seed/power-ro/800/600',
    span: 'sm:col-span-1 sm:row-span-2'
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-20 bg-white">
      <InteractiveBentoGallery 
        title="Installation Gallery" 
        description="A visual journey through our technical excellence in water and wastewater treatment projects across India."
        mediaItems={GALLERY_DATA}
      />
      
      {/* Bottom CTA */}
      <div className="container mx-auto px-4 max-w-4xl mt-20 text-center">
        <div className="p-12 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-6">
          <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight">Inspired by our work?</h2>
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

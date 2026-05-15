
"use client"

import InteractiveBentoGallery, { type MediaItemType } from "@/components/ui/bento-gallery";

const GALLERY_DATA: MediaItemType[] = [
  {
    id: 1,
    type: 'image',
    title: 'Advanced PLC Control Panel',
    desc: 'State-of-the-art automated monitoring system for industrial RO plants, ensuring 24/7 precision control.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2004_01_45%20PM.png',
    span: 'sm:col-span-2 sm:row-span-4'
  },
  {
    id: 2,
    type: 'image',
    title: 'High-Pressure Membrane Assembly',
    desc: 'Precision-engineered membrane housings designed for maximum durability in high-TDS environments.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_52%20PM.png',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 3,
    type: 'image',
    title: 'Multi-Stage Pre-Filtration',
    desc: 'Heavy-duty filtration modules designed to protect RO membranes and extend plant lifespan.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_50%20PM.png',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 4,
    type: 'image',
    title: 'Technical Site Inspection',
    desc: 'Our senior engineers performing on-site calibration and performance audits for a major manufacturing client.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_48%20PM.png',
    span: 'sm:col-span-1 sm:row-span-2'
  },
  {
    id: 5,
    type: 'image',
    title: 'Modular Commercial System',
    desc: 'Compact and space-efficient RO installation tailored for healthcare and hospitality sectors.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2003_59_45%20PM.png',
    span: 'sm:col-span-2 sm:row-span-3'
  },
  {
    id: 6,
    type: 'image',
    title: 'Compact STP Unit',
    desc: 'Innovative wastewater treatment solutions with minimal footprint for residential complexes.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_44_42%20PM.png',
    span: 'sm:col-span-1 sm:row-span-3'
  },
  {
    id: 7,
    type: 'image',
    title: 'Custom Plant Commissioning',
    desc: 'Successful handover of a customized effluent treatment plant for an industrial processing unit.',
    url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_57_02%20PM.png',
    span: 'sm:col-span-1 sm:row-span-2'
  }
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-20 bg-white">
      <InteractiveBentoGallery 
        title="Technical Installation Gallery" 
        description="A visual journey through our technical excellence in water and wastewater treatment projects across India."
        mediaItems={GALLERY_DATA}
      />
      
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

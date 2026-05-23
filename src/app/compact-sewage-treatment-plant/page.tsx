
"use client"

import Image from "next/image";
import Link from "next/link";
import { 
  Waves, 
  ShieldCheck, 
  Settings, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Factory,
  Droplets,
  Microscope,
  Construction,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function STPDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-slate-900 text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        >
          <source src="https://aquasaferoworks.sirv.com/Water_flowing_through_industrial%E2%80%A6_202605190922.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              Advanced Recycling Systems
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tight leading-[1.05] uppercase">
              Compact <span className="text-primary">STP</span> <br />Plants
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-bold leading-relaxed max-w-2xl">
              Engineering the next generation of modular Sewage Treatment Plants designed for 100% water recovery and environmental compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 border-none">
                <Link href="/contact">Enquire for Site Survey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Visual */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black font-headline text-slate-900 uppercase tracking-tight">System Overview</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed">
                Our Compact STP Plants utilize advanced biological treatment combined with high-precision filtration to convert raw sewage into clear, reusable water. Designed for high-rise residential complexes, hospitals, and industrial hubs where space is at a premium.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Zero Odor", icon: Waves },
                  { title: "Modular Design", icon: Settings },
                  { title: "Low Footprint", icon: Construction },
                  { title: "Fully Automated", icon: Zap }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <f.icon className="h-6 w-6 text-primary" />
                    <span className="font-black uppercase tracking-tight text-xs">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-slate-50">
                <Image 
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_44_42%20PM.png"
                  alt="Compact STP Unit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tight">The Engineering Flow</h2>
            <p className="text-slate-400 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">A 4-Stage Precision Biological Treatment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { id: "01", title: "Primary Screening", desc: "Removal of large floating particles and inorganic debris." },
              { id: "02", title: "Aeration Zone", desc: "Biological decomposition using high-efficiency diffusers." },
              { id: "03", title: "Clarification", desc: "Sedimentation and separation of activated sludge." },
              { id: "04", title: "Disinfection", desc: "Final UV/Ozone treatment for pathogen-free recovery." }
            ].map((step, i) => (
              <div key={i} className="space-y-6 group">
                <div className="text-6xl font-black font-headline text-white/10 group-hover:text-primary transition-colors">{step.id}</div>
                <h4 className="text-xl font-black uppercase tracking-tight">{step.title}</h4>
                <p className="text-sm text-slate-400 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications & Gallery */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Deployment Areas</h2>
                <p className="text-slate-500 font-bold leading-relaxed">Our systems are versatile and compliant with Global Environment Standards.</p>
              </div>
              <ul className="space-y-4">
                {["Residential High-Rises", "Corporate IT Parks", "Multi-Speciality Hospitals", "Hotels & Resorts", "Industrial Manufacturing Units"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-slate-900">
                    <CheckCircle2 className="h-5 w-5 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
                <Microscope className="h-10 w-10 text-primary" />
                <h4 className="font-black uppercase tracking-tight">Lab Certified</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed">All effluent water meets or exceeds ISO 14001:2015 discharge norms.</p>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-lg">
                  <Image src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png" alt="Installation 1" fill className="object-cover" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden relative shadow-lg mt-12">
                  <Image src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_57_02%20PM.png" alt="Installation 2" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black font-headline text-slate-900 text-center mb-16 uppercase tracking-tight">Technical FAQ</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-slate-50 border-slate-100">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">What is the space requirement for a compact STP?</AccordionTrigger>
              <AccordionContent className="text-slate-500 font-bold pb-6">
                Our compact units require 40% less space than conventional systems. For a 50 KLD plant, roughly 40-50 sq. meters is sufficient.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-slate-50 border-slate-100">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">Is the recovered water safe for gardening?</AccordionTrigger>
              <AccordionContent className="text-slate-500 font-bold pb-6">
                Yes, the effluent is highly treated through biological filters and UV disinfection, making it completely safe for non-potable reuse like gardening and flushing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-24 p-12 rounded-[3rem] bg-slate-900 text-white text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
             <div className="relative z-10 space-y-6">
               <h3 className="text-3xl md:text-5xl font-black font-headline uppercase tracking-tight">Ready for Engineering Audit?</h3>
               <p className="text-slate-400 font-bold max-w-xl mx-auto">Contact our senior engineering team today for a custom technical assessment of your site requirements.</p>
               <Button asChild className="h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 border-none transition-all">
                 <Link href="/contact">Get Technical Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
               </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

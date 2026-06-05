
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
              STP Plant <span className="text-primary">Manufacturer</span> <br />in Vizag
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-bold leading-relaxed max-w-2xl">
              Engineering the next generation of modular Sewage Treatment Plants designed for 100% water recovery and environmental compliance in Visakhapatnam.
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
                Our Compact STP Plants utilize advanced biological treatment combined with high-precision filtration to convert raw sewage into clear, reusable water. Designed for high-rise residential complexes, hospitals, and industrial hubs in Gajuwaka and across Vizag.
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
                  alt="Compact STP Unit Manufacturer Vizag"
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

      {/* Enterprise SEO Content Block */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight text-slate-900 mb-8">Expert STP Plant Manufacturer & Installation in Visakhapatnam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 font-bold text-sm leading-relaxed">
              <div className="space-y-6">
                <p>
                  As the leading <strong>STP plant manufacturer in Vizag</strong>, Aqua Safe Water Technologies provides comprehensive sewage treatment solutions tailored for the unique climatic and industrial requirements of Andhra Pradesh. Our engineering team specializes in the design, fabrication, and commissioning of modular Sewage Treatment Plants (STP) that adhere to the strictest environmental standards set by the Central Pollution Control Board (CPCB).
                </p>
                <p>
                  Why choose our sewage treatment solutions in Visakhapatnam? In a rapidly growing city like Vizag, water scarcity and waste management are critical challenges. Our compact STP units are engineered for high-density areas like Gajuwaka, Madhurawada, and Rishikonda, where space is a premium. We utilize <strong>MBBR (Moving Bed Biofilm Reactor)</strong> and <strong>SBR (Sequential Batch Reactor)</strong> technologies to ensure maximum biological efficiency and consistent output quality.
                </p>
                <p>
                  Our installation services in Vizag include a detailed site assessment, hydraulic design, and post-installation operator training. We don't just sell equipment; we provide long-term environmental sustainability. With our systems, residential complexes and commercial establishments can reclaim up to 100% of their greywater for secondary purposes such as landscape irrigation, toilet flushing, and cooling tower make-up.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  Technical specifications of our STP plants include high-efficiency air diffusers, non-clogging sludge pumps, and automated PLC-based control panels. This automation reduces the need for constant manual monitoring and ensures that the plant parameters remain within safe discharge limits at all times.
                </p>
                <p>
                  Searching for <em>"STP plant installation near me"</em> in Vizag? Aqua Safe is your local partner. We provide rapid deployment and localized AMC (Annual Maintenance Contract) support to ensure your waste treatment system remains operational 24/7. Our service network covers the entire Visakhapatnam district, ensuring that technical support is always just a phone call away.
                </p>
                <p>
                  For industrial units in Visakhapatnam, our sewage treatment plants are designed to handle variable organic loads, ensuring that your facility remains compliant with state pollution board norms. We offer turnkey solutions from conceptual design to lab-certified final discharge testing, making us the most trusted STP company in Andhra Pradesh.
                </p>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-slate-200">
              <h3 className="text-2xl font-black font-headline uppercase tracking-tight text-slate-900 mb-8 text-center">Frequently Asked Questions About STP in Vizag</h3>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="seo-1" className="border rounded-2xl px-6 bg-white">
                  <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">What is the cost of an STP plant in Visakhapatnam?</AccordionTrigger>
                  <AccordionContent className="text-slate-500 font-bold pb-6">
                    The cost depends on the capacity (KLD) and the technology used (MBBR, SBR, or MBR). For a standard residential high-rise in Vizag, we offer competitive turnkey pricing that includes design, equipment, and installation. Contact us for a detailed site-specific quote.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="seo-2" className="border rounded-2xl px-6 bg-white">
                  <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">Do you provide STP maintenance services in Gajuwaka?</AccordionTrigger>
                  <AccordionContent className="text-slate-500 font-bold pb-6">
                    Yes, we provide specialized STP maintenance and AMC services across Gajuwaka and the Vizag industrial belt. Our team handles pump repairs, membrane cleaning, and biological culture management to keep your plant in peak condition.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="seo-3" className="border rounded-2xl px-6 bg-white">
                  <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">Which STP technology is best for apartments in Vizag?</AccordionTrigger>
                  <AccordionContent className="text-slate-500 font-bold pb-6">
                    For residential apartments in Vizag, MBBR technology is often preferred due to its compact footprint and ease of operation. However, for higher discharge standards, MBR (Membrane Bioreactor) systems are recommended for 100% reusable output.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-12 rounded-[3rem] bg-slate-900 text-white text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
             <div className="relative z-10 space-y-6">
               <h3 className="text-3xl md:text-5xl font-black font-headline uppercase tracking-tight">Ready for Engineering Audit?</h3>
               <p className="text-slate-400 font-bold max-w-xl mx-auto">Contact our senior engineering team today for a custom technical assessment of your site requirements in Visakhapatnam.</p>
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

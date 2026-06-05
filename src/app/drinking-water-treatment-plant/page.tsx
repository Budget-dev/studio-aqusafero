
"use client"

import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Droplets, 
  Activity, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Heart,
  Microscope,
  Info,
  Layers,
  ThermometerSun,
  Settings,
  Factory
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function WTPDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ background: 'radial-gradient(circle at 50% 50%, white 0%, transparent 70%)' }} 
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px] backdrop-blur-md">
              Purity at Molecular Level
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tight leading-[1.05] uppercase">
              Industrial RO <br /><span className="text-slate-900">Plant Vizag</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold leading-relaxed max-w-2xl opacity-90">
              High-performance Reverse Osmosis and purification plants delivering WHO-standard drinking water for large-scale operations in Visakhapatnam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl border-none">
                <Link href="/contact">Request Purity Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-slate-50 bg-slate-100">
                <Image 
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png"
                  alt="Industrial RO Plant Manufacturer Vizag"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                  <span className="font-black uppercase tracking-tight text-xs">Health First</span>
                </div>
                <p className="text-xs font-bold text-slate-400">Our plants retain essential minerals while removing 99.9% of harmful TDS and bacteria from Visakhapatnam water sources.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black font-headline text-slate-900 uppercase tracking-tight">Technical Mastery</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed">
                AquaSafe Drinking Water Plants are engineered for reliability and precision. From source water analysis in our Vizag lab to final mineralization, we deliver engineering excellence.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Advanced RO Membranes", desc: "Using Tier-1 brands for maximum salt rejection.", icon: Layers },
                  { title: "UV/UF Sterilization", desc: "Redundant disinfection stages for safe output.", icon: ShieldCheck },
                  { title: "Instrumentation", desc: "Live TDS and flow monitoring via digital sensors.", icon: Activity }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 h-fit">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-xs mb-1">{item.title}</h4>
                      <p className="text-xs font-bold text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise SEO Content Block */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight text-slate-900 mb-8 text-center">Leading Industrial RO Plant Manufacturer in Visakhapatnam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 font-bold text-sm leading-relaxed">
              <div className="space-y-6">
                <p>
                  Searching for a reliable <strong>industrial RO plant manufacturer in Visakhapatnam</strong>? Aqua Safe Water Technologies provides enterprise-grade Reverse Osmosis (RO) systems for commercial, industrial, and institutional applications. With over two decades of experience, we have installed hundreds of water treatment plants across Vizag, ranging from 250 LPH to 100,000 LPH capacities.
                </p>
                <p>
                  Visakhapatnam's water quality varies significantly from the urban center of Gajuwaka to the surrounding industrial areas. Our technical expertise lies in analyzing local groundwater and municipal water chemistry to design the most efficient membrane-based purification systems. We use only high-performance membranes from global brands like Dow Filmtec, Hydranautics, and GE, ensuring maximum salt rejection and system longevity.
                </p>
                <p>
                  Our <strong>Drinking Water treatment plants</strong> are designed to meet <strong>BIS (IS 10500)</strong> and <strong>WHO standards</strong>. This makes them ideal for pharmaceutical production, food and beverage processing, hospital surgical units, and large corporate campus drinking water hubs. We incorporate multi-stage pre-filtration including sand, carbon, and softener systems to protect the core RO membranes from fouling.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  As an <strong>ISO 9001:2015 certified company</strong> based in Vizag, we prioritize quality and after-sales support. Our specialized repair and maintenance team in Gajuwaka is always ready to handle membrane clean-in-place (CIP) procedures, pump restorations, and automated sensor calibrations. We understand that water is mission-critical for your operations, and we guarantee 99.9% system uptime through our proactive AMC plans.
                </p>
                <p>
                  Beyond standard RO systems, we offer customized solutions for <strong>DM (Demineralized) plants</strong>, <strong>Ultrafiltration (UF)</strong>, and <strong>Alkaline water systems</strong>. For industries looking to optimize their water costs, our plants feature advanced reject water recovery modules, allowing for sustainable operations in water-stressed industrial zones.
                </p>
                <p>
                  Join our network of satisfied clients in Andhra Pradesh. From the HPCL refinery belt to the IT parks of Madhurawada, Aqua Safe is the trusted name for high-purity water. Contact our Vizag office today for a free water quality analysis and a detailed technical proposal for your upcoming water treatment project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Stage Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tight">Purification Blueprint</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pre-Treatment", steps: ["Sand Filtration", "Activated Carbon", "Antiscalant Dosing"], icon: Settings },
              { title: "Molecular Fusion", steps: ["High-Pressure Pumping", "RO Membrane Array", "TDS Modulation"], icon: Zap },
              { title: "Post-Processing", steps: ["UV Treatment", "Alkaline Remineralization", "Ozonation"], icon: Droplets }
            ].map((col, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <col.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{col.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">Execution Protocol</p>
                <ul className="space-y-3">
                  {col.steps.map((s, si) => (
                    <li key={si} className="flex items-center gap-3 font-bold text-sm text-slate-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black font-headline text-center mb-16 uppercase tracking-tight">Technical Specs FAQ</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-white/10 rounded-2xl px-6 bg-white/5">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline text-white">What is the maintenance cycle?</AccordionTrigger>
              <AccordionContent className="text-slate-400 font-bold pb-6">
                Standard maintenance (filter changes) occurs every 3-6 months. We provide automated reminders and predictive AMC auditing for industrial units in Vizag.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-white/10 rounded-2xl px-6 bg-white/5">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline text-white">Can the system handle high TDS source water?</AccordionTrigger>
              <AccordionContent className="text-slate-400 font-bold pb-6">
                Yes, our industrial-grade membranes can process source water with TDS up to 3000ppm and still deliver WHO-standard output for Visakhapatnam requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-20 flex flex-col items-center gap-8">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Need a full laboratory water test in Vizag?</p>
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20 border-none transition-all">
              <Link href="/contact">Connect with our Lab Hub</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

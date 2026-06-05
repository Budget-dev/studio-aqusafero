
"use client"

import Image from "next/image";
import Link from "next/link";
import { 
  Beaker, 
  ShieldAlert, 
  Settings, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Factory,
  TestTube,
  Activity,
  Cpu,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ETPDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-slate-900 text-white overflow-hidden border-b-4 border-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 z-0 grayscale" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge className="bg-red-500 hover:bg-red-600 text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              Industrial Compliance Master
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tight leading-[1.05] uppercase">
              ETP Plant <span className="text-primary">Supplier</span> <br />Andhra Pradesh
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-bold leading-relaxed max-w-2xl">
              High-performance Effluent Treatment Plants designed to neutralize industrial waste for pharma and chemical units in Visakhapatnam.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 border-none">
                <Link href="/contact">Book Technical Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-black font-headline text-slate-900 uppercase tracking-tight">Neutralizing Complexity</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed">
                Industrial effluent in the Vizag pharma hub often contains complex chemicals and heavy metals. Our ETP systems are custom-engineered to deliver safe, compliant discharge for Andhra Pradesh industries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Heavy Metal Removal", icon: Beaker },
                  { title: "pH Correction", icon: TestTube },
                  { title: "COD/BOD Reduction", icon: Activity },
                  { title: "Sludge Dewatering", icon: Settings }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <f.icon className="h-5 w-5 text-primary" />
                    <span className="font-black uppercase tracking-tight text-[10px]">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-slate-50 bg-slate-100">
                <Image 
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_57_02%20PM.png"
                  alt="Industrial ETP Plant Installation Vizag"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest px-4 py-1.5 bg-primary/10 rounded-full">
               <Cpu className="h-4 w-4" /> PLC Controlled Execution
             </div>
             <h2 className="text-4xl md:text-6xl font-black font-headline uppercase tracking-tight">Chemical Excellence Flow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: "01", title: "Homogenization", desc: "Equalizing the flow and concentration of influent effluent to ensure stable downstream treatment." },
              { id: "02", title: "Physico-Chemical", desc: "Precision dosing of coagulants and flocculants for the separation of suspended solids and heavy metals." },
              { id: "03", title: "Tertiary Polishing", desc: "Advanced carbon and resin filtration to meet stringent environmental board discharge limits." }
            ].map((step, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-white border border-slate-200 shadow-sm relative group hover:border-primary transition-all">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black font-headline text-lg shadow-lg">
                  {step.id}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 pt-4">{step.title}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise SEO Content Block */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black font-headline uppercase tracking-tight text-slate-900 mb-8">Premium ETP Plant Solutions for Industries in Andhra Pradesh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 font-bold text-sm leading-relaxed">
              <div className="space-y-6">
                <p>
                  Aqua Safe Water Technologies is recognized as the leading <strong>ETP plant supplier in Andhra Pradesh</strong>, specializing in high-performance effluent treatment solutions for the diverse industrial sectors of Visakhapatnam. Our systems are engineered to handle the complex wastewater generated by pharmaceutical units, chemical manufacturing facilities, and heavy engineering plants in the Vizag special economic zones.
                </p>
                <p>
                  Industrial compliance is no longer optional. With the strict enforcement of environmental regulations by the <strong>AP State Pollution Control Board (APPCB)</strong>, having a reliable Effluent Treatment Plant (ETP) is essential for operational continuity. We provide turnkey ETP solutions that focus on <strong>Zero Liquid Discharge (ZLD)</strong>, allowing industries to recycle waste water and minimize environmental footprint.
                </p>
                <p>
                  Our treatment methodologies include physico-chemical treatment, biological processes (AEROBIC & ANAEROBIC), and advanced tertiary polishing using multi-grade filters and activated carbon absorbers. We customize every plant based on a detailed <em>"Treatability Study"</em> of your specific effluent characteristics, ensuring that the final discharge parameters meet or exceed regulatory requirements.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  Why industries in Visakhapatnam trust Aqua Safe? Our localized presence in Gajuwaka allows us to provide rapid on-site technical support and spare parts availability. We understand the specific challenges of water salinity and chemical toxicity in the coastal industrial belt of Vizag, and our engineering reflects that expertise.
                </p>
                <p>
                  Key features of our industrial ETP systems include corrosion-resistant FRP or epoxy-coated MS tanks, specialized chemical dosing pumps, and automated instrumentation for real-time monitoring of pH, TDS, and flow rates. We also offer <strong>RO-based effluent recycling</strong> units that can recover up to 95% of industrial water for cooling towers or boiler feed applications.
                </p>
                <p>
                  Whether you are looking for a compact skid-mounted ETP or a large-scale customized installation, our team provides complete support from conceptual design to statutory documentation. We serve the entire Andhra Pradesh region, including Vijayawada, Kakinada, and Nellore, bringing enterprise-grade water treatment technology to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-black font-headline text-slate-900 text-center mb-16 uppercase tracking-tight">Expert ETP FAQ</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-2xl px-6 bg-white border-slate-100">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">How do you determine the correct chemical dosing?</AccordionTrigger>
              <AccordionContent className="text-slate-500 font-bold pb-6">
                We perform an initial "Treatability Study" on your effluent sample in our labs. This determines the exact chemical reagents and concentrations required for your specific industrial waste in Andhra Pradesh.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-2xl px-6 bg-white border-slate-100">
              <AccordionTrigger className="text-left font-black font-headline uppercase tracking-tight py-6 hover:no-underline">What is the lifespan of an ETP plant?</AccordionTrigger>
              <AccordionContent className="text-slate-500 font-bold pb-6">
                With proper AMC maintenance from our Vizag team, our industrial grade ETP systems are built to last 15-20 years. All tanks are corrosion-resistant (FRP/Epoxy coated).
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-24 p-12 rounded-[3rem] bg-primary text-white text-center space-y-8 shadow-2xl shadow-primary/20">
             <Flame className="h-16 w-16 mx-auto mb-4" />
             <h3 className="text-3xl md:text-5xl font-black font-headline uppercase tracking-tight">Prevent Industrial Non-Compliance</h3>
             <p className="text-white/80 font-bold max-w-xl mx-auto">Don't risk legal penalties from the pollution board. Ensure your waste treatment is precision-engineered by specialists in Vizag.</p>
             <Button asChild className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm border-none transition-all">
               <Link href="/contact">Book Site Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

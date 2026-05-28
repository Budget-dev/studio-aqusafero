
"use client"

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Wrench, ShieldCheck, Clock, ArrowRight, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InstallationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              Certified Engineering
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight leading-[1.05]">
              Precision <span className="text-primary">Installation</span> & Commissioning
            </h1>
            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-xl">
              Precision setup by certified engineering teams. We ensure your RO plant is integrated seamlessly with your existing infrastructure for immediate peak performance.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs">
                <Link href="/contact">Book Site Survey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Our Installation Workflow</h2>
                <p className="text-slate-500 font-bold">Every system we install follows a rigorous 4-step engineering protocol.</p>
              </div>

              <div className="space-y-8">
                {[
                  { title: "Site Assessment", desc: "Detailed analysis of source water, plumbing layout, and power requirements.", icon: Construction },
                  { title: "Mechanical Setup", desc: "Heavy-duty mounting of skids, vessels, and high-pressure pumping units.", icon: Wrench },
                  { title: "Calibration", desc: "Fine-tuning of PLC controllers and flow meters for exact TDS output.", icon: ShieldCheck },
                  { title: "Operator Training", desc: "On-site briefing for your staff on daily logging and emergency protocols.", icon: CheckCircle2 }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-lg font-black font-headline uppercase tracking-tight text-slate-900">{step.title}</h4>
                      <p className="text-sm font-bold text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-slate-50">
                <Image 
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2002_58_58%20PM.png"
                  alt="Installation Technical"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-[280px] hidden md:block">
                 <Clock className="h-8 w-8 text-primary mb-4" />
                 <p className="font-black text-slate-900 uppercase text-xs mb-2">Rapid Deployment</p>
                 <p className="text-slate-500 text-[10px] font-bold">Standard plants installed and commissioned within 48-72 working hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black font-headline text-slate-900 uppercase tracking-tight">Need a professional setup?</h2>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto">
            Avoid costly mechanical errors. Let our senior engineers handle your plant commissioning for maximum longevity.
          </p>
          <Button asChild className="h-16 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
            <Link href="/contact">Request Technical Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


"use client"

import Image from "next/image";
import Link from "next/link";
import { AlertCircle, Wrench, Smartphone, Settings, ArrowRight, Gauge, Droplets, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RepairPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              Technical Restoration
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight leading-[1.05]">
              Rapid Diagnostic <br />& <span className="text-primary">Restoration</span>
            </h1>
            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-xl">
              Rapid diagnostic and on-site restoration. Minimize plant downtime with our emergency response team and genuine engineering spares.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-sm shadow-2xl border-none">
                <Link href="tel:+919985850777">Request Service Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Expert Troubleshooting</h2>
                <p className="text-slate-500 font-bold text-lg leading-relaxed">
                  We don't just replace parts; we identify the root cause of failure. Whether it's high TDS, low recovery, or pump cavitation, our senior technicians arrive fully equipped.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Pump Restoration", desc: "Repair and rewinding of high-pressure multi-stage pumps.", icon: Settings },
                  { title: "Membrane CIP", desc: "Advanced chemical-in-place cleaning to restore flux.", icon: Droplets },
                  { title: "Control Faults", desc: "PLC reprogramming and sensor calibration services.", icon: Gauge },
                  { title: "Leakage Repair", desc: "Industrial-grade plumbing and vessel seal restoration.", icon: Wrench }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-black font-headline text-lg uppercase tracking-tight text-slate-900">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  <h3 className="font-black font-headline uppercase tracking-tight text-lg">Report a Failure</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Response Time</p>
                    <p className="text-sm font-black text-slate-900">Under 4 Hours</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Support Available</p>
                    <p className="text-sm font-black text-slate-900">24/7/365</p>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs border-none shadow-lg shadow-primary/20">
                  WhatsApp Support
                </Button>
              </div>

              <div className="aspect-square relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <Image 
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2002_58_58%20PM.png"
                  alt="Repair Technical Service"
                  fill
                  className="object-cover"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black font-headline text-slate-900 uppercase tracking-tight">Genuine Spares Guarantee</h2>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto">
            All restorations use factory-certified components to ensure your plant parameters remain compliant with original design specifications.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Certified Technicians", "4-Hour Response", "90-Day Service Warranty"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-primary">
                <CheckCircle2 className="h-4 w-4" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

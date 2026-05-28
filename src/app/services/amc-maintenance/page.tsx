
"use client"

import Image from "next/image";
import Link from "next/link";
import { Activity, Calendar, ClipboardCheck, Microscope, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function AmcPage() {
  const plcImage = PlaceHolderImages.find(img => img.id === "plc-monitoring")?.imageUrl || "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2003_45_45%20PM.png";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              Predictive Care
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight leading-[1.05]">
              AMC & <span className="text-primary">Maintenance</span> Auditing
            </h1>
            <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-xl">
              Predictive care and scheduled plant auditing. Our Annual Maintenance Contracts ensure 99.9% uptime for industrial and commercial water systems.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs">
                <Link href="/contact">Compare AMC Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Comprehensive Coverage</h2>
            <p className="text-slate-500 font-bold">Standard maintenance involves more than just cleaning filters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Performance Audits", desc: "Monthly technical checkups for pressure differentials and flow rates.", icon: Activity },
              { title: "Water Lab Testing", desc: "Chemical analysis of output water to ensure it meets ISO standards.", icon: Microscope },
              { title: "Spare Replacement", desc: "Includes genuine factory-certified membranes and dosing pumps.", icon: Zap },
              { title: "Scheduled Servicing", desc: "Pre-planned visits to prevent emergency system failure.", icon: Calendar },
              { title: "Log Management", desc: "Maintenance of digital records for plant audit compliance.", icon: ClipboardCheck },
              { title: "Priority Support", desc: "AMC clients receive response within 4 hours for critical issues.", icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:bg-white transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black font-headline uppercase tracking-tight text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden relative border-8 border-white/5">
                <Image 
                  src={plcImage}
                  alt="PLC Monitoring"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-black font-headline tracking-tight uppercase leading-tight">Advanced PLC <br />Monitoring Systems</h2>
              <p className="text-xl text-slate-400 font-bold">
                Our AMC includes remote monitoring diagnostics. We often detect membrane fouling before your operators notice a drop in flow.
              </p>
              <ul className="space-y-4">
                {["24/7 Digital Logging", "Remote Error Code Analysis", "Predictive Part Replacement", "Annual Compliance Reporting"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 font-black uppercase text-xs tracking-widest text-primary">
                    <CheckCircle2 className="h-5 w-5" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

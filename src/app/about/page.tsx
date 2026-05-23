import { Shield, Target, Users, Award, CheckCircle2 } from "lucide-react";
import AboutUsSection from "@/components/sections/about-us-section";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        >
          <source src="https://aquasaferoworks.sirv.com/Water_flowing_through_industrial%E2%80%A6_202605190922.mp4" type="video/mp4" />
        </video>
        
        {/* Decorative Overlay */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none z-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-black font-headline leading-tight tracking-tight uppercase">
              Technical <br />
              <span className="text-primary">Excellence</span>
            </h1>
            <p className="text-xl text-slate-100 font-bold leading-relaxed max-w-xl drop-shadow-md">
              Engineering a purer future through 20+ Years of Excellence and two decades of water treatment innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Animated About Section */}
      <AboutUsSection />

      {/* Expertise & Certificates */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Global Compliance & Standards</h2>
            <p className="text-slate-500 font-bold max-w-2xl mx-auto">
              Our systems meet and exceed the most stringent international standards for water safety and mechanical engineering, serving since 2006.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "ISO 9001:2015 Certified",
              "NSF/ANSI Standard 58",
              "CE Mechanical Safety",
              "WQA Gold Seal Certified",
              "ASME Vessel Standards",
              "FDA Approved Components",
              "Environmental ISO 14001",
              "Occupational ISO 45001"
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-900 leading-tight">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

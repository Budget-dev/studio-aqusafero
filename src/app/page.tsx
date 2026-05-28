
"use client"

import Image from "next/image";
import Link from "next/link";
import { useCollection, useFirestore } from "@/firebase";
import { collection, query, where, limit } from "firebase/firestore";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  FileText,
  Droplets,
  Settings,
  Headset,
} from "lucide-react";
import { Cta4 } from "@/components/ui/cta-4";
import { Blog7 } from "@/components/ui/blog-7";
import AboutUsSection from "@/components/sections/about-us-section";

export default function Home() {
  const firestore = useFirestore();

  // Fetch Featured Brands
  const brandsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "brands"),
      where("featured", "==", true),
      limit(6)
    );
  }, [firestore]);

  const { data: featuredBrands } = useCollection(brandsQuery);

  // Core High-Impact content (Keep as fixed pointers to landing pages)
  const engineeringPosts = [
    {
      id: "stp-post",
      title: "Compact Sewage Plants",
      summary: "Modular solutions for high-rise residential complexes with 100% water recovery.",
      image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_44_42%20PM.png",
      label: "STP Systems",
      author: "AquaSafe",
      published: "2024",
      url: "/compact-sewage-treatment-plant"
    },
    {
      id: "wtp-post",
      title: "Drinking Water Hub",
      summary: "Multi-stage RO systems delivering molecular-level purity for hospitals and industry.",
      image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2009_39_14%20AM.png",
      label: "Purification",
      author: "AquaSafe",
      published: "2024",
      url: "/drinking-water-treatment-plant"
    },
    {
      id: "etp-post",
      title: "Compact ETP Systems",
      summary: "Industrial-grade effluent treatment plants ensuring total pollution board compliance.",
      image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_57_02%20PM.png",
      label: "ETP Solutions",
      author: "Engineering",
      published: "2024",
      url: "/compact-effluent-treatment-plant"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col">
        
        {/* --- HERO SECTION --- */}
        <section className="relative flex flex-col">
          
          {/* MOBILE HERO */}
          <div className="block md:hidden w-full bg-[#f8fbff] min-h-screen relative flex flex-col pt-10 pb-8 px-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none z-0">
               <div className="absolute top-10 right-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
               <div className="absolute top-1/2 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 space-y-6 flex-1">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-white/80 backdrop-blur-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">20+ Years of Excellence</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-[34px] font-black font-headline text-slate-900 leading-[1.1] tracking-tight uppercase">
                  Technical <br />Solutions For <br />
                  <span className="text-primary">Every Sector</span>
                </h1>
                <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-[280px]">
                  We design, manufacture and commission high-performance water treatment plants with ISO certified precision since 2006.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button asChild className="h-12 px-6 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 border-none flex-1">
                  <Link href="/contact">Get a Quote <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-slate-100 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] shadow-sm flex-1">
                  <Link href="/products">View Catalog <FileText className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] my-8 z-10">
              <Image 
                src="https://vennky.sirv.com/ChatGPT%20Image%20May%2025%2C%202026%2C%2005_45_01%20PM.png"
                alt="AquaSafe Technical Hub"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 grid grid-cols-2 gap-y-8 gap-x-4 border border-white shadow-xl">
              {[
                { title: "Advanced Technology", desc: "Cutting-edge systems for pure & safe water", icon: Droplets },
                { title: "ISO Certified Quality", desc: "Built to international standards", icon: ShieldCheck },
                { title: "Custom Built Solutions", desc: "Tailored for every industry need", icon: Settings },
                { title: "Reliable After Sales Support", desc: "24/7 support for peace of mind", icon: Headset }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-slate-900 leading-tight">{item.title}</p>
                    <p className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP HERO */}
          <div className="hidden md:flex relative -mt-24 lg:-mt-36 min-h-[650px] lg:min-h-[850px] items-center bg-white">
            <div className="absolute inset-0 z-0 overflow-hidden shadow-2xl">
              <Image
                src="https://vennky.sirv.com/ChatGPT%20Image%20May%2025%2C%202026%2C%2005_45_01%20PM.png"
                alt="AquaSafe Engineering Hub"
                fill
                className="object-cover transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 md:px-12 lg:px-20 max-w-[1400px] relative z-10 pt-24 lg:pt-40">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 font-black tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-lg bg-white/90 backdrop-blur-md shadow-sm w-fit">
                      20+ Years of Excellence
                    </Badge>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline text-slate-900 leading-[1.05] tracking-tight uppercase drop-shadow-sm">
                      Technical <br />Solutions for <br /><span className="text-primary">Every Sector</span>
                    </h1>
                    <p className="text-xl text-slate-700 max-w-lg leading-relaxed font-bold">
                      We design, manufacture and commission high-performance water treatment plants with ISO certified precision since 2006.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button asChild size="lg" className="h-14 px-10 rounded-xl text-base font-black bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-2xl shadow-primary/20">
                      <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-xl text-base font-black border-2 border-slate-200 hover:bg-white/80 text-slate-900 transition-all bg-white/40 backdrop-blur-sm">
                      <Link href="/products">View Catalog</Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-black text-slate-900 pt-8 uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-primary/20 shadow-sm transition-transform hover:scale-110"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                      <span>Certified Purity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/80 backdrop-blur-md border border-primary/20 shadow-sm transition-transform hover:scale-110"><Activity className="h-5 w-5 text-primary" /></div>
                      <span>Established 2006</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BLUEPRINTS SECTION --- */}
        <Blog7
          tagline="Technical Mastery"
          heading="Core Industrial Solutions"
          description="Precision-engineered plants designed to meet stringent environmental standards and performance benchmarks."
          buttonText="View All Blueprints"
          buttonUrl="/products"
          posts={engineeringPosts}
        />

        {/* --- ABOUT US SECTION --- */}
        <AboutUsSection />

        {/* --- BRANDS SECTION --- */}
        {featuredBrands && featuredBrands.length > 0 && (
          <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16 space-y-6">
                <div className="inline-block px-6 py-2 rounded-xl bg-sky-50 border border-primary/20 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Our Strategic Partners</span>
                </div>
                <h2 className="text-5xl font-black font-headline text-slate-900 tracking-tight uppercase leading-tight">World-Class Engineering <br />Behind Our Hub</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {featuredBrands.map((brand: any) => (
                  <div key={brand.id} className="flex flex-col items-center text-center group">
                    <div className="w-full aspect-video rounded-3xl bg-white shadow-sm flex items-center justify-center mb-5 transition-all group-hover:scale-105 group-hover:shadow-xl border border-slate-100 group-hover:border-primary/20 p-6 overflow-hidden">
                      <Image 
                        src={brand.logoUrl} 
                        alt={brand.name} 
                        width={200} 
                        height={100} 
                        className="object-contain grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-tight px-2">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button asChild variant="ghost" className="text-primary font-black uppercase tracking-widest text-xs">
                  <Link href="/brands">View All Technical Partners <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* --- AUDIT CTA --- */}
        <Cta4
          title="Need a technical audit for your facility?"
          description="Talk to our senior engineers today for a tailored performance assessment of your RO plants and wastewater systems."
          buttonText="Get Started"
          buttonUrl="/contact"
          items={[
            "Plant Performance Mapping",
            "Energy Efficiency Audits",
            "Membrane Life Diagnostics",
            "ISO Standard Certification"
          ]}
        />
      </div>
    </div>
  );
}

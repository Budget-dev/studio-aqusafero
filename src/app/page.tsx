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
  Activity
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

  // Core High-Impact content
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
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">
      <div className="relative z-10 flex flex-col">
        
        {/* --- HERO SECTION --- */}
        <section className="relative flex flex-col overflow-hidden">
          
          {/* MOBILE HERO */}
          <div 
            className="block md:hidden w-full relative min-h-[750px] flex flex-col bg-cover bg-no-repeat bg-center"
            style={{ 
              backgroundImage: `url('https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2025%2C%202026%2C%2006_00_38%20PM.png')` 
            }}
          >
            {/* Top Stats Overlay */}
            <div className="w-full flex items-center justify-around py-6 border-b border-white/10 bg-white/10 backdrop-blur-sm relative z-20">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">ISO Certified</span>
                </div>
                <div className="w-px h-5 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">99% Recovery</span>
                </div>
            </div>

            <div className="flex flex-col flex-1 px-6 pt-10 text-center relative z-20">
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/20 backdrop-blur-md">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">20+ Years of Excellence</span>
                  </div>
                </div>

                <h1 className="text-[clamp(1.8rem,8vw,3.5rem)] font-[800] font-headline text-slate-900 leading-[1.1] tracking-tight uppercase mb-4 drop-shadow-sm">
                  ADVANCED <br />WATER TREATMENT <br />FOR <br />
                  <span className="text-primary">EVERY SECTOR</span>
                </h1>
              </div>

              <div className="mt-auto flex flex-col gap-4 w-full max-w-[320px] mx-auto pb-12">
                <Button asChild className="h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 border-none w-full">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-14 rounded-2xl border-2 border-slate-200 bg-white/40 backdrop-blur-md text-slate-900 font-black uppercase tracking-widest text-[11px] w-full">
                  <Link href="/products">View Catalog</Link>
                </Button>
              </div>
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
                      ADVANCED <br />WATER TREATMENT FOR <br /><span className="text-primary">EVERY SECTOR</span>
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

        <div className="bg-white">
          <Blog7
            tagline="Technical Mastery"
            heading="Core Industrial Solutions"
            description="Precision-engineered plants designed to meet stringent environmental standards and performance benchmarks."
            buttonText="View All Blueprints"
            buttonUrl="/products"
            posts={engineeringPosts}
          />
        </div>

        <AboutUsSection />

        {featuredBrands && featuredBrands.length > 0 && (
          <section className="py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16 space-y-6">
                <div className="inline-block px-6 py-2 rounded-xl bg-sky-50 border border-primary/20 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Our Strategic Partners</span>
                </div>
                <h2 className="text-5xl font-black font-headline text-slate-900 tracking-tight uppercase leading-tight text-center">World-Class Engineering <br />Behind Our Hub</h2>
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

        <Cta4
          title="Need a technical audit for your facility?"
          description="Talk to our senior engineers today for a tailored performance assessment of your RO plants and wastewater systems."
          buttonText="Get Started"
          buttonUrl="/contact"
          bgImage="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2028%2C%202026%2C%2009_47_13%20AM.png"
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
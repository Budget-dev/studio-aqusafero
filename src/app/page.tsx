import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Zap, 
  Award, 
  Factory,
  Truck,
  Waves
} from "lucide-react";
import { Cta4 } from "@/components/ui/cta-4";
import { Blog7 } from "@/components/ui/blog-7";
import AboutUsSection from "@/components/sections/about-us-section";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Soft Lavender Center Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #c4b5fd, transparent 80%)
          `,
        }} 
      />

      <div className="relative z-10 flex flex-col">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden pt-6 lg:pt-8 pb-20 border-b border-slate-100 bg-slate-50/30">
          <div className="container mx-auto px-4 max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.8fr] gap-12 items-center">
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/30 font-black tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-lg bg-primary/10">
                    Pure Water. Safe Future.
                  </Badge>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline text-slate-900 leading-[1.05] tracking-tight">
                    Complete water <br />Solutions for <br /><span className="text-primary">Every Sector</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-lg leading-relaxed font-bold">
                    We design, manufacture, install and maintain high-performance water treatment plants for industrial, commercial & residential applications.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 px-10 rounded-xl text-base font-black bg-primary text-white hover:bg-primary/90 transition-all border-none">
                    <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-xl text-base font-black border-2 border-slate-200 hover:bg-slate-100 text-slate-900 transition-all bg-white">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm font-black text-slate-900 pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                    <span className="whitespace-nowrap">High Performance</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><Activity className="h-5 w-5 text-primary" /></div>
                    <span className="whitespace-nowrap">Advanced Tech</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
                    <span className="whitespace-nowrap">24/7 Support</span>
                  </div>
                </div>
              </div>

              <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2010_40_52%20AM.png"
                    alt="AquaSafe Water Plant Solutions"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Solutions We Deliver Section (Using Blog7) */}
        <Blog7
          tagline="Ace Technology"
          heading="Solutions We Deliver"
          description="We deliver ace technology like Sewage Treatment Plant, Effluent Treatment Plant, Industrial/Commercial water treatment Plant - pouring life to the water."
          buttonText="View All Solutions"
          buttonUrl="/services"
          posts={[
            {
              id: "stp",
              title: "Compact Sewage Treatment Plant",
              summary: "Compact STP plant is New evolution of sewage Wastewater Treatment, No Land Required installations. We manufacture best packaged sewage treatment plants.",
              image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_44_42%20PM.png",
              label: "Industrial",
              author: "AquaSafe",
              published: "2024",
              url: "/services"
            },
            {
              id: "ro",
              title: "Commercial water treatment Plant",
              summary: "Aqua Safe Water Technologies is a leading Commercial water treatment Plant Manufacturer in India. We maintain great professional working relationships with many top vendors.",
              image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_52_23%20PM.png",
              label: "Commercial",
              author: "AquaSafe",
              published: "2024",
              url: "/services"
            },
            {
              id: "etp",
              title: "Compact Effluent Treatment Plant",
              summary: "Effluent Treatment Plant (ETP) is used to treat industrial wastewater and make it reusable by eradicating dissolved impurities present in it.",
              image: "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2012_57_02%20PM.png",
              label: "Industrial",
              author: "AquaSafe",
              published: "2024",
              url: "/services"
            }
          ]}
        />

        {/* 3. High Impact Animated About Us Section */}
        <AboutUsSection />

        {/* 4. Our Brands Section */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16 space-y-6">
              <div className="inline-block px-6 py-2 rounded-xl bg-sky-50 border border-primary/20 shadow-sm">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Our Strategic Partners</span>
              </div>
              <h2 className="text-5xl font-black font-headline text-slate-900 tracking-tight">World-Class Brands Behind Our Technology</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-6">
              {[
                "Dow Filmtec", "Pentair", "Grundfos", "Hydranautics", "Vontron", "Ion Exchange"
              ].map((brand, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-full aspect-video rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 transition-all group-hover:scale-105 group-hover:shadow-xl border border-slate-100 group-hover:border-primary/20 p-6 overflow-hidden">
                    <Image 
                      src={`https://picsum.photos/seed/${brand}/300/200`} 
                      alt={brand} 
                      width={200} 
                      height={100} 
                      className="object-contain grayscale group-hover:grayscale-0 transition-all" 
                    />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 leading-tight px-2">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="ghost" className="text-primary font-black uppercase tracking-widest text-xs">
                <Link href="/brands">View All Brand Partners <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 5. CTA Banner */}
        <Cta4
          title="Need a Reliable water treatment Solution for Your Business?"
          description="Talk to our experts today and get the best solution for your needs. We provide end-to-end support from design to maintenance."
          buttonText="Get Started"
          buttonUrl="/contact"
          items={[
            "Easy Integration",
            "24/7 Support",
            "Customizable Design",
            "Scalable Performance",
            "ISO Certified Quality"
          ]}
        />
      </div>
    </div>
  );
}

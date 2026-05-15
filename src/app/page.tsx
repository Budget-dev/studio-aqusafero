
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
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Cta4 } from "@/components/ui/cta-4";
import { Blog7 } from "@/components/ui/blog-7";

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
        <section className="relative overflow-hidden pt-16 pb-20 border-b border-slate-100 bg-slate-50/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-16 items-center">
              <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/30 font-black tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-lg bg-primary/10">
                    Pure Water. Safe Future.
                  </Badge>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline text-slate-900 leading-[1.05] tracking-tight">
                    Complete RO <br />Solutions for <br /><span className="text-primary">Every Sector</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-lg leading-relaxed font-bold">
                    We design, manufacture, install and maintain high-performance RO plants for industrial, commercial & residential applications.
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

                <div className="flex flex-wrap items-center gap-8 text-sm font-black text-slate-900 pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                    High Performance
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><Activity className="h-5 w-5 text-primary" /></div>
                    Advanced Tech
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
                    24/7 Support
                  </div>
                </div>
              </div>

              <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="relative aspect-video overflow-hidden rounded-3xl">
                  <Image
                    src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2010_40_52%20AM.png"
                    alt="AquaSafe RO Plant Solutions"
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
          description="We deliver ace technology like Sewage Treatment Plant, Effluent Treatment Plant, Industrial/Commercial RO Water Plant - pouring life to the water."
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
              title: "Commercial RO Plant",
              summary: "Aqua Safe Water Technologies is a leading Commercial RO Plant Manufacturer in India. We maintain great professional working relationships with many top vendors.",
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

        {/* 3. High Impact Stats Section */}
        <section className="bg-primary py-24 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Waves className="w-full h-full scale-150 rotate-12" />
          </div>
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-white/20">
              {[
                { stat: "10000", label: "CUSTOMERS" },
                { stat: "2000", label: "INSTALLATIONS" },
                { stat: "25", label: "YEARS" },
                { stat: "6000", label: "PROJECTS" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center px-6">
                  <span className="text-6xl md:text-7xl font-black font-headline tracking-tighter mb-2">{item.stat}</span>
                  <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] opacity-80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* 5. Technical Excellence Section */}
        <section className="py-24 overflow-hidden border-t border-slate-100 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-primary font-black uppercase tracking-widest text-xs">Technical Excellence</p>
                    <h2 className="text-4xl md:text-6xl font-black font-headline text-slate-900 tracking-tight leading-[1.1]">
                      Milestone Achieved in Delivering water, Wastewater Treatment and Its Solutions
                    </h2>
                  </div>
                  <p className="text-lg font-bold text-slate-700 leading-relaxed">
                    Aqua Safe Water Technologies takes immense pleasure in introducing ourselves as one of the leading Water and Wastewater Treatment Companies in India offering projects and services in the fields of WTP plant manufacturing, WWTP plant manufacturing, ETP plant manufacturing, and STP plant manufacturing, Energy Management, Automation Solutions, and Waste Management.
                  </p>
                  <div className="flex flex-col gap-4">
                     <p className="text-2xl font-black text-primary uppercase tracking-tighter italic">
                      Offering easy on-budget solutions
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-primary border-primary/20 text-[11px] font-bold rounded-lg px-5 py-2 uppercase tracking-widest bg-white shadow-sm">
                        A Trusted Name in Water Solutions
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button asChild className="rounded-xl px-12 h-16 font-black text-lg bg-primary text-white hover:bg-primary/90 transition-all border-none">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>

              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-[3rem] border-8 border-slate-50 shadow-2xl">
                  <Image
                    src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                    alt="Company Milestones"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 grid grid-cols-2 gap-4 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 hidden md:grid">
                  {[
                    { stat: "25+", label: "Experience" },
                    { stat: "6000+", label: "Projects" },
                    { stat: "100%", label: "Quality" },
                    { stat: "24/7", label: "Support" }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 border-r last:border-r-0 border-slate-100">
                      <p className="text-2xl font-black text-primary font-headline">{item.stat}</p>
                      <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
              {[
                { 
                  icon: Truck, 
                  title: "Our Mission", 
                  desc: "We are faithful towards delivering the best customer experience by providing the most valuable solutions." 
                },
                { 
                  icon: Award, 
                  title: "Quality", 
                  desc: "We are dedicated towards enhancing the customer experience by offering world-class proven products." 
                },
                { 
                  icon: Factory, 
                  title: "Leading Manufacturer", 
                  desc: "We are a leading ISO certified manufacturer of water solutions." 
                },
                { 
                  icon: Zap, 
                  title: "Cost Effective Solutions", 
                  desc: "Offering easy on-budget solutions without compromising the quality." 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-5 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group transition-all hover:shadow-2xl hover:-translate-y-1">
                  <div className="p-4 rounded-xl bg-primary text-white shrink-0 shadow-lg shadow-primary/20 w-fit">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-black font-headline text-slate-900 uppercase tracking-tight leading-tight">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA Banner */}
        <Cta4
          title="Need a Reliable RO Solution for Your Business?"
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


import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Zap, Factory, ShieldCheck, ArrowRight, Activity, Building2 } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  const serviceCards = [
    {
      title: "COMPACT STP",
      subtitle: "WASTEWATER TREATMENT",
      tag: "No Land Required",
      desc: "New evolution of sewage wastewater treatment with no land requirement.",
      imgId: "service-stp",
      icon: Droplets
    },
    {
      title: "COMMERCIAL RO",
      subtitle: "HIGH PERFORMANCE",
      tag: "High Efficiency",
      desc: "Leading manufacturer delivering high-performance water purification systems.",
      imgId: "service-ro",
      icon: Zap
    },
    {
      title: "COMPACT ETP",
      subtitle: "INDUSTRIAL REUSE",
      tag: "Industrial Use",
      desc: "Treat industrial wastewater and make it reusable by removing impurities.",
      imgId: "service-etp",
      icon: Factory
    },
    {
      title: "WHY CHOOSE US",
      subtitle: "TRUSTED VENDORS",
      tag: "Trusted Solutions",
      desc: "Reliable and efficient water treatment plants with strong vendor partnerships.",
      imgId: "service-why",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent tracking-tight">
            Smart Water Solutions 360!
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 4 Service Cards */}
          <div className="lg:col-span-6 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {serviceCards.map((card, i) => (
              <Card key={i} className="relative overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 bg-white flex flex-col min-h-[300px]">
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-accent mb-0.5">{card.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">{card.subtitle}</p>
                    <Badge variant="secondary" className="bg-[#FEF9C3] text-[#854D0E] border-none font-medium px-3 rounded-full hover:bg-[#FEF9C3]">
                      {card.tag}
                    </Badge>
                  </div>
                  
                  <div className="mt-auto relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-50/50 flex items-center justify-center">
                    <Image
                      src={getImage(card.imgId)?.imageUrl || ""}
                      alt={card.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column: 2 Large Banners + Stats */}
          <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Banner 1 Column */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm bg-accent">
                <Image
                  src={getImage("banner-service")?.imageUrl || ""}
                  alt="At Your Service"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-6 left-6">
                     <div className="bg-primary text-white p-2 rounded-lg font-bold text-xs inline-block mb-1">AT YOUR</div>
                     <div className="bg-yellow-400 text-accent p-2 rounded-lg font-bold text-xs inline-block ml-1">PLACE</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center space-y-1">
                <div className="text-2xl font-bold font-headline text-accent">25,00,000+</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Liters Treated Daily</div>
              </div>
            </div>

            {/* Banner 2 Column */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm bg-accent">
                <Image
                  src={getImage("banner-advanced")?.imageUrl || ""}
                  alt="Advanced Water Solutions"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-2xl font-headline leading-tight drop-shadow-md">
                    ADVANCED<br />WATER<br />SOLUTIONS
                  </h3>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center space-y-1">
                <div className="text-2xl font-bold font-headline text-accent">60+</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Installations Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AquaSafe Hub Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 max-w-7xl overflow-hidden">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-accent whitespace-nowrap">Why Choose AquaSafe Hub</h2>
          <div className="h-0.5 bg-slate-200 flex-grow rounded-full hidden sm:block"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Tabs */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <button className="text-left px-6 py-4 rounded-xl font-bold text-sm bg-accent text-white border-2 border-accent transition-all">
              Industrial RO Services
            </button>
            <button className="text-left px-6 py-4 rounded-xl font-bold text-sm bg-white text-accent border-2 border-slate-100 hover:border-accent transition-all shadow-sm">
              Filtration Spares & Spares
            </button>
            <button className="text-left px-6 py-4 rounded-xl font-bold text-sm bg-white text-accent border-2 border-slate-100 hover:border-accent transition-all shadow-sm">
              Maintenance AMC Plans
            </button>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Professionals */}
            <div className="flex flex-col rounded-[2.5rem] overflow-hidden group">
              <div className="bg-[#FACC15] aspect-[3/4] relative flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={getImage("team-expert")?.imageUrl || ""}
                    alt="Professionals"
                    fill
                    className="object-contain mix-blend-multiply opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="bg-accent p-6 text-center">
                <h4 className="text-white font-bold font-headline text-lg md:text-xl">Highly Trained Professionals</h4>
              </div>
            </div>

            {/* Card 2: Affordability */}
            <div className="flex flex-col rounded-[2.5rem] overflow-hidden group relative">
              <div className="absolute top-6 right-6 z-20 bg-accent text-[#FACC15] px-4 py-2 rounded-2xl flex flex-col items-center shadow-xl">
                 <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Starting at</span>
                 <span className="text-2xl font-black font-headline leading-none">$49</span>
              </div>
              <div className="bg-[#FACC15] aspect-[3/4] relative flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={getImage("service-why")?.imageUrl || ""}
                    alt="Affordability"
                    fill
                    className="object-contain mix-blend-multiply opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="bg-accent p-6 text-center">
                <h4 className="text-white font-bold font-headline text-lg md:text-xl">Convenience & Affordability</h4>
              </div>
            </div>

            {/* Card 3: Quality */}
            <div className="flex flex-col rounded-[2.5rem] overflow-hidden group relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-accent text-white p-6 rounded-3xl w-[85%] text-center space-y-3 shadow-2xl">
                 <div className="flex items-center justify-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-[#FACC15] flex items-center justify-center text-accent font-black text-xs">A</div>
                    <span className="font-bold tracking-tighter text-sm">AQUASAFE</span>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Trusted by</p>
                    <p className="text-3xl font-black text-[#FACC15] font-headline">500+</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Industrial Clients</p>
                 </div>
              </div>
              <div className="bg-[#FACC15] aspect-[3/4] relative flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={getImage("service-ro")?.imageUrl || ""}
                    alt="Quality"
                    fill
                    className="object-contain mix-blend-multiply opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="bg-accent p-6 text-center">
                <h4 className="text-white font-bold font-headline text-lg md:text-xl">Quality You Can Trust</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Trusted by Industry Leaders Worldwide</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With over a decade of technical mastery, AquaSafe Hub provides mission-critical reverse osmosis and wastewater treatment solutions that power industrial progress and human health.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <Activity className="h-6 w-6" />
                    <span className="text-lg">99.9% Uptime</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Reliable industrial installations with real-time automated monitoring systems.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-primary font-bold">
                    <ShieldCheck className="h-6 w-6" />
                    <span className="text-lg">Expert Support</span>
                  </div>
                  <p className="text-sm text-muted-foreground">PhD-level engineers providing custom design specifications for every project.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-[16/10] relative rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src={getImage("team-expert")?.imageUrl || ""}
                  alt="Expert consultation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary rounded-[2.5rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-headline text-white">Ready for Crystal Clear Results?</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg md:text-xl">
                Connect with our water treatment experts today to design a solution tailored to your specific industrial or commercial needs.
              </p>
            </div>
            <div className="relative z-10">
              <Button asChild size="lg" variant="secondary" className="px-10 rounded-full h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                <Link href="/contact">Get Custom Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

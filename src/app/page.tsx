
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Building2, 
  CheckCircle2, 
  Zap, 
  Award, 
  Phone, 
  MessageCircle,
  Factory,
  GraduationCap,
  Hospital,
  Hotel,
  FlaskConical,
  CupSoda,
  ZapOff,
  Truck,
  Target
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary/20 font-bold tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-full bg-primary/5">
                  Pure Water. Safe Future.
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-headline text-slate-900 leading-[1.05] tracking-tight">
                  Complete RO <br />Solutions for <br /><span className="text-primary">Every Industry</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-bold">
                  We design, manufacture, install and maintain high-performance RO plants for industrial, commercial & institutional & residential applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-black text-slate-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  High Performance
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Advanced Tech
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  24/7 Support
                </div>
              </div>

              <div className="flex flex-col sm:row gap-4 pt-2">
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 px-10 rounded-xl text-base font-black bg-primary text-white hover:bg-primary/90 transition-all border-none">
                    <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-xl text-base font-black border-2 border-slate-100 hover:bg-slate-50 text-slate-900 transition-all bg-slate-50/50">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="relative aspect-[4/3] rounded-3xl overflow-visible bg-white">
                <Image
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                  alt="Industrial RO Water Treatment"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
                
                <div className="absolute bottom-6 right-6 bg-primary text-white p-6 rounded-2xl z-20 border-4 border-white w-32 h-32 flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-black font-headline leading-none tracking-tighter">10+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-90 leading-tight">Years of</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-90">Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip */}
      <section className="bg-white py-10 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">
            {[
              { icon: CheckCircle2, stat: "500+", label: "Projects Completed" },
              { icon: Award, stat: "100%", label: "Quality Assurance" },
              { icon: Zap, stat: "Custom", label: "Tailored Solutions" },
              { icon: ShieldCheck, stat: "Support", label: "Pan India Service Support" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 lg:px-10 justify-center lg:justify-start group">
                <div className="p-4 rounded-2xl bg-primary/5 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-black font-headline text-slate-900 tracking-tighter leading-none">{item.stat}</div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mt-1.5">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[11px] rounded-full px-4 py-1.5">
                OUR CORE SERVICES
              </Badge>
              <h2 className="text-5xl font-black font-headline text-slate-900 leading-tight tracking-tight">
                End-to-end Solutions for<br />Pure and Safe Water
              </h2>
            </div>
            <Button asChild className="rounded-xl px-10 h-14 text-base font-black bg-primary text-white hover:bg-primary/90 transition-all border-none">
              <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "RO Plant Manufacturing",
                desc: "We design & manufacture high-quality RO plants for industrial, commercial & institutional use.",
                img: "service-industrial",
                icon: Factory
              },
              {
                title: "Water Plant Services",
                desc: "Installation, AMC, repair & maintenance services to ensure uninterrupted performance.",
                img: "team-expert",
                icon: Activity
              },
              {
                title: "RO Products",
                desc: "Wide range of RO systems, filters, membranes, spares & accessories available.",
                img: "service-commercial",
                icon: Zap
              },
              {
                title: "Maintenance & Support",
                desc: "24/7 technical support & AMC services for optimal performance and longer life.",
                img: "service-residential",
                icon: ShieldCheck
              }
            ].map((service, i) => (
              <Card key={i} className="group overflow-visible border border-slate-100 bg-white shadow-none rounded-2xl flex flex-col p-5 transition-all hover:shadow-xl">
                <div className="relative aspect-video mb-12">
                  <Image
                    src={getImage(service.img)?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                  />
                  <div className="absolute -bottom-6 left-2 p-2 rounded-full bg-primary border-[6px] border-white shadow-lg z-20 flex items-center justify-center w-16 h-16">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-black font-headline text-slate-900 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <Button asChild className="mt-4 bg-primary text-white text-sm font-black rounded-lg h-11 hover:bg-primary/90 w-fit px-8 shadow-none transition-all">
                    <Link href="/services">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Served Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Industries We Serve</span>
            </div>
            <h2 className="text-5xl font-black font-headline text-slate-900 tracking-tight">Trusted Water Solutions for Every Industry</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10 md:gap-6">
            {[
              { icon: Factory, label: "Industrial Units" },
              { icon: GraduationCap, label: "Schools & Colleges" },
              { icon: Hospital, label: "Hospitals" },
              { icon: Hotel, label: "Hotels & Resorts" },
              { icon: Building2, label: "Commercial Buildings" },
              { icon: FlaskConical, label: "Pharmaceutical Units" },
              { icon: CupSoda, label: "Food & Beverage" },
              { icon: ZapOff, label: "Power Plants" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-md border border-slate-100">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 leading-tight px-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Technical Excellence & Milestones Section */}
      <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary/20 text-[11px] font-bold rounded-full px-4 py-1.5 uppercase tracking-widest bg-primary/5">
                  A Trusted Name in Water Solutions
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black font-headline text-slate-900 tracking-tight leading-[1.1]">
                  Milestone Achieved in Delivering Water, Wastewater Treatment and Its Solutions
                </h2>
                <p className="text-lg font-bold text-slate-600 leading-relaxed">
                  Aqua Safe Water Technologies takes immense pleasure in introducing ourselves as one of the leading Water and Wastewater Treatment Companies in India offering projects and services in the fields of WTP plant manufacturing, WWTP plant manufacturing, ETP plant manufacturing, and STP plant manufacturing, Energy Management, Automation Solutions, and Waste Management.
                </p>
                <p className="text-xl font-black text-primary uppercase tracking-tighter italic">
                  Offering easy on-budget solutions
                </p>
              </div>
              <Button asChild className="rounded-xl px-12 h-16 font-black text-lg bg-primary text-white hover:bg-primary/90 transition-all border-none">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {[
                { 
                  icon: Target, 
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
                <div key={i} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white h-fit">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black font-headline text-slate-900 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm font-bold text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-12 md:p-16">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
              <Droplets className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="space-y-5 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black font-headline text-white leading-tight tracking-tight">
                  Need a Reliable RO Solution<br />for Your Business?
                </h2>
                <p className="text-slate-400 text-xl font-bold">
                  Talk to our experts today and get the best solution for your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Button size="lg" className="h-16 px-12 rounded-xl bg-primary text-white hover:bg-primary/90 font-black text-xl min-w-[240px] border-none transition-all">
                  <Phone className="mr-2 h-6 w-6" /> Call Now
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-12 rounded-xl border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 font-black text-xl min-w-[240px] backdrop-blur-md transition-all">
                  <MessageCircle className="mr-2 h-6 w-6" /> WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

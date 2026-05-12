import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ZapOff
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* 1. Hero Section - Tightened spacing */}
      <section className="relative overflow-hidden bg-white pt-0 pb-6 lg:pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 pt-6">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/20 font-bold tracking-widest uppercase py-1 px-4 text-[10px] rounded-full">
                  Pure Water. Safe Future.
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-slate-900 leading-[1.1]">
                  Complete RO <br />Solutions for <span className="text-primary">Every Industry</span>
                </h1>
                <p className="text-base text-slate-600 max-w-lg leading-relaxed font-semibold">
                  We design, manufacture, install and maintain high-performance RO plants for industrial, commercial, institutional & residential applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  High Performance
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Advanced Tech
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  24/7 Support
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Button asChild size="lg" className="h-11 px-8 rounded-sm text-sm font-black shadow-none bg-primary text-white hover:bg-primary/90 transition-all border-none">
                  <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" className="h-11 px-8 rounded-sm text-sm font-black bg-primary text-white hover:bg-primary/90 border-none">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 pt-6">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl">
                <Image
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                  alt="Industrial RO Water Treatment"
                  fill
                  className="object-cover rounded-xl shadow-lg shadow-slate-200"
                  priority
                />
                
                {/* 10+ Years Experience Overlay */}
                <div className="absolute bottom-4 right-4 bg-primary text-white p-4 rounded-sm z-20 shadow-xl">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl font-black font-headline leading-none tracking-tighter">10+</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-90 leading-tight">Years of</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none opacity-90">Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip - Compact, Light, Casual */}
      <section className="bg-white py-4 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
            {[
              { icon: CheckCircle2, stat: "500+", label: "Projects Completed" },
              { icon: Award, stat: "100%", label: "Quality Assurance" },
              { icon: Zap, stat: "Custom", label: "Tailored Solutions" },
              { icon: ShieldCheck, stat: "Service", label: "Pan India Support" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 lg:px-8 justify-center lg:justify-start">
                <div className="p-3 rounded-full bg-primary/5 text-primary shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-black font-headline text-slate-900 tracking-tighter leading-none">{item.stat}</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Services Section - Blue Card Edges & Blue Buttons */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest text-[10px] rounded-sm px-3 py-1">
                OUR CORE SERVICES
              </Badge>
              <h2 className="text-4xl font-black font-headline text-slate-900 leading-tight tracking-tight">
                End-to-end Solutions for<br />Pure and Safe Water
              </h2>
            </div>
            {/* View All Services with Blue Background */}
            <Button asChild className="rounded-sm px-8 h-12 text-sm font-black bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-none">
              <Link href="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
              <Card key={i} className="group overflow-visible border-2 border-primary bg-white shadow-none rounded-none flex flex-col p-4 transition-all">
                <div className="relative aspect-video mb-10">
                  <Image
                    src={getImage(service.img)?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-none"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute -bottom-6 left-2 p-2 rounded-full bg-primary border-[4px] border-white shadow-lg z-20 flex items-center justify-center w-12 h-12">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-0 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-black font-headline text-slate-900 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <Button asChild className="mt-4 bg-primary text-white text-xs font-black rounded-sm h-9 hover:bg-primary/90 w-fit px-6 shadow-none">
                    <Link href="/services">Learn More <ArrowRight className="ml-2 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Served Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 space-y-2">
            <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px] rounded-sm bg-slate-200 text-slate-800">Industries We Serve</Badge>
            <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight">Trusted Water Solutions for Every Industry</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
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
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-14 h-14 rounded-sm bg-white shadow-sm flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-bold rounded-sm">Technical Excellence</Badge>
                <h2 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Pure & Safe Water Systems</h2>
                <p className="text-base font-semibold text-slate-700 leading-relaxed">
                  Our commitment to quality, innovation and customer satisfaction makes us a trusted partner across industries. Every system is engineered to meet specific technical challenges with precision.
                </p>
              </div>
              <Button asChild className="rounded-sm px-10 h-14 font-black text-lg bg-primary text-white hover:bg-primary/90 shadow-none border-none">
                <Link href="/about">Know More About Us</Link>
              </Button>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              {[
                { icon: Award, stat: "10+", label: "Years of Experience" },
                { icon: CheckCircle2, stat: "500+", label: "Projects Completed" },
                { icon: ShieldCheck, stat: "100%", label: "Quality Assurance" },
                { icon: Activity, stat: "24/7", label: "Technical Support" }
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="p-2 rounded-sm bg-slate-50 w-fit">
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-black font-headline text-slate-900">{m.stat}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={getImage("team-expert")?.imageUrl || ""}
                  alt="Expert Engineer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 p-10 md:p-14">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Droplets className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
              <div className="space-y-4 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-black font-headline text-white leading-tight tracking-tight">
                  Need a Reliable RO Solution<br />for Your Business?
                </h2>
                <p className="text-slate-400 text-lg font-semibold">
                  Talk to our experts today and get the best solution for your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="h-14 px-10 rounded-sm bg-primary text-white hover:bg-primary/90 font-black text-lg min-w-[200px] shadow-none border-none">
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-sm border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 font-black text-lg min-w-[200px] backdrop-blur-sm">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

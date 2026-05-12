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
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50 py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20 font-bold tracking-widest uppercase py-1 px-4">
                  Pure Water. Safe Future.
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold font-headline text-slate-900 leading-[1.1]">
                  Complete RO Solutions for <span className="text-primary">Every Industry</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                  We design, manufacture, install and maintain high-performance RO plants for industrial, commercial, institutional & residential applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-12 text-sm font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  High Performance Systems
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Advanced Technology
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  24/7 Technical Support
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="h-14 px-8 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                  <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg font-bold border-2">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div className="relative group animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src={getImage("service-industrial")?.imageUrl || ""}
                  alt="Industrial RO Plant"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 md:right-12 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px] animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold font-headline text-primary">10+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                    Years of<br />Experience
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">
                  Delivering reliable water solutions since 2013.
                </p>
              </div>

              {/* Decorative Fluid Effect */}
              <div className="absolute -z-10 -top-20 -right-20 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip */}
      <section className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle2, stat: "500+", label: "Projects Completed", desc: "Successfully delivered across India" },
              { icon: Award, stat: "100%", label: "Quality Assurance", desc: "High quality components & strict QC" },
              { icon: Zap, stat: "Custom", label: "Tailored Solutions", desc: "Solutions for every requirement" },
              { icon: ShieldCheck, stat: "Support", label: "Pan India Support", desc: "Expert service at your location" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white">
                <div className="p-3 rounded-xl bg-white/10 shrink-0">
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-headline leading-none mb-1">{item.stat}</div>
                  <div className="text-xs font-bold text-white/90 uppercase tracking-widest">{item.label}</div>
                  <p className="text-[10px] text-white/50 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold uppercase tracking-widest">
                Our Core Services
              </Badge>
              <h2 className="text-4xl font-bold font-headline text-slate-900">
                End-to-end Solutions for<br />Pure and Safe Water
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link href="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card key={i} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getImage(service.img)?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 shadow-xl">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardContent className="p-8 space-y-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-headline text-slate-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold w-fit group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Served Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="secondary" className="font-bold uppercase tracking-widest">Industries We Serve</Badge>
            <h2 className="text-4xl font-bold font-headline text-slate-900">Trusted Water Solutions for Every Industry</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
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
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us / Trust Metrics */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/20">We deliver quality, you get</Badge>
                <h2 className="text-4xl font-bold font-headline text-slate-900">Pure & Safe Water</h2>
                <p className="text-slate-500 leading-relaxed">
                  Our commitment to quality, innovation and customer satisfaction makes us a trusted partner across industries. Every system is engineered to meet specific technical challenges with precision.
                </p>
              </div>
              <Button asChild className="rounded-full px-10 h-14 font-bold text-lg">
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
                <div key={i} className="space-y-2">
                  <div className="p-3 rounded-2xl bg-slate-50 w-fit">
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold font-headline text-slate-900">{m.stat}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
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
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-700 to-blue-600 p-8 md:p-16">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Droplets className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="space-y-4 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">
                  Need a Reliable RO Solution<br />for Your Business?
                </h2>
                <p className="text-blue-100 text-lg opacity-80">
                  Talk to our experts today and get the best solution for your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-primary hover:bg-blue-50 font-bold text-lg min-w-[200px]">
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 font-bold text-lg min-w-[200px]">
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

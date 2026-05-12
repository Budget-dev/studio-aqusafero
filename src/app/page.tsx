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
      {/* 1. Hero Section - Tightened to the extreme to remove white gaps */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/50 pt-0 pb-8 lg:pb-12">
        <div className="container mx-auto px-4 max-w-7xl pt-0 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary/20 font-bold tracking-widest uppercase py-1 px-4 text-[10px] rounded-full">
                  Pure Water. Safe Future.
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-slate-900 leading-[1.1]">
                  Complete RO <br />Solutions for <span className="text-primary">Every Industry</span>
                </h1>
                <p className="text-base text-slate-600 max-w-lg leading-relaxed">
                  We design, manufacture, install and maintain high-performance RO plants for industrial, commercial, institutional & residential applications.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
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

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild size="lg" className="h-12 px-8 rounded-sm text-base font-bold shadow-lg hover:shadow-xl transition-all">
                  <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-sm text-base font-bold border-2">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
              {/* Image without card container or shadow */}
              <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                  alt="Industrial RO Water Treatment"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating Experience Badge in the corner */}
                <div className="absolute bottom-4 right-4 bg-primary text-white p-4 md:p-6 rounded-sm shadow-2xl z-10 hidden sm:block border border-white/10">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-3xl md:text-4xl font-black font-headline leading-none">10+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-90">Years of</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-90">Experience</span>
                  </div>
                </div>
              </div>

              {/* Decorative Fluid Effect */}
              <div className="absolute -z-10 -top-20 -right-20 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Metrics Strip */}
      <section className="bg-slate-900 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, stat: "500+", label: "Projects Completed", desc: "Successfully delivered across India" },
              { icon: Award, stat: "100%", label: "Quality Assurance", desc: "High quality components & strict QC" },
              { icon: Zap, stat: "Custom", label: "Tailored Solutions", desc: "Solutions for every requirement" },
              { icon: ShieldCheck, stat: "Support", label: "Pan India Support", desc: "Expert service at your location" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-sm bg-white/10 shrink-0">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl font-bold font-headline leading-none mb-1">{item.stat}</div>
                  <div className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-bold uppercase tracking-widest text-[10px] rounded-sm">
                Our Core Services
              </Badge>
              <h2 className="text-3xl font-bold font-headline text-slate-900 leading-tight">
                End-to-end Solutions for<br />Pure and Safe Water
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-sm px-6 h-10 text-sm">
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
              <Card key={i} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-sm flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getImage(service.img)?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 p-3 rounded-sm bg-white/95 shadow-xl">
                    <service.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold font-headline text-slate-900 group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs w-fit group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Served Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 space-y-2">
            <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px] rounded-sm">Industries We Serve</Badge>
            <h2 className="text-3xl font-bold font-headline text-slate-900">Trusted Water Solutions for Every Industry</h2>
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
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-primary transition-colors">
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
                <Badge variant="outline" className="text-primary border-primary/20 text-[10px] rounded-sm">We deliver quality, you get</Badge>
                <h2 className="text-3xl font-bold font-headline text-slate-900">Pure & Safe Water</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Our commitment to quality, innovation and customer satisfaction makes us a trusted partner across industries. Every system is engineered to meet specific technical challenges with precision.
                </p>
              </div>
              <Button asChild className="rounded-sm px-8 h-12 font-bold text-base">
                <Link href="/about">Know More About Us</Link>
              </Button>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-6">
              {[
                { icon: Award, stat: "10+", label: "Years of Experience" },
                { icon: CheckCircle2, stat: "500+", label: "Projects Completed" },
                { icon: ShieldCheck, stat: "100%", label: "Quality Assurance" },
                { icon: Activity, stat: "24/7", label: "Technical Support" }
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="p-2 rounded-sm bg-slate-50 w-fit">
                    <m.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-headline text-slate-900">{m.stat}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
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
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-blue-700 to-blue-600 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Droplets className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="space-y-3 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-white leading-tight">
                  Need a Reliable RO Solution<br />for Your Business?
                </h2>
                <p className="text-blue-100 text-base opacity-80">
                  Talk to our experts today and get the best solution for your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button size="lg" className="h-12 px-6 rounded-sm bg-white text-primary hover:bg-blue-50 font-bold text-base min-w-[180px]">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-6 rounded-sm border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 font-bold text-base min-w-[180px]">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

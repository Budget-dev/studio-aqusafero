
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
  Target,
  Waves,
  Package
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-sky-50/30 pt-16 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 font-black tracking-widest uppercase py-1.5 px-4 text-[10px] rounded-full bg-primary/10">
                  Pure Water. Safe Future.
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline text-slate-900 leading-[1.05] tracking-tight">
                  Complete RO <br />Solutions for <br /><span className="text-primary">Every Industry</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-lg leading-relaxed font-bold">
                  We design, manufacture, install and maintain high-performance RO plants for industrial, commercial & institutional & residential applications.
                </p>
              </div>

              <div className="flex flex-col sm:row gap-5">
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 px-10 rounded-xl text-base font-black bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-xl shadow-primary/20">
                    <Link href="/contact">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-xl text-base font-black border-2 border-slate-200 hover:bg-slate-100 text-slate-900 transition-all bg-white shadow-sm">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm font-black text-slate-900 pt-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-full bg-primary/10"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                  High Performance
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-full bg-primary/10"><Activity className="h-5 w-5 text-primary" /></div>
                  Advanced Tech
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-full bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
                  24/7 Support
                </div>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="relative aspect-[4/3] rounded-3xl overflow-visible">
                <Image
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2008_20_08%20PM.png"
                  alt="Industrial RO Water Treatment"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
                
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl z-20 border-4 border-white w-32 h-32 flex items-center justify-center shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-4xl font-black font-headline leading-none tracking-tighter">25</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-90 leading-tight">Years of</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none opacity-90">Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Solutions We Deliver Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black font-headline text-slate-900 tracking-tight">Solutions We Deliver</h2>
            <p className="text-xl font-bold text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We deliver ace technology like Sewage Treatment Plant, Effluent Treatment Plant, Industrial/Commercial RO Water Plant -pouring life to the water.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Compact Sewage Treatment Plant",
                desc: "Compact STP plant is New evolution of sewage Wastewater Treatment, No Land Required installations. We manufacture best packaged sewage treatment plants.",
                imgId: "stp-compact"
              },
              {
                title: "Commercial RO Plant",
                desc: "Aqua Safe Water Technologies is a leading Commercial RO Plant Manufacturer in India. We maintain great professional working relationships with many top vendors for best water treatment plants.",
                imgId: "ro-commercial"
              },
              {
                title: "Compact Effluent Treatment Plant",
                desc: "Effluent Treatment Plant (ETP) is used to treat industrial wastewater and make it reusable by eradicating dissolved impurities present in it.",
                imgId: "etp-compact"
              }
            ].map((solution, i) => (
              <Card key={i} className="group border-none bg-sky-50/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImage(solution.imgId)?.imageUrl || ""}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-8 space-y-4 text-center">
                  <h3 className="text-2xl font-black font-headline text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-base font-bold text-slate-600 leading-relaxed">
                    {solution.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. High Impact Stats Section */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Waves className="w-full h-full scale-150 rotate-12" />
        </div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-white/20">
            {[
              { stat: "10000", label: "CUSTOMERS" },
              { stat: "2000", label: "INDUSTRIES" },
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

      {/* 4. Industries Served Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block px-6 py-2 rounded-full bg-sky-50 border border-primary/20 shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-primary">Industries We Serve</span>
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
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:shadow-xl border border-slate-100 group-hover:border-primary/20">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 leading-tight px-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Technical Excellence Section */}
      <section className="py-24 bg-sky-50/30 overflow-hidden border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
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
                    <Badge variant="outline" className="text-primary border-primary/20 text-[11px] font-bold rounded-full px-5 py-2 uppercase tracking-widest bg-white shadow-sm">
                      A Trusted Name in Water Solutions
                    </Badge>
                  </div>
                </div>
              </div>
              <Button asChild className="rounded-xl px-12 h-16 font-black text-lg bg-primary text-white hover:bg-primary/90 transition-all border-none shadow-xl shadow-primary/20">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2012%2C%202026%2C%2007_19_40%20PM.png"
                  alt="Company Milestones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 grid grid-cols-2 gap-4 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 hidden md:grid">
                {[
                  { stat: "10+", label: "Experience" },
                  { stat: "500+", label: "Projects" },
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
              <div key={i} className="flex flex-col gap-5 p-8 rounded-3xl bg-white border border-slate-100 group transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="p-4 rounded-2xl bg-primary text-white shrink-0 shadow-lg shadow-primary/20 w-fit">
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
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 md:p-16">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
              <Droplets className="w-full h-full text-white rotate-12 scale-150" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="space-y-6 max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black font-headline text-white leading-tight tracking-tight">
                  Need a Reliable RO Solution<br />for Your Business?
                </h2>
                <p className="text-slate-400 text-xl font-bold">
                  Talk to our experts today and get the best solution for your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-xl min-w-[240px] border-none transition-all shadow-2xl shadow-primary/40">
                  <Phone className="mr-2 h-6 w-6" /> Call Now
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 font-black text-xl min-w-[240px] backdrop-blur-md transition-all">
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

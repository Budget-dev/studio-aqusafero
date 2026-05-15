
import { GraduationCap, Award, BookOpen, Clock, Users, CheckCircle2, ArrowRight, ShieldCheck, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export const COURSES = [
  {
    id: "ro-basic",
    title: "RO Fundamentals & Operations",
    level: "Beginner",
    duration: "3 Days",
    fee: "₹15,000",
    description: "A comprehensive introduction to reverse osmosis technology, membrane theory, and daily system operations.",
    features: [
      "Basic Hydraulics",
      "Membrane Chemistry",
      "Pre-filtration Essentials",
      "Daily Logging & Monitoring"
    ],
    icon: BookOpen
  },
  {
    id: "ro-advanced",
    title: "Advanced Industrial Plant Design",
    level: "Professional",
    duration: "5 Days",
    fee: "₹45,000",
    description: "Technical deep-dive into plant sizing, flux calculations, and building custom RO solutions for large-scale industry.",
    features: [
      "System Design Software",
      "Pressure Vessel Analysis",
      "PLC & Automation Logic",
      "Cost-Efficiency Mapping"
    ],
    icon: Microscope
  },
  {
    id: "maintenance-specialist",
    title: "Service & Troubleshooting Expert",
    level: "Technical",
    duration: "4 Days",
    fee: "₹35,000",
    description: "Hands-on training for identifying system failures, membrane cleaning (CIP), and pump restorations.",
    features: [
      "Diagnostic Tools",
      "CIP Procedure Mastery",
      "Pump Mechanical Seal Repair",
      "Emergency Protocol Training"
    ],
    icon: ShieldCheck
  }
];

export default function TrainingsPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'trainings-hero')?.imageUrl;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 bg-black text-white overflow-hidden">
        {/* Background Image with Neutral Overlay */}
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image 
              src={heroImage} 
              alt="AquaSafe Technical Training" 
              fill 
              className="object-cover opacity-90 transition-all duration-700"
              priority
              data-ai-hint="technical training"
            />
          )}
          {/* Neutral dark gradient for text legibility without the blue tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
            <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
              AquaSafe Technical Academy
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight leading-[1.05]">
              Master the Art of <span className="text-primary">Water Engineering</span>
            </h1>
            <p className="text-xl text-slate-100 font-bold leading-relaxed max-w-xl drop-shadow-md">
              Professional training programs designed to bridge the gap between theory and industrial application. Certification provided upon completion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
                <Link href="#courses">View All Courses</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-xl border-white/40 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs backdrop-blur-sm">
                <Link href="/contact">Inquire for Groups</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-12">
            <div className="p-8 rounded-full bg-primary/10 text-primary shrink-0">
              <Award className="h-20 w-20" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black font-headline text-slate-900 tracking-tight uppercase">ISO Recognized Certification</h2>
              <p className="text-lg text-slate-600 font-bold leading-relaxed max-w-3xl">
                Every candidate who successfully completes our training modules and passes the final technical assessment receives an **AquaSafe Certified Water Technician** credential. Our certifications are recognized by major industrial players across India and the Middle East.
              </p>
              <div className="flex flex-wrap gap-6 pt-2">
                {["Industry Validated", "Lifetime Verification", "Technical Portfolio", "Career Support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="courses" className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Our Training Programs</h2>
            <p className="text-slate-500 font-bold">Specialized modules covering everything from domestic purifiers to large-scale wastewater treatment plants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <Card key={course.id} className="flex flex-col rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden">
                <CardHeader className="p-10 pb-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <course.icon className="h-7 w-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5">{course.level}</Badge>
                    <div className="flex items-center gap-1.5 text-slate-400 font-black text-[10px] uppercase">
                      <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-black font-headline text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <p className="text-primary font-black text-lg pt-2">{course.fee}</p>
                </CardHeader>
                <CardContent className="p-10 py-6 flex-grow">
                  <CardDescription className="text-slate-500 font-bold mb-8 leading-relaxed">
                    {course.description}
                  </CardDescription>
                  <ul className="space-y-4">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-tight text-slate-900">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-10 pt-0">
                  <Button asChild className="w-full h-12 rounded-xl bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg transition-all">
                    <Link href={`/trainings/enroll/${course.id}`}>Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Training CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Users className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-widest">Corporate Solutions</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight uppercase">Custom Workshops for Teams</h2>
          <p className="text-xl font-bold opacity-80 max-w-3xl mx-auto leading-relaxed">
            We provide on-site training for manufacturing units and large hotels. Train your technical team to maintain peak plant performance and reduce long-term operational costs.
          </p>
          <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-white text-primary hover:bg-slate-100 font-black text-lg shadow-2xl transition-all">
            <Link href="/contact">Contact Our Training Head</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

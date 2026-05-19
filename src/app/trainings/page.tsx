
import { Award, Check, Flame, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { ShineBorder } from "@/components/ui/shine-border";
import { COURSES } from "@/app/lib/trainings-data";

export default function TrainingsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px] mb-6">
            AquaSafe Academy
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tight mb-6">Master Water Engineering</h1>
          <p className="text-xl text-slate-400 font-bold leading-relaxed">
            Professional ISO-recognized certification programs designed for the next generation of technical technicians.
          </p>
        </div>
      </section>

      {/* Course Selection Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <ShineBorder key={course.id} className="h-full" duration={course.isPopular ? 5 : 10}>
                <Card className="h-full rounded-2xl border-0 flex flex-col">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-900 text-white group-hover:bg-primary transition-colors">
                        <course.icon className="h-6 w-6" />
                      </div>
                      {course.isPopular && (
                        <Badge className="py-1 px-3 text-[10px] font-black uppercase bg-primary text-white flex items-center gap-1.5 border-none">
                          <Flame size={12} /> Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-black font-headline text-slate-900 mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm font-bold text-slate-500 leading-relaxed min-h-[40px]">
                      {course.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 pt-4 flex-grow flex flex-col gap-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-slate-900 text-3xl font-black">{course.fee}</span>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/ course</span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {course.duration}</div>
                      <div className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> {course.level}</div>
                    </div>

                    <Separator className="bg-slate-100" />

                    <ul className="flex flex-col gap-3 flex-grow">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                          <Check className="size-4 text-primary shrink-0 stroke-[3px]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="p-8 pt-0">
                    <Button asChild className="w-full h-14 rounded-xl bg-slate-900 hover:bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg transition-all border-none">
                      <Link href={`/trainings/${course.id}`}>
                        Course Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ShineBorder>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Section */}
      <section className="py-24 border-t bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-black font-headline text-slate-900 mb-8">Group Training Solutions</h2>
          <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto mb-12">
            We provide on-site industrial training for manufacturing units and large hospitality groups across India. Master your own plant maintenance.
          </p>
          <Button asChild variant="outline" className="h-16 px-12 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 font-black uppercase tracking-widest">
            <Link href="/contact">Inquire for Corporates</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

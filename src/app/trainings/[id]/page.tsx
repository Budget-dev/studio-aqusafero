
"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle2, 
  PlayCircle, 
  Award, 
  Clock, 
  Users, 
  ArrowRight,
  GraduationCap,
  Calendar,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COURSES, type Course } from "@/app/lib/trainings-data";
import { Separator } from "@/components/ui/separator";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const found = COURSES.find(c => c.id === params.id);
    if (found) {
      setCourse(found);
    } else {
      router.push('/trainings');
    }
  }, [params.id, router]);

  if (!course) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb / Top Bar */}
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/trainings" className="hover:text-primary transition-colors flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" /> Back to Academy
            </Link>
            <span className="mx-2 opacity-20">/</span>
            <span className="text-slate-900">{course.title}</span>
          </div>
          <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[9px] tracking-[0.2em]">
            Module: {course.id.toUpperCase()}
          </Badge>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-slate-900 text-white border-none uppercase tracking-widest font-black text-[9px] px-3 py-1">
                  {course.level} Level
                </Badge>
                <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                  <Clock className="h-4 w-4" /> {course.duration} Duration
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-headline text-slate-900 leading-[1.1] tracking-tight">
                {course.title}
              </h1>
              <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>

            {/* Video Preview */}
            <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl border-8 border-slate-50 group">
              <iframe 
                width="100%" 
                height="100%" 
                src={course.videoUrl} 
                title={course.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
              ></iframe>
            </div>

            {/* Detailed Curriculum */}
            <div className="space-y-8">
              <h3 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Training Curriculum</h3>
              <div className="grid grid-cols-1 gap-6">
                {course.curriculum.map((module, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary font-black text-sm">
                        {i + 1}
                      </div>
                      <h4 className="text-xl font-black font-headline uppercase tracking-tight">{module.title}</h4>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 pl-14">
                      {module.topics.map((topic, ti) => (
                        <li key={ti} className="text-sm font-bold text-slate-500 flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Enrollment Column */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="p-10 rounded-[3rem] bg-slate-900 text-white space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
                
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Total Enrollment Fee</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-black font-headline">{course.fee}</h2>
                    <span className="text-slate-500 font-bold text-sm">Inclusive of taxes</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs">ISO Certification</p>
                      <p className="text-xs font-bold text-slate-400">Recognized industrial credential provided upon completion.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs">Hands-on Workshops</p>
                      <p className="text-xs font-bold text-slate-400">Direct experience with high-pressure pumping units.</p>
                    </div>
                  </div>
                </div>

                <Button asChild className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 border-none transition-all">
                  <Link href={`/trainings/enroll/${course.id}`}>
                    Secure My Seat <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Limited seats per module for quality instruction
                </p>
              </div>

              {/* Extra Info Card */}
              <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-white space-y-6">
                <h4 className="font-black font-headline text-lg uppercase tracking-tight">Need a Group Discount?</h4>
                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                  We offer corporate pricing for batches of 5 or more technical staff members. Training can be scheduled at your site.
                </p>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all">
                  <Link href="/contact">Inquire for Groups</Link>
                </Button>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

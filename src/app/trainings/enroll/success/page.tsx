"use client"

import Link from "next/link";
import { 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight, 
  FileText,
  Clock,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem]">
          <div className="bg-slate-900 p-12 text-center text-white space-y-6">
            <motion.div 
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex p-4 rounded-full bg-primary/20 backdrop-blur-md mb-4"
            >
              <GraduationCap className="h-16 w-16 text-primary" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tight">Technical Enrollment Confirmed</h1>
            <p className="text-lg font-bold opacity-80 max-w-md mx-auto">
              Welcome to the AquaSafe Academy. Your learning journey has officially begun.
            </p>
          </div>

          <CardContent className="p-10 md:p-16 space-y-10 bg-white">
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 space-y-6">
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="font-black font-headline uppercase tracking-tight">Wait for Certification</h3>
              </div>
              <p className="text-sm font-bold text-slate-600 leading-relaxed">
                Please note that your official technical certificate will only be released after you complete all modules and pass the final performance assessment. This process ensures the highest industry standards.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                <Clock className="h-3.5 w-3.5" /> 7-10 Days Assessment Period
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild className="h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                <Link href="/trainings">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" className="h-14 rounded-xl border-slate-200 font-black uppercase tracking-widest text-xs">
                <FileText className="mr-2 h-4 w-4" /> Download Syllabus
              </Button>
            </div>

            <div className="text-center">
              <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                Return to Technical Hub
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


"use client"

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  GraduationCap, 
  CreditCard, 
  ShieldCheck, 
  Loader2,
  User,
  Building2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { COURSES } from "@/app/lib/trainings-data";

export default function EnrollmentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const found = COURSES.find(c => c.id === params.id);
    if (found) {
      setCourse(found);
    } else {
      router.push('/trainings');
    }
  }, [params.id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate training payment and enrollment
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Enrollment Successful",
        description: `You are now enrolled in ${course?.title}.`,
      });
      router.push("/trainings/enroll/success");
    }, 2000);
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12">
          <Button asChild variant="ghost" className="mb-6 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-primary">
            <Link href={`/trainings/${course.id}`}><ChevronLeft className="mr-2 h-4 w-4" /> Back to Details</Link>
          </Button>
          <h1 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tight">Technical <span className="text-primary">Enrollment</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Details */}
              <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-900 text-white p-8">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle className="font-black font-headline uppercase tracking-tight">Candidate Profile</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name *</Label>
                      <Input required className="h-12 rounded-xl" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address *</Label>
                      <Input type="email" required className="h-12 rounded-xl" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Organization / Institution</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input className="h-12 pl-10 rounded-xl" placeholder="Company Name" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Section */}
              <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-900 text-white p-8">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle className="font-black font-headline uppercase tracking-tight">Course Tuition</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Fee</p>
                      <p className="text-2xl font-black text-slate-900">{course.fee}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Access</p>
                      <Badge variant="secondary" className="font-black uppercase text-[10px]">Immediate</Badge>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Card Details *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input required className="h-12 pl-10 rounded-xl" placeholder="4242 4242 4242 4242" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expiry *</Label>
                        <Input required className="h-12 rounded-xl" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">CVC *</Label>
                        <Input required type="password" maxLength={3} className="h-12 rounded-xl" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all border-none">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Pay ${course.fee} & Enroll`}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-24 space-y-8">
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary font-black uppercase text-[10px] border-primary/20">Course Module</Badge>
                <h3 className="text-2xl font-black font-headline text-slate-900 tracking-tight">{course.title}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-600">Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-slate-600">Level: {course.level}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certification Info</p>
                <div className="flex gap-4">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    Successful completion of this module includes a final technical assessment. Certificate issuance requires 7-10 working days for validation.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

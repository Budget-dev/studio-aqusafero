"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Inquiry Sent",
        description: "Our specialists will contact you within 24 hours.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black font-headline text-slate-900">Request a Custom Quote</h1>
            <p className="text-slate-600 text-lg font-bold">
              Every water challenge is unique. Fill out the form below to receive a detailed technical assessment and pricing for your RO project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-4 space-y-10">
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0"><Phone className="h-6 w-6" /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Phone Support</p>
                    <p className="text-slate-600 font-bold text-sm">+91 9985850777</p>
                    <p className="text-slate-600 font-bold text-sm">+91 9885282157</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0"><Mail className="h-6 w-6" /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Direct Email</p>
                    <p className="text-slate-600 font-bold text-sm">info@aquasafero.com</p>
                    <p className="text-slate-600 font-bold text-sm">aquasafe.ap@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0"><MapPin className="h-6 w-6" /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Headquarters</p>
                    <p className="text-slate-600 font-bold text-sm leading-relaxed">
                      #07-13-23/2, Ground Floor, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. Andhra Pradesh, India.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
                <h3 className="font-black font-headline text-xl">What happens next?</h3>
                <ul className="space-y-4 text-sm font-bold text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-primary">01.</span>
                    Initial review by our engineering leads.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">02.</span>
                    Technical follow-up for specific water lab results.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">03.</span>
                    Comprehensive design and ROI proposal.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quote Form */}
            <div className="md:col-span-8">
              <Card className="shadow-none border-2 border-slate-100 rounded-3xl">
                <CardContent className="p-10">
                  {submitted ? (
                    <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                      <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 text-green-600 mb-4">
                        <CheckCircle2 className="h-16 w-16" />
                      </div>
                      <h2 className="text-3xl font-black font-headline text-slate-900">Inquiry Received!</h2>
                      <p className="text-slate-600 font-bold max-w-sm mx-auto">
                        Thank you for reaching out. An AquaSafe technical specialist has been assigned to your inquiry and will contact you shortly.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl h-12 font-black">
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-black uppercase text-[10px] tracking-widest text-slate-500">Contact Name</Label>
                          <Input id="name" placeholder="John Doe" required className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="font-black uppercase text-[10px] tracking-widest text-slate-500">Company Name</Label>
                          <Input id="company" placeholder="Example Corp" required className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-black uppercase text-[10px] tracking-widest text-slate-500">Work Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-black uppercase text-[10px] tracking-widest text-slate-500">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+91 99858 50777" className="h-12 rounded-xl bg-slate-50 border-none font-bold" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project" className="font-black uppercase text-[10px] tracking-widest text-slate-500">Project Details</Label>
                        <Textarea 
                          id="project" 
                          placeholder="Please describe your water quality requirements, desired capacity, and any specific challenges you're facing..." 
                          className="min-h-[150px] rounded-xl bg-slate-50 border-none font-bold"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Processing Inquiry...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Quote Request
                          </>
                        )}
                      </Button>
                      <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Response time: within 24 hours.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

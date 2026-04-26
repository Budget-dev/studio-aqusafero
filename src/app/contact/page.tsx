
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Request a Custom Quote</h1>
            <p className="text-muted-foreground text-lg">
              Every water challenge is unique. Fill out the form below to receive a detailed technical assessment and pricing for your RO project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-4 space-y-8">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10"><Phone className="h-6 w-6 text-primary" /></div>
                  <div>
                    <p className="font-bold text-accent">Phone Support</p>
                    <p className="text-muted-foreground">+1 (800) AQUA-SAFE</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10"><Mail className="h-6 w-6 text-primary" /></div>
                  <div>
                    <p className="font-bold text-accent">Direct Email</p>
                    <p className="text-muted-foreground">quotes@aquasafehub.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10"><MapPin className="h-6 w-6 text-primary" /></div>
                  <div>
                    <p className="font-bold text-accent">Headquarters</p>
                    <p className="text-muted-foreground">123 Purification Way,<br />Tech Valley, CA 94043</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-accent text-accent-foreground space-y-4">
                <h3 className="font-bold font-headline">What happens next?</h3>
                <ul className="space-y-3 text-sm text-accent-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary-foreground font-bold">01.</span>
                    Initial review by our engineering leads.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-foreground font-bold">02.</span>
                    Technical follow-up for specific water lab results.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-foreground font-bold">03.</span>
                    Comprehensive design and ROI proposal.
                  </li>
                </ul>
              </div>
            </div>

            {/* Quote Form */}
            <div className="md:col-span-8">
              <Card className="shadow-2xl border-none">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                      <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 text-green-600 mb-4">
                        <CheckCircle2 className="h-16 w-16" />
                      </div>
                      <h2 className="text-3xl font-bold font-headline text-accent">Inquiry Received!</h2>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Thank you for reaching out. An AquaSafe technical specialist has been assigned to your inquiry and will contact you shortly.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Contact Name</Label>
                          <Input id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input id="company" placeholder="Example Corp" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project">Project Details</Label>
                        <Textarea 
                          id="project" 
                          placeholder="Please describe your water quality requirements, desired capacity, and any specific challenges you're facing..." 
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 h-14 text-lg"
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
                      <p className="text-center text-xs text-muted-foreground">
                        By submitting this form, you agree to our privacy policy and consent to technical follow-ups.
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

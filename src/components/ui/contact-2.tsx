"use client"

import { Mail, Phone, Globe, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Contact2Props {
  title: string;
  description: string;
  phone: string;
  email: string;
  web: { label: string; url: string };
}

export function Contact2({ title, description, phone, email, web }: Contact2Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-black font-headline text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-lg font-bold text-slate-600 leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex gap-5 group">
                <div className="p-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 shrink-0 h-fit">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Call for Support</p>
                  <p className="text-xl font-black text-slate-900">{phone}</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="p-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 shrink-0 h-fit">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Direct Email</p>
                  <p className="text-xl font-black text-slate-900">{email}</p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="p-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 shrink-0 h-fit">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Official Website</p>
                  <a href={web.url} className="text-xl font-black text-slate-900 hover:text-primary transition-colors">
                    {web.label}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[2rem] bg-slate-900 text-white space-y-4">
              <h4 className="text-xl font-black font-headline uppercase tracking-tight">Visit Our Office</h4>
              <p className="text-sm font-bold text-slate-400 leading-relaxed">
                #07-13-23/2, Ground Floor, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. Andhra Pradesh, India.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">First Name</Label>
                    <Input id="first-name" placeholder="John" required className="h-14 rounded-xl bg-white border-slate-200 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required className="h-14 rounded-xl bg-white border-slate-200 font-bold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Work Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" required className="h-14 rounded-xl bg-white border-slate-200 font-bold" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</Label>
                  <Textarea id="message" placeholder="Describe your water treatment requirements..." required className="min-h-[160px] rounded-xl bg-white border-slate-200 font-bold p-4" />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send Inquiry <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

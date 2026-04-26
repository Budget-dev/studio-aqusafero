
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Users, Award, CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight">Engineering a Purer Future Through Technical Mastery.</h1>
            <p className="text-xl text-accent-foreground/70 leading-relaxed">
              For over two decades, AquaSafe Hub has been at the forefront of reverse osmosis innovation, solving the most complex water challenges for industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={PlaceHolderImages.find(i => i.id === "team-expert")?.imageUrl || ""}
                  alt="Our laboratory"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-2xl shadow-xl hidden lg:block">
                <p className="text-4xl font-bold font-headline">20+</p>
                <p className="text-sm uppercase tracking-widest opacity-70">Years of Experience</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold font-headline text-primary">Our Core Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We believe that access to high-purity water is the foundation of industrial progress and human health. Our goal is to make advanced RO technology accessible, efficient, and sustainable for every client, from global manufacturers to family homes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Integrity", text: "Honest technical assessments and transparent pricing." },
                  { icon: Target, title: "Precision", text: "Systems engineered to exact micron-level specs." },
                  { icon: Users, title: "Collaboration", text: "Working as an extension of your engineering team." },
                  { icon: Award, title: "Excellence", text: "Consistently setting new benchmarks in filtration." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-bold font-headline">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Certificates */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-headline text-primary">Global Compliance & Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our systems meet and exceed the most stringent international standards for water safety and mechanical engineering.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "ISO 9001:2015 Certified",
              "NSF/ANSI Standard 58",
              "CE Mechanical Safety",
              "WQA Gold Seal Certified",
              "ASME Vessel Standards",
              "FDA Approved Components",
              "Environmental ISO 14001",
              "Occupational ISO 45001"
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-border">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-semibold text-accent">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

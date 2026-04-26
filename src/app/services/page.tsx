import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Activity, Zap, Droplets, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "industrial",
    title: "Industrial RO Systems",
    subtitle: "High-Volume Solutions",
    description: "Built for endurance and precision, our industrial systems handle massive throughput for large-scale production facilities.",
    image: "service-industrial",
    icon: Activity,
    features: ["Capacity up to 500,000 GPD", "Advanced PLC Control Systems", "Chemical-Free Scaling Prevention", "Remote Monitoring Enabled"]
  },
  {
    id: "commercial",
    title: "Commercial Water Treatment",
    subtitle: "Professional Grade Purity",
    description: "Ideal for hospitality, healthcare, and office complexes. Scalable solutions that grow with your business.",
    image: "service-commercial",
    icon: Zap,
    features: ["Modular Space-Saving Design", "Ultra-Silent Operation", "High-Efficiency Recovery Rates", "Integrated UV Sterilization"]
  },
  {
    id: "residential",
    title: "Premium Home RO",
    subtitle: "Safety for Your Family",
    description: "Compact, multi-stage filtration systems that remove 99.9% of contaminants while maintaining essential minerals.",
    image: "service-residential",
    icon: Droplets,
    features: ["7-Stage Filtration Process", "Easy-Change Filter Cartridges", "Modern Faucet Attachments", "Alkaline Re-mineralization"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">Our Solutions Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            We offer specialized water treatment systems engineered to solve complex purity challenges across multiple industries.
          </p>
        </div>

        <div className="space-y-24">
          {services.map((s, i) => (
            <div key={s.id} id={s.id} className={cn(
              "flex flex-col gap-12 items-center",
              i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            )}>
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                  <s.icon className="h-4 w-4" />
                  <span>{s.subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline text-accent">{s.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {s.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-sm text-accent">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 flex gap-4">
                  <Button asChild className="bg-primary px-8">
                    <Link href="/contact">Request Specifications</Link>
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Case Studies
                  </Button>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                  <Image
                    src={PlaceHolderImages.find(img => img.id === s.image)?.imageUrl || ""}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white font-medium">View technical diagram</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

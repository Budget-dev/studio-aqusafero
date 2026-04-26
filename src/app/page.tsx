
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Droplets, Zap, Activity, ArrowRight, Star, Building2, Factory } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  const serviceCards = [
    {
      title: "Compact Sewage Treatment Plant",
      tag: "No Land Required",
      desc: "Compact STP plant is a new evolution of sewage wastewater treatment with no land requirement for installation.",
      imgId: "service-stp",
      icon: Droplets
    },
    {
      title: "Commercial RO Plant",
      tag: "High Efficiency",
      desc: "Aqua Safe Water Technologies is a leading commercial RO plant manufacturer delivering high-performance water purification systems.",
      imgId: "service-ro",
      icon: Zap
    },
    {
      title: "Compact Effluent Treatment Plant",
      tag: "Industrial Use",
      desc: "ETP systems treat industrial wastewater and make it reusable by removing dissolved impurities.",
      imgId: "service-etp",
      icon: Factory
    },
    {
      title: "Why Choose Us",
      tag: "Trusted Solutions",
      desc: "We manufacture reliable and efficient water treatment plants with strong vendor partnerships.",
      imgId: "service-why",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="flex flex-col bg-slate-50/50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
            Smart Water Solutions 360!
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Revolutionizing water treatment with intelligent, compact, and high-efficiency systems for a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Side - Service Cards Grid */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCards.map((card, i) => (
                <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group bg-white">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={getImage(card.imgId)?.imageUrl || ""}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-bold shadow-sm">
                        {card.tag}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <card.icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-bold font-headline text-lg group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Large Feature Banners */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            {/* Top Banner */}
            <div className="relative h-full min-h-[280px] rounded-3xl overflow-hidden group shadow-sm">
              <Image
                src={getImage("banner-service")?.imageUrl || ""}
                alt="At Your Service"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <p className="text-primary-foreground font-bold uppercase tracking-widest text-xs mb-2 opacity-90">At Your Service</p>
                <h3 className="text-2xl font-bold text-white font-headline mb-1">Smart Water Treatment at Your Place</h3>
                <p className="text-white/70 text-sm mb-4">On-site expert support and maintenance.</p>
                <Button size="sm" variant="secondary" className="w-fit" asChild>
                  <Link href="/contact">Book Inquiry <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="relative h-full min-h-[280px] rounded-3xl overflow-hidden group shadow-sm">
              <Image
                src={getImage("banner-advanced")?.imageUrl || ""}
                alt="Advanced Water Solutions"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <p className="text-primary-foreground font-bold uppercase tracking-widest text-xs mb-2 opacity-90">Advanced Systems</p>
                <h3 className="text-2xl font-bold text-white font-headline mb-1">Advanced Water Solutions</h3>
                <p className="text-white/70 text-sm mb-4">For Domestic & Industrial Needs.</p>
                <Button size="sm" variant="secondary" className="w-fit" asChild>
                  <Link href="/services">View Catalog <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Liters Treated Daily", value: "25,00,000+", icon: Droplets },
              { label: "Installations Across Cities", value: "60+", icon: Building2 },
              { label: "Years Experience", value: "10+", icon: Activity }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm hover:border-primary/20 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold font-headline text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Summary */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold font-headline text-primary">Trusted by Industry Leaders Worldwide</h2>
              <p className="text-muted-foreground leading-relaxed">
                With over a decade of technical mastery, AquaSafe Hub provides mission-critical reverse osmosis and wastewater treatment solutions that power industrial progress and human health.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <ShieldCheck className="h-5 w-5" />
                    <span>99.9% Uptime</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reliable industrial installations with automated monitoring.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Star className="h-5 w-5" />
                    <span>Expert Support</span>
                  </div>
                  <p className="text-xs text-muted-foreground">PhD-level engineers providing custom design specs.</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src={getImage("team-expert")?.imageUrl || ""}
                  alt="Expert consultation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10 text-primary-foreground">
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-6">Ready for Crystal Clear Results?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 text-lg">
            Connect with our water treatment experts today to design a solution tailored to your specific industrial or commercial needs.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-10 rounded-full h-14 text-lg font-bold">
            <Link href="/contact">Get Custom Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

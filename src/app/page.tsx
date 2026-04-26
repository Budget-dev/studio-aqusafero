
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Activity, Settings, Zap, ArrowRight, Star } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-water");
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg?.imageUrl || ""}
            alt={heroImg?.description || "Water filtration"}
            fill
            className="object-cover brightness-[0.4]"
            priority
            data-ai-hint="industrial water filtration"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Next-Gen RO Technology</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
              Purity in Every <span className="text-primary-foreground">Drop</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              AquaSafe Hub provides mission-critical reverse osmosis solutions for industries that demand the highest standards of water quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-lg">
                <Link href="/services">Our Solutions</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 h-12 text-lg">
                <Link href="/recommend">AI Recommendation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Core Water Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From large-scale industrial desalinization to advanced residential filtration, we cover the full spectrum of RO requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Industrial Plants",
                desc: "High-capacity systems for manufacturing, pharma, and power generation.",
                icon: Activity,
                link: "/services#industrial"
              },
              {
                title: "Commercial RO",
                desc: "Efficient water purification for restaurants, offices, and laboratories.",
                icon: ShieldCheck,
                link: "/services#commercial"
              },
              {
                title: "Maintenance",
                desc: "24/7 technical support and precision filter replacement services.",
                icon: Settings,
                link: "/services#maintenance"
              }
            ].map((s, i) => (
              <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-none bg-white/50 backdrop-blur">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary group-hover:text-white transition-colors">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-primary">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                  <Link href={s.link} className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals & Stats */}
      <section className="py-20 bg-accent text-accent-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold font-headline leading-tight">Trusted by Industry Leaders Worldwide</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-full bg-primary/20"><ShieldCheck className="h-6 w-6 text-primary-foreground" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Unmatched Reliability</h4>
                    <p className="text-accent-foreground/60 text-sm">99.9% uptime for our industrial installations with automated monitoring systems.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-full bg-primary/20"><Star className="h-6 w-6 text-primary-foreground" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Expert Consultation</h4>
                    <p className="text-accent-foreground/60 text-sm">Our PhD-level engineers provide custom design specs for every unique application.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-accent-foreground/10">
                <div>
                  <p className="text-3xl font-bold font-headline">500+</p>
                  <p className="text-xs uppercase tracking-widest text-accent-foreground/40">Plants Installed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-headline">15M</p>
                  <p className="text-xs uppercase tracking-widest text-accent-foreground/40">GPD Purified</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-headline">24/7</p>
                  <p className="text-xs uppercase tracking-widest text-accent-foreground/40">Active Support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={PlaceHolderImages.find(i => i.id === "team-expert")?.imageUrl || ""}
                  alt="Expert consultation"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs md:block hidden">
                <div className="flex text-yellow-500 mb-2">
                  {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-primary text-sm italic font-medium">"AquaSafe Hub transformed our manufacturing process with their tailored RO solution. The ROI was clear within months."</p>
                <p className="text-muted-foreground text-xs mt-2">— TechPharma Global, CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-6">Ready for Crystal Clear Results?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
            Connect with our water treatment experts today to design a solution tailored to your specific industrial or commercial needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary px-10 rounded-full h-14 text-lg">
              <Link href="/contact">Get Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

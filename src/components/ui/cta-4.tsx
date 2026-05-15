
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Cta4Props {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  items: string[];
}

export function Cta4({ title, description, buttonText, buttonUrl, items }: Cta4Props) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline text-white leading-[1.1] tracking-tight">
                  {title}
                </h2>
                <p className="text-xl font-bold text-slate-400 leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black text-xl border-none transition-all shadow-xl shadow-primary/20">
                  <Link href={buttonUrl}>{buttonText}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 font-black text-xl backdrop-blur-md transition-all">
                  <Link href="tel:+919985850777">Call Specialist</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Check className="h-5 w-5 text-white stroke-[3px]" />
                  </div>
                  <span className="text-lg font-black text-white/90 tracking-tight uppercase text-xs sm:text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

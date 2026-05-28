
import { Star, Quote, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsPage() {
  const testimonials: any[] = [];

  return (
    <div className="min-h-screen py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">Client Testimonials</h1>
          <p className="text-muted-foreground">Don't just take our word for it—hear from our satisfied partners.</p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-none shadow-xl relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Quote className="h-16 w-16" />
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="flex text-yellow-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <div className="pt-4 border-t border-muted">
                    <h4 className="font-bold text-accent">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[3rem] border border-slate-100 space-y-6">
            <Info className="h-12 w-12 text-slate-200 mx-auto" />
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Testimonial Hub Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

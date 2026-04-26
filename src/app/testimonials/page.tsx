
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Robert Chen",
      role: "Operations Manager, TechPharma",
      text: "The industrial RO installation by AquaSafe Hub has been flawless. Their technical support is truly 24/7.",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Residential Client",
      text: "The home RO system is compact and the water tastes amazing. The installation team was professional and clean.",
      rating: 5
    },
    {
      name: "Ahmed Al-Fayed",
      role: "Director, City Hotels",
      text: "We reduced our water maintenance costs by 30% after switching to AquaSafe's service contract.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold font-headline text-primary">Client Testimonials</h1>
          <p className="text-muted-foreground">Don't just take our word for it—hear from our satisfied partners.</p>
        </div>

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
      </div>
    </div>
  );
}

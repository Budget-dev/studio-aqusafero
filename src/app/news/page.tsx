
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewsPage() {
  const events = [
    {
      title: "AquaSafe Hub to Exhibit at Global Water Summit 2024",
      date: "August 20, 2024",
      category: "Event",
      desc: "Join us in Dubai as we showcase our latest ZLD (Zero Liquid Discharge) systems for industrial applications."
    },
    {
      title: "Breakthrough in Membrane Longevity Technology",
      date: "July 15, 2024",
      category: "Innovation",
      desc: "Our R&D team has successfully patented a new coating that doubles the life of RO membranes in high-salinity conditions."
    },
    {
      title: "New Service Center Opens in Texas",
      date: "June 30, 2024",
      category: "Expansion",
      desc: "Expanding our footprint to provide faster support and spares delivery to our growing US client base."
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-16">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Newspaper className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-headline text-primary">News and Events</h1>
            <p className="text-muted-foreground">Stay updated with our latest innovations, site expansions, and industry events.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((e, i) => (
            <Card key={i} className="flex flex-col border-none shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded">
                    {e.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {e.date}
                  </div>
                </div>
                <CardTitle className="font-headline text-xl leading-snug">{e.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">{e.desc}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 text-primary font-bold">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

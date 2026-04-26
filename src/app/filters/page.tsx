
import { Droplets, Beaker, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FiltersPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">Filters and Chemicals</h1>
          <p className="text-lg text-muted-foreground">
            Specialized filtration media and chemical solutions designed to protect your RO membranes and enhance water purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-accent">Filtration Media</h2>
            <div className="grid gap-6">
              {[
                { title: "Activated Carbon", desc: "High-grade coconut shell carbon for chlorine and VOC removal." },
                { title: "Sand & Multimedia", desc: "Precision-graded media for effective suspended solids removal." },
                { title: "Iron Removal Media", desc: "Catalytic media for removing iron, manganese, and H2S." },
                { title: "Softening Resins", desc: "High-capacity ion exchange resins for water hardness." }
              ].map((item, i) => (
                <Card key={i} className="group hover:bg-primary/5 transition-colors border-none shadow-sm">
                  <CardContent className="p-6 flex gap-4 items-center">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-accent">RO Chemicals</h2>
            <div className="grid gap-6">
              {[
                { title: "Antiscalants", desc: "Prevent scale formation and extend membrane life significantly." },
                { title: "Membrane Cleaners", desc: "Acidic and alkaline cleaners for organic and inorganic fouling." },
                { title: "Biocides", desc: "Non-oxidizing agents to control biological growth in systems." },
                { title: "Flocculants", desc: "Enhance pre-filtration efficiency in turbid water conditions." }
              ].map((item, i) => (
                <Card key={i} className="group hover:bg-secondary/50 transition-colors border-none shadow-sm">
                  <CardContent className="p-6 flex gap-4 items-center">
                    <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
                      <Beaker className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

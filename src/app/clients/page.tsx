
import { Building2, Landmark, Factory, Home, Info } from "lucide-react";

export default function ClientsPage() {
  const categories: any[] = [];

  return (
    <div className="min-h-screen py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Our Valued Clients</h1>
          <p className="text-muted-foreground text-lg">
            We are proud to serve a diverse portfolio of clients across multiple sectors, providing mission-critical water solutions.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold font-headline text-xl">{cat.title}</h3>
                </div>
                <ul className="space-y-4">
                  {cat.clients.map((client: string, ci: number) => (
                    <li key={ci} className="text-muted-foreground flex items-center gap-2 text-sm border-l-2 border-primary/20 pl-4 py-1">
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[3rem] border border-slate-100 space-y-6">
            <Info className="h-12 w-12 text-slate-200 mx-auto" />
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Client Registry Empty</p>
          </div>
        )}

        <div className="mt-20 p-12 bg-primary text-primary-foreground rounded-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold font-headline">Join Our Growing Network</h2>
          <p className="max-w-xl mx-auto opacity-80">
            From Fortune 500 companies to private estates, we bring the same level of engineering excellence to every project.
          </p>
        </div>
      </div>
    </div>
  );
}


import { Settings, Package, ShieldCheck, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SparesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-6">Spares and Components</h1>
          <p className="text-lg text-muted-foreground">
            Genuine high-performance replacement parts and components for all major RO systems. Ensure your plant operates at peak efficiency with our factory-certified spares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Settings, title: "Pumps & Motors", desc: "High-pressure multi-stage centrifugal pumps." },
            { icon: Package, title: "Vessels & Housings", desc: "ASME certified pressure vessels for membranes." },
            { icon: ShieldCheck, title: "Control Systems", desc: "PLCs, sensors, and automated monitoring units." },
            { icon: Truck, title: "Rapid Delivery", desc: "Express shipping for critical maintenance parts." }
          ].map((item, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-8 space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 w-fit text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold font-headline text-xl">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-accent text-accent-foreground p-12 rounded-3xl">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center">Comprehensive Component Catalog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-primary-foreground border-b border-primary/20 pb-2">Instrumentation</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• Digital Flow Meters</li>
                <li>• Conductivity Meters</li>
                <li>• Pressure Gauges (Glycerin Filled)</li>
                <li>• PH/ORP Controllers</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-primary-foreground border-b border-primary/20 pb-2">Hardware</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• Membrane Housings (SS/FRP)</li>
                <li>• Multiport Valves</li>
                <li>• Solenoid Valves</li>
                <li>• Dosing Pumps</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-primary-foreground border-b border-primary/20 pb-2">Maintenance Kits</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>• O-Ring Seal Kits</li>
                <li>• Pump Repair Kits</li>
                <li>• Valve Internal Spares</li>
                <li>• Electrical Contactors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

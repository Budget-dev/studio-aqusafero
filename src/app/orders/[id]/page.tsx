
"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock,
  Wrench,
  Factory,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const STEPS = [
  { id: 1, name: "Order Confirmed", desc: "Your payment has been verified.", date: "Just now", status: "completed", icon: Package },
  { id: 2, name: "Engineering Check", desc: "Quality inspection for components.", date: "Today", status: "completed", icon: Factory },
  { id: 3, name: "Processing", desc: "Packing your specialized unit.", date: "Awaiting", status: "active", icon: Wrench },
  { id: 4, name: "On the Way", desc: "Courier partner has picked up.", date: "Pending", status: "pending", icon: Truck },
  { id: 5, name: "Delivered", desc: "Product handed over to customer.", date: "Pending", status: "pending", icon: CheckCircle2 },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('aquasafe-orders') || '[]');
    const found = savedOrders.find((o: any) => o.id === params.id || o.orderId === params.id);
    setOrder(found);
  }, [params.id]);

  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="font-black uppercase text-[10px] tracking-widest text-slate-400">Locating Hub Transaction...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <Button asChild variant="ghost" className="p-0 font-black uppercase text-[10px] tracking-widest mb-4 hover:text-primary">
              <Link href="/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Back to History</Link>
            </Button>
            <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">Tracking <span className="text-primary">#{order.orderId || params.id}</span></h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</p>
              <p className="text-sm font-black text-slate-900 uppercase">{order.status}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Tracking Timeline */}
          <div className="lg:col-span-7 space-y-12">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />
              
              <div className="space-y-12 relative">
                {STEPS.map((step, i) => (
                  <div key={step.id} className="flex gap-8 group">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      step.status === 'completed' ? 'bg-primary text-white scale-110' :
                      step.status === 'active' ? 'bg-slate-900 text-white animate-pulse scale-125' : 'bg-white text-slate-300 border-2 border-slate-100'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-lg font-black font-headline uppercase tracking-tight ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>
                          {step.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.status === 'completed' ? (order.date || 'Today') : step.date}</span>
                      </div>
                      <p className={`text-sm font-bold leading-relaxed ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Snapshot */}
          <aside className="lg:col-span-5 space-y-8">
            <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h3 className="font-black font-headline uppercase tracking-tight text-lg">Delivery Point</h3>
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-900 uppercase">{order.customerName}</p>
                  <p className="text-sm font-bold text-slate-600 leading-relaxed">
                    {order.address}
                  </p>
                  <p className="text-sm font-bold text-primary pt-2">{order.phone}</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
              <h3 className="font-black font-headline uppercase tracking-tight text-lg">Items Summary</h3>
              <div className="space-y-4">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <span className="font-bold opacity-60">x{item.quantity}</span>
                      <span className="font-black uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="font-black">₹{item.price?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between text-lg font-black font-headline">
                <span>Paid Total</span>
                <span className="text-primary">₹{order.total?.toLocaleString()}</span>
              </div>
              <Button asChild className="w-full h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest border-none">
                <Link href="/contact">Support Center <ChevronRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

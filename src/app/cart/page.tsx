"use client"

import Image from "next/image";
import Link from "next/link";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CART_ITEMS = [
  { id: "1", name: "Industrial RO Plant Type-A", price: 11250, category: "Industrial", image: "https://picsum.photos/seed/ro1/400/500", quantity: 1 },
  { id: "5", name: "Membrane Master Spares", price: 150, category: "Spares", image: "https://picsum.photos/seed/ro5/400/500", quantity: 2 },
];

export default function CartPage() {
  const subtotal = CART_ITEMS.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black font-headline text-slate-900 tracking-tighter leading-tight">
              Review <br /><span className="text-primary">Your Selection</span>
            </h1>
            <Button asChild variant="ghost" className="text-slate-400 hover:text-primary transition-colors p-0 font-black uppercase tracking-widest text-[10px]">
              <Link href="/products">
                <ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[140px]">
              <p className="text-2xl font-black text-slate-900">{CART_ITEMS.length}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Items</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center min-w-[140px]">
              <p className="text-2xl font-black text-primary">${total.toLocaleString()}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Est. Total</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex-1">Product Details</div>
                <div className="w-32 text-center">Quantity</div>
                <div className="w-32 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-slate-50">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="p-8 flex items-center gap-8 group">
                    <div className="relative h-32 w-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary leading-none">{item.category}</p>
                      <h3 className="font-headline font-black text-xl text-slate-900">{item.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-slate-400">${item.price.toLocaleString()}</span>
                        <button className="text-destructive hover:text-destructive/80 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="w-32 flex items-center justify-center">
                      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Minus className="h-3 w-3" /></Button>
                        <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>

                    <div className="w-32 text-right">
                      <p className="font-black text-lg text-slate-900">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Secure Payment", desc: "Enterprise Encryption" },
                { icon: Truck, title: "Safe Transport", desc: "Insured Global Shipping" },
                { icon: Clock, title: "Support 24/7", desc: "Direct Specialist Access" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100">
                  <div className="p-3 rounded-xl bg-primary/5 text-primary"><item.icon className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">{item.title}</p>
                    <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-4 sticky top-32">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-full bg-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
              
              <h2 className="text-3xl font-black font-headline mb-10 tracking-tight">Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between text-sm font-bold opacity-60">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold opacity-60">
                  <span>Shipping</span>
                  <span className="text-green-400 uppercase tracking-widest text-[10px] font-black">Free</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold opacity-60">
                  <span>Estimated Tax</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between text-2xl font-black font-headline">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative mb-8">
                  <Input 
                    placeholder="Promo Code" 
                    className="h-14 bg-white/5 border-white/10 rounded-2xl pr-24 font-bold placeholder:opacity-30"
                  />
                  <Button variant="ghost" className="absolute right-2 top-2 h-10 px-4 rounded-xl text-primary font-black uppercase tracking-widest text-[10px]">
                    Apply
                  </Button>
                </div>

                <Button asChild className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                  <Link href="/checkout">
                    Checkout Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                  Checkout processed via Stripe Secure
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
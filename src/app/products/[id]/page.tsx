"use client"

import { useState } from "react";
import Image from "next/image";
import { 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  Plus, 
  Minus, 
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle2,
  Info,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const PRODUCT_IMAGES = [
  "https://picsum.photos/seed/detail1/1200/1500",
  "https://picsum.photos/seed/detail2/1200/1500",
  "https://picsum.photos/seed/detail3/1200/1500",
  "https://picsum.photos/seed/detail4/1200/1500",
];

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl h-14 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="h-3 w-3" />
          <a href="/products" className="hover:text-primary transition-colors">Products</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Industrial RO Plant Type-A</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-50 group">
              <Image
                src={PRODUCT_IMAGES[activeImage]}
                alt="Product image"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute top-8 left-8">
                <Badge className="bg-primary text-white font-black uppercase tracking-widest text-xs px-6 py-2 rounded-2xl border-none shadow-2xl">
                  Best Seller
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {PRODUCT_IMAGES.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                    activeImage === i ? "border-primary shadow-xl scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1">
                    Industrial Series
                  </Badge>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-[10px] font-black text-slate-400 ml-1">4.9 (128 Reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline text-slate-900 leading-[1.1] tracking-tighter">
                  Industrial RO <br />Plant Type-A
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-slate-900">$11,250</span>
                <span className="text-xl font-bold text-slate-400 line-through">$12,500</span>
                <Badge variant="destructive" className="font-black rounded-lg">SAVE 10%</Badge>
              </div>

              <p className="text-slate-600 font-bold leading-relaxed text-lg">
                High-performance reverse osmosis system designed for 24/7 industrial operations. Features advanced filtration, automated flushing, and real-time TDS monitoring.
              </p>
            </div>

            {/* Variant / Options Simulation */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Capacity</Label>
                <div className="flex flex-wrap gap-3">
                  {["500 GPD", "1000 GPD", "2500 GPD", "5000 GPD"].map((cap) => (
                    <button key={cap} className={cn(
                      "px-6 py-4 rounded-2xl border-2 font-black text-xs transition-all",
                      cap === "2500 GPD" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                    )}>
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and CTA */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 shrink-0">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 rounded-xl text-slate-400"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 rounded-xl text-slate-400"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button className="flex-1 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-slate-200">
                  <ShoppingCart className="mr-3 h-5 w-5" /> Add to Cart
                </Button>
                
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-[1.5rem] border-2 border-slate-100 shrink-0 text-slate-400 hover:text-red-500">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">Warranty</p>
                    <p className="text-[10px] font-bold text-slate-500">5 Years Coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">Free Shipping</p>
                    <p className="text-[10px] font-bold text-slate-500">Over $500 Orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specs" className="border-b-slate-100">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6">
                  Technical Specifications
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2 pb-8">
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Model Number</span>
                    <span className="font-black text-slate-900 text-right">AS-IRO-1000A</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Voltage</span>
                    <span className="font-black text-slate-900 text-right">220V / 50Hz</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Recovery Rate</span>
                    <span className="font-black text-slate-900 text-right">Up to 75%</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Membrane Type</span>
                    <span className="font-black text-slate-900 text-right">Spiral Wound TFC</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery" className="border-none">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-sm font-bold text-slate-500 leading-relaxed pt-2 pb-8">
                  Standard delivery takes 3-7 business days depending on location. We offer a 30-day return policy for unused products in original packaging. Installation is included for industrial systems within regional zones.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Extended Tabs */}
        <section className="mt-32 pt-32 border-t border-slate-100">
          <Tabs defaultValue="description" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="h-16 bg-slate-50 p-1 rounded-2xl border">
                <TabsTrigger value="description" className="px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">Description</TabsTrigger>
                <TabsTrigger value="reviews" className="px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">Reviews (128)</TabsTrigger>
                <TabsTrigger value="faq" className="px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">FAQ</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="description" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-black font-headline text-slate-900 tracking-tighter">Precision Engineering <br />for Pure Reliability</h2>
                  <p className="text-slate-600 font-bold leading-relaxed text-lg">
                    The Industrial RO Plant Type-A is the culmination of a decade of water treatment research. Every component, from the high-pressure multi-stage pumps to the micro-porous TFC membranes, is selected for maximum lifespan and consistent water quality output.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Automated PLC Control with Touch Interface",
                      "Real-time Conductivity & TDS Monitoring",
                      "Integrated Pre-filtration & Sediment Removal",
                      "Stainless Steel 316 High-Pressure Piping"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-900 font-black uppercase tracking-widest text-[10px]">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image src="https://picsum.photos/seed/tech/800/600" alt="Tech detail" fill className="object-cover" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              {/* Reviews UI Component Simulation */}
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-12 p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <div className="text-center md:border-r md:pr-12 md:border-slate-200">
                    <p className="text-7xl font-black font-headline text-slate-900">4.9</p>
                    <div className="flex justify-center gap-1 my-2">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Rating</p>
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <div key={r} className="flex items-center gap-4">
                        <span className="text-xs font-black text-slate-900 w-4">{r}</span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: r === 5 ? '92%' : r === 4 ? '6%' : '1%' }} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 w-12">{r === 5 ? '92%' : r === 4 ? '6%' : '1%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
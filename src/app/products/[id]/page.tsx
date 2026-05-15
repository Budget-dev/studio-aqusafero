
"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  ShoppingCart,
  Heart,
  CheckCircle2,
  Package,
  Clock,
  RotateCcw
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/app/lib/products-data";

export default function ProductDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === params.id);
    if (found) {
      setProduct(found);
    } else {
      setProduct(PRODUCTS[0]);
    }
  }, [params.id]);

  if (!product) return null;

  const images = [
    product.image,
    `https://picsum.photos/seed/${product.id}2/1200/1500`,
    `https://picsum.photos/seed/${product.id}3/1200/1500`,
    `https://picsum.photos/seed/${product.id}4/1200/1500`,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl h-14 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="h-3 w-3" />
          <a href="/products" className="hover:text-primary transition-colors">Catalog</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-50 group shadow-sm border border-slate-100">
              <Image src={images[activeImage]} alt={product.name} fill className="object-cover transition-transform duration-700 hover:scale-105" priority />
              <div className="absolute top-8 left-8">
                <Badge className="bg-slate-900/90 backdrop-blur-md text-white font-black uppercase tracking-widest text-xs px-6 py-2 rounded-2xl border-none">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {images.map((img, i) => (
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

          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1 bg-primary/5">
                    {product.subcategory}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-black text-slate-900">{product.rating}</span>
                    <span className="text-[10px] font-black text-slate-400 ml-1">({product.reviewsCount} Reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline text-slate-900 tracking-tighter leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-slate-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl font-bold text-slate-400 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-slate-600 font-bold leading-relaxed text-lg">
                {product.description} Engineered for endurance and precision, this unit provides unmatched water quality.
              </p>
            </div>

            {/* Commerce Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 rounded-xl text-slate-400"><Minus className="h-4 w-4" /></Button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 rounded-xl text-slate-400"><Plus className="h-4 w-4" /></Button>
                </div>
                
                <Button className="flex-1 h-16 rounded-[1.5rem] bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-slate-200 border-none transition-all">
                  <ShoppingCart className="mr-3 h-5 w-5" /> Add to Cart
                </Button>
                
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-[1.5rem] border-2 border-slate-100 shrink-0 text-slate-400 hover:text-primary">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div><p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">Warranty</p><p className="text-[10px] font-bold text-slate-500">{product.specs['Warranty'] || '2 Years Certified'}</p></div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Truck className="h-5 w-5 text-primary" />
                  <div><p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">Global Shipping</p><p className="text-[10px] font-bold text-slate-500">{product.deliveryEstimate}</p></div>
                </div>
              </div>
            </div>

            {/* Accordion Specs */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specs" className="border-b-slate-100">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6">Technical Specifications</AccordionTrigger>
                <AccordionContent className="pt-2 pb-8">
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="contents">
                        <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">{key}</span>
                        <span className="font-black text-slate-900 text-right">{value}</span>
                      </div>
                    ))}
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Compliance</span>
                    <span className="font-black text-slate-900 text-right">ISO 9001, NSF</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Enhanced Content Tabs */}
        <section className="mt-32 pt-32 border-t border-slate-100">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="h-16 bg-slate-50 p-1 rounded-2xl border">
                <TabsTrigger value="overview" className="px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">Overview</TabsTrigger>
                <TabsTrigger value="policy" className="px-10 rounded-xl font-black uppercase tracking-widest text-[10px]">Policies</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-black font-headline text-slate-900 tracking-tight leading-tight">Advanced Engineering <br />for Mission Critical Purity</h2>
                  <p className="text-slate-600 font-bold text-lg leading-relaxed">
                    This system features our patented multi-stage filtration matrix, designed to provide consistent water quality even in variable source conditions.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Clock, title: "24/7 Ops", desc: "Built for industrial duty cycles." },
                      { icon: Package, title: "OEM Spares", desc: "Universal compatibility guaranteed." },
                      { icon: ShieldCheck, title: "Safety First", desc: "BPA-free high-pressure materials." },
                      { icon: RotateCcw, title: "Easy Swap", desc: "Tool-less maintenance design." }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="p-2 rounded-lg bg-primary/10 w-fit text-primary"><item.icon className="h-4 w-4" /></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image src={`https://picsum.photos/seed/${product.id}detail/800/600`} alt="Technical view" fill className="object-cover" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="policy" className="animate-in fade-in slide-in-from-bottom-4 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-black font-headline text-slate-900 uppercase">Refund & Returns</h3>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">We offer a 15-day return policy for unused, factory-sealed components. Custom-built industrial plants are subject to individual service contracts. Shipping costs for returns are the responsibility of the customer unless the unit is defective.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-black font-headline text-slate-900 uppercase">Shipping & Logistics</h3>
                  <p className="text-sm font-bold text-slate-500 leading-relaxed">Domestic units are shipped via express courier within 48 hours. Industrial plants require technical logistics coordination and typically arrive within 7-10 business days depending on site readiness.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

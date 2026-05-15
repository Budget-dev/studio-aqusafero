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
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl h-14 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <ChevronRight className="h-3 w-3" />
          <a href="/products" className="hover:text-primary transition-colors">Catalog</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-100 p-8">
              <Image src={images[activeImage]} alt={product.name} fill className="object-contain" priority />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square rounded-lg overflow-hidden border-2 transition-all p-2",
                    activeImage === i ? "border-primary bg-slate-50" : "border-transparent opacity-60 hover:opacity-100 bg-white"
                  )}
                >
                  <Image src={img} alt={`Thumb ${i}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-sm px-2 py-0.5 bg-primary/5">
                  {product.subcategory}
                </Badge>
                {product.capacity && (
                  <span className="text-[10px] font-black text-slate-500 uppercase">Capacity: {product.capacity}</span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-black font-headline text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-lg font-bold text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>

              <p className="text-slate-600 font-bold leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 text-slate-400"><Minus className="h-4 w-4" /></Button>
                  <span className="w-10 text-center font-black">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 text-slate-400"><Plus className="h-4 w-4" /></Button>
                </div>
                
                <Button className="flex-1 h-12 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs border-none transition-all">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div><p className="text-[9px] font-black uppercase text-slate-900 mb-0.5">Warranty</p><p className="text-[9px] font-bold text-slate-500">{product.specs['Warranty'] || '2 Years'}</p></div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Truck className="h-5 w-5 text-primary" />
                  <div><p className="text-[9px] font-black uppercase text-slate-900 mb-0.5">Shipping</p><p className="text-[9px] font-bold text-slate-500">{product.deliveryEstimate}</p></div>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specs">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6">Technical Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-y-4 text-sm py-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="contents">
                        <span className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">{key}</span>
                        <span className="font-black text-slate-900 text-right">{value}</span>
                      </div>
                    ))}
                    <span className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Compliance</span>
                    <span className="font-black text-slate-900 text-right">ISO 9001 Certified</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}

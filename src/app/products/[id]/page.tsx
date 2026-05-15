
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
  CheckCircle2
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
import { MOCK_PRODUCTS } from "../page";

export default function ProductDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const found = MOCK_PRODUCTS.find(p => p.id === params.id);
    if (found) {
      setProduct(found);
    } else {
      setProduct(MOCK_PRODUCTS[0]); // Default to first if not found for demo
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
          <a href="/products" className="hover:text-primary transition-colors">Products</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-50 group">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute top-8 left-8">
                <Badge className="bg-primary text-white font-black uppercase tracking-widest text-xs px-6 py-2 rounded-2xl border-none shadow-2xl">
                  {product.isNew ? "New Arrival" : "Best Seller"}
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

          {/* Info Section */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-[10px] font-black text-slate-400 ml-1">{product.rating} (128 Reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-headline text-slate-900 leading-[1.1] tracking-tighter">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-slate-900">${product.discount ? (product.price * (1 - product.discount/100)).toLocaleString() : product.price.toLocaleString()}</span>
                {product.discount && (
                  <>
                    <span className="text-xl font-bold text-slate-400 line-through">${product.price.toLocaleString()}</span>
                    <Badge variant="destructive" className="font-black rounded-lg">SAVE {product.discount}%</Badge>
                  </>
                )}
              </div>

              <p className="text-slate-600 font-bold leading-relaxed text-lg">
                {product.description} Engineered with cutting-edge technology to ensure the highest level of water purity and system reliability.
              </p>
            </div>

            {/* Variant / Options Simulation */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capacity / Size Option</Label>
                <div className="flex flex-wrap gap-3">
                  {["Standard", "Pro", "Enterprise", "Ultra"].map((opt) => (
                    <button key={opt} className={cn(
                      "px-6 py-4 rounded-2xl border-2 font-black text-xs transition-all",
                      opt === "Standard" ? "border-primary bg-primary/5 text-primary" : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                    )}>
                      {opt}
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
                    <p className="text-[10px] font-black uppercase text-slate-900 leading-none mb-1">Global Shipping</p>
                    <p className="text-[10px] font-bold text-slate-500">Insured Transport</p>
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
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Model Category</span>
                    <span className="font-black text-slate-900 text-right">{product.category}</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Voltage</span>
                    <span className="font-black text-slate-900 text-right">220V / 50Hz</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Efficiency Rate</span>
                    <span className="font-black text-slate-900 text-right">Up to 85%</span>
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Certifications</span>
                    <span className="font-black text-slate-900 text-right">ISO, NSF, CE</span>
                  </div>
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
              </TabsList>
            </div>
            
            <TabsContent value="description" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-black font-headline text-slate-900 tracking-tighter">Precision Engineering <br />for Pure Reliability</h2>
                  <p className="text-slate-600 font-bold leading-relaxed text-lg">
                    {product.description} This system represents the pinnacle of water treatment technology, developed over 25 years of research and industrial implementation.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Automated PLC Control with Touch Interface",
                      "Real-time TDS and Conductivity Monitoring",
                      "Integrated Pre-filtration and Membrane Protection",
                      "Stainless Steel High-Pressure Components"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-900 font-black uppercase tracking-widest text-[10px]">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image src={`https://picsum.photos/seed/${product.id}det/800/600`} alt="Detail" fill className="object-cover" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

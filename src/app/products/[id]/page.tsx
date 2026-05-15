
"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  ShoppingCart,
  Check,
  PlayCircle,
  Activity,
  Zap,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/app/lib/products-data";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    
    setTimeout(() => setIsAdded(false), 2000);
  };

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
                
                <Button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-lg font-black uppercase tracking-widest text-xs border-none transition-all ${
                    isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-900 hover:bg-primary'
                  } text-white`}
                >
                  {isAdded ? (
                    <><Check className="mr-2 h-4 w-4" /> Added to Cart</>
                  ) : (
                    <><ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart</>
                  )}
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

        {/* Video Deep Analysis Section */}
        <section className="mt-24 pt-24 border-t border-slate-100">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1 uppercase tracking-widest font-black text-[10px]">
                Engineering Insights
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black font-headline text-slate-900 tracking-tight uppercase leading-tight">
                Deep Analysis <span className="text-primary">& Performance</span>
              </h2>
              <p className="text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                Take a closer look at the technical mastery powering this system. Our engineers provide a full breakdown of the filtration stages, membrane flux, and long-term durability metrics.
              </p>
            </div>

            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 bg-slate-900 group">
              <iframe 
                width="100%" 
                height="100%" 
                src={product.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
                title={`${product.name} Deep Analysis`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[2rem]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-3 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="p-3 rounded-xl bg-white shadow-sm text-primary">
                    <Activity className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency Index</p>
                  <p className="text-lg font-black text-slate-900 uppercase">98.5% Rejection</p>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-3 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="p-3 rounded-xl bg-white shadow-sm text-primary">
                    <Zap className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Energy Rating</p>
                  <p className="text-lg font-black text-slate-900 uppercase">A++ Grade Tech</p>
               </div>
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-3 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="p-3 rounded-xl bg-white shadow-sm text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certification</p>
                  <p className="text-lg font-black text-slate-900 uppercase">ISI Compliant</p>
               </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-black font-headline uppercase tracking-tight">Need a custom technical audit?</h4>
                <p className="text-slate-400 font-bold max-w-lg">
                  Our senior engineering team can provide on-site diagnostics and performance mapping for your specific site conditions.
                </p>
                <Button asChild className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] border-none shadow-xl shadow-primary/20">
                  <a href="/contact">Book Technical Consultation</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

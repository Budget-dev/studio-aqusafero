
"use client"

import { useState, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDoc, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus, 
  ShoppingCart,
  Check,
  Activity,
  Zap,
  Shield,
  Loader2,
  ArrowLeft
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
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

/**
 * Enterprise Product SEO & Schema Generator
 */
function ProductSchema({ product, url }: { product: any, url: string }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.thumbnail || product.images?.[0]?.url,
    "description": product.shortDescription || product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "AquaSafe"
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "INR",
      "price": product.offerPrice || product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Aqua Safe Water Technologies"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const firestore = useFirestore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const productRef = useMemo(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, "products", params.id as string);
  }, [firestore, params.id]);

  const { data: product, loading } = useDoc(productRef);

  const images = useMemo(() => {
    if (!product || !product.images) {
      return ["https://placehold.co/800x1000?text=AquaSafe+Technical+Asset"];
    }
    
    // Handle the object structure from the new admin form
    if (typeof product.images === 'object' && !Array.isArray(product.images)) {
      const imgObj = product.images;
      const list = [];
      if (imgObj.thumbnail) list.push(imgObj.thumbnail);
      if (imgObj.hover) list.push(imgObj.hover);
      if (imgObj.gallery && Array.isArray(imgObj.gallery)) {
        list.push(...imgObj.gallery.filter((url: string) => !!url));
      }
      return list.length > 0 ? list : ["https://placehold.co/800x1000?text=No+Image"];
    }

    // Handle legacy array structure
    if (Array.isArray(product.images)) {
      return product.images.map((img: any) => typeof img === 'string' ? img : img.url);
    }

    return ["https://placehold.co/800x1000?text=AquaSafe+Technical+Asset"];
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.offerPrice || product.price,
      image: images[0],
      category: product.category,
      subcategory: product.type || ''
    };

    addToCart(cartProduct as any, quantity);
    setIsAdded(true);
    toast({
      title: "Asset Reserved",
      description: `${quantity} x ${product.name} added to your checkout session.`,
    });
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Technical Blueprint...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <h2 className="text-2xl font-black font-headline uppercase">Asset Not Found</h2>
        <Button onClick={() => router.push('/products')}>Return to Catalog</Button>
      </div>
    );
  }

  const pageUrl = `https://aquasafero.com/products/${product.id}`;

  return (
    <div className="min-h-screen bg-white">
      <ProductSchema product={product} url={pageUrl} />
      
      <div className="border-b bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-screen-2xl h-14 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-primary transition-colors">Hub</a>
          <ChevronRight className="h-3 w-3" />
          <a href="/products" className="hover:text-primary transition-colors">Catalog</a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 truncate">{product.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-screen-2xl py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 p-8 shadow-inner">
              <Image 
                src={images[activeImage]} 
                alt={`${product.name} - Technical Water Solution by AquaSafe Vizag`} 
                fill 
                className="object-contain" 
                priority 
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 bg-white",
                    activeImage === i ? "border-primary shadow-lg" : "border-slate-100 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`${product.name} view ${i}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary border-primary/20 text-[10px] font-black uppercase tracking-widest rounded-sm px-2 py-0.5 bg-primary/5">
                  {product.category} {product.type}
                </Badge>
                {product.sku && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU: {product.sku}</span>
                )}
              </div>
              <h1 className="text-3xl lg:text-5xl font-black font-headline text-slate-900 tracking-tight leading-tight uppercase">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-slate-900">₹{(product.offerPrice || product.price || 0).toLocaleString('en-IN')}</span>
                {product.offerPrice && product.price && (
                  <span className="text-lg font-bold text-slate-300 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                )}
              </div>

              <p className="text-slate-500 font-bold leading-relaxed text-sm">
                {product.shortDescription || product.description}
              </p>
              
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Professional Installation & Service Available in Visakhapatnam & Gajuwaka.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 text-slate-400 rounded-lg"><Minus className="h-4 w-4" /></Button>
                  <span className="w-12 text-center font-black">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 text-slate-400 rounded-lg"><Plus className="h-4 w-4" /></Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 rounded-xl font-black uppercase tracking-widest text-xs border-none transition-all shadow-xl ${
                    isAdded ? 'bg-green-500 shadow-green-500/20' : 'bg-slate-900 shadow-slate-900/20 hover:bg-primary hover:shadow-primary/20'
                  } text-white`}
                >
                  {isAdded ? (
                    <><Check className="mr-2 h-4 w-4" /> Reserved</>
                  ) : (
                    <><ShoppingCart className="mr-2 h-4 w-4" /> Add to Order</>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-900 mb-0.5">Warranty</p>
                    <p className="text-[9px] font-bold text-slate-500">Authorized Care</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-900 mb-0.5">Deployment</p>
                    <p className="text-[9px] font-bold text-slate-500">Expedited Shipping</p>
                  </div>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="specs" className="border-slate-100">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6 uppercase tracking-tight">Technical Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-y-4 py-4">
                    {product.specifications?.map((spec: any, i: number) => (
                      <div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">{spec.key}</span>
                        <span className="font-black text-slate-900 text-sm text-right">{spec.value}</span>
                      </div>
                    ))}
                    {!product.specifications?.length && <p className="text-[10px] font-bold text-slate-400 italic">Contact our engineers for detailed specs.</p>}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="description" className="border-slate-100">
                <AccordionTrigger className="font-headline font-black text-slate-900 hover:no-underline py-6 uppercase tracking-tight">Engineering Breakdown</AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm py-4">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}

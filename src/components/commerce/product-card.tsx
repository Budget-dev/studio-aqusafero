
"use client"

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Check, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ProductCard(props: any) {
  const { id, name, price, originalPrice, category, images, brand, shortDescription, featured, rating, isNew, isPopular } = props;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const displayImage = useMemo(() => {
    if (!images) return "https://placehold.co/600x400?text=AquaSafe+Asset";
    
    // Check if new object structure
    if (typeof images === 'object' && !Array.isArray(images)) {
      return images.thumbnail || images.hover || "https://placehold.co/600x400?text=AquaSafe+Asset";
    }

    // Handle legacy array
    if (Array.isArray(images)) {
      return typeof images[0] === 'string' ? images[0] : (images[0]?.url || "https://placehold.co/600x400?text=AquaSafe+Asset");
    }

    return "https://placehold.co/600x400?text=AquaSafe+Asset";
  }, [images]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      image: displayImage,
      category,
      subcategory: brand || 'AquaSafe'
    } as any);
    
    setIsAdded(true);
    toast({
      title: "Added to Cart",
      description: `${name} is ready for checkout.`,
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full relative">
      {/* Visual Header */}
      <div className="relative aspect-square bg-slate-50 p-4 md:p-6 overflow-hidden">
        <Link href={`/products/${id}`} className="block relative h-full w-full">
          <Image
            src={displayImage}
            alt={name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </Link>
        
        {/* Floating Badges */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1.5 pointer-events-none">
          {isNew && (
            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[7px] md:text-[8px] px-1.5 py-0.5 rounded-sm border-none shadow-sm w-fit">
              New Arrival
            </Badge>
          )}
          {isPopular && (
            <Badge className="bg-amber-500 text-white font-black uppercase tracking-widest text-[7px] md:text-[8px] px-1.5 py-0.5 rounded-sm border-none shadow-sm w-fit">
              Popular
            </Badge>
          )}
        </div>

        <button 
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
          className={cn(
            "absolute top-2 right-2 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center transition-all shadow-sm z-10",
            isWishlisted ? "bg-red-50 text-red-500" : "bg-white/80 backdrop-blur-md text-slate-400 hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4 md:h-5 md:w-5", isWishlisted && "fill-current")} />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-3 md:p-6 flex flex-col flex-1">
        <div className="flex-1 space-y-1.5 md:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[7px] md:text-[9px] font-black text-primary uppercase tracking-[0.2em]">
              {category} • {brand}
            </span>
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="h-2.5 w-2.5 fill-current" />
              <span className="text-[8px] md:text-[10px] font-black text-slate-400">{rating || 5}</span>
            </div>
          </div>
          
          <h3 className="font-black text-slate-900 text-xs md:text-lg leading-tight uppercase tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            <Link href={`/products/${id}`}>{name}</Link>
          </h3>

          <p className="text-[9px] md:text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
            {shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-3 md:pt-6 border-t border-slate-50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm md:text-2xl font-black text-slate-900 tracking-tighter">
                ₹{price.toLocaleString('en-IN')}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-[7px] md:text-[9px] font-black text-slate-300 line-through tracking-widest uppercase">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <Link 
              href={`/products/${id}`}
              className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="h-3 w-3 md:h-5 md:w-5" />
            </Link>
          </div>

          <Button 
            onClick={handleAddToCart}
            className={cn(
              "w-full h-9 md:h-12 rounded-lg md:rounded-xl font-black uppercase text-[8px] md:text-[10px] tracking-widest gap-2 transition-all border-none shadow-md",
              isAdded ? "bg-green-500 text-white" : "bg-slate-900 text-white hover:bg-primary"
            )}
          >
            {isAdded ? (
              <><Check className="h-3 w-3 md:h-4 md:w-4" /> Allocated</>
            ) : (
              <><ShoppingCart className="h-3 w-3 md:h-4 md:w-4" /> Add to Order</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

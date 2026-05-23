
"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

export function ProductCard(props: any) {
  const { id, name, price, offerPrice, category, images, brand, shortDescription, featured } = props;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const displayImage = images?.[0]?.url || "https://placehold.co/600x400?text=AquaSafe+Asset";
  const displayPrice = offerPrice || price || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Adapt to cart expectations
    const cartProduct = {
      id,
      name,
      price: displayPrice,
      image: displayImage,
      category,
      subcategory: brand || 'AquaSafe'
    };

    addToCart(cartProduct as any);
    
    setIsAdded(true);
    toast({
      title: "Asset Reserved",
      description: `${name} has been added to your order sequence.`,
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-white p-6 shadow-inner">
        <Link href={`/products/${id}`} className="block relative h-full w-full">
          <Image
            src={displayImage}
            alt={name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[8px] px-2 py-0.5 rounded-sm border-none shadow-lg">
              Featured Solution
            </Badge>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-8 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
              <Link href={`/products/${id}`}>{name}</Link>
            </h3>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{brand || 'Technical Hub Asset'}</p>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-bold">
          {shortDescription || "Precision-engineered water treatment component designed for high-performance industrial and commercial environments."}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {offerPrice && price && price > offerPrice && (
                <span className="text-[10px] font-black text-slate-300 line-through tracking-widest uppercase">
                  MSRP: ₹{price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <Link 
              href={`/products/${id}`}
              className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <Button 
            onClick={handleAddToCart}
            className={`w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] gap-2 transition-all border-none shadow-lg ${
              isAdded ? 'bg-green-500 shadow-green-500/20' : 'bg-slate-900 shadow-slate-900/20 hover:bg-primary hover:shadow-primary/20'
            }`}
          >
            {isAdded ? (
              <><Check className="h-3.5 w-3.5" /> Allocated</>
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" /> Reserve Asset</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

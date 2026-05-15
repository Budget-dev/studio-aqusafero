"use client"

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  discount?: number;
  isNew?: boolean;
}

export function ProductCard({ id, name, price, category, rating, image, discount, isNew }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <Link href={`/products/${id}`} className="block h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg border-none">
              New Arrival
            </Badge>
          )}
          {discount && (
            <Badge variant="destructive" className="font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg border-none">
              -{discount}% Off
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-slate-400 hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs h-12 rounded-2xl shadow-xl">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{category}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-black text-slate-900">{rating}</span>
          </div>
        </div>
        
        <Link href={`/products/${id}`} className="block">
          <h3 className="font-headline font-black text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-slate-900">
            ${discount ? (price * (1 - discount / 100)).toLocaleString() : price.toLocaleString()}
          </span>
          {discount && (
            <span className="text-sm font-bold text-slate-400 line-through">
              ${price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
          <Zap className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Delivered in 2-4 Days</span>
        </div>
      </div>
    </div>
  );
}
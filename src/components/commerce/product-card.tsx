"use client"

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description?: string;
  capacity?: string;
  discount?: number;
  isNew?: boolean;
}

export function ProductCard({ id, name, price, category, rating, image, description, capacity, discount, isNew }: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-white p-4">
        <Link href={`/products/${id}`} className="block relative h-full w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {isNew && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-white font-black uppercase tracking-widest text-[8px] px-2 py-0.5 rounded-sm border-none">
              New
            </Badge>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors">
            <Link href={`/products/${id}`}>{name}</Link>
          </h3>
          {description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {capacity && (
          <div className="py-1.5 px-3 bg-blue-50/50 border border-blue-100/50 rounded-md w-fit">
            <span className="text-[10px] font-bold text-primary uppercase">Capacity: {capacity}</span>
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {discount && (
              <span className="text-xs text-slate-400 line-through">
                ₹{((price * 100) / (100 - discount)).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          
          <Link 
            href={`/products/${id}`}
            className="flex items-center gap-1 text-[11px] font-bold text-primary uppercase tracking-wider hover:gap-2 transition-all"
          >
            View Details <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

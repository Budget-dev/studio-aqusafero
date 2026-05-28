
"use client"

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  FilterX,
  Filter,
  Loader2,
  Factory,
  Home,
  LayoutGrid,
  Zap,
  Wrench,
  ChevronRight,
  SlidersHorizontal,
  Building2,
  Beaker,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/commerce/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/app/lib/products-data";

export function ProductsCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subcategory?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const categories = [
    { id: null, label: "All Hub", icon: LayoutGrid },
    { id: "Domestic Products", label: "Domestic", icon: Home },
    { id: "Commercial Products", label: "Commercial", icon: Zap },
    { id: "Institutional Products", label: "Institutional", icon: Building2 },
    { id: "Industrial Products", label: "Industrial", icon: Factory },
    { id: "Components & Spare Parts", label: "Spares", icon: Wrench },
    { id: "Filters & Chemicals", label: "Filters", icon: Beaker },
  ];

  const FilterContent = useCallback(() => (
    <div className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-4 border-b">Industrial Sector</h3>
        <div className="space-y-4">
          {categories.filter(c => c.id !== null).map((cat) => (
            <div 
              key={cat.id} 
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
              }}
            >
              <Checkbox checked={selectedCategory === cat.id} className="rounded-md border-2 border-slate-200" />
              <Label className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors cursor-pointer">{cat.id}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-4 border-b">Budget Matrix (₹)</h3>
        <div className="px-2">
          <Slider 
            value={[priceRange[1]]} 
            onValueChange={(val) => setPriceRange([0, val[0]])} 
            max={500000} 
            step={1000} 
            className="mb-6"
          />
          <div className="flex items-center justify-between text-[11px] font-black text-slate-900">
            <span>₹0</span>
            <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full h-14 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-[10px]"
        onClick={() => {
          setSelectedCategory(null);
          setPriceRange([0, 500000]);
          setSearchQuery("");
        }}
      >
        <FilterX className="mr-2 h-4 w-4" /> Reset Hub
      </Button>
    </div>
  ), [selectedCategory, priceRange, categories]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="bg-white/80 backdrop-blur-xl border-b sticky top-20 lg:top-36 z-[40] transition-all duration-300">
        <div className="container mx-auto px-4 max-get-7xl pt-4 pb-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h1 className="text-lg md:text-2xl font-black font-headline text-slate-900 tracking-tight uppercase leading-none">
                Technical <span className="text-primary">Catalog</span>
              </h1>
              <p className="text-slate-400 font-bold text-[8px] md:text-[10px] uppercase tracking-widest">
                {loading ? "Synchronizing Asset Hub..." : `${filteredProducts.length} Assets Indexed`}
              </p>
            </div>
            
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 md:h-12 bg-slate-50/80 border-slate-100 rounded-xl font-bold shadow-inner text-sm" 
                placeholder="Search assets, brands, or components..." 
              />
            </div>
          </div>

          <div className="relative -mx-4 px-4 overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.label}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedCategory(cat.id);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0",
                      active 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-primary/30"
                    )}
                  >
                    <Icon className={cn("h-3 w-3", active ? "text-white" : "text-primary")} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-64">
            <FilterContent />
          </aside>

          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-8 relative z-30">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-10 rounded-xl px-4 border-slate-200 font-black uppercase text-[9px] tracking-widest gap-2 bg-white shadow-sm">
                    <SlidersHorizontal className="h-3 w-3 text-primary" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-[3rem] p-8 h-[85vh] z-[300]">
                  <SheetHeader className="mb-10">
                    <SheetTitle className="text-left font-black uppercase tracking-[0.2em] text-xs text-slate-400">Technical Matrix</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="ml-auto flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] md:w-[200px] h-10 bg-white rounded-xl font-black uppercase text-[9px] tracking-widest border-slate-100 shadow-sm focus:ring-0">
                    <SelectValue placeholder="Latest" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl z-[150]">
                    <SelectItem value="newest">Latest Release</SelectItem>
                    <SelectItem value="price-asc">Price: Low - High</SelectItem>
                    <SelectItem value="price-desc">Price: High - Low</SelectItem>
                    <SelectItem value="rating">Top Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-2xl md:rounded-[2rem]" />
                    <div className="space-y-2 px-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 px-8 space-y-6 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                <div className="h-16 w-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mx-auto text-slate-200">
                  <FilterX className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black font-headline uppercase tracking-tight">No Exact Matches</h3>
                  <p className="text-slate-400 font-bold text-sm max-w-xs mx-auto">Try recalibrating your industrial filters or reset the catalog hub.</p>
                </div>
                <Button 
                  onClick={() => { setSelectedCategory(null); setPriceRange([0, 500000]); setSearchQuery(""); }}
                  className="bg-primary text-white font-black uppercase text-[10px] tracking-widest px-8 rounded-xl h-12 border-none"
                >
                  Reset Engineering Hub
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

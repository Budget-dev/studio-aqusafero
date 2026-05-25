
"use client"

import { useState, useMemo, useEffect } from "react";
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
  SlidersHorizontal
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
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory || p.type === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  const categories = [
    { id: null, label: "All Hub", icon: LayoutGrid },
    { id: "Commercial", label: "Industrial", icon: Factory },
    { id: "Domestic", label: "Residential", icon: Home },
    { id: "Spare", label: "Spares", icon: Wrench },
    { id: "Plant", label: "Plants", icon: Zap },
  ];

  const FilterContent = () => (
    <div className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 pb-4 border-b">Industrial Sector</h3>
        <div className="space-y-4">
          {["Commercial", "Domestic"].map((cat) => (
            <div 
              key={cat} 
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              <Checkbox checked={selectedCategory === cat} className="rounded-md border-2 border-slate-200" />
              <Label className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors cursor-pointer">{cat} Solutions</Label>
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
            max={200000} 
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
          setPriceRange([0, 200000]);
          setSearchQuery("");
        }}
      >
        <FilterX className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Sticky Header Section */}
      <section className="bg-white border-b sticky top-0 md:static z-40 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4 max-w-7xl pt-6 pb-6 lg:pt-12 lg:pb-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">
                Technical <span className="text-primary">Catalog</span>
              </h1>
              <p className="text-slate-400 font-bold text-[9px] md:text-[11px] uppercase tracking-widest">
                {loading ? "Synchronizing Asset Hub..." : `Displaying ${filteredProducts.length} high-performance items`}
              </p>
            </div>
            
            <div className="relative flex-1 max-w-lg w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 md:h-14 bg-slate-50/50 border-slate-100 rounded-xl md:rounded-2xl font-bold shadow-inner" 
                placeholder="Search catalog ID or keywords..." 
              />
            </div>
          </div>

          {/* Horizontal Smooth Category Scroll */}
          <div className="relative -mx-4 px-4 overflow-hidden">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 pr-10">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border shrink-0",
                      active 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-primary/30"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", active ? "text-white" : "text-primary")} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Main Grid Area */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-32">
            <FilterContent />
          </aside>

          <main className="lg:col-span-9">
            {/* Mobile Action Bar */}
            <div className="flex items-center justify-between mb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-10 rounded-xl px-4 border-slate-200 font-black uppercase text-[9px] tracking-widest gap-2 bg-white">
                    <SlidersHorizontal className="h-3 w-3 text-primary" /> Filter Matrix
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-[3rem] p-8 h-[80vh]">
                  <SheetHeader className="mb-10">
                    <SheetTitle className="text-left font-black uppercase tracking-[0.2em] text-xs text-slate-400">Technical Filter Parameters</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest hidden sm:inline">Sorting:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[140px] md:w-[180px] h-10 md:h-12 bg-white rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest border-slate-100 shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                    <SelectItem value="newest">Latest Release</SelectItem>
                    <SelectItem value="price-asc">Price: Low - High</SelectItem>
                    <SelectItem value="price-desc">Price: High - Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-2xl md:rounded-[2rem]" />
                    <div className="space-y-2 px-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-8 w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-xl md:text-2xl font-black font-headline uppercase tracking-tight">Technical Mismatch</h3>
                  <p className="text-slate-400 font-bold text-sm max-w-xs mx-auto">Try recalibrating your search query or adjusting the budget matrix.</p>
                </div>
                <Button 
                  onClick={() => { setSelectedCategory(null); setPriceRange([0, 200000]); setSearchQuery(""); }}
                  className="bg-primary text-white font-black uppercase text-[10px] tracking-widest px-8 rounded-xl"
                >
                  Reset Catalog Hub
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

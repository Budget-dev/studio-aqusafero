"use client"

import { useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Grid2X2, 
  LayoutList,
  ChevronRight,
  FilterX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const MOCK_PRODUCTS = [
  { id: "1", name: "Industrial RO Plant Type-A", price: 12500, category: "Industrial", rating: 4.9, isNew: true, image: "https://picsum.photos/seed/ro1/800/1000", discount: 10 },
  { id: "2", name: "Modular Desalinization Unit", price: 45000, category: "Industrial", rating: 5.0, image: "https://picsum.photos/seed/ro2/800/1000" },
  { id: "3", name: "ClinicPurity Pro Max", price: 3200, category: "Commercial", rating: 4.8, isNew: true, image: "https://picsum.photos/seed/ro3/800/1000" },
  { id: "4", name: "HomeGuard X7 Ultimate", price: 899, category: "Residential", rating: 4.7, image: "https://picsum.photos/seed/ro4/800/1000", discount: 15 },
  { id: "5", name: "Membrane Master Spares", price: 150, category: "Spares", rating: 4.6, image: "https://picsum.photos/seed/ro5/800/1000" },
  { id: "6", name: "CrystalClear Carbon Media", price: 85, category: "Filters", rating: 4.9, image: "https://picsum.photos/seed/ro6/800/1000" },
  { id: "7", name: "ScaleGuard Pro Chemical", price: 120, category: "Chemicals", rating: 4.8, image: "https://picsum.photos/seed/ro7/800/1000" },
  { id: "8", name: "Digital Flow Meter 2.0", price: 450, category: "Spares", rating: 5.0, image: "https://picsum.photos/seed/ro8/800/1000", isNew: true },
];

export default function ProductsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Futuristic Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" 
             style={{ backgroundImage: `radial-gradient(circle at 10% 20%, #c4b5fd22, transparent)` }} />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">Products</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black font-headline text-slate-900 tracking-tighter">
                Premium <br /><span className="text-primary">Water Systems</span>
              </h1>
              <p className="text-slate-500 max-w-lg font-bold text-lg leading-relaxed">
                Discover our engineered solutions for precise water purification, from industrial plants to high-end domestic filters.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <div className="px-6 py-4 border-r border-slate-200 text-center">
                <p className="text-2xl font-black text-slate-900">1.2k+</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Products</p>
              </div>
              <div className="px-6 py-4 text-center">
                <p className="text-2xl font-black text-primary">24h</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Avg Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-10 sticky top-32 h-fit">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Category</h3>
              <div className="space-y-4">
                {["Industrial Systems", "Commercial Units", "Residential Filters", "Spares & Parts", "Chemicals"].map((cat) => (
                  <div key={cat} className="flex items-center space-x-3 group cursor-pointer">
                    <Checkbox id={cat} className="rounded-md border-2 border-slate-200 data-[state=checked]:bg-primary" />
                    <Label htmlFor={cat} className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors cursor-pointer">{cat}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Price Range</h3>
              <div className="px-2">
                <Slider 
                  value={priceRange} 
                  onValueChange={setPriceRange} 
                  max={50000} 
                  step={100} 
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-[11px] font-black text-slate-900">
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Rating</h3>
              <div className="space-y-4">
                {[5, 4, 3].map((r) => (
                  <div key={r} className="flex items-center space-x-3 cursor-pointer group">
                    <Checkbox id={`r-${r}`} />
                    <Label htmlFor={`r-${r}`} className="flex items-center gap-1 text-sm font-bold text-slate-600 cursor-pointer">
                      {Array.from({ length: r }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1">& Up</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-200 font-black uppercase tracking-widest text-xs">
              <FilterX className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" placeholder="Search systems or spares..." />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center bg-slate-50 p-1 rounded-xl border">
                  <Button 
                    variant={view === 'grid' ? 'secondary' : 'ghost'} 
                    size="icon" 
                    onClick={() => setView('grid')}
                    className="h-10 w-10 rounded-lg"
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={view === 'list' ? 'secondary' : 'ghost'} 
                    size="icon" 
                    onClick={() => setView('list')}
                    className="h-10 w-10 rounded-lg"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] h-12 bg-white rounded-xl font-bold border-slate-200">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden h-12 w-12 rounded-xl border-slate-200">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle className="text-left font-headline font-black text-2xl">Filters</SheetTitle>
                    </SheetHeader>
                    {/* Replicate Sidebar Filters for Mobile */}
                    <div className="mt-8 space-y-10 overflow-y-auto max-h-[calc(100vh-100px)]">
                      {/* Mobile Filters Content... */}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Product Grid */}
            <div className={cn(
              "grid gap-8",
              view === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {MOCK_PRODUCTS.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-12">
              <Button variant="outline" disabled className="rounded-xl h-12 w-12 p-0 font-black">1</Button>
              <Button variant="ghost" className="rounded-xl h-12 w-12 p-0 font-black">2</Button>
              <Button variant="ghost" className="rounded-xl h-12 w-12 p-0 font-black">3</Button>
              <div className="mx-2 text-slate-400 font-black">...</div>
              <Button variant="ghost" className="rounded-xl h-12 w-12 p-0 font-black">12</Button>
              <Button variant="outline" className="rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px] ml-4">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
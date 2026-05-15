
"use client"

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight,
  FilterX,
  Star,
  Grid2X2,
  LayoutList
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
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/app/lib/products-data";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  const categories = ["Domestic Products", "Commercial Products", "Spares and Components", "Filters and Chemicals"];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-900">{selectedCategory || "All Products"}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black font-headline text-slate-900 tracking-tighter leading-tight">
                {selectedCategory ? selectedCategory.split(' ')[0] : "Premium"} <br />
                <span className="text-primary">{selectedCategory ? selectedCategory.split(' ').slice(1).join(' ') : "Catalog"}</span>
              </h1>
              <p className="text-slate-500 max-w-lg font-bold text-lg leading-relaxed">
                {selectedCategory 
                  ? `Discover our curated selection of high-performance ${selectedCategory.toLowerCase()}.`
                  : "Explore our enterprise-grade water treatment solutions and certified components."}
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <div className="px-6 py-4 border-r border-slate-200 text-center">
                <p className="text-2xl font-black text-slate-900">{filteredProducts.length}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Results</p>
              </div>
              <div className="px-6 py-4 text-center">
                <p className="text-2xl font-black text-primary">24h</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Logistics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-10 sticky top-32 h-fit">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Category</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div 
                    key={cat} 
                    className="flex items-center space-x-3 group cursor-pointer"
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  >
                    <Checkbox checked={selectedCategory === cat} className="rounded-md border-2 border-slate-200" />
                    <Label className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors cursor-pointer">{cat}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Price Limit</h3>
              <div className="px-2">
                <Slider 
                  value={[priceRange[1]]} 
                  onValueChange={(val) => setPriceRange([0, val[0]])} 
                  max={10000} 
                  step={100} 
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-[11px] font-black text-slate-900">
                  <span>$0</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-14 rounded-2xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs"
              onClick={() => {
                setSelectedCategory(null);
                setPriceRange([0, 10000]);
                setSearchQuery("");
              }}
            >
              <FilterX className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </aside>

          {/* Catalog */}
          <main className="lg:col-span-9 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-slate-50 border-none rounded-2xl font-bold" 
                  placeholder="Search model, tech or SKU..." 
                />
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
                  <SelectTrigger className="w-[180px] h-12 bg-white rounded-xl font-bold border-slate-200 shadow-none">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className={cn(
              "grid gap-8",
              view === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 space-y-6">
                <div className="h-20 w-20 rounded-[2rem] bg-slate-100 flex items-center justify-center mx-auto">
                  <FilterX className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black font-headline">No products found</h3>
                <p className="text-slate-500 font-bold">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

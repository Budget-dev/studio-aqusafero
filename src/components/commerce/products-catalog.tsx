"use client"

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Search, 
  FilterX,
  Filter
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
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/app/lib/products-data";

export function ProductsCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [priceRange, setPriceRange] = useState([0, 500000]);
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

  const FilterContent = () => (
    <div className="space-y-10">
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
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b">Price Limit (₹)</h3>
        <div className="px-2">
          <Slider 
            value={[priceRange[1]]} 
            onValueChange={(val) => setPriceRange([0, val[0]])} 
            max={500000} 
            step={5000} 
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
        className="w-full h-12 rounded-xl border-2 border-slate-100 font-black uppercase tracking-widest text-xs"
        onClick={() => {
          setSelectedCategory(null);
          setPriceRange([0, 500000]);
          setSearchQuery("");
        }}
      >
        <FilterX className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Search & Header Section */}
      <section className="bg-slate-50 border-b py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black font-headline text-slate-900 tracking-tight">
                {selectedCategory || "Our Products Catalog"}
              </h1>
              <p className="text-slate-500 font-medium text-sm">
                Showing {filteredProducts.length} high-performance water solutions
              </p>
            </div>
            
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white border-slate-200 rounded-xl font-bold" 
                placeholder="Search products, tech or capacity..." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-32">
            <FilterContent />
          </aside>

          {/* Catalog */}
          <main className="lg:col-span-9 space-y-8">
            <div className="flex items-center justify-between mb-8">
              {/* Mobile Filter Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 rounded-xl px-4 border-slate-200">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-left font-black uppercase tracking-widest">Filter Options</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-4 ml-auto">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] h-12 bg-white rounded-xl font-bold border-slate-200">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 space-y-6">
                <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <FilterX className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black font-headline">No matching products</h3>
                <p className="text-slate-500 font-bold">Try adjusting your filters or search query.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
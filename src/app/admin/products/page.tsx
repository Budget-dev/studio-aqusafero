"use client"

import Image from "next/image";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Package, 
  BarChart3, 
  Layers,
  FileDown,
  ChevronRight,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/app/lib/products-data";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-8 flex flex-col gap-8 hidden xl:flex">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="font-black font-headline text-lg uppercase tracking-tight">Admin Portal</span>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { label: "Inventory", icon: Layers, active: true },
            { label: "Analytics", icon: BarChart3, active: false },
            { label: "Orders", icon: Clock, active: false },
          ].map((item) => (
            <Button key={item.label} variant="ghost" className={cn(
              "w-full justify-start h-12 rounded-xl font-bold uppercase tracking-widest text-[9px]",
              item.active ? "bg-primary text-white" : "text-slate-400 hover:bg-white/5"
            )}>
              <item.icon className="mr-3 h-4 w-4" /> {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Product Management</h1>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Catalog Inventory Control</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-black uppercase text-[9px] tracking-widest bg-white">
              <FileDown className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button className="h-12 rounded-xl bg-slate-900 text-white font-black uppercase text-[9px] tracking-widest shadow-lg">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </header>

        {/* Table View */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-12 h-12 bg-slate-50 border-none rounded-xl font-bold" placeholder="Search by SKU, Name..." />
            </div>
            <Button variant="ghost" className="h-12 rounded-xl font-black uppercase text-[9px] tracking-widest border border-slate-100">
              <Filter className="mr-2 h-4 w-4" /> Filter By
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none">
                <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 py-4 px-6">Product</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 py-4">Category</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 py-4">Price</TableHead>
                <TableHead className="font-black text-[9px] uppercase tracking-widest text-slate-400 py-4">Stock Status</TableHead>
                <TableHead className="text-right py-4 px-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRODUCTS.map((p) => (
                <TableRow key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 p-1">
                        <Image src={p.image} alt={p.name} fill className="object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight mb-0.5">{p.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-600 text-[10px] uppercase tracking-widest">{p.subcategory}</TableCell>
                  <TableCell className="font-black text-slate-900">₹{p.price.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge variant={p.stockStatus === 'In Stock' ? 'default' : 'secondary'} className={cn(
                      "font-black uppercase tracking-widest text-[8px] px-2 py-0.5 rounded-sm",
                      p.stockStatus === 'In Stock' ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-500"
                    )}>
                      {p.stockStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
                        <DropdownMenuItem className="h-10 rounded-lg font-black uppercase text-[9px] tracking-widest gap-2">
                          <Edit2 className="h-3.5 w-3.5" /> Edit details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="h-10 rounded-lg font-black uppercase text-[9px] tracking-widest gap-2 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" /> Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

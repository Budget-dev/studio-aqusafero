
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

const ADMIN_PRODUCTS = [
  { id: "iro-101", name: "Industrial RO Plant Type-A", sku: "AS-IRO-101", stock: 12, price: 11250, category: "Industrial", status: "Active" },
  { id: "mod-des-202", name: "Modular Desalinization Unit", sku: "AS-MOD-202", stock: 3, price: 45000, category: "Industrial", status: "Active" },
  { id: "comm-pro-303", name: "ClinicPurity Pro Max", sku: "AS-COMM-303", stock: 24, price: 3200, category: "Commercial", status: "Draft" },
  { id: "home-ult-404", name: "HomeGuard X7 Ultimate", sku: "AS-HOME-404", stock: 0, price: 899, category: "Residential", status: "Out of Stock" },
  { id: "memb-spare-505", name: "Membrane Master Spares", sku: "AS-SPARE-505", stock: 85, price: 150, category: "Spares", status: "Active" },
  { id: "carb-med-606", name: "CrystalClear Carbon Media", sku: "AS-FILT-606", stock: 150, price: 85, category: "Filters", status: "Active" },
];

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Admin Sidebar simulation */}
      <aside className="w-80 bg-slate-900 text-white p-10 flex flex-col gap-12 hidden xl:flex">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-black font-headline text-xl leading-none tracking-tighter">ADMIN HUB</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1">v.2.0.29</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { label: "Dashboard", icon: BarChart3, active: false },
            { label: "Inventory", icon: Layers, active: true },
            { label: "Orders", icon: Clock, active: false },
            { label: "Flash Sales", icon: Zap, active: false },
          ].map((item) => (
            <Button key={item.label} variant="ghost" className={cn(
              "w-full justify-start h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all px-6",
              item.active ? "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20" : "text-slate-400 hover:bg-white/5"
            )}>
              <item.icon className="mr-4 h-4 w-4" /> {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-auto p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inventory Status</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold opacity-60">Total Value</span>
              <span className="text-sm font-black">$2.4M</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Admin <ChevronRight className="h-3 w-3" /> <span className="text-slate-900">Inventory Management</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black font-headline text-slate-900 tracking-tighter leading-tight">
              Manage <br /><span className="text-primary">Catalog</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-200 font-black uppercase tracking-widest text-[10px] bg-white">
              <FileDown className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button className="h-14 px-10 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-slate-200">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </header>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Active Products", val: "128", icon: CheckCircle2, color: "text-green-500" },
            { label: "Out of Stock", val: "12", icon: Trash2, color: "text-red-500" },
            { label: "Pending Reviews", val: "45", icon: Clock, color: "text-yellow-500" },
            { label: "Gross Revenue", val: "$125k", icon: BarChart3, color: "text-primary" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <p className="text-3xl font-black font-headline text-slate-900">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Table View */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden luxury-glow">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-12 h-12 bg-slate-50 border-none rounded-2xl font-bold" placeholder="Search SKU, Name..." />
            </div>
            <Button variant="ghost" className="h-12 px-6 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100">
              <Filter className="mr-2 h-4 w-4" /> Filter By
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-6 px-8">Product</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-6">SKU</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-6">Stock</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-6">Price</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-slate-400 py-6">Status</TableHead>
                <TableHead className="text-right py-6 px-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ADMIN_PRODUCTS.map((p) => (
                <TableRow key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden relative">
                        <Image src={`https://picsum.photos/seed/${p.id}/100/100`} alt="Thumb" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 leading-none mb-1">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-600 font-mono text-xs">{p.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        p.stock > 10 ? "bg-green-500" : p.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                      )} />
                      <span className="font-black text-slate-900">{p.stock}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-slate-900">${p.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === 'Active' ? 'default' : 'secondary'} className={cn(
                      "font-black uppercase tracking-widest text-[8px] px-3 py-1 rounded-md border-none",
                      p.status === 'Active' ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-500"
                    )}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                        <DropdownMenuItem className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                          <Edit2 className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                          <Layers className="h-4 w-4" /> Manage Variants
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 text-destructive">
                          <Trash2 className="h-4 w-4" /> Delete Product
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

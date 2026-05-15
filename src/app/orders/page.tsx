
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  ChevronRight, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('aquasafe-orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">My <span className="text-primary">Orders</span></h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Technical Purchase History</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-white border-slate-200 rounded-xl font-bold" 
              placeholder="Search Order ID..." 
            />
          </div>
        </header>

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-all rounded-2xl group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch">
                  {/* Status Indicator */}
                  <div className={`w-2 ${
                    order.status === 'Delivered' ? 'bg-green-500' : 
                    order.status === 'Processing' ? 'bg-amber-500' : 'bg-slate-300'
                  }`} />
                  
                  <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-center bg-white">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Order ID</p>
                      <p className="text-sm font-black text-slate-900 uppercase">{order.id}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Placement Date</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                        <Clock className="h-3.5 w-3.5" /> {order.date}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Current Status</p>
                      <Badge variant="outline" className={`font-black uppercase text-[8px] tracking-widest px-2 py-0.5 rounded-sm border-2 ${
                        order.status === 'Delivered' ? 'border-green-100 text-green-600' :
                        order.status === 'Processing' ? 'border-amber-100 text-amber-600' : 'border-slate-100 text-slate-400'
                      }`}>
                        {order.status === 'Delivered' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {order.status === 'Processing' && <Truck className="mr-1 h-3 w-3" />}
                        {order.status === 'Cancelled' && <AlertCircle className="mr-1 h-3 w-3" />}
                        {order.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right hidden md:block">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Total Value</p>
                        <p className="text-sm font-black text-slate-900">{order.total}</p>
                      </div>
                      <Button asChild variant="outline" className="rounded-xl font-black uppercase text-[10px] tracking-widest border-slate-200 group-hover:border-primary group-hover:text-primary transition-all">
                        <Link href={`/orders/${order.id}`}>Details <ChevronRight className="ml-1 h-3 h-3" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200 space-y-4">
              <Package className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-black font-headline">No orders found</h3>
              <p className="text-slate-500 font-bold">You haven't purchased any products yet.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/products">Browse Catalog</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

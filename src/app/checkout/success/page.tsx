
"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Package, 
  ArrowRight, 
  Download,
  Calendar,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId("AQ-ORDER-" + Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem]">
          <div className="bg-primary p-12 text-center text-white space-y-6">
            <motion.div 
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-md mb-4"
            >
              <CheckCircle2 className="h-16 w-16" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tight">Order Placed Successfully!</h1>
            <p className="text-lg font-bold opacity-80 max-w-md mx-auto">
              Your technical water solution is now in our engineering queue.
            </p>
          </div>

          <CardContent className="p-10 md:p-16 space-y-10 bg-white">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Order ID</p>
                <p className="text-lg font-black text-slate-900">{orderId}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estimated Delivery</p>
                <p className="text-lg font-black text-slate-900 flex items-center justify-end gap-2">
                  <Calendar className="h-4 w-4 text-primary" /> 24 May, 2024
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-black uppercase text-xs">Track Your System</p>
                  <p className="text-[10px] font-bold text-slate-400">See manufacturing progress in real-time</p>
                </div>
              </div>
              <Button asChild variant="ghost" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                <Link href={`/orders/${orderId}`}><ArrowRight className="h-5 w-5" /></Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="flex-1 h-14 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs">
                <Link href="/orders">View My Orders</Link>
              </Button>
              <Button variant="outline" className="flex-1 h-14 rounded-xl border-slate-200 font-black uppercase tracking-widest text-xs">
                <Download className="mr-2 h-4 w-4" /> Download Invoice
              </Button>
            </div>

            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              A confirmation email has been sent to your registered address.<br />
              Need technical support? Call us at +91 99858 50777
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

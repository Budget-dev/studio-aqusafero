
"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronLeft, 
  Ticket,
  Percent,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const INITIAL_CART = [
  { id: "dom-101", name: "Domestic RO Purifiers", price: 12500, category: "Domestic Products", image: "https://picsum.photos/seed/purifier1/400/500", quantity: 1 },
  { id: "spare-301", name: "RO Membranes", price: 2500, category: "Spares and Components", image: "https://picsum.photos/seed/spare1/400/500", quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({ title: "Item removed", description: "Cart updated successfully." });
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "AQUASAFE20") {
      setDiscount(0.20);
      toast({ title: "Coupon Applied!", description: "20% discount has been applied to your order." });
    } else if (coupon.toUpperCase() === "FIRSTORDER") {
      setDiscount(0.10);
      toast({ title: "Welcome!", description: "10% new customer discount applied." });
    } else {
      toast({ variant: "destructive", title: "Invalid Coupon", description: "This code does not exist or has expired." });
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.18;
  const total = subtotal - discountAmount + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="p-8 rounded-full bg-slate-50">
          <Trash2 className="h-16 w-16 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black font-headline">Your cart is empty</h2>
        <Button asChild className="bg-primary px-8 rounded-xl h-12 font-black uppercase text-xs">
          <Link href="/products">Browse Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-black font-headline text-slate-900 tracking-tight">
            Shopping <span className="text-primary">Cart</span>
          </h1>
          <Button asChild variant="ghost" className="w-fit p-0 font-black uppercase tracking-widest text-[10px] hover:text-primary">
            <Link href="/products"><ChevronLeft className="mr-2 h-4 w-4" /> Continue Shopping</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            {/* Cart Items */}
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="hidden md:flex p-6 bg-slate-50 border-b border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex-1">Product Details</div>
                <div className="w-32 text-center">Quantity</div>
                <div className="w-32 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100 p-2">
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">{item.category}</p>
                      <h3 className="font-bold text-slate-900 mb-2">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-destructive font-black uppercase tracking-widest text-[8px] flex items-center justify-center md:justify-start gap-1 hover:opacity-70 transition-opacity"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove Item
                      </button>
                    </div>

                    <div className="w-32 flex items-center justify-center">
                      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}><Minus className="h-3 w-3" /></Button>
                        <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>

                    <div className="w-32 text-right">
                      <p className="font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons Section */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Ticket className="h-5 w-5 text-primary" />
                <h3 className="font-black font-headline uppercase tracking-tight text-lg text-slate-900">Have a Coupon?</h3>
              </div>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Enter code (e.g. AQUASAFE20)" 
                    className="h-14 pl-12 rounded-xl bg-white border-slate-200 font-bold"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={applyCoupon}
                  className="h-14 px-8 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs"
                >
                  Apply
                </Button>
              </div>
              <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Hint: Try <span className="text-primary">AQUASAFE20</span> for a professional discount
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl sticky top-24">
              <h2 className="text-2xl font-black font-headline mb-8 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm font-bold text-primary">
                    <span>Discount ({(discount * 100)}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-green-400">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>
                <Separator className="bg-white/10" />
                <div className="flex justify-between text-xl font-black font-headline">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full h-14 rounded-lg bg-primary text-white font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all border-none">
                  <Link href="/checkout">Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <CheckCircle2 className="h-3 w-3" /> Secure Technical Checkout
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

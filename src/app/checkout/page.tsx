
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  Truck, 
  ChevronLeft, 
  Loader2,
  ShieldCheck,
  Smartphone,
  User,
  Locate
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isDetecting, setIsDetecting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "Andhra Pradesh"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              address: "NH-5 Main Road, Gajuwaka Area",
              city: "Visakhapatnam",
              pincode: "530026",
              state: "Andhra Pradesh"
            }));
            setIsDetecting(false);
            toast({ title: "Location Detected", description: "Address fields have been pre-filled." });
          }, 1500);
        },
        () => {
          setIsDetecting(false);
          toast({ variant: "destructive", title: "Error", description: "Could not fetch location. Please enter manually." });
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast({ variant: "destructive", title: "Cart is empty", description: "Add items before checkout." });
      return;
    }

    setLoading(true);
    
    // Simulate order placement and save to local history
    setTimeout(() => {
      const orderId = "AQ-ORDER-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: "Processing",
        total: `₹${(cartTotal * 1.18).toLocaleString('en-IN')}`, // Including simulated GST
        items: cart.map(item => item.name),
        type: cart[0].category.split(' ')[0],
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        phone: formData.phone,
        customerName: `${formData.firstName} ${formData.lastName}`,
        orderItems: cart.map(item => ({ name: item.name, qty: item.quantity, price: `₹${item.price.toLocaleString('en-IN')}` }))
      };

      // Save to localStorage history
      const existingOrders = JSON.parse(localStorage.getItem('aquasafe-orders') || '[]');
      localStorage.setItem('aquasafe-orders', JSON.stringify([newOrder, ...existingOrders]));

      clearCart();
      setLoading(false);
      router.push("/checkout/success?orderId=" + orderId);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black font-headline mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push('/products')}>Go to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">Secure <span className="text-primary">Checkout</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Details */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-black font-headline uppercase tracking-tight">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">First Name *</Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Last Name *</Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number *</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="h-12 pl-10 rounded-xl" placeholder="+91 99858 XXXXX" />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Details */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-black font-headline uppercase tracking-tight">Shipping Address</h3>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="rounded-xl font-black uppercase text-[10px] tracking-widest border-primary text-primary"
                >
                  {isDetecting ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Locate className="mr-2 h-3 w-3" />}
                  Auto-Detect
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Street Address *</Label>
                  <Input id="address" value={formData.address} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="Door No, Street Name, Landmark" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">City *</Label>
                    <Input id="city" value={formData.city} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="Visakhapatnam" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">PIN Code *</Label>
                    <Input id="pincode" value={formData.pincode} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="530026" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-[10px] font-black uppercase text-slate-400 tracking-widest">State *</Label>
                    <Input id="state" value={formData.state} onChange={handleInputChange} required className="h-12 rounded-xl" placeholder="Andhra Pradesh" />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Options */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-black font-headline uppercase tracking-tight">Payment Method</h3>
              </div>

              <RadioGroup defaultValue="razorpay" onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Label
                  htmlFor="razorpay"
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <RadioGroupItem value="razorpay" id="razorpay" className="sr-only" />
                  <div className="p-3 rounded-full bg-white shadow-sm border border-slate-100">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase">Razorpay</p>
                    <p className="text-[10px] font-bold text-slate-400">Cards, UPI, Netbanking</p>
                  </div>
                </Label>

                <Label
                  htmlFor="cod"
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <RadioGroupItem value="cod" id="cod" className="sr-only" />
                  <div className="p-3 rounded-full bg-white shadow-sm border border-slate-100">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase">Cash on Delivery</p>
                    <p className="text-[10px] font-bold text-slate-400">Pay when you receive</p>
                  </div>
                </Label>
              </RadioGroup>
            </section>
          </div>

          {/* Sidebar Side */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl sticky top-24 space-y-8">
              <h2 className="text-2xl font-black font-headline uppercase tracking-tight">Order Review</h2>
              
              <div className="space-y-4">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <span className="font-bold opacity-60">x{item.quantity}</span>
                      <span className="font-black uppercase tracking-tight">{item.name}</span>
                    </div>
                    <span className="font-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>GST (18%)</span>
                  <span>₹{(cartTotal * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-lg font-black font-headline">
                  <span>Payable</span>
                  <span className="text-primary">₹{(cartTotal * 1.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 transition-all border-none">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>Complete Purchase <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>

              <div className="flex items-center gap-2 justify-center p-4 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">100% SECURE TRANSACTION</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

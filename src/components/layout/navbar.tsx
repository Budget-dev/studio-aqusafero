
"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  PhoneCall, 
  MapPin, 
  MessageCircle, 
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
  Home,
  Droplets,
  Wrench,
  Users,
  Image as ImageIcon,
  Contact2,
  Award,
  Search,
  LogOut,
  GraduationCap,
  Settings,
  HelpCircle,
  ShoppingCart,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Users },
    {
      name: "Products",
      href: "/products",
      icon: Droplets,
      children: [
        { name: "Domestic Products", href: "/products?category=Domestic+Products", description: "Premium RO, UV, and alkaline systems for households." },
        { name: "Commercial Products", href: "/products?category=Commercial+Products", description: "High-volume treatment for hospitals and industry." },
        { name: "Spares and Components", href: "/products?category=Spares+and+Components", description: "Certified pumps, membranes, and fittings." },
        { name: "Filters and Chemicals", href: "/products?category=Filters+and+Chemicals", description: "Membrane cleaners, antiscalants, and media." },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: Wrench,
      children: [
        { name: "Installation", href: "/services", description: "Precision setup by certified engineering teams." },
        { name: "AMC Maintenance", href: "/services", description: "Predictive care and scheduled plant auditing." },
        { name: "Repair", href: "/services", description: "Rapid diagnostic and on-site restoration." },
      ],
    },
    { name: "Trainings", href: "/trainings", icon: GraduationCap },
    { name: "Our Brands", href: "/brands", icon: Award },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Contact Us", href: "/contact", icon: Contact2 },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      {/* Top Utility Bar */}
      <div className="hidden lg:block border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between text-[10px] font-black text-slate-900 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-white border border-slate-200">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>#07-13-23/2, Ground Floor, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. India.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 border-r border-slate-200 pr-6">
              <Link href="tel:+919985850777" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <PhoneCall className="h-3.5 w-3.5" /> Call Us
              </Link>
              <Link href="https://wa.me/919985850777" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
              </Link>
              <Link href="mailto:info@aquasafero.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" /> Email
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="text-[#1877F2] hover:opacity-75 transition-all"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="text-[#E4405F] hover:opacity-75 transition-all"><Instagram className="h-4 w-4" /></Link>
              <Link href="#" className="text-[#0A66C2] hover:opacity-75 transition-all"><Linkedin className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_11%20AM.png" 
            alt="AquaSafe Logo" 
            width={240} 
            height={65} 
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="font-black text-[11px] uppercase tracking-widest">{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] rounded-xl">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 hover:text-primary"
                                >
                                  <div className="text-xs font-black uppercase tracking-tight text-slate-900 leading-none mb-1">{child.name}</div>
                                  <p className="line-clamp-2 text-[10px] font-bold leading-snug text-slate-400">
                                    {child.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      <span className="font-black text-[11px] uppercase tracking-widest">{item.name}</span>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-4 ml-6 pl-6 border-l">
            <Link href="/orders" className="p-2 rounded-full hover:bg-slate-50 text-slate-600 transition-all relative group" title="My Orders">
              <Package className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform"></span>
            </Link>
            
            <Link href="/cart" className="p-2 rounded-full hover:bg-slate-50 text-slate-600 transition-all relative" title="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[8px] font-black text-white flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </Link>

            <Button asChild className="bg-primary hover:bg-primary/90 px-6 rounded-xl h-11 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest border-none">
              <Link href="/contact">Quick Quote</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/cart" className="p-2 relative">
            <ShoppingCart className="h-6 w-6 text-slate-900" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-[8px] font-black text-white flex items-center justify-center rounded-full border-2 border-white">3</span>
          </Link>
          <button 
            className="p-2 text-slate-900 z-[60] relative" 
            onClick={toggleSidebar}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (Right Side) */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[280px] bg-white z-[100] transition-transform duration-300 ease-in-out flex flex-col xl:hidden shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center gap-3 bg-slate-50/50">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 text-xs uppercase tracking-tight leading-none">AquaSafe Hub</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Water Technologies</span>
          </div>
          <button onClick={toggleSidebar} className="ml-auto p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-xs font-bold placeholder-slate-400 focus:ring-1 focus:ring-primary h-10"
            />
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
                  >
                    <Icon className="h-4.5 w-4.5 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-xs font-black uppercase tracking-tight">{item.name}</span>
                  </Link>
                </li>
              );
            })}
            <Separator className="my-4" />
            <li>
              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
              >
                <Package className="h-4.5 w-4.5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-xs font-black uppercase tracking-tight">My Orders</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile Section (Bottom) */}
        <div className="mt-auto border-t">
          <div className="p-4 bg-slate-50/30">
            <div className="flex items-center p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                <span className="text-slate-600 font-black text-xs">AS</span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">Technical Hub</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Customer Access</p>
              </div>
              <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          </div>

          <div className="px-4 pb-6 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                window.location.href = "/";
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 group"
            >
              <LogOut className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
              <span className="text-xs font-black uppercase tracking-tight">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

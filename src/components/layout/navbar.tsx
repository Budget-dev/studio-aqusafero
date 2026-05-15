
"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Users },
    {
      name: "Products",
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
      icon: Wrench,
      children: [
        { name: "Installation", href: "/services", description: "Precision setup by certified engineering teams." },
        { name: "AMC Maintenance", href: "/services", description: "Predictive care and scheduled plant auditing." },
        { name: "Repair", href: "/services", description: "Rapid diagnostic and on-site restoration." },
      ],
    },
    { name: "Our Brands", href: "/brands", icon: Award },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Contact Us", href: "/contact", icon: Contact2 },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

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
          
          <Button asChild className="bg-primary hover:bg-primary/90 px-8 rounded-xl h-12 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest ml-6 border-none">
            <Link href="/contact">Quick Quote</Link>
          </Button>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="xl:hidden p-2 text-slate-900 z-[60] relative" 
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transition-all duration-300 xl:hidden pt-24",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-6 h-full overflow-y-auto pb-10">
          <ul className="space-y-4">
            {navigation.map((item) => (
              <li key={item.name} className="border-b border-slate-100 last:border-none pb-4 last:pb-0">
                {item.children ? (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">
                      {item.name}
                    </span>
                    <div className="grid grid-cols-1 gap-3 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                        >
                          {child.name}
                          <ChevronRight className="h-4 w-4 text-slate-300" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 py-2 text-lg font-black font-headline text-slate-900 uppercase tracking-tight"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-slate-100">
            <Button asChild className="w-full h-14 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-xs border-none">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Get a Quote</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

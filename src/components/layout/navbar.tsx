
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
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Products",
      children: [
        { name: "Domestic Products", href: "/products?category=Domestic+Products", description: "Premium RO, UV, and alkaline systems for households." },
        { name: "Commercial Products", href: "/products?category=Commercial+Products", description: "High-volume treatment for hospitals and industry." },
        { name: "Spares and Components", href: "/products?category=Spares+and+Components", description: "Certified pumps, membranes, and fittings." },
        { name: "Filters and Chemicals", href: "/products?category=Filters+and+Chemicals", description: "Membrane cleaners, antiscalants, and media." },
      ],
    },
    {
      name: "Services",
      children: [
        { name: "Installation", href: "/services", description: "Precision setup by certified engineering teams." },
        { name: "AMC Maintenance", href: "/services", description: "Predictive care and scheduled plant auditing." },
        { name: "Repair", href: "/services", description: "Rapid diagnostic and on-site restoration." },
      ],
    },
    { name: "Industries", href: "/clients" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      {/* Top Utility Bar */}
      <div className="hidden lg:block border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between text-[10px] font-black text-slate-900 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>#07-13-23/2, Ground Floor, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. India.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 border-r border-slate-200 pr-6">
              <Link href="tel:+919985850777" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <PhoneCall className="h-3.5 w-3.5" /> Call Us
              </Link>
              <Link href="https://wa.me/919985850777" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </Link>
              <Link href="mailto:info@aquasafero.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" /> Email
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary transition-colors"><Facebook className="h-3.5 w-3.5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Instagram className="h-3.5 w-3.5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_11%20AM.png" 
            alt="AquaSafe Logo" 
            width={180} 
            height={50} 
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="font-black text-[11px] uppercase tracking-widest">{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] rounded-[1.5rem]">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 hover:text-primary"
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
          
          <Button asChild className="bg-primary hover:bg-primary/90 px-8 rounded-full h-12 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest ml-6">
            <Link href="/contact">Quick Quote</Link>
          </Button>
        </nav>

        <button className="xl:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {isOpen && (
        <div className="xl:hidden fixed inset-x-0 top-20 bg-white border-b shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col p-8 gap-6 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col gap-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</div>
                {item.children ? (
                  item.children.map((child) => (
                    <Link key={child.name} href={child.href} onClick={() => setIsOpen(false)} className="text-xl font-black text-slate-900 ml-4 py-2">
                      {child.name}
                    </Link>
                  ))
                ) : (
                  <Link href={item.href} onClick={() => setIsOpen(false)} className="text-xl font-black text-slate-900 ml-4 py-2">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

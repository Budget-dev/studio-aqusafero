
"use client"

import Link from "next/link";
import { useState } from "react";
import { 
  Droplets, 
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
        { name: "Domestic Products", href: "/services#residential", description: "Safe and pure water for your home and family." },
        { name: "Commercial Products", href: "/services#commercial", description: "High-performance systems for offices and clinics." },
        { name: "Spares and Components", href: "/spares", description: "Genuine factory-certified replacement parts." },
        { name: "Filters and Chemicals", href: "/filters", description: "Specialized media for optimal filtration." },
      ],
    },
    {
      name: "Services",
      children: [
        { name: "Installation", href: "/services", description: "Professional setup of your RO plant." },
        { name: "AMC Maintenance", href: "/services", description: "Ongoing care to ensure system longevity." },
        { name: "Repair", href: "/services", description: "Fast and reliable troubleshooting services." },
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
            <span>#07-13-23/2, Ground Floor, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. Andhra Pradesh, India.</span>
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
                <Mail className="h-3.5 w-3.5" /> Email Us
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
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-black text-slate-900 tracking-tighter leading-none">
                AQUASAFE
              </span>
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase leading-none mt-1">
                RO Systems
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none">{child.name}</div>
                                  <p className="line-clamp-2 text-xs font-bold leading-snug text-slate-500">
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
                      {item.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button asChild className="bg-primary hover:bg-primary/90 px-6 rounded-full h-11 shadow-lg shadow-primary/20 text-xs font-black border-none text-white ml-4">
            <Link href="tel:+919985850777">+91 99858 50777</Link>
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="xl:hidden p-2 text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="xl:hidden fixed inset-x-0 top-20 bg-white border-b shadow-2xl animate-in slide-in-from-top-4 duration-300 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col p-6 gap-4">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col">
                {item.children ? (
                  <>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-2">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-black p-2 text-slate-900 hover:text-primary transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-black p-2 text-slate-900 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-6 h-14 rounded-full text-lg shadow-xl shadow-primary/20 font-black bg-primary text-white border-none">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

"use client"

import Link from "next/link";
import { useState } from "react";
import { 
  Droplets, 
  Menu, 
  X, 
  ChevronDown, 
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Products",
      children: [
        { name: "RO Plants", href: "/services#industrial" },
        { name: "Water Systems", href: "/services#commercial" },
        { name: "Spares", href: "/spares" },
        { name: "Filters", href: "/filters" },
      ],
    },
    {
      name: "Services",
      children: [
        { name: "Installation", href: "/services" },
        { name: "AMC Maintenance", href: "/services" },
        { name: "Repair", href: "/services" },
      ],
    },
    { name: "Industries", href: "/clients" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/resources" },
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
        <nav className="hidden xl:flex items-center gap-8">
          {navigation.map((item) => (
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-black text-slate-900 hover:text-primary transition-colors outline-none focus:ring-0">
                  {item.name} <ChevronDown className="h-3 w-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-2 rounded-2xl shadow-2xl border-slate-100">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild className="rounded-xl px-4 py-2 cursor-pointer focus:bg-primary/5">
                      <Link href={child.href} className="w-full text-xs font-black text-slate-900">
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-black text-slate-900 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90 px-6 rounded-full h-11 shadow-lg shadow-primary/20 text-xs font-black">
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
            <Button asChild className="w-full mt-6 h-14 rounded-full text-lg shadow-xl shadow-primary/20 font-black">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

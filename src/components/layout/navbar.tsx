
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
  Search,
  ChevronRight,
  Home,
  Droplets,
  Wrench,
  Users,
  Image as ImageIcon,
  Contact2,
  Settings,
  LogOut,
  ChevronLeft
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
  const [searchQuery, setSearchQuery] = useState("");

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
    { name: "Industries", href: "/clients", icon: MapPin },
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
            <MapPin className="h-3.5 w-3.5 text-primary" />
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
            className="h-12 w-auto object-contain"
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
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] rounded-[1rem]">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 hover:text-primary"
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
          
          <Button asChild className="bg-primary hover:bg-primary/90 px-8 rounded-xl h-12 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest ml-6">
            <Link href="/contact">Quick Quote</Link>
          </Button>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="xl:hidden p-2 text-slate-900 z-[60]" 
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Mobile Sliding Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 transition-all duration-300 ease-in-out flex flex-col w-[300px]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          xl:hidden
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <Link href="/" onClick={toggleSidebar}>
            <Image 
              src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_11%20AM.png" 
              alt="AquaSafe Logo" 
              width={140} 
              height={40} 
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="space-y-1">
                  {item.children ? (
                    <div className="space-y-1">
                      <div className="flex items-center px-4 py-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">
                        {item.name}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={toggleSidebar}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary transition-all group"
                        >
                          <span className="text-sm font-bold">{child.name}</span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={toggleSidebar}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary transition-all"
                    >
                      <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                      <span className="text-sm font-bold">{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-slate-100 p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black">
              AS
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Technical Support</p>
              <p className="text-[10px] font-bold text-slate-500">Available 24/7</p>
            </div>
          </div>
          
          <Button asChild className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px]">
            <Link href="/contact" onClick={toggleSidebar}>Get Fast Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

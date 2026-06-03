
"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
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
  LogOut,
  GraduationCap,
  ShoppingCart,
  Package,
  ArrowRight,
  Factory,
  Beaker,
  Building2,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { useUser, useAuth } from "@/firebase"
import { signOut } from "firebase/auth"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { user } = useUser()
  const { auth } = useAuth()

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Users },
    {
      name: "Products",
      href: "/products",
      icon: Droplets,
      children: [
        { name: "Domestic Products", href: "/products?category=Domestic+Products", description: "Premium purification systems for households.", icon: Home },
        { name: "Commercial Products", href: "/products?category=Commercial+Products", description: "Water treatment for hospitality and clinics.", icon: ShoppingCart },
        { name: "Institutional Products", href: "/products?category=Institutional+Products", description: "Safety-first systems for schools and hospitals.", icon: Building2 },
        { name: "Industrial Products", href: "/products?category=Industrial+Products", description: "High-volume plants for heavy manufacturing.", icon: Factory },
        { name: "Components & Spare Parts", href: "/products?category=Components+%26+Spare+Parts", description: "Certified pumps, membranes, and fittings.", icon: Wrench },
        { name: "Filters & Chemicals", href: "/products?category=Filters+%26+Chemicals", description: "Media, antiscalants, and treatment chemicals.", icon: Beaker },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: Wrench,
      children: [
        { name: "Installation", href: "/services/installation", description: "Precision setup by certified engineering teams." },
        { name: "AMC Maintenance", href: "/services/amc-maintenance", description: "Predictive care and scheduled plant auditing." },
        { name: "Repair", href: "/services/repair", description: "Rapid diagnostic and on-site restoration." },
      ],
    },
    { name: "Academy", href: "/trainings", icon: GraduationCap },
    { name: "Our Brands", href: "/brands", icon: Award },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Contact Us", href: "/contact", icon: Contact2 },
  ]

  const toggleSidebar = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(prev => !prev);
  }, []);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  const handleLogout = () => {
    if (auth) signOut(auth)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/signup')
  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-white/95 backdrop-blur-md">
      <div className="hidden lg:block border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between text-[10px] font-black text-slate-900 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-white border border-slate-200">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>#07-13-23/2, NH-5 Main Road, Old Gajuwaka, Visakhapatnam-530026. India.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 border-r border-slate-200 pr-6">
              <Link href="tel:+919985850777" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <PhoneCall className="h-3.5 w-3.5" /> Call Us
              </Link>
              <Link href="https://wa.me/919985850777" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
              </Link>
              <div className="flex items-center gap-4">
                <Link href="mailto:info@aquasafero.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5" /> info@aquasafero.com
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="#" className="text-[#1877F2] hover:opacity-75 transition-all"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="text-[#E4405F] hover:opacity-75 transition-all"><Instagram className="h-4 w-4" /></Link>
              <Link href="#" className="text-[#0A66C2] hover:opacity-75 transition-all"><Linkedin className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 lg:h-24 flex items-center justify-between relative z-[110]">
        <div className="flex items-center h-full shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <Droplets className="text-white h-6 w-6 md:h-7 md:w-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg md:text-2xl tracking-tighter leading-none uppercase">
                AQUA<span className="text-primary">SAFE</span>
              </span>
              <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mt-1">
                Water Technologies
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="font-black text-[11px] uppercase tracking-widest">{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 rounded-xl">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 hover:text-primary"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="text-xs font-black uppercase tracking-tight text-slate-900 leading-none">{child.name}</div>
                                  </div>
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
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(navigationMenuTriggerStyle(), "font-black text-[11px] uppercase tracking-widest")}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-4 ml-6 pl-6 border-l">
            <Link href="/cart" className="p-2 rounded-full hover:bg-slate-50 text-slate-600 transition-all relative" title="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[8px] font-black text-white flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                  {user.email?.[0].toUpperCase()}
                </div>
                <button onClick={() => auth && signOut(auth)} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <Button asChild className="bg-primary hover:bg-primary/90 px-6 rounded-xl h-11 shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest border-none">
                <Link href="/user/login">Sign In</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Actions Right */}
        <div className="xl:hidden flex items-center gap-3">
          <Button asChild className="h-10 px-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 border-none">
            <Link href="/contact">Get a Quote <ArrowRight className="ml-1.5 h-3 w-3" /></Link>
          </Button>
          
          <button 
            className="p-2 text-slate-900 z-[130] relative" 
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay (Surrounding area) */}
      <div
        className={cn(
          "fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Mobile Sidebar Content - Left Side */}
      <div
        className={cn(
          "fixed top-0 left-0 h-[100dvh] w-[300px] bg-white z-[210] transition-transform duration-300 ease-in-out flex flex-col xl:hidden shadow-2xl overflow-hidden",
          isOpen ? "translate-x-0 visible" : "-translate-x-full invisible pointer-events-none"
        )}
      >
        <div className="p-5 border-b flex items-center gap-3 bg-slate-50/80 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Droplets className="text-white h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 text-sm uppercase tracking-tight leading-none">AQUA SAFE</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Water Technologies</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="ml-auto p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-6 no-scrollbar">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedItems.includes(item.name);

              if (hasChildren) {
                return (
                  <li key={item.name} className="space-y-1">
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
                    >
                      <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-tight">{item.name}</span>
                      <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <ul className="ml-12 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                        {item.children?.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2.5 px-4 rounded-lg text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:bg-primary/5 transition-all"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-tight">{item.name}</span>
                    <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t bg-slate-50/50 shrink-0">
          <div className="p-5 pb-8">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-xs font-black text-slate-900 uppercase truncate">{user.email}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Active Client</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 font-black uppercase text-xs tracking-widest group"
                >
                  <LogOut className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                  Logout from Account
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] border-none bg-slate-900 shadow-xl shadow-slate-900/10">
                  <Link href="/user/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl font-black uppercase tracking-widest text-[10px] border-slate-200 bg-white">
                  <Link href="/user/signup" onClick={() => setIsOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

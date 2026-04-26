
"use client"

import Link from "next/link";
import { useState } from "react";
import { Droplets, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Our Profile", href: "/about" },
    {
      name: "Products",
      children: [
        { name: "Domestic Products", href: "/services#residential" },
        { name: "Commercial Products", href: "/services#commercial" },
        { name: "Spares and Components", href: "/spares" },
        { name: "Filters and Chemicals", href: "/filters" },
      ],
    },
    {
      name: "Knowledge Center",
      children: [
        { name: "Clients", href: "/clients" },
        { name: "Resources", href: "/resources" },
        { name: "News and Events", href: "/news" },
        { name: "FAQs", href: "/faqs" },
      ],
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-primary group-hover:bg-primary/90 transition-colors">
              <Droplets className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-headline text-xl font-bold text-primary tracking-tight">
              AquaSafe Hub
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navigation.map((item) => (
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                  {item.name} <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href} className="w-full cursor-pointer">
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
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="xl:hidden p-2 text-muted-foreground hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-background border-b animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-2">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col">
                {item.children ? (
                  <>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-2 mt-2">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-base font-medium p-2 pl-4 rounded-md hover:bg-muted"
                      >
                        {child.name}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-base font-medium p-2 rounded-md hover:bg-muted"
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-4">
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

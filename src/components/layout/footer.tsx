"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Facebook, 
  Github, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube 
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname === '/login' || pathname === '/signup') return null;

  const company = [
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Trainings', href: '/trainings' },
    { title: 'Our Brands', href: '/brands' },
    { title: 'Products', href: '/products' },
  ];

  const resources = [
    { title: 'Blog', href: '/resources' },
    { title: 'News', href: '/news' },
    { title: 'FAQs', href: '/faqs' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="size-4" />, link: '#', color: 'text-[#1877F2]' },
    { icon: <Twitter className="size-4" />, link: '#', color: 'text-[#1DA1F2]' },
    { icon: <Instagram className="size-4" />, link: '#', color: 'text-[#E4405F]' },
    { icon: <Linkedin className="size-4" />, link: '#', color: 'text-[#0A66C2]' },
    { icon: <Youtube className="size-4" />, link: '#', color: 'text-[#FF0000]' },
    { icon: <Github className="size-4" />, link: '#', color: 'text-white' },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Border */}
        <div className="h-px w-full bg-white/10" />
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 py-16">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-max">
              <Image 
                src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_11%20AM.png" 
                alt="AquaSafe Logo" 
                width={300} 
                height={80} 
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-sm text-slate-400 leading-relaxed font-semibold">
              Leading manufacturer and service provider of industrial, commercial, and residential RO plants and purification systems.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  className={`hover:bg-white/5 rounded-md border border-white/10 p-2 transition-all ${item.color}`}
                  target="_blank"
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <span className="text-white font-black uppercase tracking-widest text-[10px] mb-4 block">
              Resources
            </span>
            <div className="flex flex-col gap-3">
              {resources.map(({ href, title }, i) => (
                <Link
                  key={i}
                  className="w-max text-sm font-bold duration-200 hover:text-primary"
                  href={href}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <span className="text-white font-black uppercase tracking-widest text-[10px] mb-4 block">
              Company
            </span>
            <div className="flex flex-col gap-3">
              {company.map(({ href, title }, i) => (
                <Link
                  key={i}
                  className="w-max text-sm font-bold duration-200 hover:text-primary"
                  href={href}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Border and Copyright */}
        <div className="h-px w-full bg-white/10" />
        <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            © {year} AQUASAFE RO SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            ENGINEERING PURITY SINCE 2014
          </p>
        </div>
      </div>
    </footer>
  );
}

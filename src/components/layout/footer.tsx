'use client';

import React, { useState, useEffect } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOGO_URL = "https://aquasaferoworks.sirv.com/ChatGPT%20Image%20Jun%205%2C%202026%2C%2001_00_17%20PM.png";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Solutions',
    links: [
      { title: 'Domestic Hub', href: '/products?category=Domestic+Products' },
      { title: 'Industrial Hub', href: '/products?category=Industrial+Products' },
      { title: 'Wastewater STP', href: '/compact-sewage-treatment-plant' },
      { title: 'Effluent ETP', href: '/compact-effluent-treatment-plant' },
    ],
  },
  {
    label: 'Expertise',
    links: [
      { title: 'Engineering Hub', href: '/about' },
      { title: 'Technical Hub', href: '/trainings' },
      { title: 'Installation', href: '/services/installation' },
      { title: 'Maintenance', href: '/services/amc-maintenance' },
    ],
  },
  {
    label: 'Support',
    links: [
      { title: 'Contact Us', href: '/contact' },
      { title: 'Media Hub', href: '/gallery' },
      { title: 'Resources', href: '/resources' },
      { title: 'FAQ Hub', href: '/faqs' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  // Hide footer on auth pages
  if (pathname?.includes('/login') || pathname?.includes('/signup')) return null;

  const currentLogoHeight = mounted && windowWidth < 1024 ? '250%' : '311%';

  return (
    <footer className="relative w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center rounded-t-[2.5rem] md:rounded-t-[3.5rem] border-t border-white/5 bg-slate-900 px-6 py-8 md:py-10 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />
      
      {/* Radial Gradient Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10" 
           style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 60%)' }} 
      />

      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 items-start">
        {/* Brand Column */}
        <AnimatedContainer className="xl:col-span-2 space-y-4">
          <Link href="/" className="flex items-center group">
            <div className="h-16 md:h-20 flex items-center shrink-0">
              <img 
                src={LOGO_URL} 
                alt="AquaSafe Water Technologies" 
                className="w-auto object-contain"
                style={{ height: currentLogoHeight }}
              />
            </div>
          </Link>
          <div className="space-y-3">
            <p className="text-slate-400 text-[10px] font-bold leading-relaxed max-w-sm uppercase tracking-widest opacity-80">
              Engineering Purity Since 2006. ISO 9001:2015 certified manufacturer of high-performance water treatment assets.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-slate-300 text-[9px] font-black uppercase tracking-widest">
                <MapPin className="h-3 w-3 text-primary shrink-0" /> 
                <span className="truncate">Visakhapatnam, AP, India</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-[9px] font-black uppercase tracking-widest">
                <Mail className="h-3 w-3 text-primary shrink-0" /> 
                <span>info@aquasafero.com</span>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:col-span-3 gap-6 md:gap-8">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1} className="space-y-3">
              <h3 className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50 border-b border-white/5 pb-2">
                {section.label}
              </h3>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-primary inline-flex items-center text-[10px] font-bold transition-all duration-300 uppercase tracking-wider group"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.25em]">
          © {new Date().getFullYear()} AQUASAFE WATER TECHNOLOGIES. ALL RIGHTS RESERVED.
        </p>
        
        <div className="flex items-center gap-5">
          {[
            { icon: Facebook, href: "#" },
            { icon: Instagram, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Youtube, href: "#" },
          ].map((social, i) => (
            <Link 
              key={i} 
              href={social.href} 
              className="text-slate-500 hover:text-primary transition-colors duration-300 group"
            >
              <social.icon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(10px)', translateY: 10, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
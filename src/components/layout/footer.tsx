'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  Github,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
    label: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Brands', href: '/brands' },
      { title: 'Gallery', href: '/gallery' },
      { title: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'Services',
    links: [
      { title: 'Installation', href: '/services/installation' },
      { title: 'AMC & Maintenance', href: '/services/amc-maintenance' },
      { title: 'Repair & Diagnostic', href: '/services/repair' },
      { title: 'Technical Trainings', href: '/trainings' },
    ],
  },
  {
    label: 'Admin Hub',
    links: [
      { title: 'Certificate Portal', href: '/admin/certificates' },
      { title: 'Invoice Portal', href: '/admin/invoices' },
      { title: 'Product Catalog', href: '/products' },
      { title: 'Resources', href: '/resources' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Facebook', href: '#', icon: Facebook },
      { title: 'Instagram', href: '#', icon: Instagram },
      { title: 'Youtube', href: '#', icon: Youtube },
      { title: 'LinkedIn', href: '#', icon: Linkedin },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] border-t border-white/10 bg-slate-900 px-6 py-16 lg:py-20 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
      
      {/* Radial Gradient Decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 70%)' }} 
      />

      <div className="relative z-10 grid w-full gap-12 xl:grid-cols-4">
        <AnimatedContainer className="space-y-6">
          <Link href="/" className="block">
            <Image 
              src="https://aquasaferoworks.sirv.com/ChatGPT%20Image%20May%2015%2C%202026%2C%2004_19_37%20PM.png" 
              alt="AquaSafe Logo" 
              width={280} 
              height={70} 
              className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-slate-400 text-xs font-bold leading-relaxed max-w-xs uppercase tracking-widest">
            Engineering Purity Since 2014. <br />
            Leading manufacturer and service provider of industrial RO plants.
          </p>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} AQUASAFE RO SYSTEMS.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-3">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
                  {section.label}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-primary inline-flex items-center text-xs font-bold transition-all duration-300 uppercase tracking-wider group"
                      >
                        {link.icon && <link.icon className="me-2 size-3.5 group-hover:scale-110 transition-transform" />}
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
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
      initial={{ filter: 'blur(10px)', translateY: 20, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

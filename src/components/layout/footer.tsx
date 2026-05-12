import Link from "next/link";
import { Droplets, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-white/5">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-black text-white tracking-tighter leading-none">
                  AQUASAFE
                </span>
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase leading-none mt-1">
                  RO Systems
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A leading manufacturer and service provider of RO plants, water treatment solutions and purification systems for industrial, commercial & institutional needs.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {["Home", "About Us", "Products", "Services", "Industries", "Projects", "Blog", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-8 uppercase tracking-widest text-xs">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                "RO Plant Manufacturing",
                "Water Plant Services",
                "RO Products",
                "AMC Services",
                "Installation",
                "Repair & Maintenance"
              ].map((service) => (
                <li key={service}>
                  <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white mb-8 uppercase tracking-widest text-xs">Contact Info</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="leading-relaxed">123, Industrial Area,<br />Ahmedabad, Gujarat - 382415</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-bold text-white">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>info@aquasafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© 2024 AQUASAFE RO SYSTEMS. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
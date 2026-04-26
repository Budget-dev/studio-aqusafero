
import Link from "next/link";
import { Droplets, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary-foreground" />
              <span className="font-headline text-xl font-bold">AquaSafe Hub</span>
            </Link>
            <p className="text-sm text-accent-foreground/70 leading-relaxed max-w-xs">
              Pioneering advanced water purification through cutting-edge Reverse Osmosis technology. Quality water for a safer tomorrow.
            </p>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-accent-foreground/70">
              <li><Link href="/services#industrial" className="hover:text-white">Industrial RO Plants</Link></li>
              <li><Link href="/services#commercial" className="hover:text-white">Commercial Purification</Link></li>
              <li><Link href="/services#residential" className="hover:text-white">Residential Filters</Link></li>
              <li><Link href="/services#maintenance" className="hover:text-white">Maintenance Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-accent-foreground/70">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resource Library</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-white">Partner Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm text-accent-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary-foreground" />
                <span>123 Purification Way,<br />Tech Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-foreground" />
                <span>+1 (800) AQUA-SAFE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-foreground" />
                <span>solutions@aquasafehub.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-accent-foreground/10 text-center text-xs text-accent-foreground/50">
          <p>© {new Date().getFullYear()} AquaSafe Hub. All rights reserved. Designed for Purity.</p>
        </div>
      </div>
    </footer>
  );
}

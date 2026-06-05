
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { CartProvider } from '@/context/cart-context';
import { FirebaseClientProvider } from '@/firebase';
import { SchemaOrg } from '@/components/seo/schema-org';

export const metadata: Metadata = {
  metadataBase: new URL('https://aquasafero.com'),
  title: {
    default: 'Aqua Safe Water Technologies | RO Plant Manufacturer & Water Treatment Solutions in Vizag',
    template: '%s | Aqua Safe Water Technologies'
  },
  description: 'Leading RO plant manufacturer and water treatment company in Gajuwaka, Visakhapatnam. Domestic RO, Industrial RO Plants, STP, ETP, Water Softeners, AMC & Maintenance Services.',
  keywords: ['RO Service in Vizag', 'RO Plant Manufacturers Vizag', 'Water Treatment Plant Vizag', 'STP Plant Manufacturer Vizag', 'ETP Plant Supplier Andhra Pradesh', 'Industrial RO Plant Visakhapatnam'],
  authors: [{ name: 'Aqua Safe Water Technologies' }],
  creator: 'Aqua Safe Water Technologies',
  publisher: 'Aqua Safe Water Technologies',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aquasafero.com',
    siteName: 'Aqua Safe Water Technologies',
    images: [{
      url: 'https://aquasaferoworks.sirv.com/ChatGPT%20Image%20Jun%205%2C%202026%2C%2001_00_17%20PM.png',
      width: 1200,
      height: 630,
      alt: 'Aqua Safe Water Technologies Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqua Safe Water Technologies | Industrial Water Solutions in Vizag',
    description: 'Expert RO Plant manufacturers and STP/ETP installation services in Andhra Pradesh.',
    images: ['https://aquasaferoworks.sirv.com/ChatGPT%20Image%20Jun%205%2C%202026%2C%2001_00_17%20PM.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232563eb%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z%22/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://aquasafero.com" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <FirebaseClientProvider>
          <CartProvider>
            <SchemaOrg />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
            <WhatsAppButton />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

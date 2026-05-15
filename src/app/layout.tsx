
import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: 'AquaSafe Hub | Professional RO Water Treatment Solutions',
  description: 'Providing advanced reverse osmosis services for industrial, commercial, and residential applications.',
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
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

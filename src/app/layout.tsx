import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SWRegister } from '@/components/layout/SWRegister';
import { InstallPrompt } from '@/components/layout/InstallPrompt';
import { OfflineBanner } from '@/components/layout/OfflineBanner';
import { Toaster } from 'sonner';
import './globals.css';

// Playfair Display (headings) + Lora (body) - matches the warm, serif,
// logo-led reference design (brown/gold/cream). Variable names kept as
// --font-playfair / --font-inter so existing heading/body classes
// throughout the codebase don't need to change.
const headingFont = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const bodyFont = Lora({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.soulcommunity.co.ke'),
  title: {
    default: 'SOUL – Serving Opportunities, Uplifting Lives',
    template: '%s | SOUL Community',
  },
  description: 'SOUL is a vibrant community dedicated to mental wellness, networking, opportunities, business promotion, outdoor experiences, learning, volunteering, and meaningful friendships.',
  keywords: ['community', 'mental health', 'networking', 'opportunities', 'SOUL', 'wellness', 'outdoor', 'volunteering'],
  authors: [{ name: 'SOUL Community' }],
  creator: 'SOUL Community',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.soulcommunity.co.ke',
    siteName: 'SOUL Community',
    title: 'SOUL – Serving Opportunities, Uplifting Lives',
    description: 'A vibrant community dedicated to mental wellness, networking, opportunities, and meaningful friendships.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SOUL Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOUL – Serving Opportunities, Uplifting Lives',
    description: 'A vibrant community dedicated to mental wellness, networking, opportunities, and meaningful friendships.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#2D5A3D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SOUL" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <OfflineBanner />
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <SWRegister />
        <InstallPrompt />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

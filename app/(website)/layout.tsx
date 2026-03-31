import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import Preloader from '@/components/Preloader';
import MouseParticleTrail from '@/components/MouseParticleTrail';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iste.ceal.in'),
  title: {
    default: 'ISTE CEAL - Student Chapter',
    template: '%s | ISTE CEAL',
  },
  description: 'Official website of ISTE CEAL Student Chapter - Empowering technical excellence through innovation and collaboration. Join us for hackathons, workshops, and tech events.',
  keywords: ['ISTE', 'CEAL', 'Student Chapter', 'Tech Events', 'Hackathons', 'Workshops', 'Coding', 'Engineering'],
  authors: [{ name: 'ISTE CEAL Web Team' }],
  creator: 'ISTE CEAL',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://iste.ceal.in',
    title: 'ISTE CEAL - Student Chapter',
    description: 'Empowering technical excellence through innovation and collaboration. Official website of ISTE CEAL.',
    siteName: 'ISTE CEAL',
    images: [
      {
        url: '/iste-colo_light.png',
        width: 1200,
        height: 630,
        alt: 'ISTE CEAL Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISTE CEAL - Student Chapter',
    description: 'Empowering technical excellence through innovation and collaboration.',
    images: ['/iste-colo_light.png'],
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          inter.variable,
          outfit.variable,
          jetbrainsMono.variable,
          'font-sans bg-gray-900 text-white antialiased',
        ].join(' ')}
      >

        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <MouseParticleTrail />
      </body>
    </html>
  );
}
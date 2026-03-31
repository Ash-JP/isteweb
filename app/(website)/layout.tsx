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
  title: 'ISTE CEAL - Student Chapter',
  description: 'Official website of ISTE CEAL Student Chapter - Empowering technical excellence through innovation and collaboration',
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
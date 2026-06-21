'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* Removed pt-24 - let each page handle its own spacing */}
      {children}
      <Footer />
    </>
  );
}
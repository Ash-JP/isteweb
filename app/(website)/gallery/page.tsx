import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { reader } from '@/lib/keystatic';

const GalleryGrid = dynamic(() => import("@/components/GalleryGrid"));

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Moments captured at ISTE CEAL events and hackathons.',
  openGraph: {
    title: 'Gallery | ISTE CEAL',
    description: 'Moments captured at ISTE CEAL events and hackathons.',
    type: 'website',
  },
};

export default async function GalleryPage() {
    let items: any[] = [];
    try {
        const rawItems = await reader.collections.gallery.all();
        items = rawItems.map(item => ({
            _id: item.slug,
            ...item.entry
        })).sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } catch (error) {
        console.error("Failed to fetch gallery items from Keystatic:", error);
    }

    return (
        <GalleryGrid items={items} />
    );
}

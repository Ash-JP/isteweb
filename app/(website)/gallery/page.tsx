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
        items = rawItems.flatMap(item => {
            const mainImage = {
                _id: item.slug + '-main',
                title: item.entry.title,
                category: item.entry.category,
                cloudinaryUrl: item.entry.cloudinaryUrl,
                date: item.entry.date
            };
            const additional = (item.entry.additionalPhotos || []).map((img, idx) => ({
                _id: item.slug + '-' + idx,
                title: item.entry.title + ` (${idx + 2})`,
                category: item.entry.category,
                cloudinaryUrl: img.cloudinaryUrl,
                date: item.entry.date
            }));
            
            return [mainImage, ...additional].filter(img => img.cloudinaryUrl);
        }).sort((a, b) => {
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

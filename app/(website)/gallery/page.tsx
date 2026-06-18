import type { Metadata } from 'next';
import { reader } from '@/lib/keystatic';
import GalleryGrid from '@/components/GalleryGrid';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Moments captured at ISTE CEAL events and hackathons.',
};

export default async function GalleryPage() {
    const rawItems = await reader.collections.gallery.all();
    const items = rawItems.map(item => ({
        _id: item.slug,
        ...item.entry
    })).sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <GalleryGrid items={items} />
    );
}

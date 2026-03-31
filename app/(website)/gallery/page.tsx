import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import GalleryGrid from '@/components/GalleryGrid';

// Revalidate every 60 seconds, or use no-store for fresh data
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Moments captured at ISTE CEAL events and hackathons.',
};

export default async function GalleryPage() {
    const query = `*[_type == "gallery"] | order(date desc) {
        _id,
        title,
        category,
        image,
        date
    }`;

    // Fetch data on the server
    const items = await client.fetch(query);

    return (
        <GalleryGrid items={items} />
    );
}

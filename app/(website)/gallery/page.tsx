import { client } from '@/sanity/lib/client';
import GalleryGrid from '@/components/GalleryGrid';

// Revalidate every 60 seconds, or use no-store for fresh data
export const revalidate = 60;

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

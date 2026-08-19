import { reader } from '@/lib/keystatic';
import LinktreeFeed, { LinktreeItem } from '@/components/LinktreeFeed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Links | ISTE CEAL',
  description: 'Connect with ISTE CEAL Student Chapter, register for events, workshops, hackathons, and access official socials and resources.',
};

export const revalidate = 0;

export default async function LinksPage() {
  const rawItems = await reader.collections.linktree.all();

  const items: LinktreeItem[] = rawItems.map((item) => ({
    slug: item.slug,
    title: item.entry.title,
    url: item.entry.url,
    description: item.entry.description || '',
    icon: item.entry.icon || 'globe',
    order: item.entry.order ?? 0,
  }));

  return (
    <main className="min-w-full min-h-screen pt-28 pb-16 relative flex flex-col items-center justify-start">
      <LinktreeFeed items={items} />
    </main>
  );
}

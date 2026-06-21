import type { Metadata } from 'next';

import FeaturedEvent from "@/components/FeaturedEvent";
import CurvedTimeline from "@/components/CurvedTimeline";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Events',
  description: 'Explore our history of workshops, hackathons, seminars, and tech events.',
  openGraph: {
    title: 'Events | ISTE CEAL',
    description: 'Explore our history of workshops, hackathons, seminars, and tech events.',
    type: 'website',
  },
};

import { reader } from "@/lib/keystatic";

async function getEvents() {
  try {
    const events = await reader.collections.events.all();
    return events.map((event) => ({
      _id: event.slug,
      slug: event.slug,
      ...event.entry,
    })).sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Failed to fetch events from Keystatic:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  // Find featured, fallback to latest upcoming, fallback to latest
  const featuredEvent = events.find((e: any) => e.featured) || events.find((e: any) => e.status === 'upcoming') || events[0];

  // Rest of events for timeline: we pass ALL events so the timeline graph is complete and accurate
  const timelineEvents = events;

  return (
    <main className="min-h-screen bg-[#020617]">
      {/* Featured Hero Section */}
      {featuredEvent ? (
        <FeaturedEvent event={featuredEvent} />
      ) : (
        <div className="h-[50vh] flex items-center justify-center text-gray-500">
          No events found.
        </div>
      )}

      {/* Timeline Section */}
      <section className="relative">
        <div className="container-centered mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Journey</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore our history of workshops, hackathons, and seminars.
          </p>
        </div>

        {timelineEvents.length > 0 ? (
          <CurvedTimeline events={timelineEvents} />
        ) : (
          <div className="container-centered text-gray-500 text-center pb-20">
            More events coming soon.
          </div>
        )}
      </section>
    </main>
  );
}
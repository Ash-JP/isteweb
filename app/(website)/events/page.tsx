import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import FeaturedEvent from "@/components/FeaturedEvent";
const CurvedTimeline = dynamic(() => import("@/components/CurvedTimeline"));
import Starfield from "@/components/Starfield";
import JourneyHeader from "@/components/JourneyHeader";

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
    <main className="relative min-h-screen bg-[#020617]">
      {/* Global Background Effect */}
      <Starfield />

      {/* Featured Hero Section */}
      {featuredEvent ? (
        <FeaturedEvent event={featuredEvent} />
      ) : (
        <div className="h-[50vh] flex items-center justify-center text-gray-500">
          No events found.
        </div>
      )}

      {/* Timeline Section */}
      <section className="relative z-10">
        <JourneyHeader />

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
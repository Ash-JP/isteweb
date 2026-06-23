import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Starfield from "@/components/Starfield";

const AboutSection = dynamic(() => import("@/components/AboutSection"));
const WhatWeOfferSection = dynamic(() => import("@/components/WhatWeOfferSection"));
const UpcomingEventsSection = dynamic(() => import("@/components/UpcomingEventsSection"));
const FinalCTASection = dynamic(() => import("@/components/FinalCTASection"));

export const metadata: Metadata = {
  title: "Home",
  description: "Discover ISTE CEAL, connecting students with opportunities in technology, engineering, and innovation.",
};

import { reader } from "@/lib/keystatic";

async function getCountdownEvent() {
  try {
    const homepageSettings = await reader.singletons.homepage.read();
    
    if (homepageSettings?.countdownEventSlug) {
      const event = await reader.collections.events.read(homepageSettings.countdownEventSlug);
      if (event) {
        return {
          title: event.title,
          description: event.description,
          date: event.date || "",
          slug: { current: homepageSettings.countdownEventSlug }
        };
      }
    }

    const allEvents = await reader.collections.events.all();
    const upcomingEvents = allEvents.filter(e => e.entry.status === 'upcoming');
    
    upcomingEvents.sort((a, b) => {
      if (!a.entry.date || !b.entry.date) return 0;
      return new Date(a.entry.date).getTime() - new Date(b.entry.date).getTime();
    });

    if (upcomingEvents.length > 0) {
      const e = upcomingEvents[0];
      return {
        title: e.entry.title,
        description: e.entry.description,
        date: e.entry.date || "",
        slug: { current: e.slug }
      };
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Keystatic:", error);
  }
  
  return undefined;
}

export default async function Home() {
  const event = await getCountdownEvent();

  return (
    <main className="relative min-h-screen bg-[#020617]">
      {/* Global Background Effect */}
      <Starfield />

      {/* Hero Section */}
      <Hero />

      {/* About Section - Box Transition */}
      <AboutSection />

      {/* What We Offer - Box Grid */}
      <WhatWeOfferSection />

      {/* Upcoming Events - Box */}
      <UpcomingEventsSection event={event} />

      {/* Final CTA - Box */}
      <FinalCTASection />
    </main>
  );
}
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhatWeOfferSection from "@/components/WhatWeOfferSection";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import FinalCTASection from "@/components/FinalCTASection";
import { client } from "@/sanity/client";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover ISTE CEAL, connecting students with opportunities in technology, engineering, and innovation.",
};

async function getCountdownEvent() {
  // Query the homepage singleton first
  const query = `
    *[_type == "homepage"][0] {
      countdownEvent->{
        title,
        description,
        date,
        slug
      }
    }
  `;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });

  // If a countdown event is selected in the homepage settings, use it
  if (data?.countdownEvent) {
    return data.countdownEvent;
  }

  // Fallback: Get the next upcoming event
  const fallbackQuery = `*[_type == "event" && status == "upcoming"] | order(date asc)[0] {
    title,
    description,
    date,
    slug
  }`;
  return await client.fetch(fallbackQuery, {}, { next: { revalidate: 60 } });
}

export default async function Home() {
  const event = await getCountdownEvent();

  return (
    <main className="min-h-screen">
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
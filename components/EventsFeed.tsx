"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import { Calendar, ArrowRight } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  year: string;
  date: string;
  image: any;
  description: string;
}

export default function EventsFeed({ events }: { events: Event[] }) {
  const [selectedYear, setSelectedYear] = useState("All");

  // Get unique years
  const years = ["All", ...Array.from(new Set(events.map((e) => e.year))).sort().reverse()];

  // Filter based on selection
  const filteredEvents = selectedYear === "All" 
    ? events 
    : events.filter((e) => e.year === selectedYear);

  return (
    <div className="w-full">
      {/* Filter Buttons - Minimal */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year || "All")}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              selectedYear === (year || "All")
                ? "bg-navy-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-navy-500"
            }`}
          >
            {year || "All Years"}
          </button>
        ))}
      </div>

      {/* Events Grid - Clean Layout */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div 
            key={event._id} 
            className="card group overflow-hidden p-0"
          >
            {/* Event Image */}
            <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
              {event.image ? (
                <Image
                  src={urlFor(event.image).url()}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300">
                  <Calendar className="w-16 h-16" />
                </div>
              )}
              
              {/* Year Badge - Minimal */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-navy-500 font-medium text-sm rounded-md shadow-sm">
                {event.year}
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {event.title}
              </h3>

              {/* Description */}
              {event.description && (
                <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4 text-sm">
                  {event.description}
                </p>
              )}
              
              {/* Action Link */}
              {event.slug?.current ? (
                <Link
                  href={`/events/${event.slug.current}`}
                  className="inline-flex items-center gap-2 text-navy-500 font-medium hover:text-navy-700 transition-colors text-sm group/link"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              ) : (
                <span className="text-gray-400 text-sm">
                  Details coming soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No events found for {selectedYear}.</p>
          <button
            onClick={() => setSelectedYear("All")}
            className="btn-secondary"
          >
            View All Events
          </button>
        </div>
      )}
    </div>
  );
}
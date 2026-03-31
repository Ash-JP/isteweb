"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import { ChevronLeft, ChevronRight, Calendar, ExternalLink } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  year: string;
  date: string;
  image: any;
  description: string;
}

export default function EventsCarousel({ events }: { events: Event[] }) {
  const [selectedYear, setSelectedYear] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);

  const years = ["All", ...Array.from(new Set(events.map((e) => e.year))).sort().reverse()];
  const filteredEvents = selectedYear === "All" ? events : events.filter((e) => e.year === selectedYear);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedYear]);

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-20">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No events found for {selectedYear}.</p>
      </div>
    );
  }

  const currentEvent = filteredEvents[currentIndex];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Year Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12" style={{ width: '100%' }}>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year || "All")}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              selectedYear === (year || "All")
                ? "bg-navy-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-300 hover:bg-gray-50"
            }`}
          >
            {year || "Unknown Year"}
          </button>
        ))}
      </div>

      {/* CAROUSEL - ABSOLUTELY CENTERED */}
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        margin: '0 auto',
        position: 'relative',
        padding: '2rem 0'
      }}>
        
        {/* Previous Button */}
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          style={{
            position: 'absolute',
            left: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20
          }}
          className={`p-4 rounded-full bg-white shadow-lg border-2 border-sky-200 transition-all duration-300 ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-50 hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-navy-500" />
        </button>

        {/* EVENT CARD - CENTERED */}
        <div className="card overflow-hidden shadow-2xl border-2 border-sky-300 hover:scale-105 transition-all duration-500">
          
          {/* Image */}
          <div className="relative h-72 w-full bg-gradient-to-br from-navy-100 to-sky-100 overflow-hidden group">
            {currentEvent.image ? (
              <Image
                src={urlFor(currentEvent.image).url()}
                alt={currentEvent.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Calendar className="w-16 h-16" />
              </div>
            )}
            
            {/* Year Badge */}
            <div className="absolute top-4 right-4 px-4 py-2 bg-gold-500 text-navy-500 font-bold rounded-full shadow-lg border-2 border-white">
              {currentEvent.year}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              {currentEvent.slug?.current && (
                <Link
                  href={`/events/${currentEvent.slug.current}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy-500 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                >
                  View Details
                  <ExternalLink className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Calendar className="w-5 h-5 text-sky-500" />
              <span className="font-medium">
                {new Date(currentEvent.date).toLocaleDateString('en-US', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </span>
            </div>

            <h3 className="text-3xl font-display font-bold text-navy-500 mb-4">
              {currentEvent.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              {currentEvent.description || "Join us for an exciting technical event."}
            </p>

            {currentEvent.slug?.current && (
              <Link
                href={`/events/${currentEvent.slug.current}`}
                className="inline-flex items-center gap-2 text-sky-600 font-semibold text-lg hover:text-navy-500 transition-colors group/link"
              >
                <span>Learn More</span>
                <svg className="w-6 h-6 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentIndex(prev => Math.min(filteredEvents.length - 1, prev + 1))}
          disabled={currentIndex === filteredEvents.length - 1}
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20
          }}
          className={`p-4 rounded-full bg-white shadow-lg border-2 border-sky-200 transition-all duration-300 ${
            currentIndex === filteredEvents.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sky-50 hover:scale-110'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-navy-500" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {filteredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-navy-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-4">
        <p className="text-gray-600 font-medium text-lg">
          Event <span className="text-navy-500 font-bold">{currentIndex + 1}</span> of <span className="text-navy-500 font-bold">{filteredEvents.length}</span>
        </p>
      </div>
    </div>
  );
}
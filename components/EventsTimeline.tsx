"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Calendar, ArrowUpRight } from "lucide-react";

interface Event {
    _id: string;
    title: string;
    date: string;
    image: any;
    description: string;
    status: string;
}

export default function EventsTimeline({ events }: { events: Event[] }) {
    // Sort events by date descending
    const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="w-full py-20 overflow-x-auto overflow-y-hidden no-scrollbar">
            <div className="min-w-[1200px] px-10 flex items-center justify-center gap-4 h-[500px]">

                {sortedEvents.map((event) => {
                    const isHovered = hoveredId === event._id;

                    return (
                        <motion.div
                            key={event._id}
                            layout
                            className={`relative h-[450px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 ease-out group ${isHovered ? 'flex-[4] shadow-[0_0_50px_rgba(14,165,233,0.3)] border-sky-500/50' : 'flex-[1] opacity-70 hover:opacity-100 bg-white/5'}`}
                            onMouseEnter={() => setHoveredId(event._id)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ borderRadius: "1.5rem" }}
                        >
                            {/* Background Image */}
                            {event.image && (
                                <Image
                                    src={urlFor(event.image).url()}
                                    alt={event.title}
                                    fill
                                    className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-100 blur-0' : 'scale-150 blur-sm grayscale'}`}
                                />
                            )}

                            {/* Dark Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />

                            {/* Content Wrapper */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">

                                {/* Collapsed State: Vertical Text */}
                                {!isHovered && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-2xl font-bold text-white/50 -rotate-90 whitespace-nowrap tracking-widest uppercase origin-center">
                                            {event.title.length > 20 ? event.title.substring(0, 20) + '...' : event.title}
                                        </h3>
                                    </div>
                                )}

                                {/* Expanded State: Full Details */}
                                <div className={`relative z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${event.status === 'upcoming' ? 'bg-sky-500 text-white' : 'bg-white/10 text-gray-300'}`}>
                                            {event.status}
                                        </span>
                                        <div className="flex items-center gap-1 text-sky-400 text-xs font-medium">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2 leading-none">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {event.description}
                                    </p>

                                    <button className="flex items-center gap-2 text-white font-medium group/btn">
                                        View Details
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-sky-500 transition-colors">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </button>
                                </div>

                                {/* Date on Collapsed Bottom */}
                                {!isHovered && (
                                    <div className="absolute bottom-6 left-0 w-full text-center">
                                        <div className="text-white/40 font-mono text-sm rotate-0">
                                            {new Date(event.date).getFullYear()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

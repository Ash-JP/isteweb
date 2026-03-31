"use client";

import { useState, useRef } from "react";
import EventNode from "./EventNode";
import TimelineModal from "./TimelineModal";

interface CurvedTimelineProps {
    events: any[];
}

export default function CurvedTimeline({ events }: CurvedTimelineProps) {
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const eventsByYear = events.reduce((acc: any, event: any) => {
        const year = event.year || new Date(event.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(event);
        return acc;
    }, {});

    const sortedYears = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));
    const allEventsFlat = sortedYears.flatMap(year =>
        eventsByYear[year].map((e: any) => ({ ...e, year }))
    );

    // SVG Logic for Horizontal Sine Wave
    const eventWidth = 360;
    const totalWidth = allEventsFlat.length * eventWidth;
    const svgHeight = 600;
    const centerY = svgHeight / 2;
    const amplitude = 150;

    return (
        <div className="relative w-full min-h-screen bg-[#020617] overflow-hidden">
            {/* Modal for Event Details */}
            <TimelineModal
                event={selectedEvent}
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />

            {/* MOBILE VIEW: Vertical Stack */}
            <div className="md:hidden py-12 px-4 space-y-16">
                {sortedYears.map((year) => (
                    <div key={year} className="relative">
                        <div className="sticky top-20 z-10 flex justify-center mb-8">
                            <span className="px-4 py-1 bg-sky-500/20 text-sky-400 rounded-full text-sm font-bold backdrop-blur-md border border-sky-500/30">
                                {year}
                            </span>
                        </div>
                        <div className="space-y-6">
                            {eventsByYear[year].map((event: any, index: number) => (
                                <div key={event._id} className="relative pl-8 border-l-2 border-white/10 ml-4 pb-8 last:pb-0 last:border-0">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-sky-500"></div>
                                    <div onClick={() => setSelectedEvent(event)}>
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                            <h3 className="font-bold text-white mb-1">{event.title}</h3>
                                            <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


            {/* DESKTOP VIEW: Horizontal Scroll with Curved Line */}
            <div className="hidden md:flex relative h-[80vh] w-full items-center">
                {/* Scroll Container */}
                <div
                    ref={scrollRef}
                    className="absolute inset-0 overflow-x-auto custom-scrollbar flex items-center"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    <div
                        className="relative"
                        style={{
                            width: `${totalWidth + 600}px`,
                            height: `${svgHeight}px`,
                            paddingLeft: '50px',
                            paddingRight: '50px'
                        }}
                    >
                        {/* SVG SINE WAVE PATH */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <svg
                                className="w-full h-full overflow-visible"
                                viewBox={`0 0 ${totalWidth + 600} ${svgHeight}`}
                            >
                                <defs>
                                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                                        <stop offset="20%" stopColor="#0ea5e9" stopOpacity="1" />
                                        <stop offset="80%" stopColor="#8b5cf6" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                <path
                                    d={`
                                        M 0 ${centerY}
                                        ${allEventsFlat.map((_, i) => {
                                        const width = eventWidth;
                                        const x = 50 + (i * width);
                                        // Sine wave approximation:
                                        // Start: (x, centerY)
                                        // Control Point: peak
                                        // End: (x + width, centerY)

                                        // Actually connection logic:
                                        // M x centerY
                                        // Q (x + w/2) (centerY + dir * amp) (x + w) centerY

                                        // Let's build a continuous path string.
                                        // First segment: Line to first node start?

                                        const isEven = i % 2 === 0;
                                        const dir = isEven ? 1 : -1; // Even = Bottom = +y

                                        return `Q ${x + width / 2} ${centerY + (dir * amplitude)} ${x + width} ${centerY}`;
                                    }).join(' ')}
                                        L ${totalWidth + 600} ${centerY}
                                    `}
                                    fill="none"
                                    stroke="url(#line-gradient)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                />

                                {/* Dotted lines connecting to nodes (Visual Guide) */}
                                {allEventsFlat.map((_, i) => {
                                    const width = eventWidth;
                                    // Center of the wave segment is x + width/2
                                    const xCenter = 50 + (i * width) + (width / 2);
                                    const isEven = i % 2 === 0;

                                    // Node Y pos approx: centerY +/- amplitude
                                    // But the node is placed at CSS top/bottom which is relative to the parent div.
                                    // Parent div is h-[600px].
                                    // EventNode CSS:
                                    // Top Node (Odd): bottom-[50%] -> it sits above center.
                                    // Bottom Node (Even): top-[50%] -> it sits below center.

                                    // Let's draw a vertical line from CenterY to the Node anchor
                                    const yStart = centerY;
                                    const yEnd = isEven ? centerY + amplitude : centerY - amplitude;

                                    return (
                                        <g key={i}>
                                            <circle cx={xCenter} cy={yStart} r="4" fill="#0ea5e9" />
                                            <line
                                                x1={xCenter} y1={yStart}
                                                x2={xCenter} y2={yEnd}
                                                stroke="#0ea5e9"
                                                strokeWidth="1"
                                                strokeDasharray="4 4"
                                                className="opacity-50"
                                            />
                                        </g>
                                    );
                                })}

                            </svg>
                        </div>

                        {/* Events Nodes */}
                        <div className="relative w-full h-full">
                            {allEventsFlat.map((event, index) => {
                                const isEven = index % 2 === 0;
                                // Even index -> Bottom Node (curve goes down?)
                                // Let's match line logic: i even -> curve went +dir (down in svg coords) -> Node at Bottom

                                return (
                                    <div
                                        key={event._id}
                                        className="absolute top-0 h-full flex items-center justify-center p-0"
                                        style={{
                                            left: `${50 + (index * eventWidth) + (eventWidth / 2)}px`,
                                            width: '0px', // wrapper shouldn't take space, purely for positioning
                                            overflow: 'visible'
                                        }}
                                    >
                                        <div className="relative w-0 h-full">
                                            {/* Year Marker */}
                                            {(index === 0 || allEventsFlat[index - 1].year !== event.year) && (
                                                <div className="absolute top-[calc(50%-15px)] -left-12 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 backdrop-blur-md whitespace-nowrap z-20">
                                                    {event.year}
                                                </div>
                                            )}

                                            <EventNode
                                                event={event}
                                                position={isEven ? "bottom" : "top"}
                                                index={index}
                                                onClick={() => setSelectedEvent(event)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

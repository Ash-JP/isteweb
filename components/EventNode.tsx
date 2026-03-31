"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

interface EventNodeProps {
    event: any;
    position: "left" | "right" | "top" | "bottom";
    onClick: () => void;
    index: number;
}

export default function EventNode({ event, position, onClick, index }: EventNodeProps) {
    // Determine positioning classes based on 'position' prop
    const positionClasses = {
        left: "absolute top-1/2 -translate-y-1/2 right-[calc(50%+40px)] w-[40%]",
        right: "absolute top-1/2 -translate-y-1/2 left-[calc(50%+40px)] w-[40%]",
        top: "absolute left-1/2 -translate-x-1/2 bottom-[calc(50%+40px)] w-[300px]",
        bottom: "absolute left-1/2 -translate-x-1/2 top-[calc(50%+40px)] w-[300px]",
    }[position];

    // Determine initial animation state
    const initialAnimation = {
        left: { opacity: 0, x: 50 },
        right: { opacity: 0, x: -50 },
        top: { opacity: 0, y: 50 },
        bottom: { opacity: 0, y: -50 },
    }[position];

    // Connector line positioning
    const connectorClasses = {
        left: "-right-10 w-10 top-1/2 -translate-y-1/2 h-[2px]",
        right: "-left-10 w-10 top-1/2 -translate-y-1/2 h-[2px]",
        top: "left-1/2 -translate-x-1/2 -bottom-10 h-10 w-[2px]",
        bottom: "left-1/2 -translate-x-1/2 -top-10 h-10 w-[2px]",
    }[position];

    const dotClasses = {
        left: "right-0 top-1/2 -translate-y-1/2",
        right: "left-0 top-1/2 -translate-y-1/2",
        top: "bottom-0 left-1/2 -translate-x-1/2",
        bottom: "top-0 left-1/2 -translate-x-1/2",
    }[position];

    return (
        <motion.div
            initial={{ scale: 0.8, ...initialAnimation }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${positionClasses} group cursor-pointer z-10`}
            onClick={onClick}
        >
            <div className={`relative bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/5 hover:border-sky-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(14,165,233,0.1)] group-hover:border-sky-500/50`}>

                {/* Connecting Line to Center */}
                <div className={`absolute bg-sky-500/30 group-hover:bg-sky-500/50 transition-colors ${connectorClasses}`}>
                    <div className={`absolute w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)] ${dotClasses}`}></div>
                </div>

                <div className="flex gap-4 items-center">
                    {/* Square Image Thumbnail */}
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-white/10 group-hover:border-sky-500/30 transition-colors">
                        {event.image ? (
                            <Image
                                src={urlFor(event.image).url()}
                                alt={event.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-sky-500/10 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-sky-400" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Date Badge */}
                        <div className="inline-flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${event.status === 'upcoming'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : event.status === 'ongoing'
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-white/5 text-gray-400 border border-white/10'
                                }`}>
                                {event.status}
                            </span>
                        </div>

                        <h3 className="text-sm font-bold text-white truncate group-hover:text-sky-400 transition-colors">
                            {event.title}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-gray-300 mt-1">
                            <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

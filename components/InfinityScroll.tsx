"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Linkedin, Instagram, Mail, Github } from "lucide-react";

interface Member {
    _id: string;
    name: string;
    role: string;
    year: string;
    image: any;
    linkedin?: string;
    instagram?: string;
    email?: string;
    github?: string;
}

const CARD_HEIGHT = 200; // Increased height for larger cards
const VISIBLE_CARDS = 5;
const GAP = 20;

export default function InfinityScroll({ members }: { members: Member[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragY = useMotionValue(0);

    // If few members, duplicate them to create loop illusion (or just list them if very few)
    // For true infinity, we'd need a more complex virtualizer. 
    // Let's implement a "Rolodex" style where you drag and it snaps.

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.y > threshold) {
            setActiveIndex((prev) => Math.max(0, prev - 1));
        } else if (info.offset.y < -threshold) {
            setActiveIndex((prev) => Math.min(members.length - 1, prev + 1));
        }
    };

    // Format role
    const formatRole = (role: string) => role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden perspective-1000">
            {/* Gradient overlays for focus */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-20 pointer-events-none" />

            <div className="relative w-full max-w-2xl h-full flex flex-col items-center justify-center">
                {members.map((member, index) => {
                    // Calculate distance from active index
                    const offset = index - activeIndex;
                    const isActive = index === activeIndex;

                    // Only render if within visible range (optimization)
                    if (Math.abs(offset) > VISIBLE_CARDS) return null;

                    return (
                        <motion.div
                            key={member._id}
                            className="absolute w-full md:w-[600px] h-[220px] rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl origin-center"
                            initial={false}
                            animate={{
                                y: offset * 240, // Vertical spacing
                                scale: 1 - Math.abs(offset) * 0.1, // Scale down further away
                                opacity: 1 - Math.abs(offset) * 0.3, // Fade out
                                zIndex: 100 - Math.abs(offset),
                                rotateX: offset * -10, // 3D rotation effect
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            // Drag handlers on the container or individual cards? 
                            // Container is better for "Scroll" feel.
                            // For now, let's use buttons or scroll wheel on container.
                            // Actually, let's make the cards clickable to select.
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Card Content - Identical to "Large Rectangle" but adapted */}
                            <div className="relative h-full flex items-center p-6 gap-6">
                                {/* Glow */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-sky-500/10 animate-pulse pointer-events-none" />
                                )}

                                {/* Image */}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-white/5 overflow-hidden shadow-inner">
                                    {member.image ? (
                                        <Image src={urlFor(member.image).url()} alt={member.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-700" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="inline-block px-3 py-1 mb-2 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
                                        {formatRole(member.role)}
                                    </div>
                                    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2 truncate ${isActive ? 'text-sky-300' : ''}`}>
                                        {member.name}
                                    </h3>

                                    {/* Socials (Only clickable if active to prevent misclicks) */}
                                    <div className={`flex gap-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        {member.linkedin && <a href={member.linkedin} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-white text-gray-400"><Linkedin size={18} /></a>}
                                        {member.github && <a href={member.github} target="_blank" className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-white text-gray-400"><Github size={18} /></a>}
                                        {member.email && <a href={`mailto:${member.email}`} className="p-2 bg-white/5 rounded-full hover:bg-white/20 hover:text-white text-gray-400"><Mail size={18} /></a>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Controls */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                <button
                    onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                    className="p-3 rounded-full bg-white/10 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white/10"
                    disabled={activeIndex === 0}
                >
                    ▲
                </button>
                <div className="w-1 h-32 bg-white/10 rounded-full mx-auto relative">
                    <motion.div
                        className="absolute top-0 left-0 right-0 bg-sky-500 rounded-full w-full"
                        animate={{
                            height: `${(1 / members.length) * 100}%`,
                            top: `${(activeIndex / (members.length - 1)) * 100}%`
                        }}
                    />
                </div>
                <button
                    onClick={() => setActiveIndex(Math.min(members.length - 1, activeIndex + 1))}
                    className="p-3 rounded-full bg-white/10 hover:bg-sky-500 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white/10"
                    disabled={activeIndex === members.length - 1}
                >
                    ▼
                </button>
            </div>
        </div>
    );
}

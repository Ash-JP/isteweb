"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, PanInfo, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Linkedin, Instagram, Mail, Github, ChevronLeft, ChevronRight } from "lucide-react";

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

const CARD_WIDTH = 300;
const GAP = 25;

export default function HorizontalCarousel({ members }: { members: Member[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Physics-based rotation
    const rotation = useSpring(0, { stiffness: 120, damping: 20 });

    // Calculate radius
    const radius = Math.max(CARD_WIDTH * 1.8, (members.length * (CARD_WIDTH + GAP)) / (2 * Math.PI));

    // Calculate total rotation needed per index
    const theta = 360 / Math.max(members.length, 1);

    useEffect(() => {
        rotation.set(-activeIndex * theta);
    }, [activeIndex, theta, rotation]);

    // Auto-play
    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % members.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isHovering, members.length]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
        } else if (info.offset.x < -swipeThreshold) {
            setActiveIndex((prev) => (prev + 1) % members.length);
        }
    };

    const formatRole = (role: string) => role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div
            className="relative w-full h-[650px] flex items-center justify-center overflow-hidden perspective-[1200px]"
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Navigation Buttons */}
            <button
                className="absolute left-4 md:left-12 z-50 w-12 h-12 rounded-full bg-white text-gray-900 shadow-lg flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 group"
                onClick={() => setActiveIndex((prev) => (prev - 1 + members.length) % members.length)}
            >
                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
                className="absolute right-4 md:right-12 z-50 w-12 h-12 rounded-full bg-white text-gray-900 shadow-lg flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 group"
                onClick={() => setActiveIndex((prev) => (prev + 1) % members.length)}
            >
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* 3D Turntable Container */}
            <motion.div
                className="preserve-3d relative w-full h-full flex items-center justify-center"
                style={{
                    rotateY: rotation,
                    z: -radius,
                    transformStyle: "preserve-3d"
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
            >
                {members.map((member, index) => {
                    const angle = index * theta;
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={member._id}
                            className="absolute flex items-center justify-center"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                width: CARD_WIDTH,
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* 3D Card - Light Theme */}
                            <div
                                className={`relative w-full bg-white/95 backdrop-blur-md rounded-[1.5rem] overflow-hidden transition-all duration-500 ${isActive ? 'shadow-[0_0_60px_rgba(255,255,255,0.4)] scale-110 z-50 ring-4 ring-sky-400' : 'opacity-60 scale-90 z-0 grayscale-[0.3]'}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Card Interior */}
                                <div className="relative p-4 flex flex-col items-center h-[520px]">

                                    {/* Large Rectangular Image */}
                                    <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden shadow-md bg-gray-100">
                                        {member.image ? (
                                            <Image src={urlFor(member.image).url()} alt={member.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300 font-bold">{member.name.charAt(0)}</div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="text-center w-full relative z-10 flex-1 flex flex-col">
                                        <div className="inline-block px-3 py-1 mb-2 rounded-full bg-sky-50 text-sky-600 text-[11px] font-bold uppercase tracking-wider mx-auto">
                                            {formatRole(member.role)}
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
                                            {member.name}
                                        </h3>

                                        {/* Stats / Info */}
                                        <div className="flex justify-center gap-2 mb-4 w-full text-[10px] text-gray-500 mt-2">
                                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-1 text-center">
                                                <div className="text-gray-900 font-bold text-sm">{member.year}</div>
                                                <div>Year</div>
                                            </div>
                                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-1 text-center">
                                                <div className="text-gray-900 font-bold text-sm">ISTE</div>
                                                <div>Club</div>
                                            </div>
                                        </div>

                                        {/* Socials */}
                                        <div className="mt-auto flex justify-center gap-3">
                                            {member.linkedin ? <SocialBtn href={member.linkedin} icon={Linkedin} active={isActive} /> : null}
                                            {member.github ? <SocialBtn href={member.github} icon={Github} active={isActive} /> : null}
                                            {member.instagram ? <SocialBtn href={member.instagram} icon={Instagram} active={isActive} /> : null}
                                            {member.email ? <SocialBtn href={`mailto:${member.email}`} icon={Mail} active={isActive} /> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}

const SocialBtn = ({ href, icon: Icon, active }: any) => {
    const isMail = href.startsWith('mailto:');
    return (
        <a
            href={href}
            target={isMail ? "_self" : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            className={`p-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-gray-900 text-white shadow-lg hover:scale-110 hover:bg-sky-500' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-900'}`}
        >
            <Icon size={18} />
        </a>
    );
}

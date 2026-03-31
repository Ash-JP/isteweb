"use client";

import { motion } from "framer-motion";
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

export default function TeamTree({ members }: { members: Member[] }) {
    // Filter for Core Committee (2024-25 by default or passed prop? assuming current year for now or handling filter inside)
    // Actually, page.tsx filters by year usually, but TeamGrid did it internally.
    // Let's assume we pass ALL members and this component does the filtering for the "Current" core team.
    // Or better, let's keep it consistent with TeamGrid and accept filtered members or do the filtering here.
    // The user wants a specific "Tree" for the core team.

    const currentYear = "2024-25";
    const coreRoles = ["chairperson", "vice-chairperson", "secretary", "treasurer", "tech-head"];

    const coreMembers = members.filter(
        (m) => m.year === currentYear && coreRoles.includes(m.role.toLowerCase())
    );

    const getMemberByRole = (role: string) => coreMembers.find((m) => m.role.toLowerCase() === role);

    const chairperson = getMemberByRole("chairperson");
    const viceChair = getMemberByRole("vice-chairperson");
    const secretary = getMemberByRole("secretary");
    const treasurer = getMemberByRole("treasurer");
    // Tech head might be multiple or single, usually single in core
    const techHead = getMemberByRole("tech-head");

    if (!chairperson) return null; // Minimal requirement

    const Card = ({ member, color = "sky" }: { member: Member | undefined; color?: string }) => {
        if (!member) return <div className="w-48 h-16 opacity-0" />; // Spacer

        const colorStyles = {
            sky: "border-sky-500/30 text-sky-400 shadow-sky-500/20",
            purple: "border-purple-500/30 text-purple-400 shadow-purple-500/20",
            blue: "border-blue-500/30 text-blue-400 shadow-blue-500/20",
            gold: "border-gold-500/30 text-gold-400 shadow-gold-500/20",
        }[color] || "border-sky-500/30 text-sky-400";

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative w-64 p-4 rounded-2xl bg-gray-900/40 backdrop-blur-md border ${colorStyles.split(" ")[0]} shadow-lg transition-all duration-300 z-10 flex items-center gap-4`}
            >
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                    {member.image ? (
                        <Image
                            src={urlFor(member.image).url()}
                            alt={member.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${colorStyles.split(" ")[1]}`}>
                        {member.role.replace("-", " ")}
                    </div>
                    <div className="text-white font-bold truncate">{member.name}</div>
                    <div className="flex gap-2 mt-2">
                        {member.linkedin && <a href={member.linkedin} target="_blank" className="text-gray-400 hover:text-white"><Linkedin size={14} /></a>}
                        {member.github && <a href={member.github} target="_blank" className="text-gray-400 hover:text-white"><Github size={14} /></a>}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="w-full py-20 relative flex flex-col items-center gap-12 max-w-5xl mx-auto">
            {/* Background Circuit/Tree Lines */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                <svg className="w-full h-full" style={{ minHeight: '600px' }}>
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.5)" />
                            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                        </linearGradient>
                    </defs>

                    {/* Chair to Vice */}
                    <motion.path
                        d="M50% 80 V 160" // Relative to container, adjusted strictly via CSS or explicit coords if needed. Using fixed pixel gaps for safety.
                        className="stroke-sky-500/30 stroke-2"
                        fill="none"
                    />
                </svg>
                {/* Note: SVG connectors are tricky with flexible layouts. 
                 Using simple CSS borders/pseudo-elements might be more robust for the "Branch" look 
                 unless we strictly position elements. 
                 Let's stick to a Flexbox layout and draw connectors using absolute div lines for simplicity and responsiveness.
             */}
            </div>

            {/* Level 1: Chairperson */}
            <div className="relative group">
                <Card member={chairperson} color="gold" />

                {/* Connector Down */}
                <motion.div
                    initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 1, delay: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 bg-gradient-to-b from-gold-500/50 to-sky-500/50"
                />
            </div>

            {/* Level 2: Vice Chair */}
            <div className="relative">
                <Card member={viceChair} color="blue" />

                {/* Connector Down to Split */}
                <motion.div
                    initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 1, delay: 0.8 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 bg-sky-500/30"
                />
                {/* Horizontal Split Bar */}
                <motion.div
                    initial={{ width: 0 }} whileInView={{ width: '320px' }} transition={{ duration: 1, delay: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+48px)] h-0.5 bg-sky-500/30"
                />
            </div>

            {/* Level 3: Sec & Treas */}
            <div className="relative flex gap-12 md:gap-32 pt-12">
                {/* Vertical Lines from Split Bar */}
                <motion.div
                    initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 0.5, delay: 1.5 }}
                    className="absolute left-[calc(50%-160px)] -top-0 w-0.5 bg-sky-500/30"
                />
                <motion.div
                    initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 0.5, delay: 1.5 }}
                    className="absolute right-[calc(50%-160px)] -top-0 w-0.5 bg-sky-500/30"
                />

                <Card member={secretary} color="purple" />
                <Card member={treasurer} color="purple" />
            </div>

            {/* Level 4: Tech Head */}
            {techHead && (
                <div className="relative mt-4">
                    {/* Connector from center of Sec/Treas row? Or independent? 
                    Usually Tech Head is distinct. Let's hang them from the center again or a separate branch.
                    Let's put Tech Head below the Sec/Treas row, centered, connected to the Vice Chair line effectively.
                */}
                    <motion.div
                        initial={{ height: 0 }} whileInView={{ height: 110 }} transition={{ duration: 1, delay: 1.8 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full w-0.5 bg-gradient-to-b from-transparent via-sky-500/30 to-sky-500/30"
                    />
                    <Card member={techHead} color="sky" />
                </div>
            )}
        </div>
    );
}

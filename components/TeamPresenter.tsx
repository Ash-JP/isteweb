"use client";

import { useState, useMemo } from "react";
import HorizontalCarousel from "./HorizontalCarousel";
import Link from "next/link";
import MentorsSection from "./MentorsSection";
// User said "group it like leadership then others".
// The 'mainTeam' array is already sorted by hierarchy.
// Using HorizontalCarousel for the main team will show them in that order.

interface Member {
    _id: string;
    name: string;
    role: string;
    year: string;
    cloudinaryUrl?: string | null;
    customRole?: string | null;
    linkedin?: string;
    instagram?: string;
    email?: string;
    github?: string;
}

export default function TeamPresenter({ members }: { members: Member[] }) {
    // 1. Get Unique Years
    const years = useMemo(() => Array.from(new Set(members.map(m => m.year))).sort().reverse(), [members]);
    const [selectedYear, setSelectedYear] = useState(years[0] || "2024-25");

    // 2. Filter by Year
    const currentYearMembers = useMemo(() => members.filter(m => m.year === selectedYear), [members, selectedYear]);

    // 3. Separate Mentors & Advisors
    const advisors = currentYearMembers.filter(m => ["faculty-advisor", "mentor"].includes(m.role.toLowerCase()));

    // 4. Hierarchical Sort for the Main Loop
    const hierarchyOrder = [
        "chairperson", "vice-chairperson",
        "secretary", "vice-secretary", "joint-secretary", "treasurer",
        "tech-lead", "media-lead", "design-lead", "event-coordinator",
        "content-writer", "documentation-team", "membership-developer", "community-rep",
        "volunteer", "member"
    ];

    const mainTeam = currentYearMembers
        .filter(m => !["faculty-advisor", "mentor"].includes(m.role.toLowerCase()))
        .sort((a, b) => {
            const indexA = hierarchyOrder.indexOf(a.role.toLowerCase());
            const indexB = hierarchyOrder.indexOf(b.role.toLowerCase());
            // If role not found, put it at the end
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        });

    return (
        <div className="w-full">
            {/* Year Filter */}
            <div className="flex justify-center mb-16 z-50 relative">
                <div className="relative inline-block">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="appearance-none bg-black/40 border border-white/10 text-white px-8 py-3 rounded-full font-medium focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300 cursor-pointer shadow-lg shadow-black/50 hover:bg-white/5 pr-12"
                    >
                        {years.map((year) => (
                            <option key={year} value={year} className="bg-gray-900 text-white">
                                {year}
                            </option>
                        ))}
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Mentors Section (Distinct) */}
            {advisors.length > 0 && <MentorsSection members={advisors} />}

            {/* Main Team Infinity Loop */}
            <div className="animate-fade-in-up delay-100">
                <h2 className="text-2xl font-bold text-white text-center mb-4 uppercase tracking-widest mt-20">
                    The Team
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent mb-12" />

                {mainTeam.length > 0 ? (
                    <HorizontalCarousel members={mainTeam} />
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No members found for this year.
                    </div>
                )}
            </div>
        </div>
    );
}

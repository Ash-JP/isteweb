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
    image: any;
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
        "secretary", "joint-secretary", "treasurer",
        "tech-lead", "design-lead", "media-lead", "event-coordinator",
        "content-writer", "documentation-team", "community-rep", "membership-developer",
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
            <div className="flex justify-center flex-wrap gap-4 mb-16 z-50 relative">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border ${selectedYear === year
                            ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/25 scale-105"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {year}
                    </button>
                ))}
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

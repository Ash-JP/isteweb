"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HorizontalCarousel from "./HorizontalCarousel";
import Link from "next/link";
import MentorsSection from "./MentorsSection";
// User said "group it like leadership then others".
// The 'mainTeam' array is already sorted by hierarchy.
// Using HorizontalCarousel for the main team will show them in that order.

interface Member {
    _id: string;
    slug?: string;
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

import { hierarchyOrder } from "@/lib/constants";

export default function TeamPresenter({ members }: { members: Member[] }) {
    const searchParams = useSearchParams();
    const targetId = searchParams.get("id");

    // 1. Get Unique Years
    const years = useMemo(() => Array.from(new Set(members.map(m => m.year))).sort().reverse(), [members]);
    const [selectedYear, setSelectedYear] = useState(years[0] || "2024-25");

    // Find target member in ALL members list if query param 'id' exists
    const targetMember = useMemo(() => {
        if (!targetId) return null;
        const normalized = targetId.toLowerCase();
        return members.find(m => 
            (m._id && m._id.toLowerCase() === normalized) || 
            (m.slug && m.slug.toLowerCase() === normalized)
        );
    }, [members, targetId]);

    // Auto-switch selected year if target member belongs to a different year
    useEffect(() => {
        if (targetMember && targetMember.year && targetMember.year !== selectedYear) {
            setSelectedYear(targetMember.year);
        }
    }, [targetMember, selectedYear]);

    const targetSlug = targetMember ? (targetMember.slug || targetMember._id) : null;

    // 2. Filter by Year
    const currentYearMembers = useMemo(() => members.filter(m => m.year === selectedYear), [members, selectedYear]);

    // 3. Separate Mentors & Advisors
    const advisors = currentYearMembers.filter(m => ["faculty-advisor", "mentor"].includes(m.role.toLowerCase()));

    // 4. Hierarchical Sort for the Main Loop

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
            <div className="flex justify-center mb-4 z-50 relative mt-0">
                <div className="relative inline-block">
                    <select
                        aria-label="Filter team by academic year"
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
            {advisors.length > 0 && <MentorsSection members={advisors} targetSlug={targetSlug} />}

            {/* Main Team Infinity Loop */}
            <div className="animate-fade-in-up delay-100 relative mt-16 mb-12">
                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Committee</span>
                    </h2>
                </div>

                {mainTeam.length > 0 ? (
                    <HorizontalCarousel members={mainTeam} targetSlug={targetSlug} />
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No members found for this year.
                    </div>
                )}
            </div>
        </div>
    );
}

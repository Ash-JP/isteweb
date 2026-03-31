"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Linkedin, Instagram, Mail } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  year: string;
  image: any;
  linkedin?: string;
  instagram?: string;
  email?: string;
}

export default function TeamFeed({ members }: { members: TeamMember[] }) {
  const [selectedYear, setSelectedYear] = useState("All");

  // Get unique years
  const years = ["All", ...Array.from(new Set(members.map((m) => m.year))).sort().reverse()];

  // Filter based on selection
  const filteredMembers = selectedYear === "All" 
    ? members 
    : members.filter((m) => m.year === selectedYear);

  return (
    <div className="w-full">
      {/* Year Filter - Minimal */}
      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year || "All")}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              selectedYear === (year || "All")
                ? "bg-navy-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-navy-500"
            }`}
          >
            {year || "All Years"}
          </button>
        ))}
      </div>

      {/* Team Grid - Clean Layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMembers.map((member) => (
          <div 
            key={member._id} 
            className="team-card group"
          >
            {/* Member Image */}
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
              {member.image ? (
                <Image
                  src={urlFor(member.image).url()}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}

              {/* Year Badge - Minimal */}
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-navy-500 font-medium text-xs rounded-md shadow-sm">
                {member.year}
              </div>

              {/* Social Icons Overlay - Appears on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div className="flex gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon bg-white/95 hover:bg-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon bg-white/95 hover:bg-white"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="social-icon bg-white/95 hover:bg-white"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div className="p-5">
              {/* Name */}
              <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-gray-600 mb-4">
                {member.role}
              </p>

              {/* Social Links - Always Visible on Mobile */}
              <div className="flex gap-2 lg:hidden">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="social-icon"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">No team members found for {selectedYear}.</p>
          <button
            onClick={() => setSelectedYear("All")}
            className="btn-secondary"
          >
            View All Members
          </button>
        </div>
      )}
    </div>
  );
}
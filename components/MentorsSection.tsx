"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Linkedin, Mail, GraduationCap } from "lucide-react";

interface Member {
    _id: string;
    name: string;
    role: string;
    image: any;
    linkedin?: string;
    email?: string;
}

export default function MentorsSection({ members }: { members: Member[] }) {
    if (members.length === 0) return null;

    return (
        <div className="relative py-32 mb-20">
            {/* Background Ambience */}
            <div className="absolute inset-0 flex justify-center overflow-hidden pointer-events-none">
                <div className="w-[800px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
                    <GraduationCap className="w-4 h-4" />
                    The Council
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                    Mentors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200">Advisors</span>
                </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-16 px-4 max-w-7xl mx-auto relative z-10">
                {members.map((member, index) => (
                    <motion.div
                        key={member._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                        whileHover={{ y: -10 }}
                        className="group relative"
                    >
                        {/* Holographic Base */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                        <div className="relative w-[300px] h-[400px] bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden group-hover:border-yellow-500/30 transition-colors duration-500 flex flex-col items-center p-8">
                            {/* Image Circle with Rotating Rings */}
                            <div className="relative w-40 h-40 mb-8">
                                <div className="absolute inset-0 rounded-full border border-yellow-500/20 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute -inset-2 rounded-full border border-dashed border-yellow-500/20 animate-spin-slow" />

                                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-yellow-500/50 transition-colors shadow-2xl">
                                    {member.image ? (
                                        <Image
                                            src={urlFor(member.image).url()}
                                            alt={member.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl text-yellow-500">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                    {member.name}
                                </h3>
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                                    {member.role.replace("-", " ")}
                                </div>

                                {/* Divider */}
                                <div className="w-12 h-0.5 bg-white/10 mx-auto mb-6 group-hover:w-24 group-hover:bg-yellow-500/50 transition-all duration-500" />

                                {/* Socials */}
                                <div className="flex justify-center gap-4">
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-yellow-500 hover:text-black text-gray-400 transition-all hover:scale-110">
                                            <Linkedin size={18} />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="p-2 rounded-full bg-white/5 hover:bg-yellow-500 hover:text-black text-gray-400 transition-all hover:scale-110">
                                            <Mail size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </div>
    );
}

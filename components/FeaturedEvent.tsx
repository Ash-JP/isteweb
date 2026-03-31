"use client";

import { urlFor } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedEvent({ event }: { event: any }) {
    if (!event) return null;

    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
            {/* Background Image with Parallax-like Overlay */}
            <div className="absolute inset-0 z-0">
                {event.image && (
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={urlFor(event.image).url()}
                            alt={event.title}
                            fill
                            className="object-cover opacity-30 blur-sm"
                        />
                    </motion.div>
                )}
                {/* Modern Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent" />

                {/* Animated Grain/Noise Overlay - CSS Replacement */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                ></div>
            </div>

            <div className="container-centered relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                {/* ... (Keep Text Content same) ... */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                    >
                        <Sparkles className="w-4 h-4 fill-sky-400" />
                        Featured Event
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
                    >
                        {event.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-gray-300 max-w-xl leading-relaxed font-light"
                    >
                        {event.description?.slice(0, 200)}...
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-4 text-gray-300"
                    >
                        {event.date && (
                            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <Calendar className="w-5 h-5 text-sky-400" />
                                <span className="font-medium text-lg">
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <MapPin className="w-5 h-5 text-purple-400" />
                                <span className="font-medium text-lg">{event.location}</span>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-8 flex gap-4"
                    >
                        {event.registrationLink ? (
                            <Link
                                href={event.registrationLink}
                                target="_blank"
                                className="group relative px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-lg overflow-hidden transition-all shadow-lg hover:shadow-sky-500/25 active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Register Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ) : (
                            <button disabled className="px-8 py-4 bg-gray-800 text-gray-400 rounded-xl font-bold text-lg border border-gray-700 cursor-not-allowed opacity-70">
                                Registration Closed
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* Hero Image Card with 3D Float Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="lg:col-span-5 hidden lg:block relative"
                >
                    <div className="relative w-full aspect-[4/5]">
                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500 to-purple-600 rounded-[2rem] opacity-30 blur-2xl animate-pulse-slow"></div>

                        <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-sky-900/20 group hover-3d-card">
                            {event.image && (
                                <Image
                                    src={urlFor(event.image).url()}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}

                            {/* Glass Reflection Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Dark Gradient at bottom for text readability if we wanted text inside */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

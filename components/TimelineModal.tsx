"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import { useEffect } from "react";

interface TimelineModalProps {
    event: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function TimelineModal({ event, isOpen, onClose }: TimelineModalProps) {

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!event) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`event-modal-${event._id}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-3xl bg-[#0B1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-sky-500 rounded-full text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Section — natural aspect ratio, no cropping */}
                        {event.image ? (
                            <div className="w-full bg-black/30 flex items-center justify-center overflow-hidden max-h-[50vh]">
                                <img
                                    src={urlFor(event.image).url()}
                                    alt={event.title}
                                    className="w-full h-auto max-h-[50vh] object-contain"
                                    style={{ display: 'block' }}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                <Calendar className="w-16 h-16 text-gray-600" />
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.status === 'upcoming' ? 'bg-sky-500 text-white' :
                                        event.status === 'ongoing' ? 'bg-green-500 text-white' :
                                            'bg-gray-700 text-gray-300'
                                        }`}>
                                        {event.status}
                                    </span>
                                    {event.year && (
                                        <span className="text-gray-400 text-sm font-mono border border-white/10 px-2 py-0.5 rounded">
                                            {event.year}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    {event.title}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                            <Calendar className="w-5 h-5 text-sky-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                                            <p className="font-medium">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {event.location && (
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                <MapPin className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                                                <p className="font-medium">{event.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-invert prose-lg max-w-none mb-8 text-gray-300">
                                    <p>{event.description}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                                {event.registrationLink ? (
                                    <Link
                                        href={event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 min-w-[200px] btn-primary bg-sky-600 hover:bg-sky-500 text-white px-6 py-4 rounded-xl font-bold text-center shadow-lg hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Register Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <button disabled className="flex-1 min-w-[200px] bg-gray-800 text-gray-500 px-6 py-4 rounded-xl font-bold border border-gray-700 cursor-not-allowed">
                                        Registration Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

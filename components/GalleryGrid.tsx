'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
    _id: string;
    title: string;
    category: string;
    cloudinaryUrl?: string | null;
    date: string | null;
}

interface GalleryGridProps {
    items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];
    const safeItems = Array.isArray(items) ? items : [];

    const filteredItems = filter === 'All'
        ? safeItems
        : safeItems.filter(item => item.category === filter);

    return (
        <main className="relative min-h-screen bg-[#020617] pt-32 pb-20 overflow-hidden">
            {/* BACKGROUND EFFECT: Ambient Photo-Light Leaks */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-sky-500/20 blur-[150px] rounded-full mix-blend-screen"
                />
                <motion.div 
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.05, 0.1, 0.05],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -right-[20%] w-[1000px] h-[1000px] bg-purple-500/20 blur-[150px] rounded-full mix-blend-screen"
                />
                <motion.div 
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
                />
            </div>

            <div className="container-centered relative z-10">

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Capturing moments of innovation, collaboration, and success
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mt-8 rounded-full opacity-50"></div>
                </motion.div>

                {/* Filter Tabs */}
                {safeItems.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                                    relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 overflow-hidden
                                    ${filter === cat ? 'text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}
                                `}
                            >
                                {filter === cat && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Gallery Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
                                key={item._id}
                                className="group relative overflow-hidden rounded-[2rem] bg-gray-900/40 backdrop-blur-sm aspect-[4/3] border border-white/10 hover:border-sky-500/30 transition-colors shadow-xl"
                            >
                                {item.cloudinaryUrl && (
                                    <Image
                                        src={item.cloudinaryUrl}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <motion.span 
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-sky-400 text-xs font-bold uppercase tracking-widest mb-2"
                                    >
                                        {item.category}
                                    </motion.span>
                                    <motion.h3 
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.05 }}
                                        className="text-white text-2xl font-bold"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p 
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-gray-300 text-sm mt-2 font-medium"
                                    >
                                        {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {safeItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No images found in the gallery yet.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

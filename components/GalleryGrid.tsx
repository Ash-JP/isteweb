'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface GalleryItem {
    _id: string;
    title: string;
    category: string;
    image: any;
    date: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

    // Safety check: ensure items is an array
    const safeItems = Array.isArray(items) ? items : [];

    const filteredItems = filter === 'All'
        ? safeItems
        : safeItems.filter(item => item.category === filter);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 via-navy-900 to-gray-900 pt-24 pb-12">
            <div className="container-centered">

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Gallery</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Capturing moments of innovation, collaboration, and success
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Filter Tabs */}
                {safeItems.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                    px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${filter === cat
                                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {filteredItems.map((item) => (
                        <div
                            key={item._id}
                            className="group relative overflow-hidden rounded-2xl bg-gray-800 aspect-[4/3] border border-white/10"
                        >
                            {item.image && (
                                <Image
                                    src={urlFor(item.image).url()}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    {item.category}
                                </span>
                                <h3 className="text-white text-lg font-bold">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm mt-1">
                                    {new Date(item.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

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

'use client';

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section-padding relative"
            style={{
                background: 'linear-gradient(180deg, rgb(17, 24, 39) 0%, rgb(10, 30, 94) 100%)'
            }}
        >
            <div className="container-centered">

                {/* Animated Box Container */}
                <div
                    className={`
            max-w-5xl mx-auto transition-all duration-1000 ease-out
            ${isVisible
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-20'
                        }
          `}
                >
                    {/* Main Box */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl hover:border-sky-500/50 transition-all duration-500">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">ISTE CEAL</span>
                            </h2>
                            <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className="space-y-6 text-center">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                The <strong className="text-sky-400">Indian Society for Technical Education (ISTE)</strong> CEAL Student Chapter is a vibrant community of engineering students dedicated to fostering technical excellence and innovation.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                We provide a platform for students to enhance their technical skills through workshops, competitions, and collaborative projects. Our mission is to bridge the gap between academic learning and industry requirements.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform">500+</div>
                                <div className="text-sm text-gray-400 font-medium">Active Members</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 group-hover:scale-110 transition-transform">50+</div>
                                <div className="text-sm text-gray-400 font-medium">Events Annually</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-500 mb-2 group-hover:scale-110 transition-transform">10+</div>
                                <div className="text-sm text-gray-400 font-medium">Awards Won</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

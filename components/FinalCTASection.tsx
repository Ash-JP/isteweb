'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";

export default function FinalCTASection() {
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
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, rgb(10, 30, 94) 0%, rgb(17, 24, 39) 100%)'
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container-centered relative z-10">
                <div
                    className={`
            max-w-5xl mx-auto transition-all duration-1000 ease-out
            ${isVisible
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-20'
                        }
          `}
                >
                    <div className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-[2.5rem] opacity-30 group-hover:opacity-70 blur-2xl transition-opacity duration-500"></div>

                        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-12 md:p-20 border border-white/10 overflow-hidden text-center">

                            {/* Inner Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                                    <Award className="w-12 h-12 text-purple-400" />
                                </div>

                                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                                    Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Technical Journey</span> Today
                                </h2>

                                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                                    Join a community of innovators, builders, and leaders. Access exclusive workshops, hackathons, and mentorship opportunities.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link
                                        href="/join"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 transition-all"
                                    >
                                        Become a Member
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

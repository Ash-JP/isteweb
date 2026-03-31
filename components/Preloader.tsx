'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check session storage to show only once per session
        const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');

        if (hasSeenPreloader) {
            setLoading(false);
            return;
        }

        // Safety timeout (60s)
        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    // Video state
    const [videoError, setVideoError] = useState(false);
    const [videoFinished, setVideoFinished] = useState(false);

    // If video finishes or errors, we can consider the preloader "done"
    // immediately but with a smooth fade out
    const handleVideoEnd = () => {
        setVideoFinished(true);
        // Start fading out immediately when video ends
        setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 1500); // Wait for the 1.5s transition to finish
    };

    const handleVideoError = () => {
        setVideoError(true);
        // If switching to animation fallback, execute it for 2.5s then close
        setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 2500);
    };

    if (!loading) return null;

    return (
        <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black overflow-hidden transition-opacity duration-[1500ms] ease-in-out ${videoFinished ? 'opacity-0' : 'opacity-100'}`}>

            {/* VIDEO PLAYER - Only shows if no error */}
            {!videoError && (
                <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    onError={handleVideoError}
                    className="absolute inset-0 w-full h-full object-cover z-20"
                >
                    <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
            )}

            {/* FALLBACK / BACKGROUND ANIMATION - Shown if video errors or while video loads */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Logo Container with animations */}
                    <div className="relative mb-8">
                        {/* Spinning Ring */}
                        <div className="absolute -inset-4 border-2 border-dashed border-sky-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

                        {/* Reverse Spinning Ring */}
                        <div className="absolute -inset-8 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                        {/* Logo */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/10 backdrop-blur-md p-4 flex items-center justify-center border border-white/20 shadow-2xl animate-fade-in-up">
                            <Image
                                src="/iste-light.png"
                                alt="ISTE Logo"
                                width={120}
                                height={120}
                                className="object-contain animate-[pulse_2s_ease-in-out_infinite]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <h1 className="text-3xl font-bold text-white tracking-widest animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        ISTE <span className="text-sky-400">CEAL</span>
                    </h1>
                    <p className="text-sky-200/70 text-sm uppercase tracking-[0.2em] mt-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Loading Experience
                    </p>

                    {/* Progress Bar (Only show if video error, otherwise video is the progress) */}
                    {videoError && (
                        <div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-sky-400 to-blue-600 animate-[loading_2.5s_ease-in-out_forwards] w-0"></div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
            @keyframes loading {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
        `}</style>
        </div>
    );
}

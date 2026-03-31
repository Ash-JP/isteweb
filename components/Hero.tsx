'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Users, Sparkles, ChevronDown } from 'lucide-react';

import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      // User wants the video to loop only the last 2 seconds after playing fully once.
      // So when it ends, we seek to (duration - 2) and play again.
      const video = videoRef.current;
      if (video.duration > 2) {
        video.currentTime = video.duration - 2;
        video.play();
      } else {
        // Fallback for very short videos: just loop normal
        video.currentTime = 0;
        video.play();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          // Loop is FALSE because we handle looping manually in onEnded
          loop={false}
          onEnded={handleVideoEnd}
          className="w-full h-full object-contain md:object-cover opacity-60"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/40 to-navy-900/90 z-10"></div>
      </div>

      {/* Main Content Container - Visible immediately */}
      <div className="container-centered relative z-10 w-full animate-fade-in-up">

        {/* Main Content - Compact */}
        <div className="max-w-4xl mx-auto">

          {/* Top Badge - Smaller */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-sky-500/30 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span className="text-sky-300 font-medium text-[10px] md:text-xs tracking-widest uppercase">ISTE Student Chapter</span>
            </div>
          </div>

          {/* Main Heading - Compact */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none tracking-tight">
              ISTE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600">CEAL</span>
            </h1>

            {/* Review Reflect Reimagine - Compact */}
            <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mb-6">
              <div className="group">
                <div className="text-xl md:text-3xl font-bold text-gray-300 group-hover:text-sky-400 transition-all duration-300">
                  Review
                </div>
              </div>

              <div className="text-sky-500/30 text-xl">•</div>

              <div className="group">
                <div className="text-xl md:text-3xl font-bold text-gray-300 group-hover:text-blue-400 transition-all duration-300">
                  Reflect
                </div>
              </div>

              <div className="text-sky-500/30 text-xl">•</div>

              <div className="group">
                <div className="text-xl md:text-3xl font-bold text-gray-300 group-hover:text-purple-400 transition-all duration-300">
                  Reimagine
                </div>
              </div>
            </div>

            {/* Subtitle - Compact */}
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
              Empowering students through technology, innovation, and collaborative learning
            </p>
          </div>

          {/* CTA Buttons - Single Primary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/events"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-sky-50 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Explore Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats - Compact */}
          <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">

            {/* Members Box */}
            <div className="group bg-gray-900/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-sky-500/30 transition-all duration-500 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">500+</div>
              <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Active Members</div>
            </div>

            {/* Events Box */}
            <div className="group bg-gray-900/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-500 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">50+</div>
              <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Annual Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Fixed */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-sky-400"></div>
        </div>
      </div>
    </section>
  );
}
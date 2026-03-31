'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoIntro() {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has seen the video before (in this session)
    const hasSeenVideo = sessionStorage.getItem('hasSeenVideoIntro');

    if (hasSeenVideo) {
      setShowVideo(false);
      return;
    }

    // Play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
        // If autoplay is blocked, skip video
        handleVideoEnd();
      });
    }

    // Auto-hide after 5 seconds max (in case video doesn't load)
    const timeout = setTimeout(() => {
      handleVideoEnd();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasSeenVideoIntro', 'true');
    setShowVideo(false);
  };

  const handleSkip = () => {
    handleVideoEnd();
  };

  if (!showVideo) return null;

  return (
    <div className="video-intro-overlay fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        {/* Replace with your video path */}
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>

      {/* Fallback: Animated Logo (if video doesn't exist) */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-900 to-sky-900">
        <div className="text-center animate-fade-in">
          {/* Animated Gears */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Center Gear */}
            <svg className="absolute inset-0 gear-bg" viewBox="0 0 100 100" fill="#4BA3D9">
              <path d="M50,10 L55,20 L60,10 L65,20 L70,10 L75,20 L80,15 L82,25 L90,20 L88,30 L95,30 L90,38 L95,45 L88,45 L90,55 L82,50 L80,60 L75,55 L70,65 L65,55 L60,65 L55,55 L50,65 L45,55 L40,65 L35,55 L30,65 L25,55 L20,60 L18,50 L10,55 L12,45 L5,45 L10,38 L5,30 L12,30 L10,20 L18,25 L20,15 L25,20 L30,10 L35,20 L40,10 L45,20 Z" />
            </svg>
            {/* Small Gear */}
            <svg className="absolute top-12 right-8 w-20 h-20 gear-bg-reverse" viewBox="0 0 100 100" fill="#FFD700">
              <path d="M50,20 L52,25 L54,20 L56,25 L58,20 L60,25 L62,22 L63,28 L68,25 L67,32 L72,34 L70,39 L75,42 L72,47 L75,52 L70,55 L72,60 L67,62 L68,69 L63,66 L62,72 L60,69 L58,74 L56,69 L54,74 L52,69 L50,74 L48,69 L46,74 L44,69 L42,74 L40,69 L38,72 L37,66 L32,69 L33,62 L28,60 L30,55 L25,52 L28,47 L25,42 L30,39 L28,34 L33,32 L32,25 L37,28 L38,22 L40,25 L42,20 L44,25 L46,20 L48,25 Z" />
            </svg>
          </div>

          {/* ISTE Text */}
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in-up">
            ISTE CEAL
          </h1>
          <p className="text-xl text-sky-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Student Chapter
          </p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 z-10"
      >
        Skip Intro →
      </button>

      {/* Loading Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-gold-400"
          style={{
            animation: 'loading 5s linear forwards',
            width: '0%'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
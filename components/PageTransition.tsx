'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true);
    
    // You can customize the video based on the route
    // For now, using a default transition
    // setVideoSrc('/transitions/default.mp4'); // Uncomment when you add video
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Match this with your animation duration

    return () => clearTimeout(timer);
  }, [pathname]);

  // If you want to use a video transition, uncomment this block:
  /*
  if (videoSrc && isTransitioning) {
    return (
      <div className="page-transition">
        <video
          autoPlay
          muted
          className="video-transition"
          onEnded={() => setIsTransitioning(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    );
  }
  */

  // Default overlay transition (no video)
  if (!isTransitioning) return null;

  return (
    <div 
      className={`
        page-transition bg-white
        ${isTransitioning ? 'page-transition-enter' : ''}
      `}
    >
      {/* Loading indicator */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xl font-display font-semibold text-brand-700">
          ISTE CEAL
        </span>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState, useRef } from "react";

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const [typedKeys, setTypedKeys] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // The secret password the user needs to type
  const SECRET_CODE = "kashamkahukkum";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keydowns if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key.length !== 1) return; // Ignore Shift, Ctrl, etc.

      setTypedKeys((prev) => {
        const newKeys = (prev + key).slice(-SECRET_CODE.length);
        if (newKeys === SECRET_CODE) {
          setIsActive(true);
        }
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Start background fade
      setRevealStage(1);
      
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Audio play prevented:", err));
      }

      // Stage 2: Reveal Egg shape
      const timer1 = setTimeout(() => {
        setRevealStage(2);
      }, 800);

      // Stage 3: Explode to full screen
      const timer2 = setTimeout(() => {
        setRevealStage(3);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isActive]);

  const closeEasterEgg = () => {
    setRevealStage(0);
    setTimeout(() => {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setTypedKeys("");
    }, 1000); // Wait for fade out
  };

  if (!isActive) return null;

  return (
    <>
      <style>{`
        @keyframes flyAround {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30vw, -25vh) scale(1.5) rotate(15deg); }
          50% { transform: translate(-35vw, 20vh) scale(0.7) rotate(-10deg); }
          75% { transform: translate(20vw, 35vh) scale(1.3) rotate(5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        .animate-fly-around {
          animation: flyAround 10s infinite ease-in-out;
        }
      `}</style>

      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-3xl transition-opacity duration-1000 ease-in-out ${
          revealStage > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Audio element for music */}
        <audio ref={audioRef} src="/hukkum.mpeg" loop />

        <div 
          className={`relative flex items-center justify-center overflow-hidden bg-black transition-all duration-[2000ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
            revealStage === 0 || revealStage === 1 ? "w-0 h-0 opacity-0 rounded-full" : 
            revealStage === 2 ? "w-48 h-64 md:w-64 md:h-96 opacity-100 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_150px_rgba(255,255,255,0.5)] border-[8px] border-white/20" : 
            "w-screen h-screen opacity-100 rounded-none shadow-none border-none"
          }`}
        >
          <div 
            className={`absolute inset-0 w-full h-full opacity-90 transition-transform duration-[10000ms] ${revealStage === 3 ? 'hover:scale-110' : ''}`}
            style={{ 
              backgroundImage: "url('/easteregg.jpeg')", 
              backgroundRepeat: "repeat",
              backgroundSize: "250px"
            }} 
          />
          
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20">
            {revealStage === 3 && (
              <h2 className="text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-500 to-purple-600 drop-shadow-[0_0_30px_rgba(56,189,248,0.8)] tracking-widest animate-fly-around">
                super spy
              </h2>
            )}
          </div>
        </div>

        <button 
          onClick={closeEasterEgg}
          className={`absolute bottom-10 z-[10000] px-10 py-4 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-full font-light uppercase tracking-[0.3em] backdrop-blur-md border border-white/10 transition-all duration-700 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] ${
            revealStage === 3 ? "opacity-100 translate-y-0 delay-[2000ms]" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          Return to Reality
        </button>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Starfield() {
    const [stars, setStars] = useState<{ id: number, x: number, y: number, size: number, duration: number, delay: number, layer: number }[]>([]);
    
    // High-performance motion values for exact mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for natural movement
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

    // Window dimensions for parallax calculations
    const [winSize, setWinSize] = useState({ w: 1000, h: 1000 });
    const [mounted, setMounted] = useState(false);

    // Call useTransform at the top level BEFORE any early returns
    const glowX = useTransform(smoothX, val => val - 300);
    const glowY = useTransform(smoothY, val => val - 300);

    const layer1X = useTransform(smoothX, val => (val - winSize.w / 2) * -0.04);
    const layer1Y = useTransform(smoothY, val => (val - winSize.h / 2) * -0.04);
    
    const layer2X = useTransform(smoothX, val => (val - winSize.w / 2) * -0.08);
    const layer2Y = useTransform(smoothY, val => (val - winSize.h / 2) * -0.08);
    
    const layer3X = useTransform(smoothX, val => (val - winSize.w / 2) * -0.12);
    const layer3Y = useTransform(smoothY, val => (val - winSize.h / 2) * -0.12);

    useEffect(() => {
        setMounted(true);
        setWinSize({ w: window.innerWidth, h: window.innerHeight });
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);

        // Increased star count and made them slightly larger/brighter
        const starCount = 200;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, 
            y: Math.random() * 100, 
            size: Math.random() * 3 + 1, // 1 to 4px
            duration: Math.random() * 3 + 1.5, // 1.5s to 4.5s
            delay: Math.random() * 2, 
            layer: Math.floor(Math.random() * 3) + 1, 
        }));
        setStars(newStars);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", () => setWinSize({ w: window.innerWidth, h: window.innerHeight }));
        
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", () => setWinSize({ w: window.innerWidth, h: window.innerHeight }));
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Interactive Flashlight Glow following mouse - Increased Opacity */}
            <motion.div 
                className="absolute left-0 top-0 w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none mix-blend-screen hidden md:block"
                style={{
                    x: glowX,
                    y: glowY,
                    background: "radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(139,92,246,0.15) 40%, rgba(0,0,0,0) 70%)"
                }}
            />

            {/* Parallax Star Layers */}
            {[1, 2, 3].map(layerIndex => {
                const xTransform = layerIndex === 1 ? layer1X : layerIndex === 2 ? layer2X : layer3X;
                const yTransform = layerIndex === 1 ? layer1Y : layerIndex === 2 ? layer2Y : layer3Y;

                return (
                    <motion.div
                        key={`layer-${layerIndex}`}
                        className="absolute inset-0 w-full h-full"
                        style={{
                            x: xTransform,
                            y: yTransform,
                        }}
                    >
                    {stars.filter(s => s.layer === layerIndex).map((star) => (
                        <motion.div
                            key={star.id}
                            className="absolute bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]"
                            style={{
                                left: `${star.x}%`,
                                top: `${star.y}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                opacity: 0,
                            }}
                            animate={{
                                opacity: [0, Math.random() * 0.4 + 0.6, 0], // Pulse between 0 and 0.6-1.0
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
                );
            })}

            {/* Shooting Star 1 */}
            <motion.div
                className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rotate-[35deg] shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                animate={{
                    left: ["-10%", "110%"],
                    top: ["-10%", "110%"],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "linear",
                    delay: 1
                }}
            />
            
            {/* Shooting Star 2 */}
            <motion.div
                className="absolute w-[150px] h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 rotate-[45deg] shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                animate={{
                    left: ["-20%", "120%"],
                    top: ["20%", "140%"],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 8,
                    ease: "linear",
                    delay: 4
                }}
            />
        </div>
    );
}

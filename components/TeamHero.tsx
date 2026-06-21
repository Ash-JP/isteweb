"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Users } from "lucide-react";

export default function TeamHero() {
    const { scrollY } = useScroll();
    
    // Slower parallax rotation for the gear
    const gearRotation = useTransform(scrollY, [0, 1000], [0, 180]);

    // Word reveal animation variants
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    };

    const child: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section className="relative pt-12 pb-0 bg-transparent overflow-hidden">
            {/* BACKGROUND EFFECT: Slow scroll-linked gear parallax */}
            <motion.div 
                style={{ rotate: gearRotation }}
                className="absolute top-20 -right-10 opacity-[0.03] pointer-events-none"
            >
                <svg className="w-96 h-96" viewBox="0 0 100 100" fill="#fff">
                    <path d="M50,10 L55,20 L60,10 L65,20 L70,10 L75,20 L80,15 L82,25 L90,20 L88,30 L95,30 L90,38 L95,45 L88,45 L90,55 L82,50 L80,60 L75,55 L70,65 L65,55 L60,65 L55,55 L50,65 L45,55 L40,65 L35,55 L30,65 L25,55 L20,60 L18,50 L10,55 L12,45 L5,45 L10,38 L5,30 L12,30 L10,20 L18,25 L20,15 L25,20 L30,10 L35,20 L40,10 L45,20 Z" />
                </svg>
            </motion.div>
            
            <motion.div 
                style={{ rotate: useTransform(scrollY, [0, 1000], [0, -120]) }}
                className="absolute top-64 left-10 opacity-[0.02] pointer-events-none"
            >
                <svg className="w-64 h-64" viewBox="0 0 100 100" fill="#0ea5e9">
                    <path d="M50,10 L55,20 L60,10 L65,20 L70,10 L75,20 L80,15 L82,25 L90,20 L88,30 L95,30 L90,38 L95,45 L88,45 L90,55 L82,50 L80,60 L75,55 L70,65 L65,55 L60,65 L55,55 L50,65 L45,55 L40,65 L35,55 L30,65 L25,55 L20,60 L18,50 L10,55 L12,45 L5,45 L10,38 L5,30 L12,30 L10,20 L18,25 L20,15 L25,20 L30,10 L35,20 L40,10 L45,20 Z" />
                </svg>
            </motion.div>

            <div className="container-centered relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sm font-semibold text-sky-400 mb-6"
                    >
                        <Users className="w-4 h-4" />
                        <span>Execom</span>
                    </motion.div>

                    <motion.h1 
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="font-extrabold mb-6 text-white text-5xl md:text-7xl flex flex-wrap justify-center gap-3"
                    >
                        {["Meet", "Our"].map((word, i) => (
                            <motion.span key={i} variants={child}>{word}</motion.span>
                        ))}
                        <motion.span variants={child} className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                            Team
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        The passionate individuals driving innovation and excellence at ISTE CEAL
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

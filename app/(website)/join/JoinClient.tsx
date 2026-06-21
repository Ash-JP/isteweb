"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Users, Award, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function JoinClient() {
    // Interactive mouse glow for background
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const benefits = [
        {
            title: "Networking",
            description: "Connect with industry experts, alumni, and like-minded peers.",
            icon: <Users className="h-8 w-8" />,
            gradient: "from-sky-500 to-indigo-500",
        },
        {
            title: "Skill Development",
            description: "Hands-on workshops in Web Dev, AI/ML, IoT, and more.",
            icon: <CheckCircle className="h-8 w-8" />,
            gradient: "from-indigo-500 to-sky-500",
        },
        {
            title: "Certifications",
            description: "Get recognized certificates for every workshop and event you attend.",
            icon: <Award className="h-8 w-8" />,
            gradient: "from-purple-500 to-sky-500",
        },
        {
            title: "Exclusive Events",
            description: "Access to members-only hackathons and industrial visits.",
            icon: <Calendar className="h-8 w-8" />,
            gradient: "from-sky-500 to-purple-500",
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    const slideInLeft: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, x: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <main ref={containerRef} className="relative min-h-screen bg-[#020617] overflow-hidden">
            {/* BACKGROUND EFFECT: Interactive Glowing Mesh Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Standard grid pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                
                {/* Mouse-following radial glow that illuminates the grid */}
                <motion.div 
                    className="absolute w-[800px] h-[800px] rounded-full blur-[100px] bg-sky-500/10 pointer-events-none hidden md:block"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                />

                {/* Slow sweeping dark aurora overlay */}
                <motion.div 
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: 0.2 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent skew-x-12 blur-[100px]"
                />
            </div>

            <div className="relative z-10">
                {/* Spacer for navbar */}
                <div className="h-24"></div>

                {/* Hero Section */}
                <section className="py-24 text-center text-white">
                    <div className="container-custom relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                        >
                            <Sparkles className="w-4 h-4 text-sky-400" />
                            <span className="text-sky-100">Membership Open for 2026</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
                        >
                            Become an ISTE Member
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12"
                        >
                            Join the largest technical community on campus.
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 font-semibold">Unlock your potential.</span>
                        </motion.p>

                        {/* Stats */}
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap justify-center gap-12 md:gap-24 text-center"
                        >
                            {[
                                { val: "500+", label: "Members", color: "text-sky-400" },
                                { val: "50+", label: "Events/Year", color: "text-blue-400" },
                                { val: "10+", label: "Awards", color: "text-purple-400" },
                            ].map((stat, i) => (
                                <motion.div key={i} variants={itemVariants}>
                                    <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.val}</div>
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="py-20 container-custom">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">ISTE?</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Discover the incredible benefits waiting for you
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group p-8 rounded-2xl bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-sky-500/30 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                
                                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-black/50 z-10`}>
                                    {benefit.icon}
                                </div>
                                <h3 className="relative text-2xl font-bold mb-3 text-white z-10">{benefit.title}</h3>
                                <p className="relative text-gray-400 leading-relaxed z-10">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Registration Steps */}
                <section className="py-32">
                    <div className="container-custom">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-center mb-24"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Register</span>
                            </h2>
                            <p className="text-xl text-gray-400">Simple 3-step process to join ISTE CEAL</p>
                        </motion.div>

                        <div className="space-y-8 max-w-4xl mx-auto">
                            {/* Step 1 */}
                            <motion.div 
                                variants={slideInLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-sky-500/30 transition-all group"
                            >
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Fill the Application Form
                                    </h3>
                                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                                        Complete the official membership form with your college details and areas of interest.
                                    </p>
                                    <Link
                                        href="https://google.com" // REPLACE with real form link
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors font-semibold"
                                    >
                                        Open Registration Form
                                        <ArrowRight className="w-5 h-5 text-sky-400" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div 
                                variants={slideInLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-indigo-500/30 transition-all group"
                            >
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Pay the Membership Fee
                                    </h3>
                                    <p className="text-gray-400 mb-3 text-lg leading-relaxed">
                                        The lifetime membership fee is <span className="font-bold text-sky-400 text-2xl ml-2">₹300</span>
                                    </p>
                                    <p className="text-gray-500 mb-6">
                                        Payment can be made via UPI to the treasurer. Details will be shared after form submission.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm font-semibold text-emerald-400">
                                        <CheckCircle className="w-4 h-4" />
                                        One-time lifetime fee
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div 
                                variants={slideInLeft}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-3xl bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/30 transition-all group"
                            >
                                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Collect Your ID Card
                                    </h3>
                                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                                        Once verified, you will receive your official ISTE Membership ID card from the Execom office.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium">
                                            <Award className="w-4 h-4 text-yellow-400" />
                                            Official ID Card
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 font-medium">
                                            <Users className="w-4 h-4 text-sky-400" />
                                            Community Access
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="pb-32 px-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 relative overflow-hidden"
                    >
                        {/* Interactive glow effect */}
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/20 blur-[100px] rounded-full pointer-events-none" />
                        
                        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
                            Ready to Join?
                        </h3>
                        <p className="text-gray-300 mb-10 text-xl relative z-10">
                            Start your journey with ISTE CEAL today!
                        </p>
                        <Link
                            href="https://google.com" // REPLACE with real form
                            target="_blank"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-sky-500/25 relative z-10"
                        >
                            Register Now
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}

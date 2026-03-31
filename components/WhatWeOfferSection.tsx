'use client';

import { useEffect, useRef, useState } from "react";
import { Trophy, Code2, Users, Award } from "lucide-react";

export default function WhatWeOfferSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const offerings = [
        {
            icon: <Code2 className="w-12 h-12" />,
            title: "Technical Workshops",
            description: "Hands-on sessions covering latest technologies, programming languages, and software development practices",
            gradient: "from-blue-500 to-sky-500",
            borderColor: "border-blue-500/30",
            iconBg: "bg-blue-500/20",
            items: ["Web Development", "AI/ML Workshops", "Cloud Computing", "Mobile App Development"]
        },
        {
            icon: <Trophy className="w-12 h-12" />,
            title: "Hackathons",
            description: "24-48 hour coding marathons where teams build innovative solutions to real-world problems",
            gradient: "from-purple-500 to-pink-500",
            borderColor: "border-purple-500/30",
            iconBg: "bg-purple-500/20",
            items: ["Problem Solving", "Team Building", "Prizes & Recognition", "Mentorship"]
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "Networking Events",
            description: "Connect with industry professionals, alumni, and fellow students to expand your network",
            gradient: "from-green-500 to-emerald-500",
            borderColor: "border-green-500/30",
            iconBg: "bg-green-500/20",
            items: ["Industry Talks", "Alumni Meets", "Tech Conferences", "Career Guidance"]
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: "Project Showcase",
            description: "Platform to present your innovative projects and get feedback from experts and peers",
            gradient: "from-orange-500 to-red-500",
            borderColor: "border-orange-500/30",
            iconBg: "bg-orange-500/20",
            items: ["Demo Days", "Competition", "Feedback Sessions", "Collaboration"]
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="section-padding"
            style={{
                background: 'linear-gradient(180deg, rgb(10, 30, 94) 0%, rgb(17, 24, 39) 100%)'
            }}
        >
            <div className="container-centered">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Offer</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Comprehensive programs designed to enhance your technical skills
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Box Grid with Staggered Animations */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {offerings.map((offer, index) => (
                        <div
                            key={index}
                            className={`
                transition-all duration-700 ease-out
                ${isVisible
                                    ? 'opacity-100 scale-100 translate-y-0'
                                    : 'opacity-0 scale-95 translate-y-20'
                                }
              `}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className={`
                group h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl 
                rounded-3xl p-8 border ${offer.borderColor} 
                hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/20
                transition-all duration-500 hover:scale-[1.02]
              `}>

                                {/* Icon */}
                                <div className={`
                  w-20 h-20 rounded-2xl ${offer.iconBg} 
                  flex items-center justify-center text-white mb-6 
                  group-hover:scale-110 transition-transform duration-300 shadow-lg
                `}>
                                    {offer.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                                    {offer.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {offer.description}
                                </p>

                                {/* Items List */}
                                <ul className="space-y-2">
                                    {offer.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-300">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${offer.gradient}`}></div>
                                            <span className="text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

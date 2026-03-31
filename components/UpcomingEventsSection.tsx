'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

interface UpcomingEventsSectionProps {
    event?: {
        title: string;
        description: string;
        date: string;
        slug: { current: string };
    };
}

export default function UpcomingEventsSection({ event }: UpcomingEventsSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

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

        // Timer Logic
        const calculateTimeLeft = () => {
            if (!event?.date) return;

            const difference = +new Date(event.date) - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        // Initial set
        const timerInit = calculateTimeLeft();
        if (timerInit) setTimeLeft(timerInit);

        const timer = setInterval(() => {
            const tl = calculateTimeLeft();
            if (tl) setTimeLeft(tl);
        }, 1000);

        return () => {
            observer.disconnect();
            clearInterval(timer);
        };
    }, [event?.date]);

    // If no event, we can either hide the section or show a placeholder.
    // For now, let's show a placeholder if no event is passed.
    if (!event) {
        return (
            <section
                className="section-padding relative overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, rgb(17, 24, 39) 0%, rgb(10, 30, 94) 100%)'
                }}
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container-centered text-center text-gray-500 relative z-10">
                    <p className="text-xl">Stay tuned for upcoming events!</p>
                </div>
            </section>
        )
    }

    return (
        <section
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, rgb(17, 24, 39) 0%, rgb(10, 30, 94) 100%)'
            }}
        >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container-centered relative z-10">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Event</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Mark your calendars for our next big experience
                    </p>
                </div>

                {/* Countdown Box with Glassmorphism */}
                <div
                    className={`
            max-w-5xl mx-auto transition-all duration-1000 ease-out
            ${isVisible
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-20'
                        }
          `}
                    style={{ transitionDelay: '200ms' }}
                >
                    <div className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-70 blur-xl transition-opacity duration-500"></div>

                        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 overflow-hidden">

                            {/* Inner Grid Pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">

                                {/* Left Side: Event Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full mb-6">
                                        <Clock className="w-4 h-4 text-sky-400" />
                                        <span className="text-sm font-semibold text-sky-400 tracking-wide uppercase">Next Event</span>
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        {event.description ?
                                            (event.description.length > 150 ? event.description.substring(0, 150) + '...' : event.description)
                                            : 'Join us for this amazing event that will challenge your skills and expand your network.'}
                                    </p>

                                    <Link
                                        href={event.slug?.current ? `/events` : '/events'}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-sky-50 hover:scale-105 transition-all shadow-lg group/btn"
                                    >
                                        View Details
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Right Side: Countdown */}
                                <div className="flex-shrink-0 w-full md:w-auto">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { value: timeLeft.days, label: 'Days' },
                                            { value: timeLeft.hours, label: 'Hours' },
                                            { value: timeLeft.minutes, label: 'Mins' },
                                            { value: timeLeft.seconds, label: 'Secs' },
                                        ].map((item, index) => (
                                            <div key={index} className="bg-gray-800/50 border border-white/5 rounded-2xl p-6 w-32 md:w-40 text-center backdrop-blur-sm group/timer hover:border-sky-500/30 transition-colors">
                                                <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2 group-hover/timer:text-sky-400 transition-colors">
                                                    {String(item.value).padStart(2, '0')}
                                                </div>
                                                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

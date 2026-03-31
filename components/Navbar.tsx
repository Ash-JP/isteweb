'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Info, Calendar, Users, ImageIcon, Settings } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavLinks = [
    { name: 'Home', href: '/#home', icon: Home },
    { name: 'About', href: '/#about', icon: Info },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out"
      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      {/* Container with top padding for spacing */}
      <div className="container-centered pt-4 pb-2 lg:pt-6 lg:pb-4">
        <div
          className="rounded-2xl transition-all duration-500 ease-out border-2 border-white/40 relative overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Animated Wave Effect - Layer 1 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(75, 163, 217, 0.3), transparent)',
              animation: 'wave 8s ease-in-out infinite',
              transformOrigin: 'center',
            }}
          />

          {/* Animated Wave Effect - Layer 2 (Opposite Direction) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent)',
              animation: 'wave-reverse 10s ease-in-out infinite',
              transformOrigin: 'center',
            }}
          />

          {/* Floating Particles Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(75, 163, 217, 0.1) 0%, transparent 50%)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />

          {/* Subtle Shimmer Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)',
              animation: 'shimmer 3s linear infinite',
              backgroundSize: '200% 100%',
            }}
          />

          {/* Static Subtle Top Shine */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            }}
          />

          <div className="px-6 lg:px-8 flex items-center justify-between h-20 relative z-10">

            {/* LEFT: Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* Logo Container */}
              <div className="relative">
                {/* Glow Effect on Hover */}
                <div
                  className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(75, 163, 217, 1), transparent)',
                  }}
                />

                <div className="relative w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl overflow-hidden transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-out">
                  <Image
                    src="/iste-light.png"
                    alt="ISTE CEAL Logo"
                    width={56}
                    height={56}
                    className="rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Logo Text */}
              <div className="transition-all duration-300">
                <div className="text-lg lg:text-xl font-bold text-white leading-tight group-hover:text-sky-300 transition-colors duration-300" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
                  ISTE CEAL
                </div>
                <div className="text-[10px] lg:text-xs text-sky-300 font-medium group-hover:text-sky-200 transition-colors duration-300" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
                  Student Chapter
                </div>
              </div>
            </Link>

            {/* CENTER: Main Navigation - Icons Only, Labels on Hover */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative group"
                    style={{
                      transitionDelay: showLabels ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <div
                      className={`
                        flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                        transition-all duration-500 ease-out
                        ${active
                          ? 'bg-white/20 shadow-lg backdrop-blur-sm'
                          : 'hover:bg-white/10 backdrop-blur-sm'
                        }
                      `}
                      style={{
                        boxShadow: active ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)' : 'none'
                      }}
                    >
                      {/* Icon - High Contrast */}
                      <Icon
                        className={`
                          w-5 h-5 transition-all duration-500 ease-out
                          ${active
                            ? 'text-sky-300 scale-110'
                            : 'text-white group-hover:text-sky-300 group-hover:scale-110 group-hover:rotate-12'
                          }
                        `}
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                          strokeWidth: 2.5
                        }}
                      />

                      {/* Label - Smooth slide animation */}
                      <span
                        className={`
                          font-semibold text-sm whitespace-nowrap overflow-hidden
                          transition-all duration-500 ease-out
                          ${active ? 'text-sky-300' : 'text-white group-hover:text-sky-300'}
                          ${showLabels
                            ? 'max-w-[100px] opacity-100 ml-0'
                            : 'max-w-0 opacity-0 -ml-2'
                          }
                        `}
                        style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}
                      >
                        {link.name}
                      </span>
                    </div>

                    {/* Active Indicator - Smooth appearance */}
                    <div
                      className={`
                        absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full
                        transition-all duration-500 ease-out
                        ${active
                          ? 'w-1/2 bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-100 shadow-lg'
                          : 'w-0 bg-sky-300 opacity-0'
                        }
                      `}
                      style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
                    />

                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(75, 163, 217, 0.15), transparent)',
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: Hamburger & Admin */}
            <div className="flex items-center gap-3">
              {/* Admin Button (Hidden on mobile) */}
              <Link
                href="/studio"
                className={`
                  hidden lg:flex group relative p-2.5 rounded-xl transition-all duration-500 ease-out
                  ${isActive('/studio')
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm'
                    : 'hover:bg-white/10 backdrop-blur-sm'
                  }
                `}
                title="Admin"
              >
                <Settings
                  className={`
                    w-5 h-5 transition-all duration-500 ease-out
                    ${isActive('/studio') ? 'text-sky-300' : 'text-white/60 group-hover:text-white'}
                    group-hover:rotate-180 group-hover:scale-110
                  `}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
                    strokeWidth: 2.5
                  }}
                />
              </Link>

              {/* Hamburger Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5 w-6' : 'w-6'}`} />
                  <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4 ml-auto'}`} />
                  <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5 ml-auto'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Smooth Slide */}
          <div
            className={`
              lg:hidden overflow-hidden transition-all duration-500 ease-out relative z-10
              ${isOpen ? 'max-h-96 opacity-100 px-6 pb-6' : 'max-h-0 opacity-0 px-6 pb-0'}
            `}
          >
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              {mainNavLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold
                      transition-all duration-300 backdrop-blur-sm
                      ${active
                        ? 'bg-white/20 text-sky-300 shadow-lg'
                        : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Admin Link */}
              <Link
                href="/studio"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 mt-2"
              >
                <Settings className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Animations */}
      <style jsx global>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(-100%) skewX(-10deg);
          }
          50% {
            transform: translateX(100%) skewX(10deg);
          }
        }

        @keyframes wave-reverse {
          0%, 100% {
            transform: translateX(100%) skewX(10deg);
          }
          50% {
            transform: translateX(-100%) skewX(-10deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
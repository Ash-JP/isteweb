'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  Twitter,
  Calendar,
  Mail,
  MessageCircle,
  Download,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Settings,
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export interface LinktreeItem {
  slug: string;
  title: string;
  url: string;
  description?: string;
  icon: string;
  order: number;
}

interface LinktreeFeedProps {
  items: LinktreeItem[];
}

export default function LinktreeFeed({ items }: LinktreeFeedProps) {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);

  const renderIcon = (iconName: string) => {
    const iconProps = { className: "w-6 h-6 transition-transform duration-300 group-hover:scale-110" };
    switch (iconName.toLowerCase()) {
      case 'instagram':
        return <Instagram {...iconProps} className={`${iconProps.className} text-pink-400`} />;
      case 'linkedin':
        return <Linkedin {...iconProps} className={`${iconProps.className} text-sky-400`} />;
      case 'github':
        return <Github {...iconProps} className={`${iconProps.className} text-purple-300`} />;
      case 'youtube':
        return <Youtube {...iconProps} className={`${iconProps.className} text-red-400`} />;
      case 'twitter':
        return <Twitter {...iconProps} className={`${iconProps.className} text-sky-300`} />;
      case 'calendar':
        return <Calendar {...iconProps} className={`${iconProps.className} text-amber-300`} />;
      case 'mail':
        return <Mail {...iconProps} className={`${iconProps.className} text-emerald-400`} />;
      case 'message-circle':
        return <MessageCircle {...iconProps} className={`${iconProps.className} text-green-400`} />;
      case 'download':
        return <Download {...iconProps} className={`${iconProps.className} text-blue-300`} />;
      case 'external-link':
        return <ExternalLink {...iconProps} className={`${iconProps.className} text-cyan-300`} />;
      case 'globe':
      default:
        return <Globe {...iconProps} className={`${iconProps.className} text-sky-300`} />;
    }
  };

  // Sort items strictly by display order
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleCopyLink = (url: string, slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleSharePage = async () => {
    const pageUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ISTE CEAL - Links',
          text: 'Check out official links from ISTE CEAL Student Chapter!',
          url: pageUrl,
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      navigator.clipboard.writeText(pageUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 relative z-10">
      {/* Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] bg-sky-500 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 border border-sky-400/50"
          >
            <Check className="w-4 h-4" />
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Quick Bar */}
      <div className="flex items-center justify-between mb-8 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 px-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>ISTE CEAL Links</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSharePage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            title="Share page"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <Link
            href="/keystatic/collection/linktree"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            title="Open Admin Panel to add or remove links"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage Links</span>
          </Link>
        </div>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center mb-8"
      >
        {/* Avatar */}
        <div className="relative group mb-4">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-300 opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/80 shadow-2xl bg-slate-900 flex items-center justify-center">
            <Image
              src="/iste-light.png"
              alt="ISTE CEAL Logo"
              width={96}
              height={96}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ISTE CEAL
          </h1>
          <span title="Verified Chapter"><ShieldCheck className="w-6 h-6 text-sky-400" /></span>
        </div>

        {/* Subtitle */}
        <div className="text-sky-300 font-semibold text-sm sm:text-base mb-2">
          @iste_ceal &bull; Student Chapter
        </div>

        {/* Bio */}
        <p className="text-white/80 text-xs sm:text-sm max-w-md leading-relaxed px-4">
          Fostering technical innovation, workshops, hackathons & digital excellence at College of Engineering Attingal.
        </p>
      </motion.div>

      {/* Link Cards Feed */}
      <div className="space-y-3">
        {sortedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <p className="text-white/60 text-sm">No links added yet.</p>
          </motion.div>
        ) : (
          sortedItems.map((item, index) => {
            const isCopied = copiedSlug === item.slug;
            const isExternal = item.url.startsWith('http');

            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <a
                  href={item.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative block p-4 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-sky-400/50 backdrop-blur-xl shadow-lg transition-all duration-300 ease-out hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between gap-4 relative z-10">
                    {/* Left Icon */}
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300 shadow-inner">
                      {renderIcon(item.icon)}
                    </div>

                    {/* Middle Title & Description */}
                    <div className="flex-grow min-w-0">
                      <h2 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors duration-300 truncate">
                        {item.title}
                      </h2>
                      {item.description && (
                        <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Copy Link Button */}
                      <button
                        onClick={(e) => handleCopyLink(item.url, item.slug, e)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300 border border-white/10"
                        title="Copy link"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* External Arrow */}
                      <div className="w-8 h-8 rounded-xl bg-sky-500/20 group-hover:bg-sky-500 text-sky-300 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-xs text-white/50 space-y-2">
        <p>© {new Date().getFullYear()} ISTE CEAL</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold hover:underline"
        >
          Return to Main Website &rarr;
        </Link>
      </div>
    </div>
  );
}

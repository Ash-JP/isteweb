"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/client";
import { Linkedin, Instagram, Mail, Github, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Member {
  _id: string;
  name: string;
  role: string;
  year: string;
  image: any;
  linkedin?: string;
  instagram?: string;
  email?: string;
  github?: string;
}

export default function TeamSection({ title, members }: { title: string; members: Member[] }) {
  if (members.length === 0) return null;

  // Format role name
  const formatRole = (role: string) => {
    return role
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const SocialLink = ({ href, icon: Icon, label }: any) => {
    const isMail = href.startsWith('mailto:');
    return (
      <motion.a
        href={href}
        target={isMail ? "_self" : "_blank"}
        rel={isMail ? undefined : "noopener noreferrer"}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-300 border border-white/5 hover:border-sky-500/30 transition-all duration-300"
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </motion.a>
    );
  };

  return (
    <div className="w-full mb-20">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="h-8 w-1.5 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full" />
        <h2 className="text-3xl font-display font-bold text-white tracking-wide">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </motion.div>

      {/* Grid of Large Rectangles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            {/* ID Card Container */}
            <div className="relative h-full flex flex-col sm:flex-row bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-sky-500/30 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.1)]">

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Left: Image Section */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0 bg-white/5">
                {member.image ? (
                  <Image
                    src={urlFor(member.image).url()}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600 text-4xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
                {/* Overlay for depth */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              {/* Right: Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-center relative">
                {/* Role Badge */}
                <div className="inline-flex self-start px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3 uppercase tracking-wider">
                  {formatRole(member.role)}
                </div>

                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                  {/* Placeholder for bio if we had one, or just extra role info */}
                  ISTE CEAL {member.year} Team
                </p>

                {/* Social Links */}
                <div className="flex gap-2">
                  {member.linkedin && <SocialLink href={member.linkedin} icon={Linkedin} label="LinkedIn" />}
                  {member.github && <SocialLink href={member.github} icon={Github} label="GitHub" />}
                  {member.instagram && <SocialLink href={member.instagram} icon={Instagram} label="Instagram" />}
                  {member.email && <SocialLink href={`mailto:${member.email}`} icon={Mail} label="Email" />}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
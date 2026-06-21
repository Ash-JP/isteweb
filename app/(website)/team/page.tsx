import type { Metadata } from 'next';

import TeamPresenter from "@/components/TeamPresenter";
import TeamHero from "@/components/TeamHero";
import { Users, Award, Target, Sparkles } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the passionate individuals driving innovation and excellence at ISTE CEAL.',
  openGraph: {
    title: 'Our Team | ISTE CEAL',
    description: 'Meet the passionate individuals driving innovation and excellence at ISTE CEAL.',
    type: 'website',
  },
};

import { reader } from "@/lib/keystatic";

async function getTeam() {
  try {
    const execom = await reader.collections.execom.all();
    return execom.map((member) => ({
      _id: member.slug,
      slug: member.slug,
      ...member.entry,
      linkedin: member.entry.linkedin || undefined,
      github: member.entry.github || undefined,
      instagram: member.entry.instagram || undefined,
      cloudinaryUrl: member.entry.cloudinaryUrl || undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch team from Keystatic:", error);
    return [];
  }
}

export default async function TeamPage() {
  const members = await getTeam();
  console.log(`Fetched ${members.length} team members from Keystatic.`);

  // (Optional) Get current year dynamically or just pass all members to TeamPresenter
  // TeamPresenter handles year filtering now.

  return (
    <main className="min-h-screen">
      {/* Spacer for navbar */}
      <div className="h-20"></div>

      {/* Animated Hero Section */}
      <TeamHero />

      {/* Team Presenter (Infinity Scroll & Filtering) */}
      <section className="pb-20">
        <div className="container-centered">
          <TeamPresenter members={members} />
        </div>
      </section>
      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-sky-900/40 pointer-events-none"></div>

        <div className="container-centered relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/10">
              <span className="text-5xl">🚀</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Want to Join the Team?
            </h2>

            <p className="text-xl text-white/90 mb-8">
              Applications open at the start of each academic year. Be part of something extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href="/join" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-xl font-semibold text-lg hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/25">
                Become a Member
              </a>
              <a href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                Learn About Roles
              </a>
            </div>
          </div>
        </div>
      </section>
    </main >
  );
}
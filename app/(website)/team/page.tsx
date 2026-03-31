import type { Metadata } from 'next';
import { client } from "@/sanity/client";
import TeamPresenter from "@/components/TeamPresenter";
import { Users, Award, Target, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the passionate individuals driving innovation and excellence at ISTE CEAL.',
};

async function getTeam() {
  const query = `*[_type == "execom"] {
    _id,
    name,
    role,
    year,
    image,
    linkedin,
    instagram,
    email,
    github
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export default async function TeamPage() {
  const members = await getTeam();

  // (Optional) Get current year dynamically or just pass all members to TeamPresenter
  // TeamPresenter handles year filtering now.

  return (
    <main className="min-h-screen">
      {/* Spacer for navbar */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative section-padding pb-12 bg-transparent overflow-hidden">
        {/* Gear Background */}
        <div className="absolute top-20 right-20 opacity-5 pointer-events-none">
          <svg className="w-64 h-64 gear-bg" viewBox="0 0 100 100" fill="#fff">
            <path d="M50,10 L55,20 L60,10 L65,20 L70,10 L75,20 L80,15 L82,25 L90,20 L88,30 L95,30 L90,38 L95,45 L88,45 L90,55 L82,50 L80,60 L75,55 L70,65 L65,55 L60,65 L55,55 L50,65 L45,55 L40,65 L35,55 L30,65 L25,55 L20,60 L18,50 L10,55 L12,45 L5,45 L10,38 L5,30 L12,30 L10,20 L18,25 L20,15 L25,20 L30,10 L35,20 L40,10 L45,20 Z" />
          </svg>
        </div>

        <div className="container-centered relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sm font-semibold text-sky-400 mb-6 animate-fade-in">
              <Users className="w-4 h-4" />
              <span>Execom</span>
            </div>

            <h1 className="font-extrabold mb-6 animate-fade-in-up text-white text-5xl md:text-6xl">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Team</span>
            </h1>

            <p className="text-gray-400 animate-fade-in-up text-xl max-w-2xl mx-auto" style={{ animationDelay: '0.1s' }}>
              The passionate individuals driving innovation and excellence at ISTE CEAL
            </p>
          </div>
        </div>
      </section>

      {/* Team Presenter (Infinity Scroll & Filtering) */}
      <section className="section-padding pt-0">
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
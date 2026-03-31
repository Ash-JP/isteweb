import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Users, Award, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Become an ISTE CEAL member and unlock exclusive networking, workshops, and technical events.",
};

export default function JoinPage() {
  const benefits = [
    {
      title: "Networking",
      description: "Connect with industry experts, alumni, and like-minded peers.",
      icon: <Users className="h-8 w-8" />,
      gradient: "from-sky-500 to-navy-500",
    },
    {
      title: "Skill Development",
      description: "Hands-on workshops in Web Dev, AI/ML, IoT, and more.",
      icon: <CheckCircle className="h-8 w-8" />,
      gradient: "from-navy-500 to-sky-500",
    },
    {
      title: "Certifications",
      description: "Get recognized certificates for every workshop and event you attend.",
      icon: <Award className="h-8 w-8" />,
      gradient: "from-gold-500 to-sky-500",
    },
    {
      title: "Exclusive Events",
      description: "Access to members-only hackathons and industrial visits.",
      icon: <Calendar className="h-8 w-8" />,
      gradient: "from-sky-500 to-gold-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-navy-900 to-gray-900">
      {/* Spacer for navbar */}
      <div className="h-24"></div>

      {/* Hero Section */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sky-100">Membership Open for 2026</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up text-white">
            Become an ISTE Member
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 animate-fade-in-up "
            style={{ animationDelay: '0.1s' }}>
            Join the largest technical community on campus.
            <span className="block mt-2 text-sky-400 font-semibold">Unlock your potential.</span>
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 text-center animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-sky-400">500+</div>
              <div className="text-sm text-gray-400">Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-400">Events/Year</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-purple-400">10+</div>
              <div className="text-sm text-gray-400">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">ISTE?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the incredible benefits waiting for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-sky-400">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Register</span>
            </h2>
            <p className="text-xl text-gray-400">Simple 3-step process to join ISTE CEAL</p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex gap-6 items-start p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/30 transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-display text-2xl font-bold border border-sky-500/30">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Fill the Application Form
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Complete the official membership form with your college details and areas of interest.
                </p>
                <Link
                  href="https://google.com" // REPLACE with real form link
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-sky-500 hover:border-transparent transition-all"
                >
                  Open Registration Form
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-display text-2xl font-bold border border-blue-500/30">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Pay the Membership Fee
                </h3>
                <p className="text-gray-400 mb-2 leading-relaxed">
                  The lifetime membership fee is <span className="font-bold text-sky-400 text-xl">₹300</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Payment can be made via UPI to the treasurer. Details will be shared after form submission.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-sm font-semibold text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  One-time lifetime fee
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-display text-2xl font-bold border border-purple-500/30">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Collect Your ID Card
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Once verified, you will receive your official ISTE Membership ID card from the Execom office.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    <Award className="w-4 h-4 text-yellow-400" />
                    Official ID Card
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    <Users className="w-4 h-4 text-sky-400" />
                    Community Access
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Event Priority
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-12 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-4 text-white">
              Ready to Join?
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Start your journey with ISTE CEAL today!
            </p>
            <Link
              href="https://google.com" // REPLACE with real form
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-500 transition-all shadow-lg shadow-sky-900/50"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ or Contact Section */}
      <section className="py-20 container-custom">
        <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            Have Questions?
          </h3>
          <p className="text-gray-400 mb-6 ">
            Reach out to our Execom team for any queries about membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-all font-semibold">
              Contact Us
            </Link>
            <Link href="/team" className="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-500 transition-all font-semibold shadow-lg">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
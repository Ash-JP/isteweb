"use client";

import { motion } from "framer-motion";
import { 
    GraduationCap, Compass, Crown, Scale, ClipboardSignature, 
    ListChecks, Coins, Terminal, Code2, BookOpen, 
    Palette, Camera, PenTool, Target, UserPlus, Globe, Zap, Star 
} from "lucide-react";

const roleCategories = [
    {
        title: "The Council",
        description: "The guiding force behind ISTE CEAL.",
        color: "from-yellow-400 to-amber-600",
        shadow: "shadow-yellow-500/20",
        roles: [
            {
                title: "Faculty Advisor",
                icon: GraduationCap,
                description: "The Faculty Advisor acts as the foundational pillar and strategic compass for ISTE CEAL. They bridge the gap between the student body and university administration, ensuring all club activities align with institutional goals. They provide invaluable mentorship, approve budgets, guide long-term planning, and bring a wealth of academic and industry experience to help the executive committee navigate complex challenges."
            },
            {
                title: "Mentor",
                icon: Compass,
                description: "Mentors are distinguished alumni, industry professionals, or senior members who have previously walked the path of leadership. They offer indispensable guidance, technical expertise, and career advice to current members. By sharing their past experiences and industry insights, they help shape the technical and professional development of the team, ensuring continuous growth and preventing the repetition of past mistakes."
            }
        ]
    },
    {
        title: "Core Committee",
        description: "The primary leadership executing the club's vision.",
        color: "from-sky-400 to-blue-600",
        shadow: "shadow-sky-500/20",
        roles: [
            {
                title: "Chairperson",
                icon: Crown,
                description: "The Chairperson is the principal leader and official representative of ISTE CEAL. They are responsible for overseeing all club operations, orchestrating the overarching vision, and leading the executive committee. From managing high-level partnerships to resolving internal disputes, the Chairperson ensures the club operates smoothly, meets its objectives, and continually scales to new heights of innovation."
            },
            {
                title: "Vice Chairperson",
                icon: Scale,
                description: "The Vice Chairperson serves as the critical second-in-command, working hand-in-hand with the Chairperson to execute the club's strategy. They manage internal workflows, monitor the progress of various departments, and ensure inter-team synergy. In the absence of the Chairperson, they step up to lead, ensuring unbroken continuity in leadership and operational excellence."
            },
            {
                title: "Secretary",
                icon: ClipboardSignature,
                description: "The Secretary is the operational engine of the club. They are responsible for maintaining all official records, coordinating meeting agendas, and handling vital internal and external correspondence. By meticulously tracking decisions, managing schedules, and ensuring transparent communication across all departments, the Secretary keeps the club organized and legally compliant."
            },
            {
                title: "Vice Secretary",
                icon: ListChecks,
                description: "Working closely with the Secretary, the Vice Secretary assists in managing the club's administrative workload. They help in drafting minutes, organizing internal documentation, and tracking the attendance and engagement of members. They play a vital role in ensuring that the administrative backbone of the club remains strong and efficient."
            },
            {
                title: "Treasurer",
                icon: Coins,
                description: "The Treasurer is the chief financial officer of the club. They manage the budget, oversee funding allocations for events, and meticulously track all expenses and revenues. By ensuring financial transparency and actively seeking out sponsorships and funding opportunities, the Treasurer guarantees that ISTE CEAL has the resources necessary to execute grand-scale events and technical projects."
            }
        ]
    },
    {
        title: "Technical Team",
        description: "Architects and builders of our digital ecosystem.",
        color: "from-emerald-400 to-teal-600",
        shadow: "shadow-emerald-500/20",
        roles: [
            {
                title: "Tech Lead",
                icon: Terminal,
                description: "The Tech Lead is the chief architect behind ISTE CEAL's digital initiatives. They make critical decisions regarding technology stacks, system architecture, and development workflows. Beyond writing code, the Tech Lead is responsible for mentoring junior developers, conducting code reviews, and ensuring that all technical projects—from the club website to event platforms—are secure, scalable, and built to industry standards."
            },
            {
                title: "Developer",
                icon: Code2,
                description: "Developers are the builders of the club. They write the code that brings our digital ideas to life. Whether it's crafting beautiful frontend interfaces, building robust backend APIs, or managing databases, Developers work collaboratively to create and maintain the software ecosystem of ISTE CEAL, turning complex technical requirements into seamless user experiences."
            },
            {
                title: "Documentation Lead",
                icon: BookOpen,
                description: "The Documentation Lead ensures that knowledge is never lost. They are responsible for creating, organizing, and maintaining comprehensive documentation for all technical projects, APIs, and club workflows. By writing clear guides, standard operating procedures, and open-source readme files, they ensure that new members can onboard quickly and that projects can be sustained across academic years."
            }
        ]
    },
    {
        title: "Creative & Communications",
        description: "The visual and narrative voice of the club.",
        color: "from-purple-400 to-pink-600",
        shadow: "shadow-purple-500/20",
        roles: [
            {
                title: "Design Team",
                icon: Palette,
                description: "The Design Team crafts the visual identity and aesthetic soul of ISTE CEAL. They are masters of UI/UX, typography, and visual branding. From designing stunning event posters and social media graphics to creating the user interfaces for our software projects, the Design Team ensures that every outward-facing aspect of the club looks professional, engaging, and cutting-edge."
            },
            {
                title: "Media Team",
                icon: Camera,
                description: "The Media Team captures the magic and energy of ISTE CEAL. They are skilled photographers, videographers, and editors who document our workshops, hackathons, and seminars. By producing high-quality recap videos, promotional teasers, and event photography, the Media Team immortalizes our achievements and fuels our marketing campaigns."
            },
            {
                title: "Content Writer",
                icon: PenTool,
                description: "Content Writers are the voice of the club. They craft compelling narratives that communicate our vision to the world. Their responsibilities include writing engaging blog posts, detailed event descriptions, captivating social media copy, and professional newsletters. They ensure that our messaging is clear, impactful, and perfectly tailored to our audience."
            }
        ]
    },
    {
        title: "Operations & Outreach",
        description: "Executing events and building community.",
        color: "from-orange-400 to-red-600",
        shadow: "shadow-orange-500/20",
        roles: [
            {
                title: "Event Coordinator",
                icon: Target,
                description: "Event Coordinators are the masterminds behind our successful events. They handle end-to-end logistics, from initial brainstorming and venue booking to speaker outreach and day-of execution. By meticulously managing timelines, coordinating with vendors, and troubleshooting on the fly, they ensure that every workshop and hackathon runs flawlessly and delivers massive value to attendees."
            },
            {
                title: "Membership Developer",
                icon: UserPlus,
                description: "The Membership Developer focuses entirely on the growth and satisfaction of our member base. They design recruitment campaigns, manage the onboarding process for new students, and organize team-building activities. By ensuring that every member feels valued, engaged, and provided with opportunities to grow, they cultivate a strong, loyal club community."
            },
            {
                title: "Community Rep",
                icon: Globe,
                description: "The Community Representative is the vital link between the executive committee and the general student body. They actively listen to feedback, gauge the interests of students, and advocate for initiatives that the community actually wants. By maintaining an active presence in university forums and group chats, they help tailor our events to maximize impact and attendance."
            }
        ]
    },
    {
        title: "The Backbone",
        description: "The foundational power of ISTE CEAL.",
        color: "from-gray-300 to-white",
        shadow: "shadow-white/20",
        roles: [
            {
                title: "Volunteer",
                icon: Zap,
                description: "Volunteers are the energetic force that makes our large-scale events possible. They step up to handle crucial on-the-ground tasks, from managing registration desks and guiding attendees to providing technical support during workshops. Their dedication and hard work ensure that events run smoothly and that attendees have a world-class experience."
            },
            {
                title: "Member",
                icon: Star,
                description: "Members are the heart and soul of ISTE CEAL. They are passionate learners and innovators who actively participate in our events, contribute to discussions, and drive the vibrant culture of the club. By engaging with our resources and bringing their unique perspectives to the table, Members are the very reason the club exists and thrives."
            }
        ]
    }
];

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-[#020617] pb-32 overflow-hidden">
            {/* BACKGROUND EFFECT: Flowing Dark Aurora Borealis */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-indigo-900/10 to-transparent skew-x-12 blur-[120px]"
                />
            </div>

            <div className="relative z-10">
                {/* Spacer for navbar */}
                <div className="h-20"></div>

                {/* Hero Section */}
                <section className="relative pt-20 pb-16">
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" 
                    />
                    <motion.div 
                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" 
                    />

                <div className="container-centered relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-gray-300 mb-6"
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>The Blueprint</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-extrabold mb-6 text-white text-5xl md:text-7xl tracking-tight"
                    >
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Operate</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl md:text-2xl leading-relaxed"
                    >
                        Discover the diverse roles and passionate individuals that power ISTE CEAL. Every position is critical to our mission.
                    </motion.p>
                </div>
            </section>

            {/* Roles Sections */}
            <section className="container-centered relative z-10">
                {roleCategories.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-32"
                    >
                        {/* Category Header */}
                        <div className="text-center mb-16">
                            <h2 className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color} mb-4`}>
                                {category.title}
                            </h2>
                            <p className="text-gray-400 text-lg uppercase tracking-widest font-semibold">
                                {category.description}
                            </p>
                            <div className={`h-1 w-24 mx-auto mt-6 rounded-full bg-gradient-to-r ${category.color} opacity-50`} />
                        </div>

                        {/* Roles List */}
                        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                            {category.roles.map((role, roleIndex) => (
                                <motion.div
                                    key={role.title}
                                    initial={{ opacity: 0, x: roleIndex % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    className={`group relative bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 hover:border-white/30 transition-all duration-500 shadow-xl hover:${category.shadow} overflow-hidden`}
                                >
                                    {/* Subtle glowing background on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

                                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                        {/* Large Avatar Icon */}
                                        <div className={`shrink-0 p-5 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg shadow-black/50 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                            <role.icon className="w-12 h-12" />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                                {role.title}
                                            </h3>
                                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
                                                {role.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </section>
            </div>
        </main>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, BookOpen, Clock, Users, GraduationCap, School, Heart } from "lucide-react";

export default function StartHere() {
    return (
        <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 font-sans pb-32">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-[#030712] to-transparent pointer-events-none z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 md:pt-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">// START_HERE_GUIDE</span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Curiosity OS is a place to <br className="hidden md:inline" />
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">practice better thinking.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                        This is a free, open, and completely static learning exploration system. No login, no payments, no SaaS database setup. Just pure ideas and practical tools.
                    </p>
                </motion.div>

                {/* Two Ways to Explore */}
                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 border-b border-white/5 pb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Two ways to explore
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center mb-6">
                                <Compass className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3 group-hover:text-cyan-300 transition-colors">The Curiosity Verse</h3>
                            <p className="text-slate-400 font-light leading-relaxed mb-6">
                                A dynamic, visual 3D constellation map of 147 interconnected ideas, science paradigms, and systemic layers. Explore how different domains of knowledge overlap and talk to one another.
                            </p>
                            <Link href="/verse" className="inline-flex items-center text-xs font-mono text-cyan-400 hover:text-cyan-300 tracking-wider uppercase">
                                ENTER THE VERSE &rarr;
                            </Link>
                        </div>

                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center mb-6">
                                <BookOpen className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3 group-hover:text-cyan-300 transition-colors">The Activity Library</h3>
                            <p className="text-slate-400 font-light leading-relaxed mb-6">
                                A static repository of 36 high-fidelity thinking tools, mental challenges, and group labs. Designed to be run with absolutely zero setup friction, either solo or with others.
                            </p>
                            <Link href="/activities" className="inline-flex items-center text-xs font-mono text-cyan-400 hover:text-cyan-300 tracking-wider uppercase">
                                BROWSE ACTIVITIES &rarr;
                            </Link>
                        </div>
                    </div>
                </motion.section>

                {/* 5 Minute Loop */}
                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-gradient-to-br from-cyan-950/10 to-transparent border border-cyan-950/50 p-8 rounded-3xl mb-16 shadow-[0_0_30px_rgba(0,240,255,0.02)]"
                >
                    <h2 className="text-xl md:text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        <Clock className="w-5 h-5" />
                        Use it in 5 minutes
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left">
                        {[
                            { num: "01", title: "Pick a Challenge", text: "Browse the Activity Library and select one task that catches your eye." },
                            { num: "02", title: "Try it Honestly", text: "Read the rules, put away distractions, and run the activity in good faith." },
                            { num: "03", title: "Write or Discuss", text: "Answer the simple reflection prompts. Write them down or talk about them." },
                            { num: "04", title: "Follow the Path", text: "Look at the 'Try Next' links at the bottom of the page to keep going." }
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-mono font-bold text-cyan-500/40 mb-2">{step.num}</span>
                                <h4 className="text-white font-medium text-sm mb-1">{step.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Audiences */}
                <motion.section
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-6 mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-white border-b border-white/5 pb-3" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Who is this for?
                    </h2>

                    <div className="space-y-4">
                        <div className="flex gap-4 p-5 rounded-2xl bg-slate-950/30 border border-white/[0.03]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-cyan-400">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">For Students</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Use this to push beyond simple memorization. Select activities under <strong>Reality Check</strong> or <strong>Study Engine</strong> to learn how to identify bias, understand compounding networks, study without burnout, and ask sharper questions.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-5 rounded-2xl bg-slate-950/30 border border-white/[0.03]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-cyan-400">
                                <School className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">For Teachers</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Inject active conceptual thinking directly into your classrooms. Use the library playbooks to find high-energy interactive roleplays, discussions, or challenges. No software setup is needed—just follow the written step-by-step instructions.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-5 rounded-2xl bg-slate-950/30 border border-white/[0.03]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-cyan-400">
                                <Heart className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">For Parents & Self-Learners</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Use these resources as natural starting points for deep family conversations. Explore the 3D map together, or run short, collaborative challenges to practice decision-making, trust, and focus.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Final Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 border-t border-white/5 pt-12"
                >
                    <Link
                        href="/verse"
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-700/10 border border-cyan-500/40 text-cyan-100 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/30 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
                    >
                        Enter Curiosity Verse
                    </Link>
                    <Link
                        href="/activities"
                        className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white font-medium text-sm transition-all"
                    >
                        Explore Activity Library
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}

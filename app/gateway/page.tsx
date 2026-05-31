"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Orbit, Compass, BookOpen, Clock, GraduationCap, School, Heart } from "lucide-react";

export default function GatewayGuide() {
    return (
        <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 font-sans pb-48 overflow-x-hidden relative">
            
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#020617] to-transparent pointer-events-none z-0" />
            <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-950/10 to-transparent pointer-events-none z-0" />

            {/* Navigation / Return */}
            <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>RETURN_TO_HUB</span>
                </Link>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-24">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">// START_HERE_GUIDE</span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Curiosity OS: A simple place to <br className="hidden md:inline" />
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">practice better thinking.</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                        This is a free, open, and completely static learning exploration system. No login, no progress tracking, and no database configuration. Just pure ideas, practical challenges, and a visual curiosity map.
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
                        
                        {/* Curiosity Verse */}
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center mb-6">
                                    <Compass className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-cyan-300 transition-colors">The Curiosity Verse</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                                    Enter the visual map when you want to explore connected ideas, perspectives, and thinking nodes across an interactive 3D universe mesh.
                                </p>
                            </div>
                            <Link href="/verse" className="inline-flex items-center text-xs font-mono text-cyan-400 hover:text-cyan-300 tracking-wider uppercase mt-4">
                                ENTER THE VERSE &rarr;
                            </Link>
                        </div>

                        {/* Activity Library */}
                        <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-800/30 flex items-center justify-center mb-6">
                                    <BookOpen className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-cyan-300 transition-colors">The Activity Library</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                                    Pick a simple activity when you want something practical to try alone, with friends, at home, or directly inside a classroom.
                                </p>
                            </div>
                            <Link href="/activities" className="inline-flex items-center text-xs font-mono text-cyan-400 hover:text-cyan-300 tracking-wider uppercase mt-4">
                                BROWSE ACTIVITIES &rarr;
                            </Link>
                        </div>

                    </div>
                </motion.section>

                {/* 5 Minute Timeline */}
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
                            { num: "01", title: "Open an Activity", text: "Browse the library and pick a thinking card or group lab challenge." },
                            { num: "02", title: "Read the Steps", text: "Read the rules, put away distractions, and try the activity honestly." },
                            { num: "03", title: "Reflect or Discuss", text: "Answer the observation prompts at the bottom to test what you noticed." },
                            { num: "04", title: "Explore the Verse", text: "Follow links to see how the activity ties back to nodes in the 3D map." }
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-mono font-bold text-cyan-500/40 mb-2">{step.num}</span>
                                <h4 className="text-white font-medium text-sm mb-1">{step.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Who is this for? */}
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
                                <p className="text-slate-400 text-sm font-light leading-relaxed font-sans">
                                    Use it to ask better questions, study beyond memorization, identify cognitive biases, and train yourself to think more clearly and observe critically.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-5 rounded-2xl bg-slate-950/30 border border-white/[0.03]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-cyan-400">
                                <School className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">For Teachers & Mentors</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed font-sans">
                                    Add active conceptual thinking directly into your sessions. Use the step-by-step group playbooks to prompt lively discussions and roleplays without any onboarding barriers.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-5 rounded-2xl bg-slate-950/30 border border-white/[0.03]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-cyan-400">
                                <Heart className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">For Parents & Self-Learners</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed font-sans">
                                    Start interesting family conversations, try collaborative decision exercises, and learn to trace causal loops in the systems around you.
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
                        className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-700/10 border border-cyan-500/40 text-cyan-100 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/30 hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
                    >
                        <Orbit className="w-4 h-4" />
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

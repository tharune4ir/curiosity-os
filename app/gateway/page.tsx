"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Orbit, CheckCircle2 } from "lucide-react";

export default function GatewayManifesto() {
    return (
        <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden pb-20">
            
            {/* Nav / Return */}
            <div className="fixed top-6 left-6 md:top-10 md:left-10 z-50">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-cyan-500/30 hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="hidden md:block">RETURN_TO_HUB</span>
                </Link>
            </div>

            {/* SECTION 1: HERO */}
            <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 pt-20">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#020617] to-[#020617] pointer-events-none" />
                
                <div className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between z-10 gap-16">
                    {/* Left: Headline */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            A learning layer for <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">teachers shaping young minds.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed font-light">
                            Curiosity OS is being shaped for teachers, mentors, and schools working with Class 9–10 students — especially in India. It is an exploration of simple, activity-first ways to build stronger thinking, better discussion, and real-world capability into everyday learning.
                            <br/><br/>
                            It is not a replacement for school. It is an evolving layer for richer learning in an AI-shaped world.
                        </p>
                        <p className="text-sm md:text-base text-slate-500 font-mono tracking-wide border-l-2 border-cyan-500/30 pl-4 mb-10 leading-relaxed">
                            Not another subject.<br/>
                            Not another content dump.<br/>
                            <strong className="text-cyan-400 font-semibold mt-1 block">An evolving learning layer for planning, guiding, and adapting meaningful activity.</strong>
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/activities" className="px-6 py-3 rounded-full bg-white text-[#020617] font-semibold text-sm tracking-wide hover:scale-105 transition-transform">
                                Explore teacher activities
                            </Link>
                            <a href="#operating-loop" className="px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white font-medium text-sm tracking-wide transition-all">
                                How it works
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Diagram */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 flex justify-center items-center relative w-full aspect-square max-w-[500px]"
                    >
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-10 rounded-full border border-cyan-500/10 animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute inset-20 rounded-full border border-white/5 border-dashed animate-[spin_30s_linear_infinite]" />
                        
                        <div className="relative w-32 h-32 rounded-full bg-slate-900 border border-slate-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.1)] z-10">
                            <Orbit className="w-8 h-8 text-cyan-400 mb-2 opacity-80" />
                            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">ACTIVITY</span>
                        </div>

                        {[
                            { label: "T1 — Plan", angle: 0 },
                            { label: "T2 — Guide", angle: 90 },
                            { label: "T3 — Observe", angle: 180 },
                            { label: "T4 — Adapt", angle: 270 }
                        ].map((wing, i) => (
                            <div key={i} className="absolute w-full h-full flex justify-center items-start" style={{ transform: `rotate(${wing.angle}deg)` }}>
                                <div className="px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/50 flex items-center justify-center -translate-y-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ transform: `rotate(-${wing.angle}deg)`, whiteSpace: 'nowrap' }}>
                                    <span className="text-[10px] font-mono tracking-widest text-cyan-500 uppercase">{wing.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: WHAT TEACHERS GET */}
            <section id="teachers-get" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-12 mb-8">
                        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            What this helps teachers do
                        </h2>
                    </div>
                    
                    <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Run richer classroom activity, not just content delivery",
                            "Build thinking, discussion, and reflection into lessons",
                            "Notice how students are reasoning, not just what they remember",
                            "Adjust what comes next with more clarity"
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/30 transition-all group"
                            >
                                <CheckCircle2 className="w-5 h-5 text-cyan-400 mb-4 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                                <p className="text-slate-200 leading-relaxed font-light">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: SIMPLE OPERATING LOOP */}
            <section id="operating-loop" className="py-32 px-6 border-y border-white/5 bg-slate-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-snug" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        A simple teaching loop
                    </h2>
                    
                    <div className="text-lg md:text-xl text-slate-400 leading-relaxed space-y-8">
                        <p>
                            Curiosity OS helps teachers move through a clear cycle:
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-white font-mono text-sm tracking-widest uppercase mt-12">
                            <ul className="flex flex-col md:flex-row gap-4 list-none p-0 m-0">
                                <li className="px-6 py-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.05)]">Plan meaningful activity</li>
                                <li className="px-6 py-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg shadow-[0_0_15_rgba(0,240,255,0.05)]">Guide students through it</li>
                                <li className="px-6 py-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.05)]">Observe thinking in motion</li>
                                <li className="px-6 py-3 bg-cyan-950/40 border border-cyan-800/50 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.05)]">Adapt what comes next</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: OPTIONAL DEEPER PATH */}
            <section className="py-32 px-6 text-center relative overflow-hidden group">
                <div className="max-w-3xl mx-auto z-10 relative">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        For curious educators
                    </h2>
                    <p className="text-slate-400 mb-12 text-lg leading-relaxed font-light">
                        Behind the activity layer is a deeper curriculum map that structures Curiosity OS. Most teachers do not need to start there. But for those who want to explore the deeper system, it is available.
                    </p>
                    
                    <div className="flex flex-col items-center gap-6">
                        <Link 
                            href="/another_point_of_view" 
                            className="px-8 py-4 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-white font-medium text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(0,240,255,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                        >
                            Enter Curiosity Verse
                        </Link>
                        
                        <Link 
                            href="/another_point_of_view" 
                            className="text-xs font-mono text-slate-500 uppercase tracking-widest hover:text-cyan-400 transition-colors"
                        >
                            Explore the system map
                        </Link>
                    </div>
                </div>

                {/* Subtle Visual Hint: Faint Node Constellation */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
                    <div className="absolute top-1/2 left-1/4 w-px h-px bg-cyan-500 shadow-[0_0_15px_white,0_0_30px_cyan] rounded-full" />
                    <div className="absolute top-1/3 left-1/2 w-px h-px bg-cyan-400 shadow-[0_0_10px_white,0_0_20px_cyan] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/3 w-px h-px bg-blue-500 shadow-[0_0_10px_white,0_0_20px_blue] rounded-full" />
                    <svg className="absolute inset-0 w-full h-full text-cyan-900/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M25 50 L50 33 L66 75 Z" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        <path d="M10 10 Q50 50 90 10" fill="none" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1 2" />
                    </svg>
                </div>
            </section>

        </main>
    );
}

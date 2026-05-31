"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Orbit, Compass, Brain, Share2, Sparkles } from "lucide-react";

export default function VerseGateway() {
    return (
        <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 font-sans pb-36 overflow-x-hidden relative">
            {/* Immersive radial glows */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#020617] to-transparent pointer-events-none z-0" />
            <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-950/10 to-transparent pointer-events-none z-0" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 md:pt-24 flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16">
                
                {/* Left side: Explanatory Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-xl"
                >
                    <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase">// THE_KNOWLEDGE_UNIVERSE</span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Welcome to the <br />
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">Curiosity Verse</span>
                    </h1>
                    
                    <p className="text-base md:text-lg text-slate-400 mb-6 leading-relaxed font-light">
                        The Curiosity Verse is a live, interactive 3D mapping of mental nodes, science paradigms, and systemic layers. It serves as a visual constellation of human learning, displaying how seemingly isolated ideas—from causality loop lines to psychological pressure defenses—connect across a cohesive grid.
                    </p>

                    <p className="text-slate-400 mb-8 leading-relaxed font-light">
                        Instead of treating topics as dry, detached subjects, the system maps ideas as nodes inside an organic neural mesh. Look at perspectives through three focal points: <strong>Student</strong>, <strong>Mentor</strong>, and <strong>Builder</strong>.
                    </p>

                    {/* Features list */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-white">147 Interconnected Concepts</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">Explore a vast galaxy of mapped thinking structures, systems, and observations.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Share2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-white">Causal Relationship Mapping</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">Click on nodes to illuminate their direct influences and trace compound causal relationships.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-semibold text-white">Zero Learning Barriers</h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-light">No setup, no accounts, and no workflows. Just zoom, rotate, search, and learn.</p>
                            </div>
                        </div>
                    </div>

                    {/* Entry CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/another_point_of_view" 
                            className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-700/10 border border-cyan-500/40 hover:bg-cyan-500/30 hover:text-white text-cyan-100 font-mono text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all active:scale-95"
                        >
                            <Orbit className="w-4 h-4 animate-spin-slow" />
                            Enter 3D Curiosity Verse
                        </Link>
                        
                        <Link 
                            href="/activities" 
                            className="inline-flex justify-center items-center px-6 py-4 rounded-full border border-slate-800 hover:border-slate-600 hover:bg-slate-900/60 text-slate-300 text-sm font-medium transition-all"
                        >
                            Browse Activities instead
                        </Link>
                    </div>
                </motion.div>

                {/* Right side: Abstract orbiting visualization */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex-1 flex justify-center items-center relative w-full aspect-square max-w-[400px] xl:max-w-[450px]"
                >
                    <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-[spin_50s_linear_infinite]" />
                    <div className="absolute inset-8 rounded-full border border-white/5 animate-[spin_35s_linear_infinite_reverse]" />
                    <div className="absolute inset-16 rounded-full border border-cyan-500/5 border-dashed animate-[spin_25s_linear_infinite]" />
                    
                    <div className="relative w-36 h-36 rounded-full bg-slate-950 border border-cyan-500/20 flex flex-col items-center justify-center shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),_0_0_50px_rgba(0,240,255,0.15)] z-10">
                        <Orbit className="w-10 h-10 text-cyan-400 mb-2 opacity-90 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
                        <span className="text-[9px] font-mono tracking-widest text-cyan-300 uppercase">SYSTEM_MAP</span>
                    </div>

                    {[
                        { label: "Reality Check", angle: 0 },
                        { label: "Causal Chains", angle: 72 },
                        { label: "Perspectives", angle: 144 },
                        { label: "Decision Loop", angle: 216 },
                        { label: "Study Engine", angle: 288 }
                    ].map((item, i) => (
                        <div key={i} className="absolute w-full h-full flex justify-center items-start" style={{ transform: `rotate(${item.angle}deg)` }}>
                            <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-center -translate-y-4 shadow-[0_0_15px_rgba(0,0,0,0.6)]" style={{ transform: `rotate(-${item.angle}deg)`, whiteSpace: 'nowrap' }}>
                                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </main>
    );
}

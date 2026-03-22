"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Orbit, Network } from "lucide-react";

const TruthStrip = ({ text }: { text: string }) => (
    <div className="w-full border-y border-white/5 bg-slate-900/20 py-12 md:py-20 flex justify-center items-center px-6">
        <h3 className="text-xl md:text-3xl font-light tracking-wide text-center text-slate-200 max-w-4xl leading-relaxed" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            {text}
        </h3>
    </div>
);

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

            {/* BLOCK 1: HERO */}
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
                            An operating system for <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">young minds.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed font-light">
                            Curiosity OS is a new kind of learning architecture for students growing up in an AI-shaped world — one designed not around marks, memorization, or fragmented subjects, but around how a young person learns to <strong className="font-semibold text-slate-200">decode reality, build a better mind, function well with humans, and practice all of it in motion.</strong>
                        </p>
                        <p className="text-sm md:text-base text-slate-500 font-mono tracking-wide border-l-2 border-cyan-500/30 pl-4 mb-10 leading-relaxed">
                            I am not trying to add one more subject to the system.<br/>
                            I am trying to build the layer most students never receive:<br/>
                            <strong className="text-cyan-400 font-semibold mt-1 block">a stronger inner operating system.</strong>
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#four-wings" className="px-6 py-3 rounded-full bg-white text-[#020617] font-semibold text-sm tracking-wide hover:scale-105 transition-transform">
                                Explore the 4 Wings
                            </a>
                            <a href="#founder-note" className="px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-white font-medium text-sm tracking-wide transition-all">
                                Read the philosophy
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Minimal Diagram */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 flex justify-center items-center relative w-full aspect-square max-w-[500px]"
                    >
                        {/* Abstract System UI */}
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-10 rounded-full border border-cyan-500/10 animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute inset-20 rounded-full border border-white/5 border-dashed animate-[spin_30s_linear_infinite]" />
                        
                        <div className="relative w-32 h-32 rounded-full bg-slate-900 border border-slate-700 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.1)] z-10">
                            <Orbit className="w-8 h-8 text-cyan-400 mb-2 opacity-80" />
                            <span className="text-[10px] font-mono tracking-widest text-slate-400">CORE</span>
                        </div>

                        {/* Satellites */}
                        {[
                            { label: "W1 — Decode", angle: 0 },
                            { label: "W2 — Cognition", angle: 90 },
                            { label: "W3 — Relate", angle: 180 },
                            { label: "W4 — Sandbox", angle: 270 }
                        ].map((wing, i) => (
                            <div key={i} className="absolute w-full h-full flex justify-center items-start" style={{ transform: `rotate(${wing.angle}deg)` }}>
                                <div className="px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/50 flex items-center justify-center -translate-y-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ transform: `rotate(-${wing.angle}deg)`, whiteSpace: 'nowrap' }}>
                                    <span className="text-[10px] font-mono tracking-widest text-cyan-500">{wing.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* BLOCK 2: THE PROBLEM */}
            <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-5">
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            Most students are taught to perform. Very few are taught to think.
                        </h2>
                    </div>
                    <div className="md:col-span-7 prose prose-invert prose-lg prose-slate h-[100%] leading-relaxed">
                        <p>
                            A lot of young people spend the most formative years of their lives learning how to succeed inside systems they did not design.
                        </p>
                        <p>
                            They learn how to prepare for exams, repeat definitions, follow instructions, and optimize for short-term performance. Some become high performers. Very few become clear thinkers.
                        </p>
                        <p>
                            The deeper loss is not only academic.
                        </p>
                        <p>
                            It is the absence of a serious inner structure.
                        </p>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 md:p-8 rounded-2xl my-10 font-mono text-sm leading-relaxed shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)]">
                            <span className="text-slate-500 mb-5 block border-b border-slate-700/50 pb-3">// SYSTEM_DEFICITS DETECTED</span>
                            <ul className="space-y-3 list-none p-0 m-0 text-slate-300">
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> A feel for how the world actually works</li>
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> The ability to reason under uncertainty</li>
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> The habit of updating beliefs when reality changes</li>
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> The social clarity to handle pressure, conflict, and manipulation</li>
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> The confidence to build, test, and iterate in the real world</li>
                                <li className="flex items-start gap-3"><span className="text-red-400">×</span> The inner architecture needed to move through complexity without panic</li>
                            </ul>
                        </div>
                        <p>
                            And now the world is changing faster than most curriculums can keep up.
                        </p>
                        <p className="text-slate-200 font-medium">
                            In an AI-shaped future, information becomes cheaper. What becomes more valuable is <strong className="text-cyan-400 font-semibold">judgment, clarity, adaptability, initiative, taste, resilience, and the ability to connect ideas across domains.</strong>
                        </p>
                        <p>That is the gap Curiosity OS is trying to address.</p>
                    </div>
                </div>
            </section>

            <TruthStrip text="Information is abundant. Judgment is rare." />

            {/* BLOCK 3: THE FRAMEWORK */}
            <section className="py-32 px-6 max-w-4xl mx-auto text-center">
                <span className="text-xs font-mono tracking-[0.2em] text-cyan-500 uppercase mb-4 block">The Framework</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-snug" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                    Curiosity OS is not a course.<br/>It is a learning architecture.
                </h2>
                
                <p className="text-lg text-slate-400 leading-relaxed mb-12">
                    Curiosity OS is designed as a long-term operating system for teenagers — especially those at the age where they are old enough to think seriously, but young enough to still be shaped deeply.
                </p>

                <p className="text-lg text-slate-400 leading-relaxed mb-12">
                    It does not treat education as content delivery alone.<br/>
                    It treats education as the formation of:
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm font-mono text-cyan-200 mb-16">
                    <span className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50">perception</span>
                    <span className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50">reasoning</span>
                    <span className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50">self-direction</span>
                    <span className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50">human judgment</span>
                    <span className="bg-cyan-950/30 px-4 py-2 rounded border border-cyan-800/50">practiced capability</span>
                </div>

                <div className="relative py-12">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50" />
                    <blockquote className="text-2xl md:text-3xl font-light text-white italic px-8 text-left leading-snug">
                        &quot;Before a student chooses a career,<br/>they need a better mind.&quot;
                    </blockquote>
                </div>

                <div className="text-left text-slate-400 space-y-6 mt-12 text-lg">
                    <p>Not just more information.<br/>Not just more motivation.<br/>Not just coding, communication, or &quot;life skills&quot; taught in isolation.</p>
                    <p className="font-semibold text-slate-200 mt-8 mb-4">They need a structure that helps them:</p>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base font-mono">
                        <li className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                            <span className="text-cyan-400 font-bold block shrink-0">01</span> Decode reality more clearly
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
                            <span className="text-emerald-400 font-bold block shrink-0">02</span> Understand how their own mind works
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex items-center gap-4 hover:border-purple-500/30 transition-colors">
                            <span className="text-purple-400 font-bold block shrink-0">03</span> Function better with other humans
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex items-center gap-4 hover:border-amber-500/30 transition-colors">
                            <span className="text-amber-400 font-bold block shrink-0">04</span> Practice capability through action, play, and lived experience
                        </li>
                    </ul>
                    
                    <p className="mt-8 leading-relaxed">That is why Curiosity OS is built as a <strong className="text-white">four-wing system</strong>, with each wing solving a different layer of development.</p>
                </div>
            </section>

            <TruthStrip text="A student does not just need skills. They need an operating system." />

            {/* BLOCK 4: THE 4 WINGS (Sticky Scroll) */}
            <section id="four-wings" className="relative">
                <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16 relative items-start">
                    
                    {/* Sticky Left Sidebar */}
                    <div className="lg:w-1/3 xl:sticky xl:top-32 h-auto pb-10 lg:pb-0 z-10 block">
                        <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            The Four Wings
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Each wing is distinct, but they are designed to work together.<br/>The goal is not to produce students who merely know more.<br/>The goal is to shape students who can <strong className="text-white">see clearly, think deeply, relate wisely, and move with real capability.</strong>
                        </p>

                        {/* Minimap abstract graphic */}
                        <div className="hidden lg:block w-full aspect-square border border-white/10 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/20 to-transparent p-6 relative h-[350px]">
                            <Network className="w-full h-full text-slate-800/50 absolute inset-0 m-auto p-12" strokeWidth={1} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                        </div>
                    </div>

                    {/* Scrolling Right Content */}
                    <div className="lg:w-2/3 space-y-24 md:space-y-32 md:pb-32 w-full">
                        
                        {/* WING 1 - DECODE */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all w-full"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">W1 — Decode</span>
                                <h3 className="text-2xl font-semibold text-white">The Reality Hacker’s Toolkit</h3>
                            </div>
                            <h4 className="text-lg text-cyan-200 font-light italic mb-6 relative z-10">Learn to read the hidden structure of reality.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10 w-full">
                                This wing reframes math, logic, probability, systems, strategy, and computation as tools for understanding the real world — not as dead school abstractions.
                                <br/><br/>
                                Students learn how scale works, how uncertainty works, how incentives distort behavior, how patterns repeat across systems, and how to reason beneath the surface instead of reacting to appearances.
                            </p>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-cyan-500/20 transition-colors w-full">
                                <p className="text-sm text-slate-300"><strong className="text-white block mb-1">Why it matters:</strong> Reality does not respond to confidence. It responds to structure.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Logic</span> • <span>Probability</span> • <span>Systems</span>
                            </div>
                        </motion.div>

                        {/* WING 2 - COGNITION */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-slate-900/40 transition-all w-full"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.1)]">W2 — Cognition</span>
                                <h3 className="text-2xl font-semibold text-white">The Cognition Payload</h3>
                            </div>
                            <h4 className="text-lg text-emerald-200 font-light italic mb-6 relative z-10">Learn how your own mind works.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10 w-full">
                                This wing focuses on attention, bias, belief formation, learning, decision-making, scientific reasoning, metacognition, truth-seeking, and writing as a tool for thought.
                                <br/><br/>
                                Students begin to understand how opinions are formed, how thinking goes wrong, how attention gets hijacked, how better questions are built, and how a mind becomes more accurate over time.
                            </p>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-emerald-500/20 transition-colors w-full">
                                <p className="text-sm text-slate-300"><strong className="text-white block mb-1">Why it matters:</strong> A student can only go as far as the quality of their inner cognition.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Bias</span> • <span>Learning</span> • <span>Truth-Seeking</span>
                            </div>
                        </motion.div>

                        {/* WING 3 - RELATE */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 hover:bg-slate-900/40 transition-all w-full"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.1)]">W3 — Relate</span>
                                <h3 className="text-2xl font-semibold text-white">Human Ecosystem Survival Kit</h3>
                            </div>
                            <h4 className="text-lg text-purple-200 font-light italic mb-6 relative z-10">Learn to function well with humans.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10 w-full">
                                This wing focuses on the real social layer of life: communication, boundaries, reliability, emotional regulation in relationships, active listening, peer-pressure defense, manipulation awareness, cooperation, fairness, and reputation.
                                <br/><br/>
                                Students learn how to express themselves clearly, handle pressure without folding, spot unhealthy dynamics earlier, build trust, and move through human systems with more maturity and less confusion.
                            </p>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-purple-500/20 transition-colors w-full">
                                <p className="text-sm text-slate-300"><strong className="text-white block mb-1">Why it matters:</strong> A strong mind is not enough if a student cannot navigate real people well.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Communication</span> • <span>Boundaries</span> • <span>Cooperation</span>
                            </div>
                        </motion.div>

                        {/* WING 4 - SANDBOX */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 hover:bg-slate-900/40 transition-all w-full"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.1)]">W4 — Sandbox</span>
                                <h3 className="text-2xl font-semibold text-white">Wing 4 Sandbox: Chaos Zones</h3>
                            </div>
                            <h4 className="text-lg text-amber-200 font-light italic mb-6 relative z-10">Turn learning into action, rehearsal, quests, and lived practice.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10 w-full">
                                This wing is not another theory-heavy subject. It is the practice universe where the rest of Curiosity OS comes alive.
                                <br/><br/>
                                Through zones, missions, games, roleplay, movement, journaling, playful experiments, co-op challenges, and creative build sessions, students stop only understanding concepts and start rehearsing them in the body, in groups, and in real situations.
                                <br/><br/>
                                <strong className="text-slate-200 font-medium">This is where cognition becomes sticky.<br/>This is where clarity becomes behavior.<br/>This is where learning becomes lived.</strong>
                            </p>
                            <div className="p-5 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-amber-500/20 transition-colors w-full">
                                <p className="text-sm text-slate-300"><strong className="text-white block mb-1">Why it matters:</strong> Students remember what they do, not only what they hear.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Quests</span> • <span>Practice</span> • <span>Embodiment</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* BLOCK 5: STUDENT TRANSFORMATION */}
            <TruthStrip text="The goal is not performance alone. It is formation." />

            <section className="py-24 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        What changes in the student
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The real outcome of Curiosity OS is not a certificate.<br/>It is a different kind of person.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="p-8 md:p-10 border-t-2 border-slate-800 bg-gradient-to-b from-slate-900/40 to-transparent rounded-b-xl">
                        <span className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-8 block">Without the OS</span>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>overloaded with information</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>trained mostly for performance</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>uncertain in open-ended situations</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>easier to confuse, pressure, or derail</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>dependent on external structure</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400">
                                <span className="text-slate-600 mt-1 shrink-0">↳</span> <span>full of potential, but lacking integration</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 md:p-10 border-t-2 border-cyan-500/50 bg-gradient-to-b from-cyan-900/10 to-transparent rounded-b-xl shadow-[0_10px_40px_rgba(0,240,255,0.02)]">
                        <span className="text-sm font-mono text-cyan-500 tracking-widest uppercase mb-8 block drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">With the OS</span>
                        <ul className="space-y-5 font-medium">
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>sees reality more clearly</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>thinks with better judgment under uncertainty</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>asks sharper questions & spots weak reasoning</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>learns faster across domains</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>functions better with humans</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>builds more than they merely consume</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>develops confidence rooted in competence</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-200">
                                <span className="text-cyan-400 mt-1 shrink-0">↳</span> <span>becomes harder to confuse and easier to trust</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-center text-slate-500 mt-16 italic font-light max-w-xl mx-auto leading-relaxed">
                    That change may not always look dramatic at first.<br/>But over time, it compounds.<br/>And that is the point.
                </p>
            </section>

            {/* BLOCK 6: WHY NOW */}
            <section className="py-32 px-6 border-y border-white/5 bg-[#01040a] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Why this matters now
                    </h2>
                    
                    <div className="text-lg text-slate-400 leading-relaxed text-left space-y-6 bg-slate-900/30 p-8 md:p-14 rounded-3xl border border-slate-800 shadow-xl">
                        <p>For a long time, education could afford to be slow, narrow, and fragmented because the world outside moved more slowly too.</p>
                        <p className="font-semibold text-white">That is no longer true.</p>
                        <p>Students now grow up inside a world shaped by:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8 font-mono text-[13px] text-slate-300">
                            <li className="border-l-2 border-cyan-500/30 pl-4 py-1">AI systems generating answers instantly</li>
                            <li className="border-l-2 border-emerald-500/30 pl-4 py-1">Information abundance & attention scarcity</li>
                            <li className="border-l-2 border-purple-500/30 pl-4 py-1">Fast-changing industries & blurred career paths</li>
                            <li className="border-l-2 border-amber-500/30 pl-4 py-1">Social influence at scale</li>
                            <li className="border-l-2 border-rose-500/30 pl-4 py-1">Digital leverage & global competition</li>
                            <li className="border-l-2 border-blue-500/30 pl-4 py-1">Increasing complexity with decreasing patience for confusion</li>
                        </ul>
                        <p>In that world, the question is not only:</p>
                        <p className="font-medium text-slate-300 italic mb-4">“What should students know?”</p>
                        <div className="p-8 bg-cyan-950/20 rounded-2xl border border-cyan-500/20 text-center my-10 shadow-[inner_0_0_20px_rgba(0,240,255,0.05)]">
                            <p className="text-xl md:text-2xl font-light text-cyan-100">
                                The deeper question is:<br/><strong className="font-semibold text-white tracking-wide mt-2 block">“What kind of mind should a student become?”</strong>
                            </p>
                        </div>
                        <p>Curiosity OS is one attempt to answer that question seriously.</p>
                        <p>Not perfectly. Not finally. But seriously.</p>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: FOUNDER NOTE */}
            <section id="founder-note" className="py-24 px-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-[1px] bg-slate-600" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">A note behind the work</span>
                </div>
                
                <div className="prose prose-invert prose-lg prose-slate text-slate-300 leading-relaxed font-light">
                    <p>Curiosity OS did not begin with the idea of building another educational product.</p>
                    <p>It began with a simpler discomfort:</p>
                    <p className="italic text-slate-200">that too many bright young people are growing up inside systems that train compliance better than judgment.</p>
                    <p>A student can spend years being evaluated without ever being deeply formed. That felt like a loss.</p>
                    <p>This work is an attempt to build something more foundational — something that treats education not as content delivery alone, but as the shaping of perception, reasoning, character, agency, and practiced capability.</p>
                    <p>The ambition here is not to make students look impressive on paper. It is to help them become:</p>
                    <ul className="font-medium text-slate-200 mb-8 max-w-md">
                        <li className="mb-2">— harder to confuse</li>
                        <li className="mb-2">— better able to think</li>
                        <li className="mb-2">— more grounded in reality</li>
                        <li className="mb-2">— more capable with people</li>
                        <li className="mb-2">— more willing to build</li>
                        <li className="mb-2">— more alive to the world they are actually living in</li>
                    </ul>
                </div>
                
                <div className="mt-16 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 font-serif italic text-2xl shadow-[0_5px_15px_rgba(0,0,0,0.5)]">T</div>
                    <div>
                        <div className="text-white font-medium text-lg">Tharun Gajula</div>
                        <div className="text-xs font-mono text-slate-500 mt-1">Founder, Curiosity OS</div>
                    </div>
                </div>
            </section>

            {/* BLOCK 8: CTA FOOTER */}
            <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-[#020617] to-[#01040a] text-center relative">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                    If this resonates, let’s talk.
                </h2>
                <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed font-light">
                    Curiosity OS is being shaped with long-term seriousness. If you are a parent, educator, collaborator, or someone who cares deeply about how young people should be prepared for the future, I’d be glad to connect.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <a href="mailto:tharune4ir@gmail.com" className="px-8 py-4 rounded-full bg-white text-slate-950 font-semibold text-sm tracking-wide transition-all hover:scale-105 hover:bg-cyan-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Get in touch
                    </a>
                    <Link href="/another_point_of_view" className="px-8 py-4 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-white font-medium text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(0,240,255,0)] hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                        Explore the Core Graph
                    </Link>
                </div>
            </section>

        </main>
    );
}

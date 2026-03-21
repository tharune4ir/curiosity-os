"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Network, GitBranch, Cpu, Target, Orbit } from "lucide-react";

const TruthStrip = ({ text }: { text: string }) => (
    <div className="w-full border-y border-white/5 bg-slate-900/20 py-12 md:py-20 flex justify-center items-center px-6">
        <h3 className="text-xl md:text-3xl font-light tracking-wide text-center text-slate-200 max-w-4xl" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            {text}
        </h3>
    </div>
);

export default function GatewayManifesto() {
    return (
        <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
            
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
                
                <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between z-10 gap-16">
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
                            Curiosity OS is a new kind of learning architecture for students growing up in an AI-shaped world — one that goes beyond marks, memorization, and fragmented skills, and focuses on how a young person learns to think, make sense of reality, build things, and move through the world with clarity.
                        </p>
                        <p className="text-sm md:text-base text-slate-500 font-mono tracking-wide border-l-2 border-cyan-500/30 pl-4 mb-10">
                            We are not trying to add one more subject to the system.<br/>
                            We are trying to build the layer that most students never receive:<br/>
                            a strong inner operating system.
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
                            <span className="text-[9px] font-mono tracking-widest text-slate-400">CORE</span>
                        </div>

                        {/* Satellites */}
                        {[
                            { label: "W1", angle: 0 },
                            { label: "W2", angle: 90 },
                            { label: "W3", angle: 180 },
                            { label: "W4", angle: 270 }
                        ].map((wing, i) => (
                            <div key={i} className="absolute w-full h-full flex justify-center items-start" style={{ transform: `rotate(${wing.angle}deg)` }}>
                                <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center -translate-y-6" style={{ transform: `rotate(-${wing.angle}deg)` }}>
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
                        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            Most students are taught to perform. Very few are taught to think.
                        </h2>
                    </div>
                    <div className="md:col-span-7 prose prose-invert prose-lg prose-slate h-[100%]">
                        <p>
                            A lot of young people spend the most important years of their lives learning how to comply with systems they did not design.
                        </p>
                        <p>
                            They learn to prepare for exams, repeat definitions, follow instructions, and optimize for short-term performance. Some become &quot;good students.&quot; Very few become clear thinkers.
                        </p>
                        <p>
                            The result is not just academic weakness. It is something deeper.
                        </p>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl my-8 font-mono text-sm leading-relaxed">
                            <span className="text-slate-500 mb-4 block">// SYSTEM_DEFICITS DETECTED</span>
                            <ul className="space-y-2 list-none p-0 m-0">
                                <li><span className="text-red-400 mr-2">×</span> A feel for how the world actually works</li>
                                <li><span className="text-red-400 mr-2">×</span> The ability to reason under uncertainty</li>
                                <li><span className="text-red-400 mr-2">×</span> The confidence to ask better questions</li>
                                <li><span className="text-red-400 mr-2">×</span> The skill to communicate clearly</li>
                                <li><span className="text-red-400 mr-2">×</span> The habit of building things</li>
                                <li><span className="text-red-400 mr-2">×</span> The inner structure needed to navigate complexity</li>
                            </ul>
                        </div>
                        <p>
                            And now the world is changing faster than the curriculum can keep up.
                        </p>
                        <p className="text-slate-200 font-medium">
                            In an AI-shaped future, information is cheap. What becomes valuable is judgment, clarity, adaptability, taste, initiative, and the ability to combine knowledge across domains.
                        </p>
                        <p>That is the gap Curiosity OS is trying to address.</p>
                    </div>
                </div>
            </section>

            <TruthStrip text="Information is abundant. Judgment is rare." />

            {/* BLOCK 3: WHAT IT IS */}
            <section className="py-32 px-6 max-w-4xl mx-auto text-center">
                <span className="text-xs font-mono tracking-[0.2em] text-cyan-500 uppercase mb-4 block">The Framework</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                    Curiosity OS is not a course.<br/>It is a learning architecture.
                </h2>
                
                <p className="text-lg text-slate-400 leading-relaxed mb-12">
                    Curiosity OS is designed as a long-term cognitive framework for teenagers — especially those at the age where they are old enough to think seriously, but young enough to still be shaped deeply.
                </p>

                <div className="relative py-12">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50" />
                    <blockquote className="text-2xl md:text-3xl font-light text-white italic px-8 text-left leading-snug">
                        &quot;Before a student chooses a career,<br/>they need a better mind.&quot;
                    </blockquote>
                </div>

                <div className="text-left text-slate-400 space-y-6 mt-12 text-lg">
                    <p>Not just more information. Not just more motivation. Not just coding, communication, or &quot;life skills&quot; taught in isolation.</p>
                    <p className="font-semibold text-slate-200">They need a structure that helps them:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base font-mono">
                        <li className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-cyan-500/30 transition-colors">
                            <span className="text-cyan-400">01</span> See reality more clearly
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-emerald-500/30 transition-colors">
                            <span className="text-emerald-400">02</span> Understand how their own mind works
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-purple-500/30 transition-colors">
                            <span className="text-purple-400">03</span> Turn thought into expression
                        </li>
                        <li className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-amber-500/30 transition-colors">
                            <span className="text-amber-400">04</span> Build discipline to execute
                        </li>
                    </ul>
                    <p className="mt-8">That is why Curiosity OS is built as a four-wing system, with each wing solving a different layer of development.</p>
                </div>
            </section>

            <TruthStrip text="A student does not just need skills. They need an operating system." />

            {/* BLOCK 4: THE 4 WINGS (Sticky Scroll) */}
            <section id="four-wings" className="relative">
                <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16 relative items-start">
                    
                    {/* Sticky Left Sidebar */}
                    <div className="md:w-1/3 md:sticky md:top-32 h-auto pb-10 md:pb-0 z-10">
                        <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                            The Four Wings
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Each wing is distinct, but they are designed to work together. The aim is not to create students who merely know more. The aim is to develop students who can think, build, and act with depth.
                        </p>

                        {/* Minimap abstract graphic */}
                        <div className="hidden md:block w-full aspect-square border border-white/10 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/20 to-transparent p-6 relative">
                            <Network className="w-full h-full text-slate-800/50 absolute inset-0 m-auto p-12" strokeWidth={1} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                        </div>
                    </div>

                    {/* Scrolling Right Content */}
                    <div className="md:w-2/3 space-y-32 md:pb-32">
                        
                        {/* WING 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">W1</span>
                                <h3 className="text-2xl font-semibold text-white">The Reality Hacker’s Toolkit</h3>
                            </div>
                            <h4 className="text-lg text-cyan-200 font-light italic mb-6 relative z-10">Learn to see the hidden structure of reality.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                                This wing uses math, logic, probability, systems, and computation not as academic subjects, but as tools for understanding the real world. Students learn how scale works, how uncertainty works, how trade-offs work, how causality works, and how to reason more structurally instead of relying on surface impressions.
                            </p>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-cyan-500/20 transition-colors">
                                <p className="text-sm text-slate-300"><strong className="text-white">Why it matters:</strong> Reality does not care about confidence. It responds to structure.</p>
                            </div>
                            <div className="mt-8 flex gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Probability</span> • <span>Systems</span> • <span>Logic</span>
                            </div>
                        </motion.div>

                        {/* WING 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">W2</span>
                                <h3 className="text-2xl font-semibold text-white">The Cognition Payload</h3>
                            </div>
                            <h4 className="text-lg text-cyan-200 font-light italic mb-6 relative z-10">Learn how your own mind works.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                                This wing focuses on perception, belief, judgment, bias, learning, self-regulation, writing, and truth-seeking. Students begin to understand how they form opinions, where thinking goes wrong, how attention gets shaped, how better decisions get made, and how writing can be used not just to communicate, but to think.
                            </p>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-cyan-500/20 transition-colors">
                                <p className="text-sm text-slate-300"><strong className="text-white">Why it matters:</strong> A student can only go as far as the quality of their inner operating system.</p>
                            </div>
                            <div className="mt-8 flex gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Bias</span> • <span>Truth-seeking</span> • <span>Metacognition</span>
                            </div>
                        </motion.div>

                        {/* WING 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">W3</span>
                                <h3 className="text-2xl font-semibold text-white">The Signal Forge</h3>
                            </div>
                            <h4 className="text-lg text-cyan-200 font-light italic mb-6 relative z-10">Turn thought into expression, tools, and visible work.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                                This wing is about communication, research, AI fluency, digital making, product thinking, and publishing. Students learn how to express ideas clearly, work with knowledge, use AI intelligently, make things with modern tools, and turn their thinking into artifacts that others can see and evaluate.
                            </p>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-cyan-500/20 transition-colors">
                                <p className="text-sm text-slate-300"><strong className="text-white">Why it matters:</strong> In the modern world, unseen potential is not enough. A student must learn how to create signal.</p>
                            </div>
                            <div className="mt-8 flex gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Expression</span> • <span>AI Fluency</span> • <span>Digital Making</span>
                            </div>
                        </motion.div>

                        {/* WING 4 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="bg-slate-900/20 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/40 transition-all"
                        >
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <span className="text-xs font-mono px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.1)]">W4</span>
                                <h3 className="text-2xl font-semibold text-white">The Delivery Engine</h3>
                            </div>
                            <h4 className="text-lg text-cyan-200 font-light italic mb-6 relative z-10">Turn capability into real-world movement.</h4>
                            <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                                This wing focuses on execution, consistency, systems, collaboration, negotiation, leverage, and long-term direction. Students learn how to finish what they start, manage projects, work with other people, build trust, create momentum, and think in terms of compounding rather than short bursts of motivation.
                            </p>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/5 relative z-10 hover:border-cyan-500/20 transition-colors">
                                <p className="text-sm text-slate-300"><strong className="text-white">Why it matters:</strong> Talent without execution remains invisible.</p>
                            </div>
                            <div className="mt-8 flex gap-3 text-xs font-mono text-slate-500 relative z-10">
                                <span>Execution</span> • <span>Systems</span> • <span>Compounding</span>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* BLOCK 5: STUDENT TRANSFORMATION */}
            <TruthStrip text="The goal is not performance alone. It is formation." />

            <section className="py-24 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        What changes in the student
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        The real outcome of Curiosity OS is not a certificate.<br/>It is a different kind of person.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="p-8 border-t-2 border-slate-800 bg-gradient-to-b from-slate-900/40 to-transparent">
                        <span className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-6 block">Without the OS</span>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="text-slate-600 mt-1">↳</span> Overloaded with information
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="text-slate-600 mt-1">↳</span> Trained simply for performance
                            </li>
                            <li className="flex items-start gap-3 text-slate-400">
                                <span className="text-slate-600 mt-1">↳</span> Uncertain in open-ended situations
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 border-t-2 border-cyan-500/50 bg-gradient-to-b from-cyan-900/10 to-transparent">
                        <span className="text-sm font-mono text-cyan-500 tracking-widest uppercase mb-6 block drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">With the OS</span>
                        <ul className="space-y-4 font-medium">
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Thinks more clearly
                            </li>
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Panics less in the face of complexity
                            </li>
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Asks better questions & spots weak reasoning
                            </li>
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Learns faster across domains
                            </li>
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Builds more than they consume
                            </li>
                            <li className="flex items-start gap-3 text-slate-200">
                                <span className="text-cyan-400 mt-1">↳</span> Develops confidence rooted in competence
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-center text-slate-500 mt-16 italic font-light max-w-xl mx-auto">
                    That change may not always look dramatic from the outside in the beginning. But over time, it compounds. And that is the point.
                </p>
            </section>

            {/* BLOCK 6: WHY NOW */}
            <section className="py-32 px-6 border-y border-white/5 bg-[#01040a] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
                
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-10" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                        Why this matters now
                    </h2>
                    
                    <div className="text-lg text-slate-400 leading-relaxed text-left space-y-6 bg-slate-900/30 p-8 md:p-12 rounded-3xl border border-slate-800">
                        <p>For a long time, education could afford to be slow, narrow, and fragmented because the world outside moved more slowly too.</p>
                        <p className="font-semibold text-white">That is no longer true.</p>
                        <p>Students now grow up in a world shaped by:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 font-mono text-xs text-slate-300">
                            <li className="border-l border-cyan-500/30 pl-3">AI systems generating answers instantly</li>
                            <li className="border-l border-emerald-500/30 pl-3">Information abundance & attention scarcity</li>
                            <li className="border-l border-purple-500/30 pl-3">Fast-changing industries & blurred paths</li>
                            <li className="border-l border-amber-500/30 pl-3">Digital leverage & global competition</li>
                        </ul>
                        <p>In that world, the question is not simply: <span className="text-slate-300 italic">"What should students know?"</span></p>
                        <div className="p-6 bg-cyan-950/20 rounded-xl border border-cyan-500/20 text-center my-8">
                            <p className="text-xl font-light text-cyan-100">The deeper question is:<br/><strong className="font-semibold text-white tracking-wide">"What kind of mind should a student have?"</strong></p>
                        </div>
                        <p>Curiosity OS is one attempt to answer that question seriously. Not perfectly. Not finally. But seriously.</p>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: FOUNDER NOTE */}
            <section id="founder-note" className="py-24 px-6 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-[1px] bg-slate-600" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">A note behind the work</span>
                </div>
                
                <div className="prose prose-invert prose-lg prose-slate text-slate-300 leading-relaxed">
                    <p>Curiosity OS did not begin with the idea of building another educational product.</p>
                    <p>It began with a simpler discomfort: that too many bright young people are growing up inside systems that train compliance better than judgment.</p>
                    <p>A student can spend years being evaluated without ever being truly formed. That felt like a loss.</p>
                    <p>This work is an attempt to build something more foundational — something that respects the seriousness of a young mind, and treats education not as content delivery, but as the shaping of perception, thought, taste, and agency.</p>
                    <p>The ambition here is not to make students impressive on paper. It is to help them become harder to confuse, more able to build, and more alive to the world they are actually living in.</p>
                </div>
                
                <div className="mt-12 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-serif italic text-xl">T</div>
                    <div>
                        <div className="text-white font-medium">Tharun</div>
                        <div className="text-xs font-mono text-slate-500">Founder, Curiosity OS</div>
                    </div>
                </div>
            </section>

            {/* BLOCK 8: CTA FOOTER */}
            <section className="py-32 pb-48 px-6 border-t border-white/5 bg-gradient-to-b from-[#020617] to-slate-950 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
                    If this resonates, let’s talk.
                </h2>
                <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg">
                    Curiosity OS is being shaped carefully, with long-term seriousness. If you are a parent, educator, collaborator, or someone who cares deeply about how young people should be prepared for the future, I’d be glad to connect.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a href="mailto:hello@example.com" className="px-8 py-4 rounded-full bg-white text-slate-950 font-semibold text-sm tracking-wide transition-transform hover:scale-105">
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


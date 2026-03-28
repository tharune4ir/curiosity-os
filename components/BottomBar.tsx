"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Search, RefreshCw, Command, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomDock() {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    const pathname = usePathname();
    const isUniverse = pathname?.includes('/another_point_of_view');
    const isMissions = pathname === '/activities' || pathname?.startsWith('/activities/');
    const isRunMode = pathname?.includes('/run');

    if (isRunMode) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] w-[95%] max-w-[420px] md:w-[520px] md:max-w-none pointer-events-auto">
            <div className="flex items-center justify-center gap-1.5 md:gap-3 px-3 py-1.5 md:px-5 md:py-2 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_10px_rgba(255,255,255,0.1),_0_0_30px_rgba(0,240,255,0.2)]">

                {/* Graph specific controls - only active when inside Universe */}
                {isUniverse && (
                    <>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('universe:search'));
                                setActiveTooltip(null);
                            }}
                            onMouseEnter={() => setActiveTooltip("search")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 transition-all duration-300"
                        >
                            <Search className="w-4 h-4" strokeWidth={1.5} />
                            <div className={cn(
                                "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                                activeTooltip === "search" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                            )}>
                                <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">SEARCH</span>
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('universe:random'));
                                setActiveTooltip(null);
                            }}
                            onMouseEnter={() => setActiveTooltip("random")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 transition-all duration-300"
                        >
                            <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                            <div className={cn(
                                "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                                activeTooltip === "random" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                            )}>
                                <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">RANDOM</span>
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent('universe:reset'));
                                setActiveTooltip(null);
                            }}
                            onMouseEnter={() => setActiveTooltip("reset")}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 transition-all duration-300"
                        >
                            <Command className="w-4 h-4" strokeWidth={1.5} />
                            <div className={cn(
                                "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                                activeTooltip === "reset" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                            )}>
                                <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">RESET VIEW</span>
                            </div>
                        </button>
                        
                        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
                    </>
                )}

                {/* Activities Library */}
                <Link
                    href="/activities"
                    className={cn(
                        "relative flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-full border transition-all duration-300",
                        isMissions 
                            ? "border-cyan-500/30 bg-cyan-500/5 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                            : "border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20"
                    )}
                    onMouseEnter={() => setActiveTooltip("activities")}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-4 py-2 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                        activeTooltip === "activities" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[10px] tracking-widest text-cyan-100 font-mono">ACTIVITIES</span>
                    </div>
                </Link>

                {/* Home — Center Anchor */}
                <Link
                    href="/"
                    className="relative flex items-center justify-center w-10 h-10 md:w-13 md:h-13 rounded-full bg-gradient-to-br from-cyan-500/20 to-slate-900/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:border-cyan-400/50 transition-all duration-300 mx-1 md:mx-3"
                    onMouseEnter={() => setActiveTooltip("home")}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    <Home className="w-[20px] h-[20px] md:w-7 md:h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-4 py-2 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                        activeTooltip === "home" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[10px] tracking-widest text-cyan-100 font-mono text-center">HOME</span>
                    </div>
                </Link>

                {/* Planner Workspace */}
                <Link
                    href="/planner"
                    className={cn(
                        "relative flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-full border transition-all duration-300",
                        pathname === '/planner' 
                            ? "border-cyan-500/30 bg-cyan-500/5 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                            : "border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20"
                    )}
                    onMouseEnter={() => setActiveTooltip("planner")}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    <Layers className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-4 py-2 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                        activeTooltip === "planner" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[10px] tracking-widest text-cyan-100 font-mono">PLANNER</span>
                    </div>
                </Link>

            </div>
        </div>
    );
}

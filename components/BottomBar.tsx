"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomDock() {
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] w-[320px] md:w-[520px] pointer-events-auto">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-1.5 rounded-2xl bg-slate-950/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">

                {/* About */}
                <Link
                    href="#"
                    className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
                    onMouseEnter={() => setActiveTooltip("about")}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() => setActiveTooltip(activeTooltip === "about" ? null : "about")}
                >
                    <User className="w-4 h-4" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                        activeTooltip === "about" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">ABOUT</span>
                    </div>
                </Link>

                {/* Home — Center Anchor */}
                <Link
                    href="/"
                    className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-cyan-500/20 to-slate-900/80 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:border-cyan-400/50 transition-all duration-300 mx-1"
                    onMouseEnter={() => setActiveTooltip("home")}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() => setActiveTooltip(activeTooltip === "home" ? null : "home")}
                >
                    <Home className="w-[18px] h-[18px] md:w-5 md:h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none",
                        activeTooltip === "home" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">HOME</span>
                    </div>
                </Link>

                {/* AI Agent */}
                <button
                    className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/[0.06] bg-transparent text-slate-500 hover:text-cyan-300 hover:bg-slate-800/50 hover:border-cyan-500/20 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
                    onMouseEnter={() => setActiveTooltip("ai")}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() => setActiveTooltip(activeTooltip === "ai" ? null : "ai")}
                >
                    <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                    <div className={cn(
                        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 rounded-md border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-md transition-all duration-200 pointer-events-none flex flex-col items-center gap-0.5",
                        activeTooltip === "ai" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    )}>
                        <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">CURIOSITY AI</span>
                        <span className="text-[7px] md:text-[8px] text-cyan-400 font-mono tracking-widest bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">COMING SOON</span>
                    </div>
                </button>

            </div>
        </div>
    );
}

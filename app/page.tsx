"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Compass, Activity, Brain, Sigma, Radio, Database, Terminal, Sparkles, Gamepad2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import NeuralCore3D from "@/components/NeuralCore3D";

const domains = [
  { id: 'biosystem', label: 'BIOSYSTEM', icon: Activity, href: '/biosystem' },
  { id: 'cognition', label: 'COGNITION', icon: Brain, href: '/cognition' },
  { id: 'logic', label: 'LOGIC', icon: Sigma },
  { id: 'signal', label: 'SIGNAL', icon: Radio },
  { id: 'capital', label: 'CAPITAL', icon: Database },
  { id: 'digital', label: 'DIGITAL', icon: Terminal },
  { id: 'ai-nexus', label: 'AI NEXUS', icon: Sparkles },
  { id: 'fun', label: 'FUN', icon: Gamepad2, href: '/fun' },
];

// Helper components for the Density Layer
function LiveTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    update(); // Initial update
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time || "00:00:00 UTC"}</span>;
}

function TerminalLogs() {
  const logs = [
    "> INITIALIZING LEARN_OS...",
    "> SECURING NEURAL LINK...",
    "> MAPPING POSSIBILITIES...",
    "> CALIBRATING HUD...",
    "> AWAITING USER INPUT...",
  ];
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="relative h-4 w-full flex items-end">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentLog}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.6 }}
          className="absolute left-0 bottom-0 whitespace-nowrap text-slate-400 font-mono text-[9px] md:text-xs"
        >
          {logs[currentLog]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}



export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(210);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 150 : 210); // 150px for mobile, 210px for desktop
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    setMounted(true); // Only mount after exact radius is calculated
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <main
      onClick={() => setActiveDomain(null)}
      className="relative flex min-h-screen w-full items-center justify-center p-6 bg-[#030712] overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#030712] to-[#030712]"
      style={{ perspective: 1200 }}
    >
      {/* 3D WebGL Background Level - Massive Energy Wireframe */}
      {mounted && <NeuralCore3D />}

      {/* Header Overlay */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-4 left-4 md:top-8 md:left-8 font-mono text-[9px] md:text-xs text-slate-400 font-medium tracking-widest z-50 flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" strokeWidth={1.5} />
              <span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(34,211,238,0.3)]">DISHA OS</span>
            </div>
            <span className="text-[7px] md:text-[9px] text-slate-500/60 tracking-[0.3em] pl-[22px] md:pl-[24px] font-light">by Tharun</span>
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 font-mono text-[9px] md:text-xs text-slate-400 font-medium tracking-widest z-50 flex items-center gap-2">
            STATUS: <span className="text-cyan-400 font-bold flex items-center gap-2 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)] before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-amber-500 before:shadow-[0_0_8px_rgba(245,158,11,0.8)]">CONCEPT (WIP)</span>
          </div>
        </div>
      )}

      {/* Dark Matter Vignette */}
      {mounted && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-0" />}



      {/* Radial UI Wrapper - Locked to 1:1 Aspect Ratio to force perfect circular orbits */}
      <div className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full flex items-center justify-center z-10 pointer-events-none">

        <motion.div
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute flex items-center justify-center flex-col w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.1),_0_0_40px_rgba(0,240,255,0.3)] hover:border-cyan-400/50 hover:from-cyan-900/60 hover:to-slate-900/90 hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.2),_0_0_60px_rgba(0,240,255,0.5)] transition-colors duration-500 z-20 pointer-events-auto"
        >
          <h1 className="text-center uppercase leading-snug" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            <span className="block text-[11px] md:text-lg tracking-[0.4em] font-light text-slate-300/80">INFINITE</span>
            <span className="block text-[13px] md:text-xl tracking-[0.35em] font-semibold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">POSSIBILITIES</span>
          </h1>

          {/* Pulsing Divider */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.8)", "0 0 10px rgba(34,211,238,0)"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-14 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-2 md:my-3"
          />

          {/* Search Button */}
          <Link href="/possibility" className="flex items-center gap-2 text-[7px] md:text-[9px] font-mono font-medium px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-100 tracking-[0.15em] uppercase whitespace-nowrap hover:bg-cyan-400/20 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95">
            <Search className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={1.5} />
            SEARCH
          </Link>
        </motion.div>

        {/* The Orbital Ring */}
        {mounted && domains.map((domain, index) => {
          const angle = ((index * 45 + 22.5) * Math.PI) / 180; // offset by 22.5° so no node lands at exact bottom
          const x = Math.cos(angle) * radius; // Restore full radius to prevent overlap
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={domain.id}
              onClick={(e) => {
                e.stopPropagation();
                if (domain.href) {
                  window.location.href = domain.href;
                } else {
                  setActiveDomain(activeDomain === domain.id ? null : domain.id);
                }
              }}
              className={cn(
                "absolute flex flex-col items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-cyan-300 hover:from-cyan-900/60 hover:to-slate-900/90 hover:border-cyan-400/50 hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.2),_0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 group cursor-pointer pointer-events-auto",
                activeDomain === domain.id ? "z-30" : "z-10"
              )}
              initial={{ x: `${x}px`, y: `${y}px`, opacity: 1 }}
              animate={{
                x: `${x}px`,
                y: `${y}px`,
                opacity: 1
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              whileTap={{ scale: 0.95 }}
            >
              <domain.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />

              {/* Hover Tooltip — always on top on web */}
              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 md:mt-14 transition-all duration-300 whitespace-nowrap bg-slate-950/95 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-cyan-500/50 pointer-events-none shadow-[0_0_20px_rgba(0,240,255,0.3)] z-[200] backdrop-blur-xl flex flex-col items-center gap-1",
                activeDomain === domain.id ? "opacity-100 scale-100" : "opacity-0 scale-90 md:group-hover:opacity-100 md:group-hover:scale-100"
              )}>
                <span className="text-[9px] md:text-[11px] tracking-[0.2em] text-cyan-100 font-mono font-semibold">
                  {domain.label}
                </span>
                {activeDomain === domain.id && !domain.href && (
                  <span className="text-[7px] md:text-[8px] text-cyan-400 font-mono tracking-widest bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                    COMING SOON
                  </span>
                )}
                {domain.href && (
                  <span className="text-[7px] md:text-[8px] text-emerald-400 font-mono tracking-widest bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                    ENTER
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

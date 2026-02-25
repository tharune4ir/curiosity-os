"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sigma, Atom, Dna, Activity, Terminal, Cog, LineChart, Brain, Cpu, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import NeuralCore3D from "@/components/NeuralCore3D";

const domains = [
  { id: 'math', label: 'MATHEMATICS', icon: Sigma },
  { id: 'physics', label: 'PHYSICS', icon: Atom },
  { id: 'biology', label: 'BIOLOGY', icon: Dna },
  { id: 'medicine', label: 'MEDICINE', icon: Activity },
  { id: 'cs', label: 'COMPUTER SCIENCE', icon: Terminal },
  { id: 'engineering', label: 'ENGINEERING', icon: Cog },
  { id: 'economics', label: 'ECONOMICS', icon: LineChart },
  { id: 'ai', label: 'AI', icon: Cpu },
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
  const [radius, setRadius] = useState(250);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 768 ? 140 : 250); // 140px for mobile, 250px for desktop
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

      {/* Dark Matter Vignette */}
      {mounted && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-0" />}


      {/* System Metadata - High Contrast Text on Dark Void */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-4 left-4 md:top-8 md:left-8 font-mono text-[9px] md:text-xs text-slate-400 font-medium tracking-widest z-50 flex items-center gap-2">
            STATUS: <span className="text-cyan-400 font-bold flex items-center gap-2 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)] before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-sys-success before:shadow-[0_0_12px_rgba(16,185,129,1)]">CONCEPT</span>
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 font-mono text-[9px] md:text-xs text-slate-400 font-bold tracking-widest z-50">
            <LiveTime />
          </div>
          <div className="absolute bottom-4 left-16 md:bottom-8 md:left-8 text-[9px] md:text-[10px] text-slate-500 font-mono tracking-widest uppercase z-[100]">
            BY THARUN KUMAR GAJULA
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-[9px] md:text-[10px] text-slate-500 font-mono tracking-widest uppercase z-[100]">
            © 2026 RENAFORGE SYSTEMS
          </div>
        </div>
      )}

      {/* Radial UI Wrapper - Locked to 1:1 Aspect Ratio to force perfect circular orbits */}
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full flex items-center justify-center z-10 pointer-events-none mt-12 md:mt-0">

        {/* The Central Core (Project Disha) - 3D Hyper Glass Well */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute flex items-center justify-center flex-col w-48 h-48 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.1),_0_0_40px_rgba(0,240,255,0.3)] hover:border-cyan-400/50 hover:from-cyan-900/60 hover:to-slate-900/90 hover:shadow-[inset_0_2px_20px_rgba(255,255,255,0.2),_0_0_60px_rgba(0,240,255,0.5)] transition-colors duration-500 z-20 pointer-events-auto"
        >
          <Compass className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 mb-1.5 md:mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" strokeWidth={1.5} />

          <h1 className="text-white font-bold tracking-[0.4em] text-center text-[10px] md:text-lg whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            DISHA
          </h1>

          {/* Restored Portal Button */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], boxShadow: ["0 0 10px rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.8)", "0 0 10px rgba(34,211,238,0)"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-14 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-2.5 md:my-4"
          />

          <Link href="/possibility" className="text-[7px] md:text-[9px] font-mono font-medium px-4 py-1.5 md:px-6 md:py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-100 tracking-[0.2em] uppercase whitespace-nowrap hover:bg-cyan-400/20 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95">
            POSSIBILITIES
          </Link>
        </motion.div>

        {/* The Orbital Ring */}
        {mounted && domains.map((domain, index) => {
          const angle = (index * 45 * Math.PI) / 180; // 360 / 8 = 45 degrees
          const x = Math.cos(angle) * radius; // Restore full radius to prevent overlap
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={domain.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDomain(activeDomain === domain.id ? null : domain.id);
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

              <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 mt-10 md:mt-14 transition-opacity duration-300 whitespace-nowrap bg-slate-950/90 px-3 py-1.5 md:px-4 md:py-2 rounded-md border border-cyan-500/50 pointer-events-none shadow-[0_0_15px_rgba(0,240,255,0.2)] z-[100] backdrop-blur-md flex flex-col items-center gap-1",
                activeDomain === domain.id ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              )}>
                <span className="text-[9px] md:text-[10px] tracking-widest text-cyan-100 font-mono">
                  {domain.label}
                </span>
                {activeDomain === domain.id && (
                  <span className="text-[7px] md:text-[8px] text-cyan-400 font-mono tracking-widest bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                    COMING SOON
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

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Compass, BookOpen, Calculator, Atom, Sprout, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import NeuralCore3D from "@/components/NeuralCore3D";

const dockItems = [
  { id: 'learn', label: 'Learn OS', icon: BookOpen },
  { id: 'math', label: 'Math OS', icon: Calculator },
  { id: 'science', label: 'Science OS', icon: Atom },
  { id: 'thrive', label: 'Thrive OS', icon: Sprout },
  { id: 'fun', label: 'Fun OS', icon: Gamepad2 },
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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center p-6 bg-[#030712] overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#030712] to-[#030712]"
      style={{ perspective: 1200 }}
    >
      {/* 3D WebGL Background Level - Massive Energy Wireframe */}
      {mounted && <NeuralCore3D />}

      {/* Dark Matter Vignette */}
      {mounted && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none z-0" />}


      {/* System Metadata - High Contrast Text on Dark Void */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-50 text-[9px] md:text-xs text-slate-400 font-mono tracking-wider">
          <div className="absolute top-4 left-4 md:top-8 md:left-8 font-medium tracking-widest z-50">
            SYSTEM_STATUS: <span className="text-cyan-400 font-bold flex inline-flex items-center gap-2 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)] before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-sys-success before:shadow-[0_0_12px_rgba(16,185,129,1)]">ONLINE</span>
          </div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 font-bold tracking-widest z-50">
            <LiveTime />
          </div>
          <div className="absolute bottom-2 w-full text-center md:w-auto md:text-left md:bottom-8 md:right-8 text-slate-500 font-mono tracking-widest uppercase z-[100] text-[9px] md:text-[10px]">
            © 2026 RENAFORGE SYSTEMS
          </div>
        </div>
      )}

      {/* The Central Hub Canvas - Free Floating over the Wireframe */}
      <div className="relative z-10 w-full max-w-5xl flex justify-center mt-12">
        <div className="flex flex-col items-center justify-center relative z-10 w-full text-center">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 px-8 sm:px-12 flex flex-col items-center gap-8 relative z-10 w-[85vw] max-w-[420px] md:w-fit md:min-w-[420px] shadow-2xl">

            {/* Interactive Central Hub - Glass Squircle Logo */}
            <div className="relative z-50">
              <motion.div
                className="w-16 h-16 flex items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] mb-6 cursor-pointer pointer-events-auto"
                whileHover={{ scale: 1.1, rotate: 90, borderColor: "rgba(0, 240, 255, 1)" }}
                drag
                dragConstraints={{ top: -20, left: -20, right: 20, bottom: 20 }}
                dragElastic={0.2}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Compass className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,1)]" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Typography block */}
            <div className="text-center z-50">
              <h1 className="text-4xl md:text-5xl font-bold tracking-[0.4em] mb-4 uppercase text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] whitespace-nowrap">
                Disha OS
              </h1>
              <p className="text-cyan-100/70 uppercase tracking-[0.4em] text-[10px] md:text-xs font-mono font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                BY THARUN KUMAR GAJULA
              </p>
            </div>

            {/* Singular CTA Button */}
            <div className="flex flex-col items-center gap-4 mt-8 w-full justify-center z-50">
              <Link href="/possibility" className="w-full">
                <button
                  className="group relative w-full overflow-hidden rounded-md border border-cyan-500/30 bg-transparent px-8 py-4 text-sm font-mono tracking-widest text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:text-white backdrop-blur-sm"
                >
                  <span className="relative z-10 font-bold transition-all duration-300">
                    POSSIBILITIES
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.1),transparent)] bg-[length:200%_100%] animate-[sweep_2s_linear_infinite]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* macOS Style Navigation Dock */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-2 md:gap-4 px-4 md:px-6 py-3 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-fit max-w-[90vw] md:max-w-[420px]">
        {dockItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.4, y: -10, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-800/50 border border-cyan-500/20 text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-colors duration-300"
          >
            <item.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />

            {/* Hover Tooltip */}
            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 bg-slate-900/90 border border-cyan-500/30 rounded-md text-[10px] text-cyan-100 whitespace-nowrap pointer-events-none shadow-lg tracking-widest uppercase">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </main >
  );
}

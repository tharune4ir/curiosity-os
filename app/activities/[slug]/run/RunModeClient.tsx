"use client";

import { Activity, RunStep } from "@/lib/activities";
import { 
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X, 
  Terminal, ShieldAlert, MessageSquare, ListChecks, Clock, Zap, Check, Send, Plus
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useEvidence, TEACHER_TAGS } from "@/lib/evidence-context";

interface RunModeClientProps {
  activity: Activity;
}

export function RunModeClient({ activity }: RunModeClientProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showToolbox, setShowToolbox] = useState(true);

  // Evidence State
  const { startSession, endSession, addEntry } = useEvidence();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const steps = activity.run_steps || [];
  const currentStep = steps[currentStepIndex];

  // Initialize Session
  useEffect(() => {
    const id = startSession(activity.id, activity.title);
    setSessionId(id);
    // Auto-run timer on start
    setIsRunning(true);
  }, []);

  const handleCapture = () => {
    if (!sessionId || (!note.trim() && selectedTags.length === 0)) return;
    
    addEntry({
      sessionId,
      activityId: activity.id,
      stepIndex: currentStepIndex,
      type: 'observation',
      note: note.trim(),
      tags: selectedTags
    });

    setNote("");
    setSelectedTags([]);
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 2000);
  };

  const handleComplete = () => {
    if (sessionId) {
      endSession(sessionId);
      router.push(`/activities/${activity.slug}/runs/${sessionId}/reflect`);
    }
  };

  // Global Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col font-outfit text-white z-[300]">
      
      {/* Top Navigation / Orientation */}
      <header className="h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 md:gap-6">
          <Link 
            href={`/activities/${activity.slug}`}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-widest hidden md:inline">Exit Run</span>
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <div className="max-w-[120px] sm:max-w-[200px] md:max-w-md">
            <h1 className="text-sm md:text-lg font-medium text-white truncate">{activity.title}</h1>
            <p className="text-[8px] md:text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Facilitation</p>
          </div>
        </div>

        {/* Global Timer Workspace */}
        <div className="flex items-center gap-4 bg-slate-900/50 px-6 py-2 rounded-2xl border border-white/5">
           <div className="flex flex-col items-center">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-0.5">Elapsed</span>
              <span className={cn("text-xl font-mono tabular-nums", isRunning ? "text-cyan-400" : "text-slate-400")}>
                {formatTime(elapsedTime)}
              </span>
           </div>
           <div className="flex items-center gap-1 ml-2">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  isRunning ? "text-amber-400 hover:bg-amber-400/10" : "text-cyan-400 hover:bg-cyan-400/10"
                )}
              >
                {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              <button 
                onClick={() => { setElapsedTime(0); setIsRunning(false); }}
                className="p-2 text-slate-600 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
           <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Step {currentStepIndex + 1} of {steps.length}</p>
              <div className="flex gap-1 mt-1">
                 {steps.map((_: any, i: number) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1 w-6 rounded-full transition-all",
                        i === currentStepIndex ? "bg-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.5)]" : i < currentStepIndex ? "bg-cyan-900" : "bg-slate-800"
                      )} 
                    />
                 ))}
              </div>
           </div>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        
        {/* Main Stage: Step Facilitation */}
        <div className="flex-grow overflow-y-auto p-8 md:p-16 flex flex-col items-center">
           <div className="max-w-4xl w-full flex-grow">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentStepIndex}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.2 }}
                 className="w-full"
               >
                  <div className="flex items-center gap-6 mb-12">
                     <span className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl font-mono shadow-inner shadow-cyan-900/20">
                       {currentStepIndex + 1}
                     </span>
                     <div>
                       <h2 className="text-4xl md:text-6xl font-outfit font-light text-white tracking-tight leading-none mb-4">{currentStep?.title}</h2>
                       <div className="flex items-center gap-4">
                          <span className="flex items-center gap-2 text-xs font-mono text-cyan-500/80 uppercase tracking-widest bg-cyan-500/5 px-4 py-1.5 rounded-full border border-cyan-500/10">
                             <Clock className="w-4 h-4" />
                             {currentStep?.duration} Minutes
                          </span>
                       </div>
                     </div>
                  </div>

                  <div className="prose prose-invert prose-slate max-w-none 
                    prose-h3:text-cyan-400/60 prose-h3:font-mono prose-h3:text-[10px] prose-h3:uppercase prose-h3:tracking-[0.3em] prose-h3:border-b prose-h3:border-cyan-500/10 prose-h3:pb-2 prose-h3:mt-12
                    prose-p:text-2xl prose-p:leading-[1.6] prose-p:text-slate-300 prose-p:font-light
                    prose-li:text-xl prose-li:text-slate-400 prose-li:mb-4
                    prose-strong:text-cyan-400 prose-strong:font-medium prose-strong:bg-cyan-500/5 prose-strong:px-1.5 prose-strong:rounded">
                     <ReactMarkdown>{currentStep?.content || ""}</ReactMarkdown>
                  </div>
               </motion.div>
             </AnimatePresence>
           </div>

           {/* Navigation Controls Fixed at Bottom */}
           <div className="mt-8 md:mt-12 pb-12 flex items-center justify-between w-full max-w-4xl shrink-0 gap-4">
              <button 
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-5 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                <span className="font-outfit font-medium text-base md:text-lg">Back</span>
              </button>

              <div className="flex-grow flex justify-center">
                 {currentStepIndex === steps.length - 1 ? (
                   <button 
                     onClick={handleComplete}
                     className="px-6 md:px-12 py-4 md:py-6 rounded-2xl bg-white text-slate-950 font-outfit font-bold hover:bg-cyan-400 hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-2 md:gap-3 text-sm md:text-xl whitespace-nowrap"
                   >
                     <Check className="w-5 h-5 md:w-6 md:h-6" />
                     Complete Run
                   </button>
                 ) : (
                   <button 
                     onClick={nextStep}
                     className="px-6 md:px-12 py-4 md:py-6 rounded-2xl bg-cyan-500 text-slate-950 font-outfit font-bold hover:bg-cyan-400 hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(0,240,255,0.4)] flex items-center gap-2 md:gap-3 group text-sm md:text-xl whitespace-nowrap"
                   >
                     <span>Next Step</span>
                     <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                   </button>
                 )}
              </div>

              <button 
                onClick={() => setShowToolbox(true)}
                className="lg:hidden p-4 rounded-2xl bg-slate-900 border border-white/10 text-cyan-400 shadow-xl"
              >
                <Plus className="w-6 h-6" />
              </button>

              <div className="w-[80px] md:w-[150px] hidden lg:block" />
           </div>
        </div>

        {/* Tactical Toolbox Sidebar */}
        <aside className={cn(
          "w-full lg:w-[24rem] border-l border-white/10 flex flex-col bg-slate-900/95 lg:bg-slate-900/40 backdrop-blur-3xl transition-all duration-500 shrink-0 z-[400]",
          showToolbox 
            ? "translate-x-0 fixed inset-0 lg:relative lg:inset-auto" 
            : "translate-x-full fixed right-0 h-full"
        )}>
           <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/50 font-bold">Tactical Toolbox</h3>
              <button 
                onClick={() => setShowToolbox(false)}
                className="p-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 bg-white/5 lg:bg-transparent"
              >
                <X className="lg:hidden w-6 h-6" />
                <ChevronRight className={cn("hidden lg:block w-5 h-5 transition-transform", !showToolbox && "rotate-180")} />
              </button>
           </div>

           <div className="flex-grow overflow-y-auto p-8 space-y-12">
              
              {/* Teacher Scripts */}
              <section>
                 <div className="flex items-center gap-3 mb-6 text-amber-500/80">
                    <MessageSquare className="w-5 h-5" />
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest">Teacher Moves</h4>
                 </div>
                 <div className="space-y-4">
                    {activity.teacher_moves?.map((move: string, i: number) => (
                       <div key={i} className="p-5 rounded-2xl bg-amber-500/[0.03] border border-amber-500/10 text-sm md:text-base text-slate-300 leading-relaxed italic relative">
                          <span className="absolute -left-1 top-4 w-1 h-8 bg-amber-500/20 rounded-full" />
                          "{move}"
                       </div>
                    ))}
                 </div>
              </section>

              {/* Watch Fors */}
              <section>
                 <div className="flex items-center gap-3 mb-6 text-cyan-400/80">
                    <ShieldAlert className="w-5 h-5" />
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest">Watch Fors</h4>
                 </div>
                 <ul className="space-y-4">
                    {activity.teacher_watch_fors?.map((watch: string, i: number) => (
                       <li key={i} className="flex gap-4 text-sm md:text-base text-slate-400 leading-relaxed">
                          <span className="shrink-0 w-2 h-2 rounded-full bg-cyan-600/40 mt-2" />
                          {watch}
                       </li>
                    ))}
                 </ul>
              </section>

              {/* Common Pitfalls */}
              <section>
                 <div className="flex items-center gap-3 mb-6 text-red-400/80">
                    <Zap className="w-5 h-5" />
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest">Failure Signals</h4>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {activity.common_failure_points?.map((fail: string, i: number) => (
                       <div key={i} className="px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-[9px] font-mono text-red-400 uppercase tracking-widest font-bold">
                          {fail.replace(/_/g, ' ')}
                       </div>
                    ))}
                 </div>
              </section>

              {/* Evidence Capture Strip */}
              <div className="pt-12 border-t border-white/5">
                 <div className="flex items-center justify-between mb-6 text-cyan-400">
                    <div className="flex items-center gap-3">
                       <ListChecks className="w-5 h-5" />
                       <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest">Notice & Capture</h4>
                    </div>
                    {isCapturing && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[9px] font-mono text-cyan-500 uppercase font-bold"
                      >
                        Captured!
                      </motion.span>
                    )}
                 </div>
                 
                 <div className="space-y-4">
                    <textarea 
                      placeholder="Step-aware observation..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-outfit text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                    />

                    <div className="flex flex-wrap gap-2">
                       {TEACHER_TAGS.slice(0, 6).map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTags(prev => 
                              prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                            )}
                            className={cn(
                              "px-3 py-1.5 rounded-xl border text-[9px] font-mono uppercase tracking-widest transition-all",
                              selectedTags.includes(tag) 
                                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                                : "bg-white/5 border-white/5 text-slate-600 hover:text-slate-400"
                            )}
                          >
                             {tag}
                          </button>
                       ))}
                    </div>

                    <button 
                      onClick={handleCapture}
                      className="w-full py-4 rounded-2xl bg-cyan-500 text-slate-950 font-bold font-outfit hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                    >
                       <Send className="w-4 h-4" />
                       Capture Observation
                    </button>
                 </div>
              </div>

           </div>
        </aside>

        {/* Floating Toolbox Toggle if Hidden (Desktop Only) */}
        {!showToolbox && (
          <button 
            onClick={() => setShowToolbox(true)}
            className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-[2rem] bg-slate-900 border border-white/10 items-center justify-center text-cyan-400 shadow-2xl hover:bg-slate-800 transition-all z-[350] group"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}

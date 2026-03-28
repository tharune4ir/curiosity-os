"use client";

import { useEvidence, TEACHER_TAGS } from "@/lib/evidence-context";
import { Activity } from "@/lib/activities";
import { 
  CheckCircle2, ArrowRight, MessageSquare, ListChecks, 
  Clock, Zap, Star, AlertCircle, Quote
} from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostRunReflectionProps {
  activity: Activity;
  sessionId: string;
}

export function PostRunReflection({ activity, sessionId }: PostRunReflectionProps) {
  const router = useRouter();
  const { state, endSession, getEntriesForSession } = useEvidence();
  const [reflection, setReflection] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);

  const session = useMemo(() => 
    state.sessions.find(s => s.id === sessionId),
    [state.sessions, sessionId]
  );

  const entries = useMemo(() => 
    getEntriesForSession(sessionId),
    [sessionId, state.entries]
  );

  const handleFinish = () => {
    setIsFinishing(true);
    endSession(sessionId, reflection);
    setTimeout(() => {
      router.push(`/activities/${activity.slug}`);
    }, 1000);
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach(e => {
      e.tags.forEach(t => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a,b) => b[1] - a[1]);
  }, [entries]);

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <div className="w-20 h-20 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-8 shadow-inner shadow-cyan-900/20">
           <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-outfit font-light text-white tracking-tight mb-4">
          Mission <span className="font-normal text-cyan-400 italic">Complete</span>
        </h1>
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Facilitation Loop Closed // {activity.title}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column: Evidence Summary */}
        <div className="md:col-span-4 space-y-10">
           
           <section>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-6 font-bold">Session Signals</h3>
              <div className="flex flex-wrap gap-2">
                 {tagCounts.map(([tag, count]) => (
                    <div key={tag} className="px-3 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-2">
                       <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{tag}</span>
                       <span className="text-[10px] font-mono text-cyan-600 font-bold">{count}</span>
                    </div>
                 ))}
                 {tagCounts.length === 0 && (
                    <p className="text-[10px] font-mono text-slate-700 italic">No tactical tags recorded</p>
                 )}
              </div>
           </section>

           <section>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-6 font-bold">Capture Summary</h3>
              <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-outfit">Total Observations</span>
                    <span className="text-xs text-white font-mono font-bold">{entries.length}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-outfit">Duration</span>
                    <span className="text-xs text-white font-mono font-bold">
                       {Math.floor((Date.now() - session.startTime) / 60000)}m
                    </span>
                 </div>
              </div>
           </section>

        </div>

        {/* Right Column: Reflection Input */}
        <div className="md:col-span-8 space-y-10">
           
           <div className="p-10 rounded-[2.5rem] bg-slate-900/60 border border-white/10 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="flex items-center gap-3 mb-8">
                 <Star className="w-5 h-5 text-amber-500" />
                 <h2 className="text-xl font-outfit font-medium text-white">Final Synthesis</h2>
              </div>
              
              <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-white/5 p-4 rounded-2xl italic border border-white/5">
                 "What stood out specifically about student thinking or the activity mechanism today? What should you remember for the next run?"
              </p>

              <textarea 
                placeholder="Teacher reflection..."
                autoFocus
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full h-48 bg-transparent text-xl font-outfit text-white placeholder:text-slate-700 border-b border-white/10 focus:outline-none focus:border-cyan-500/50 transition-all resize-none pb-6 mb-10"
              />

              <button 
                onClick={handleFinish}
                disabled={isFinishing}
                className="w-full py-6 rounded-2xl bg-cyan-500 text-slate-950 font-outfit font-bold text-lg hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-950/40 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                 {isFinishing ? (
                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ repeat: Infinity, duration: 1 }}
                       className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full"
                    />
                 ) : (
                    <>
                       <span>Save Reflection & Exit</span>
                       <ArrowRight className="w-5 h-5" />
                    </>
                 )}
              </button>
           </div>

           {/* Quick Snippets of session details */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {entries.slice(-2).map(entry => (
                 <div key={entry.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 italic">
                    <p className="text-sm text-slate-300 line-clamp-3 mb-4">"{entry.note}"</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Step {entry.stepIndex + 1}</span>
                       <div className="flex gap-1">
                          {entry.tags.slice(0, 1).map(t => (
                             <span key={t} className="text-[8px] font-mono text-cyan-600 uppercase tracking-widest">{t}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              ))}
           </div>

        </div>

      </div>

    </div>
  );
}

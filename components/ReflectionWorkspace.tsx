"use client";

import { useEvidence, TEACHER_TAGS } from "@/lib/evidence-context";
import { usePlanner } from "@/lib/planner-context";
import { Activity } from "@/lib/activities";
import { 
  CheckCircle2, ArrowRight, MessageSquare, ListChecks, 
  Clock, Zap, Star, AlertCircle, Quote, RefreshCw, 
  ChevronRight, BookmarkPlus, Plus, Sparkles, Binary, Save
} from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ReflectionWorkspaceProps {
  activity: Activity;
  sessionId: string;
  followUpActivities: Activity[];
}

export function ReflectionWorkspace({ activity, sessionId, followUpActivities }: ReflectionWorkspaceProps) {
  const router = useRouter();
  const { state, updateSession, getEntriesForSession } = useEvidence();
  const { toggleQueue, isInQueue } = usePlanner();

  const session = useMemo(() => 
    state.sessions.find(s => s.id === sessionId),
    [state.sessions, sessionId]
  );

  const entries = useMemo(() => 
    getEntriesForSession(sessionId),
    [sessionId, state.entries]
  );

  // Reflection State
  const [whatWorked, setWhatWorked] = useState(session?.whatWorked || "");
  const [whereStruggled, setWhereStruggled] = useState(session?.whereStruggled || "");
  const [adaptationNotes, setAdaptationNotes] = useState(session?.adaptationNotes || "");
  const [nextStepChoice, setNextStepChoice] = useState<'rerun' | 'followup' | 'later' | null>(session?.nextStepChoice || null);
  const [selectedFollowUpId, setSelectedFollowUpId] = useState<string | null>(session?.nextStepActivityId || null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Evidence Grouping
  const groupedEvidence = useMemo(() => {
     return {
        signals: entries.flatMap(e => e.tags),
        quotes: entries.filter(e => e.note.length > 5 && (e.note.includes('"') || e.note.includes("'"))),
        observations: entries.filter(e => e.note.length > 0)
     };
  }, [entries]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    groupedEvidence.signals.forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts).sort((a,b) => b[1] - a[1]);
  }, [groupedEvidence.signals]);

  const handleSave = () => {
    setIsSaving(true);
    updateSession(sessionId, {
      whatWorked,
      whereStruggled,
      adaptationNotes,
      nextStepChoice: nextStepChoice || undefined,
      nextStepActivityId: selectedFollowUpId || undefined,
      status: 'completed'
    });
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    }, 800);
  };

  const handleFinish = () => {
    handleSave();
    router.push(`/activities/${activity.slug}`);
  };

  if (!session) return null;

  return (
    <div className="max-w-6xl mx-auto pb-40 px-4 md:px-0">
      
      {/* Header Area */}
      <header className="mb-8 md:mb-16">
        <div className="flex items-center gap-4 mb-4 md:mb-6">
           <Link 
             href={`/activities/${activity.slug}`}
             className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
           >
             ← Back
           </Link>
           <div className="h-px flex-grow bg-white/5" />
           <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-slate-700">
             Session: {sessionId.split('_')[1]}
           </span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
           <div>
              <h1 className="text-3xl md:text-6xl font-outfit font-light text-white tracking-tight mb-3 md:mb-4">
                Session <span className="font-normal text-cyan-400 italic">Reflection</span>
              </h1>
              <div className="flex items-center gap-4">
                 <div className="px-2 md:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] md:text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    Facilitation Complete
                 </div>
              </div>
           </div>
           
           <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-grow md:flex-grow-0 px-4 md:px-6 py-2.5 md:py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all font-outfit font-medium text-xs md:text-sm flex items-center justify-center gap-2"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
              <button 
                onClick={handleFinish}
                className="flex-grow md:flex-grow-0 px-6 md:px-8 py-2.5 md:py-3 rounded-xl bg-white text-slate-950 hover:bg-cyan-400 transition-all font-outfit font-bold text-xs md:text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
              >
                Finish
                <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Surface: The Evidence Mirror */}
        <aside className="lg:col-span-4 space-y-10">
           
           <section>
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Session Signals</h3>
                 <span className="text-[10px] font-mono text-slate-700">{tagCounts.length} types detected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                 {tagCounts.map(([tag, count]) => (
                    <div key={tag} className="px-3 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-2 group hover:border-cyan-500/30 transition-colors">
                       <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest opacity-80">{tag}</span>
                       <span className="w-5 h-5 rounded-md bg-cyan-500/10 flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold">{count}</span>
                    </div>
                 ))}
                 {tagCounts.length === 0 && (
                    <div className="w-full py-8 border border-dashed border-white/5 rounded-2xl text-center">
                       <p className="text-[10px] font-mono text-slate-700 uppercase tracking-widest italic">No signals captured</p>
                    </div>
                 )}
              </div>
           </section>

           <section>
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Tactical Observations</h3>
                 <span className="text-[10px] font-mono text-slate-700">{groupedEvidence.observations.length} items</span>
              </div>
              <div className="space-y-3">
                 {groupedEvidence.observations.map(entry => (
                    <div key={entry.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] font-mono text-cyan-600 uppercase tracking-widest">Step {entry.stepIndex + 1}</span>
                          <span className="text-[8px] font-mono text-slate-700">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                       </div>
                       <p className="text-sm text-slate-300 font-outfit leading-relaxed">"{entry.note}"</p>
                       {entry.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                             {entry.tags.map(t => (
                                <span key={t} className="text-[7px] font-mono text-slate-600 uppercase tracking-tighter">{t}</span>
                             ))}
                          </div>
                       )}
                    </div>
                 ))}
                 {groupedEvidence.observations.length === 0 && (
                    <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl opacity-20 italic text-xs text-slate-500">
                       No detailed observations recorded
                    </div>
                 )}
              </div>
           </section>

        </aside>

        {/* Main Workspace: Interpretation & Adaptation */}
        <main className="lg:col-span-8 space-y-12">
           
           {/* Guided Reflection */}
           <section className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900/60 border border-white/10 shadow-3xl">
              <div className="flex items-center gap-3 mb-6 md:mb-10 overflow-hidden">
                 <MessageSquare className="w-5 h-5 text-cyan-400" />
                 <h2 className="text-lg md:text-xl font-outfit font-medium text-white">Guided Reflection</h2>
                 <div className="h-px flex-grow bg-white/5 ml-4" />
              </div>

              <div className="space-y-8 md:space-y-12">
                 <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold block">What worked well?</label>
                    <textarea 
                      value={whatWorked}
                      onChange={(e) => setWhatWorked(e.target.value)}
                      placeholder="Student engagement was high..."
                      className="w-full bg-transparent text-base md:text-lg font-outfit text-white placeholder:text-slate-800 border-b border-white/10 focus:outline-none focus:border-cyan-500/50 transition-all resize-none pb-4"
                    />
                 </div>

                 <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold block">Friction Points?</label>
                    <textarea 
                      value={whereStruggled}
                      onChange={(e) => setWhereStruggled(e.target.value)}
                      placeholder="They struggled with Step 2..."
                      className="w-full bg-transparent text-base md:text-lg font-outfit text-white placeholder:text-slate-800 border-b border-white/10 focus:outline-none focus:border-cyan-500/50 transition-all resize-none pb-4"
                    />
                 </div>
              </div>
           </section>

           {/* Adaptation Lab */}
           <section className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
              
              <div className="flex items-center gap-3 mb-6 md:mb-10">
                 <Zap className="w-5 h-5 text-amber-500" />
                 <h2 className="text-lg md:text-xl font-outfit font-medium text-white">Adaptation Notes</h2>
              </div>

              <p className="text-xs md:text-sm text-slate-400 mb-6 md:mb-8 leading-relaxed font-outfit border-l-2 border-amber-500/20 pl-4 md:pl-6 italic">
                "What would you change next time?"
              </p>

              <textarea 
                value={adaptationNotes}
                onChange={(e) => setAdaptationNotes(e.target.value)}
                placeholder="Next time I will..."
                className="w-full h-32 bg-white/5 rounded-2xl p-4 md:p-6 text-base md:text-lg font-outfit text-white placeholder:text-slate-800 border border-white/5 focus:outline-none focus:border-amber-500/30 transition-all resize-none"
              />
           </section>

           {/* Next Move Selector */}
           <section className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                 <Sparkles className="w-5 h-5 text-cyan-400" />
                 <h2 className="text-xl font-outfit font-medium text-white">The Next Move</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <button 
                   onClick={() => setNextStepChoice('rerun')}
                   className={cn(
                     "p-8 rounded-[2rem] border transition-all text-left relative overflow-hidden",
                     nextStepChoice === 'rerun' ? "bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-900/20" : "bg-slate-900/40 border-white/5 hover:border-white/10"
                   )}
                 >
                    <RefreshCw className={cn("w-6 h-6 mb-6", nextStepChoice === 'rerun' ? "text-cyan-400" : "text-slate-600")} />
                    <h4 className="text-lg font-outfit font-medium text-white mb-2">Refine & Rerun</h4>
                    <p className="text-xs text-slate-500 font-outfit leading-relaxed">I want to run this activity again with the adaptations I noted above.</p>
                 </button>

                 <div 
                   className={cn(
                     "p-8 rounded-[2rem] border transition-all text-left relative overflow-hidden",
                     nextStepChoice === 'followup' ? "bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-900/20" : "bg-slate-900/40 border-white/5 hover:border-white/10"
                   )}
                   onClick={() => setNextStepChoice('followup')}
                 >
                    <Binary className={cn("w-6 h-6 mb-6", nextStepChoice === 'followup' ? "text-cyan-400" : "text-slate-600")} />
                    <h4 className="text-lg font-outfit font-medium text-white mb-2">Move Forward</h4>
                    <p className="text-xs text-slate-500 font-outfit leading-relaxed">I'm satisfied with this run and ready for a related follow-up activity.</p>
                 </div>
              </div>

              <AnimatePresence>
                 {nextStepChoice === 'followup' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/10"
                    >
                       <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-8 font-bold">Suggested Follow-ups</h3>
                       <div className="space-y-4">
                          {followUpActivities.map(fa => {
                             const inQueue = isInQueue(fa.id);
                             return (
                                <div key={fa.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                         <Zap className="w-5 h-5" />
                                      </div>
                                      <div>
                                         <h5 className="text-sm font-outfit font-medium text-slate-200">{fa.title}</h5>
                                         <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{fa.purpose_category}</p>
                                      </div>
                                   </div>
                                   
                                   <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => {
                                          setSelectedFollowUpId(fa.id);
                                          if (!inQueue) toggleQueue(fa.id);
                                        }}
                                        className={cn(
                                          "px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all font-bold",
                                          selectedFollowUpId === fa.id 
                                            ? "bg-cyan-500 text-slate-950" 
                                            : "bg-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                                        )}
                                      >
                                         {selectedFollowUpId === fa.id ? "Selected" : "+ Add to Queue"}
                                      </button>
                                      <Link 
                                        href={`/activities/${fa.slug}`}
                                        className="p-2 text-slate-700 hover:text-white"
                                      >
                                         <ArrowRight className="w-4 h-4" />
                                      </Link>
                                   </div>
                                </div>
                             )
                          })}
                          {followUpActivities.length === 0 && (
                             <div className="text-center py-10 opacity-30 text-xs italic">No specific follow-ups defined for this activity yet.</div>
                          )}
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>

              <button 
                onClick={() => setNextStepChoice('later')}
                className={cn(
                  "w-full py-6 rounded-2xl border transition-all text-[10px] font-mono uppercase tracking-widest font-bold",
                  nextStepChoice === 'later' ? "bg-white/10 border-white/20 text-white" : "border-white/5 text-slate-700 hover:text-slate-400 hover:bg-white/5"
                )}
              >
                 Decide Later // Save Notes Only
              </button>
           </section>

        </main>
      </div>

      {/* Persistence Notification */}
      <AnimatePresence>
         {showSavedToast && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-cyan-500 text-slate-950 font-outfit font-bold text-sm shadow-2xl flex items-center gap-3 z-[500]"
            >
               <CheckCircle2 className="w-5 h-5" />
               Reflection Progress Saved
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}

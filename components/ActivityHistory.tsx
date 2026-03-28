"use client";

import { useEvidence } from "@/lib/evidence-context";
import { 
  History, Clock, Calendar, MessageSquare, ListChecks, 
  ArrowRight, ChevronRight, Star, ChevronDown, Trash2,
  Zap, RefreshCw, Binary, CheckCircle2, AlertCircle
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActivityHistoryProps {
  activityId: string;
  activitySlug: string;
}

export function ActivityHistory({ activityId, activitySlug }: ActivityHistoryProps) {
  const { getSessionsForActivity, getEntriesForSession } = useEvidence();
  const sessions = useMemo(() => getSessionsForActivity(activityId), [activityId, getSessionsForActivity]);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  if (sessions.length === 0) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="mt-24 pt-24 border-t border-white/5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-2xl font-outfit font-medium text-white flex items-center gap-3">
            <History className="w-6 h-6 text-cyan-500" />
            Session History
          </h2>
          <p className="text-sm text-slate-500 font-outfit mt-1 opacity-70 italic">Review past runs, student thinking, and tactical adaptations</p>
        </div>
        <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">{sessions.length} Runs Recorded</span>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => {
          const entries = getEntriesForSession(session.id);
          const isExpanded = expandedSessionId === session.id;

          return (
            <div 
              key={session.id}
              className={cn(
                "p-8 rounded-[2.5rem] border transition-all duration-300",
                isExpanded ? "bg-slate-900 border-white/10" : "bg-slate-950 border-white/5 hover:border-white/10"
              )}
            >
              <div 
                className="flex flex-wrap items-center justify-between gap-6 cursor-pointer"
                onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
              >
                <div className="flex items-center gap-8">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Session Date</span>
                      <span className="text-base text-slate-200 font-outfit">{formatDate(session.startTime)}</span>
                   </div>
                   <div className="h-6 w-px bg-white/5" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Observations</span>
                      <span className="text-base text-slate-200 font-outfit">{entries.length} Entries</span>
                   </div>
                   
                   <div className="flex items-center gap-3">
                      {session.nextStepChoice === 'rerun' && (
                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-mono text-amber-500 uppercase tracking-widest">
                            <RefreshCw className="w-3 h-3" />
                            Refine & Rerun
                         </div>
                      )}
                      {session.nextStepChoice === 'followup' && (
                         <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-mono text-cyan-500 uppercase tracking-widest">
                            <Binary className="w-3 h-3" />
                            Moving Forward
                         </div>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <Link 
                     href={`/activities/${activitySlug}/runs/${session.id}/reflect`}
                     className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                     onClick={(e) => e.stopPropagation()}
                   >
                     Review Reflection
                   </Link>
                   <ChevronDown className={cn("w-5 h-5 text-slate-700 transition-transform", isExpanded ? "rotate-180" : "")} />
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-10 mt-10 border-t border-white/5 space-y-12">
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {session.whatWorked && (
                             <div className="bg-cyan-500/[0.02] border border-cyan-500/10 p-6 rounded-[2rem]">
                                <h4 className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest mb-4">
                                   <CheckCircle2 className="w-3.5 h-3.5" />
                                   What Worked
                                </h4>
                                <p className="text-base text-slate-300 font-outfit leading-relaxed">"{session.whatWorked}"</p>
                             </div>
                          )}
                          {session.whereStruggled && (
                             <div className="bg-red-500/[0.02] border border-red-500/10 p-6 rounded-[2rem]">
                                <h4 className="flex items-center gap-2 text-[10px] font-mono text-red-500/60 uppercase tracking-widest mb-4">
                                   <AlertCircle className="w-3.5 h-3.5" />
                                   Friction Points
                                </h4>
                                <p className="text-base text-slate-300 font-outfit leading-relaxed">"{session.whereStruggled}"</p>
                             </div>
                          )}
                       </div>

                       {session.adaptationNotes && (
                          <div className="bg-amber-500/[0.03] border border-amber-500/10 p-8 rounded-[2rem] relative">
                             <h4 className="flex items-center gap-2 text-[10px] font-mono text-amber-500/60 uppercase tracking-widest mb-4">
                                <Zap className="w-3.5 h-3.5" />
                                Adaptation Lab // Next Run Tuning
                             </h4>
                             <p className="text-xl text-slate-200 font-outfit leading-relaxed italic">"{session.adaptationNotes}"</p>
                             <Star className="absolute top-6 right-8 w-5 h-5 text-amber-500/20" />
                          </div>
                       )}

                       {entries.length > 0 ? (
                          <div className="space-y-4">
                             <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-6">Tactical Observations</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {entries.map(entry => (
                                   <div key={entry.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col group">
                                      <div className="flex justify-between items-start mb-3">
                                         <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest">Step {entry.stepIndex + 1}</span>
                                         <div className="flex gap-1">
                                            {entry.tags.map(t => (
                                               <span key={t} className="text-[8px] font-mono text-slate-600 border border-white/5 px-2 py-0.5 rounded-full uppercase tracking-tighter">{t}</span>
                                            ))}
                                         </div>
                                      </div>
                                      <p className="text-sm text-slate-300 leading-relaxed font-outfit flex-grow">"{entry.note || "Observation without note"}"</p>
                                   </div>
                                ))}
                             </div>
                          </div>
                       ) : (
                          <div className="py-12 text-center border border-dashed border-white/5 rounded-3xl opacity-20 italic text-sm text-slate-500">
                             No detailed observations captured during run
                          </div>
                       )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

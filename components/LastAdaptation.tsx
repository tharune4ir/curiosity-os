"use client";

import { useEvidence } from "@/lib/evidence-context";
import { Zap, Star } from "lucide-react";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface LastAdaptationProps {
  activityId: string;
}

export function LastAdaptation({ activityId }: LastAdaptationProps) {
  const { getSessionsForActivity } = useEvidence();
  const sessions = useMemo(() => getSessionsForActivity(activityId), [activityId, getSessionsForActivity]);
  
  const lastAdaptationSession = useMemo(() => 
    sessions.find(s => s.adaptationNotes),
    [sessions]
  );

  if (!lastAdaptationSession || !lastAdaptationSession.adaptationNotes) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-8 rounded-[2.5rem] bg-amber-500/[0.03] border border-amber-500/10 relative overflow-hidden group shadow-lg shadow-amber-950/10"
    >
       <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110" />
       
       <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-[10px] font-mono text-amber-500/60 uppercase tracking-widest font-bold">Your Last Session Adaptation Note</h3>
          <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest ml-auto">
             Captured {new Date(lastAdaptationSession.endTime || 0).toLocaleDateString()}
          </span>
       </div>
       
       <p className="text-xl text-slate-200 font-outfit leading-relaxed italic">
          "{lastAdaptationSession.adaptationNotes}"
       </p>
       
       <Star className="absolute top-6 right-12 w-5 h-5 text-amber-500/10" />
    </motion.div>
  );
}

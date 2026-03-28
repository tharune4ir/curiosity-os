"use client";

import { usePlanner } from "@/lib/planner-context";
import { Star, ListPlus, Check, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

interface ActivityActionsProps {
  activityId: string;
  activitySlug: string;
  activityTitle: string;
}

export function ActivityActions({ activityId, activitySlug, activityTitle }: ActivityActionsProps) {
  const { toggleSave, isSaved, toggleQueue, isInQueue, state, addToSequence } = usePlanner();
  const saved = isSaved(activityId);
  const inQueue = isInQueue(activityId);
  const [showSequences, setShowSequences] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Launch Action: Run Mode */}
      <Link
        href={`/activities/${activitySlug}/run`}
        className="flex items-center gap-3 px-8 py-3 rounded-2xl font-outfit font-bold bg-white text-slate-950 hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
      >
        <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
        <span>Run Activity</span>
      </Link>

      {/* Primary Action: Add to Queue */}
      <button
        onClick={() => toggleQueue(activityId)}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-2xl font-outfit font-medium transition-all duration-300 shadow-lg",
          inQueue 
            ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 shadow-cyan-900/20" 
            : "bg-cyan-500 border border-cyan-400 text-slate-950 hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98]"
        )}
      >
        {inQueue ? <Check className="w-4 h-4" /> : <ListPlus className="w-4 h-4" />}
        <span>{inQueue ? "In your Queue" : "Add to Queue"}</span>
      </button>

      {/* Secondary Action: Save */}
      <button
        onClick={() => toggleSave(activityId)}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-2xl font-outfit font-medium transition-all duration-300 border",
          saved 
            ? "bg-amber-500/10 border-amber-500/30 text-amber-500" 
            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
        )}
      >
        <Star className={cn("w-4 h-4", saved && "fill-current")} />
        <span>{saved ? "Saved" : "Save Activity"}</span>
      </button>

      {/* Sequence Dropdown (Subtle) */}
      <div className="relative">
        <button
          onClick={() => setShowSequences(!showSequences)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-mono text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
        >
          Add to Set
          <ChevronRight className={cn("w-3 h-3 transition-transform", showSequences ? "rotate-90" : "")} />
        </button>

        {showSequences && (
          <div className="absolute top-full left-0 mt-2 w-56 p-2 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1">
             <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest p-2 mb-1">Your Sequences</div>
             {state.sequences.map(seq => (
               <button
                 key={seq.id}
                 onClick={() => {
                   addToSequence(seq.id, activityId);
                   setShowSequences(false);
                 }}
                 className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors text-sm font-outfit text-slate-300 flex items-center justify-between group"
               >
                 {seq.name}
                 {seq.activityIds.includes(activityId) && <Check className="w-3.5 h-3.5 text-cyan-500" />}
               </button>
             ))}
             {state.sequences.length === 0 && (
               <div className="p-2.5 text-slate-600 text-[10px] font-mono">No sets created yet.</div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}

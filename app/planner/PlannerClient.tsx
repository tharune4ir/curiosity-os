"use client";

import { usePlanner } from "@/lib/planner-context";
import { Star, ListPlus, Check, X, GripVertical, Layers, Trash2, ArrowRight, BookOpen, Clock, Zap, Plus, Search, Play } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface PlannerClientProps {
  allActivities: any[];
}

export function PlannerClient({ allActivities }: PlannerClientProps) {
  const { state, toggleSave, toggleQueue, reorderQueue, removeFromSequence, createSequence, deleteSequence } = usePlanner();
  const [newSequenceName, setNewSequenceName] = useState("");

  const savedActivities = useMemo(() => 
    allActivities.filter(a => state.savedActivityIds.includes(a.id)),
    [allActivities, state.savedActivityIds]
  );

  const queuedActivities = useMemo(() => 
    state.queueActivityIds.map(id => allActivities.find(a => a.id === id)).filter(Boolean),
    [allActivities, state.queueActivityIds]
  );

  const handleCreateSequence = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSequenceName.trim()) {
      createSequence(newSequenceName.trim());
      setNewSequenceName("");
    }
  };

  return (
    <div className="space-y-24">
      
      {/* Section A: The Queue (Up Next) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-2xl font-outfit font-medium text-white flex items-center gap-3">
               <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">01</span>
               Up Next
             </h2>
             <p className="text-sm text-slate-500 font-outfit mt-1 opacity-70 italic">Your active queue for upcoming sessions</p>
          </div>
          {queuedActivities.length > 0 && (
            <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">{queuedActivities.length} Activities</span>
          )}
        </div>

        {queuedActivities.length > 0 ? (
          <Reorder.Group 
            axis="y" 
            values={state.queueActivityIds || []} 
            onReorder={reorderQueue}
            className="space-y-3"
          >
            {queuedActivities.map((a: any) => (
              <Reorder.Item 
                key={a.id} 
                value={a.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="group p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/20 transition-all flex items-center gap-6 shadow-xl relative"
              >
                <GripVertical className="w-5 h-5 text-slate-700 group-hover:text-cyan-500/50 cursor-grab active:cursor-grabbing transition-colors" />
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">{a.purpose}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{a.mode}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-outfit font-medium text-slate-100 group-hover:text-white transition-colors">{a.title}</h3>
                </div>

                {/* Logistics Small */}
                <div className="hidden md:flex items-center gap-4 text-slate-500 font-mono text-[11px] opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {a.duration.typical}m</div>
                   <div className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> {a.energy}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={`/activities/${a.slug}/run`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-white transition-all font-mono text-[10px] uppercase tracking-widest font-bold"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run</span>
                  </Link>
                  <Link 
                    href={`/activities/${a.slug}`}
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={() => toggleQueue(a.id)}
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <div className="py-24 rounded-[2.5rem] border border-dashed border-white/10 bg-slate-900/20 flex flex-col items-center text-center px-4">
             <div className="w-20 h-20 rounded-full bg-slate-950/80 border border-white/5 flex items-center justify-center text-slate-700 mb-8 border-dashed">
                <Plus className="w-8 h-8 opacity-40" />
             </div>
             <h3 className="text-2xl font-outfit text-slate-300 font-medium mb-3">Your queue is empty</h3>
             <p className="text-base text-slate-500 mb-10 max-w-sm leading-relaxed">Add activities from the library to build your upcoming session queue.</p>
             <Link 
               href="/activities"
               className="px-10 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 transition-all font-mono text-xs uppercase tracking-[0.2em] shadow-lg shadow-cyan-950/50"
             >
               Explore Activities
             </Link>
          </div>
        )}
      </section>

      {/* Section B: Sequences / Weekly Sets */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-2xl font-outfit font-medium text-white flex items-center gap-3">
               <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">02</span>
               Teaching Sets
             </h2>
             <p className="text-sm text-slate-500 font-outfit mt-1 opacity-70 italic">Organize activities into thematic sequences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {state.sequences.map((seq) => (
              <motion.div 
                key={seq.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 rounded-3xl bg-slate-950 border border-white/5 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />
                
                <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="text-xl font-outfit font-medium text-white">{seq.name}</h3>
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-1">Manual Sequence</p>
                  </div>
                  <button 
                    onClick={() => deleteSequence(seq.id)}
                    className="p-2.5 rounded-xl bg-white/5 text-slate-700 hover:text-red-400 transition-all"
                    title="Delete Sequence"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-8 min-h-[100px]">
                   {seq.activityIds.length > 0 ? (
                     seq.activityIds.map((aid) => {
                       const a = allActivities.find(act => act.id === aid);
                       return (
                         <div key={aid} className="group/item flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/10 transition-all">
                            <span className="text-sm md:text-base text-slate-300 font-outfit font-medium">{a?.title || aid}</span>
                            <button 
                              onClick={() => removeFromSequence(seq.id, aid)}
                              className="p-1.5 rounded-lg text-slate-700 hover:bg-red-500/10 hover:text-red-400 transition-all opacity-0 group-hover/item:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                         </div>
                       );
                     })
                   ) : (
                     <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl text-[10px] text-slate-700 font-mono uppercase tracking-widest px-4">
                        Add items from individual activity pages
                     </div>
                   )}
                </div>

                <Link 
                  href="/activities"
                  className="w-full py-4 rounded-2xl bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-500 uppercase tracking-[0.1em] hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 text-center transition-all block font-bold"
                >
                  Browse Library
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* New Sequence Input */}
          <form onSubmit={handleCreateSequence} className="p-10 rounded-3xl border border-dashed border-white/10 bg-slate-900/10 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
             <div className="w-14 h-14 rounded-full bg-slate-950/80 border border-white/5 flex items-center justify-center text-slate-700 mb-8 border-dashed">
                <Layers className="w-6 h-6 opacity-30" />
             </div>
             <input 
               type="text" 
               placeholder="Enter Sequence Name..." 
               value={newSequenceName}
               onChange={(e) => setNewSequenceName(e.target.value)}
               className="bg-transparent text-center text-xl md:text-2xl font-outfit text-white placeholder:text-slate-800 border-b border-white/10 mb-8 focus:outline-none focus:border-cyan-500/50 pb-3 w-full max-w-sm"
             />
             <button 
               type="submit"
               disabled={!newSequenceName.trim()}
               className="flex items-center gap-3 text-slate-600 hover:text-cyan-400 disabled:opacity-30 transition-all font-mono text-xs uppercase tracking-[0.2em] font-bold group"
             >
                <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" /> Create Teaching Set
             </button>
          </form>
        </div>
      </section>

      {/* Section C: Saved Activities */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-8">
          <div>
             <h2 className="text-2xl font-outfit font-medium text-white flex items-center gap-3">
               <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">03</span>
               Activity Studio
             </h2>
             <p className="text-sm text-slate-500 font-outfit mt-1 opacity-70 italic">Your personal reference library of tactical activities</p>
          </div>
          {savedActivities.length > 0 && (
             <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">{savedActivities.length} Saved</span>
          )}
        </div>

        {savedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedActivities.map((a: any) => (
              <div 
                key={a.id}
                className="group p-6 rounded-3xl bg-slate-900/40 border border-white/[0.03] hover:border-cyan-500/20 transition-all shadow-xl hover:shadow-cyan-950/20 relative"
              >
                 <div className="flex justify-between items-start mb-5">
                    <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.1em] font-bold">{a.purpose}</span>
                    <button 
                      onClick={() => toggleSave(a.id)}
                      className="text-amber-500/40 hover:text-amber-400 transition-colors"
                      title="Unsave Activity"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                 </div>
                 <h3 className="text-xl font-outfit font-medium text-slate-100 mb-3 truncate group-hover:text-white transition-colors">{a.title}</h3>
                 <p className="text-[13px] text-slate-500 line-clamp-2 mb-8 leading-relaxed opacity-70 italic group-hover:opacity-100 transition-opacity">"{a.short_promise}"</p>
                 
                 <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                    <Link 
                      href={`/activities/${a.slug}`}
                      className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-2 group-hover:opacity-100"
                    >
                      View Full Detail <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                    <button 
                      onClick={() => toggleQueue(a.id)}
                      className={cn(
                        "p-3 rounded-2xl transition-all border",
                        state.queueActivityIds.includes(a.id) 
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" 
                          : "bg-white/5 border-white/5 text-slate-700 hover:text-cyan-400 hover:border-cyan-500/20"
                      )}
                      title={state.queueActivityIds.includes(a.id) ? "Remove from Queue" : "Add to Queue"}
                    >
                      {state.queueActivityIds.includes(a.id) ? <Check className="w-4 h-4" /> : <ListPlus className="w-4 h-4" />}
                    </button>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-[2.5rem] bg-slate-900/[0.02] border border-dashed border-white/[0.03]">
             <Search className="w-12 h-12 text-slate-800 mx-auto mb-6 opacity-20" />
             <p className="text-lg text-slate-700 font-outfit italic">No saved activities.</p>
             <p className="text-xs text-slate-800 font-mono uppercase tracking-widest mt-2">Browse the library to build your reference studio.</p>
          </div>
        )}
      </section>

    </div>
  );
}

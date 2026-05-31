"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Clock, Zap, BookOpen, Layers, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const COLLECTION_HINTS: Record<string, string> = {
  "reality-check-labs": "Read claims, graphs, and evidence more clearly",
  "build-the-study-engine": "Help students learn, remember, and practice better",
  "decision-gym": "Train the muscles of strategic trade-off calculation",
  "truth-disagreement-studio": "Navigate deep disagreement with steelman protocols",
  "people-pressure-defense": "Tactical social scripts for high school survival",
  "trust-teamwork-upgrades": "Improve reliability and group cooperation logic",
  "sandbox-make-tinker": "Turn abstract concepts into real-world capability",
  "sandbox-move-play-reset": "Embodied regulation and social timing calibration",
};

interface ActivityCardProps {
  activity: any;
  featured?: boolean;
}

function ActivityCard({ activity, featured }: ActivityCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/activities/${activity.slug}`);
  };

  // Map modes nicely to readable text
  const bestFor = useMemo(() => {
    const m = activity.mode?.toLowerCase() || "";
    if (m.includes("solo") || m.includes("individual")) return "Solo";
    if (m.includes("pair") || m.includes("groups")) return "Groups & Pairs";
    if (m.includes("class") || m.includes("classroom") || m.includes("mentor")) return "Teachers & Classrooms";
    return "All Learners";
  }, [activity.mode]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className={cn(
        "group relative h-full flex flex-col p-6 rounded-3xl transition-all duration-300 shadow-xl overflow-hidden border cursor-pointer",
        featured 
          ? "bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900/10 border-cyan-500/20 shadow-cyan-900/10 ring-1 ring-cyan-500/10" 
          : "bg-slate-900/40 border-white/5 hover:border-cyan-500/20 hover:bg-slate-900/60"
      )}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Activity Metadata Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-500/20 text-cyan-400 bg-cyan-500/5">
          {activity.purpose}
        </span>
        <span className="text-[9px] uppercase tracking-widest font-mono font-medium px-2.5 py-1 rounded-full border border-white/5 text-slate-400 bg-white/5">
          Best for: {bestFor}
        </span>
      </div>

      <h3 className="text-xl font-outfit font-medium text-slate-100 mb-2.5 leading-tight group-hover:text-white transition-colors">
        {activity.title}
      </h3>
      
      <p className="text-sm text-slate-400 mb-8 leading-relaxed flex-grow line-clamp-3">
        {activity.short_promise}
      </p>

      {/* Logistics Strip */}
      <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>{activity.duration?.typical || 30}m</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <Zap className="w-3.5 h-3.5 text-slate-600" />
            <span className="uppercase">{activity.energy || "Medium"}</span>
          </div>
        </div>

        {/* CTA: Open Activity */}
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
          Open Guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
}

export function ActivityLibraryClient({ initialActivities, collections }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    purpose: "all",
    mode: "all",
    duration: "all",
    prep: "all",
    energy: "all",
  });

  const uniquePurposes = Array.from(new Set(initialActivities.map((a: any) => a.purpose)));
  const uniqueModes = Array.from(new Set(initialActivities.map((a: any) => a.mode)));

  const filteredActivities = useMemo(() => {
    if (!initialActivities || initialActivities.length === 0) return [];

    return initialActivities.filter((a: any) => {
      // Search logic
      const searchTerms = searchQuery.toLowerCase();
      const matchesSearch = 
        a.title.toLowerCase().includes(searchTerms) ||
        a.short_promise.toLowerCase().includes(searchTerms) ||
        (a.purpose && a.purpose.toLowerCase().includes(searchTerms)) ||
        (a.mode && a.mode.toLowerCase().includes(searchTerms));

      if (!matchesSearch) return false;

      // Collection filter logic
      if (selectedCollection) {
        const collection = collections.find((c: any) => c.slug === selectedCollection);
        if (collection && !collection.included_activity_ids.includes(a.id)) return false;
      }

      // Metadata filters logic
      if (filters.purpose !== "all" && a.purpose !== filters.purpose) return false;
      if (filters.mode !== "all" && a.mode !== filters.mode) return false;
      if (filters.prep !== "all" && a.prep !== filters.prep) return false;
      if (filters.energy !== "all" && a.energy !== filters.energy) return false;
      
      if (filters.duration !== "all") {
        const d = a.duration.typical;
        if (filters.duration === "short" && d > 30) return false;
        if (filters.duration === "medium" && (d < 30 || d > 60)) return false;
        if (filters.duration === "long" && d < 60) return false;
      }

      return true;
    });
  }, [initialActivities, collections, searchQuery, selectedCollection, filters]);

  const featuredActivities = useMemo(() => {
    return initialActivities.filter((a: any) => a.status === 'flagship').slice(0, 4);
  }, [initialActivities]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCollection(null);
    setFilters({ purpose: "all", mode: "all", duration: "all", prep: "all", energy: "all" });
  };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      
      {/* Featured Collections Section */}
      <section className="mb-16">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-8 px-1">Browse by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((c: any) => (
            <button 
              key={c.id}
              onClick={() => setSelectedCollection(selectedCollection === c.slug ? null : c.slug)}
              className={cn(
                "p-5 md:p-6 rounded-3xl border text-left transition-all duration-300 group relative overflow-hidden h-full flex flex-col items-start gap-3",
                selectedCollection === c.slug 
                  ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-100 shadow-[0_0_20px_rgba(0,240,255,0.1)]" 
                  : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10 hover:bg-slate-900/60 shadow-xl"
              )}
            >
              <div className="flex-grow">
                <div className="text-[9px] font-mono uppercase tracking-widest mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  {c.id.split('_')[1].toUpperCase()}
                </div>
                <h3 className="text-sm md:text-base font-outfit font-medium leading-tight mb-2">
                  {c.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-slate-500 font-outfit opacity-80 group-hover:opacity-100 transition-opacity">
                   {COLLECTION_HINTS[c.slug] || c.description}
                </p>
              </div>
              {selectedCollection === c.slug && (
                 <div className="absolute top-4 right-4 text-cyan-400">
                    <X className="w-3.5 h-3.5" />
                 </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Flagship Curations */}
      {!selectedCollection && searchQuery === "" && (
        <section className="mb-16">
          <div className="flex flex-col mb-8 px-1">
            <h2 className="text-sm md:text-base font-outfit font-medium text-slate-200">Recommended Challenges</h2>
            <p className="text-xs text-slate-500 font-outfit italic opacity-60">
              Four strong activities to begin your thinking practice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredActivities.length > 0 ? (
                featuredActivities.map((a: any) => (
                    <ActivityCard key={a.id} activity={a} featured />
                ))
            ) : (
                <div className="col-span-2 p-12 rounded-3xl bg-slate-900/20 border border-white/5 text-center text-slate-600 font-mono text-xs uppercase tracking-widest">
                    Curation loading...
                </div>
            )}
          </div>
        </section>
      )}

      {/* Search & Filter Header */}
      <div id="browse" className="scroll-mt-32 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search activities by title, purpose, or theme..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/60 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all font-outfit text-xl shadow-2xl"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-8 py-5 rounded-2xl border transition-all font-mono text-[11px] uppercase tracking-wider w-full md:w-auto justify-center shadow-xl",
              showFilters || Object.values(filters).some(v => v !== "all") 
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                : "bg-slate-900/40 border-white/10 text-slate-400 hover:border-white/20"
            )}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-8 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-8">
                {Object.entries({
                  purpose: { label: "Purpose", options: uniquePurposes },
                  mode: { label: "Mode", options: uniqueModes },
                  duration: { label: "Duration", options: ["short", "medium", "long"] },
                  prep: { label: "Prep", options: ["low", "medium", "high"] },
                  energy: { label: "Energy", options: ["low", "medium", "medium-high", "high"] }
                }).map(([key, cfg]) => (
                  <div key={key} className="space-y-3">
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold opacity-60">{cfg.label}</label>
                    <select 
                      value={(filters as any)[key]}
                      onChange={(e) => setFilters({...filters, [key]: e.target.value})}
                      className="w-full bg-slate-950/80 border border-white/5 rounded-xl py-2.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/40 cursor-pointer hover:border-white/10 transition-colors"
                    >
                      <option value="all">Any {cfg.label}</option>
                      {cfg.options.map((opt: any) => (
                        <option key={opt} value={opt}>{String(opt).replace(/-/g, ' ')}</option>
                      ) as any)}
                    </select>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Section */}
      <div className="relative min-h-[400px]">
        {filteredActivities.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8 px-1 border-b border-white/5 pb-6">
               <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                  {selectedCollection ? collections.find((c: any) => c.slug === selectedCollection)?.title : "Complete Library"}
                  <span className="ml-4 text-cyan-500/50 font-bold">{filteredActivities.length} Guides Mapped</span>
               </h2>
               {selectedCollection && (
                 <button onClick={() => setSelectedCollection(null)} className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest hover:text-white transition-colors bg-cyan-500/5 border border-cyan-500/20 px-3 py-1 rounded-full">Clear Collection</button>
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredActivities.map((a: any) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 px-4 text-center bg-slate-900/40 border border-dashed border-white/10 rounded-[2.5rem] shadow-2xl"
          >
            <BookOpen className="w-16 h-16 text-slate-800 mb-8 opacity-20" />
            <h3 className="text-2xl font-outfit text-slate-200 mb-3">No activities found</h3>
            <p className="text-sm text-slate-500 mb-10 max-w-sm leading-relaxed mx-auto">
              Try adjusting your search query or broadening your filters to explore other activities in the library.
            </p>
            <button 
              onClick={resetFilters}
              className="px-10 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 uppercase tracking-widest hover:bg-cyan-500/20 transition-all font-bold shadow-lg shadow-cyan-900/10"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Clean Footer */}
      <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs font-outfit text-slate-100 font-medium">Curiosity OS</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Free & Open Thinking Library</p>
          </div>
        </div>
        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-widest text-slate-600">
           <span>Free Exploration</span>
           <span>No-Auth Static Guide</span>
        </div>
      </footer>
    </div>
  );
}

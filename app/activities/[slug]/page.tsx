import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, BookOpen, Users, GraduationCap, ChevronRight, AlertCircle, Eye, HelpCircle } from "lucide-react";
import { getActivityBySlug, getFollowUps } from "@/lib/activities";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ActivityDetail({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const followUps = await getFollowUps(activity.follow_ups || []);

  // Determine "Best Used By" audience
  const audience = activity.group_mode?.toLowerCase() || "";
  const bestUsedBy = [];
  if (audience.includes("solo") || audience.includes("individual")) {
    bestUsedBy.push("Student Alone");
  }
  if (audience.includes("pair") || audience.includes("group") || audience.includes("team")) {
    bestUsedBy.push("Pair or Group");
  }
  if (audience.includes("class") || audience.includes("classroom") || audience.includes("teacher")) {
    bestUsedBy.push("Teacher & Classroom");
  }
  if (bestUsedBy.length === 0) {
    bestUsedBy.push("Self-Learner & Parent Conversation");
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-40 px-4 md:px-8 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Navigation */}
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 mb-8 text-slate-500 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-mono">Back to Library</span>
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5">
              {activity.purpose_category}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium px-2.5 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5">
              {activity.mode_category}
            </span>
            {activity.status === 'flagship' && (
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border border-cyan-500/35 text-cyan-300 bg-cyan-950/20 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                Recommended Practice
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-outfit font-light text-white mb-4 tracking-tight leading-tight">
            {activity.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-outfit font-medium mb-6 leading-relaxed italic opacity-90">
            "{activity.short_promise}"
          </p>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-3xl border-l border-cyan-500/20 pl-6 py-2">
            {activity.summary}
          </p>

          {/* Logistics Board */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Time Needed</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">{activity.duration_minutes.typical} mins</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Energy Level</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium uppercase">{activity.energy_level}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Prep Work</span>
              <div className="flex items-center gap-2 text-slate-200">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium uppercase font-mono">{activity.prep_level}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Group Format</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium uppercase font-mono">{activity.group_mode}</span>
              </div>
            </div>
          </div>

          {/* Materials Needed & Audience Tags */}
          <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-950 border border-white/[0.03]">
            <div className="flex-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2 block">Best Used By</span>
              <div className="flex flex-wrap gap-2">
                {bestUsedBy.map((aud, idx) => (
                  <span key={idx} className="text-xs text-cyan-400/90 bg-cyan-950/20 border border-cyan-800/30 px-3 py-1 rounded-full">
                    {aud}
                  </span>
                ))}
              </div>
            </div>
            {activity.materials?.minimal?.length > 0 && (
              <div className="flex-1 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2 block">Materials Needed</span>
                <div className="flex flex-wrap gap-2">
                  {activity.materials.minimal.map((mat: string, idx: number) => (
                    <span key={idx} className="text-xs text-slate-300 border border-white/5 bg-white/5 px-2.5 py-1 rounded-md">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Sections */}
        <section className="space-y-16">
          
          {/* Mission Goals */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent border border-cyan-500/10">
              <h3 className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Facilitator / Mentor Goal
              </h3>
              <p className="text-slate-300 leading-relaxed italic text-sm">
                {activity.teacher_value_line}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-500/[0.03] to-transparent border border-white/5">
              <h3 className="text-xs text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Learner Takeaway
              </h3>
              <p className="text-slate-300 leading-relaxed italic text-sm">
                {activity.student_value_line}
              </p>
            </div>
          </div>

          {/* Simple Steps Timeline */}
          <div>
            <h2 className="text-xl font-outfit font-medium text-white mb-8 flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">01</span>
              Facilitation Steps
            </h2>
            <div className="space-y-4">
              {activity.flow_steps.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 transition-colors group">
                   <div className="text-xs font-mono text-cyan-400/80 w-16 pt-0.5 font-bold">
                     {step.t} min
                   </div>
                   <div className="text-slate-300 leading-relaxed text-sm">
                     {step.step}
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Try This Example / Detailed Playbook */}
          {activity.run_steps && activity.run_steps.length > 0 && (
            <div>
              <h2 className="text-xl font-outfit font-medium text-white mb-8 flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">02</span>
                Detailed Playbook
              </h2>
              <div className="space-y-8">
                {activity.run_steps.map((step: any, idx: number) => (
                  <div key={step.id} className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/10 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
                        STEP {idx + 1}
                      </span>
                      <h4 className="text-base font-semibold text-white tracking-tight">{step.title}</h4>
                    </div>
                    <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap pl-2 font-light">
                      {step.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips, Common Signs, and Pitfalls */}
          <div className="pt-8 border-t border-white/5 space-y-10">
            <h2 className="text-xl font-outfit font-medium text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">03</span>
              Facilitation Insights
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Facilitation moves */}
              {activity.teacher_moves?.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Helpful Moves & Tips
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {activity.teacher_moves.map((move: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-400 leading-relaxed font-light">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                        {move}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Signs to watch for */}
              {activity.teacher_watch_fors?.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    What to Watch For
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {activity.teacher_watch_fors.map((watch: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-400 leading-relaxed font-light">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {watch}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-6">
              {/* Observation cues */}
              {activity.observation_cues?.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Success Indicators
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {activity.observation_cues.map((cue: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-400 leading-relaxed font-light">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Failure points */}
              {activity.common_failure_points?.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Pitfalls to Avoid
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.common_failure_points.map((fail: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-mono text-red-400 bg-red-500/5 border border-red-500/20 px-2.5 py-1 rounded">
                        {fail.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reflection Prompts */}
          {activity.reflection_prompts?.length > 0 && (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/5 relative overflow-hidden">
               <h2 className="text-base font-mono text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                Reflection & discussion questions
              </h2>
              <div className="space-y-5">
                {activity.reflection_prompts.map((prompt: string, idx: number) => (
                  <p key={idx} className="text-base text-slate-300 font-outfit leading-relaxed pl-6 border-l-2 border-cyan-500/20 italic">
                    "{prompt}"
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Try Next / Follow Ups */}
          {followUps.length > 0 && (
            <div className="pt-12 border-t border-white/5">
              <h2 className="text-lg font-outfit font-medium text-white mb-6">Suggested Next Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followUps.map((fu: any) => (
                  <Link 
                    key={fu.id}
                    href={`/activities/${fu.slug}`}
                    className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all group"
                  >
                    <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-mono mb-1">{fu.purpose}</span>
                    <h4 className="text-slate-100 font-semibold group-hover:text-white mb-1 transition-colors">{fu.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{fu.short_promise}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

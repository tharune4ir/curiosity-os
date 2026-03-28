import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Zap, BookOpen, Users, GraduationCap, ChevronRight, AlertCircle, Eye, MessageSquare, Repeat } from "lucide-react";
import { getActivityBySlug, getFollowUps } from "@/lib/activities";
import { cn } from "@/lib/utils";
import { ActivityActions } from "@/components/ActivityActions";
import { ActivityHistory } from "@/components/ActivityHistory";
import { LastAdaptation } from "@/components/LastAdaptation";

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

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-40 px-4 md:px-8">
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
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-400 bg-cyan-500/5">
              {activity.purpose_category}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono font-medium px-2.5 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5">
              {activity.mode_category}
            </span>
            {activity.status === 'flagship' && (
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border border-amber-500/50 text-amber-500 bg-amber-500/5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                Flagship Activity
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-outfit font-light text-white mb-4 tracking-tight leading-tight">
            {activity.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-outfit font-medium mb-4 leading-relaxed italic opacity-90">
            "{activity.short_promise}"
          </p>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-3xl border-l border-white/10 pl-6 py-2">
            {activity.summary}
          </p>

          <div className="mb-12">
            <ActivityActions 
              activityId={activity.id} 
              activitySlug={activity.slug} 
              activityTitle={activity.title} 
            />
          </div>

          {/* Logistics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">Duration</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-cyan-500/50" />
                <span className="text-sm font-medium">{activity.duration_minutes.typical} mins</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">Energy</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Zap className="w-4 h-4 text-cyan-500/50" />
                <span className="text-sm font-medium uppercase">{activity.energy_level}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">Prep</span>
              <div className="flex items-center gap-2 text-slate-200">
                <BookOpen className="w-4 h-4 text-cyan-500/50" />
                <span className="text-sm font-medium uppercase font-mono">{activity.prep_level}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">Group</span>
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-4 h-4 text-cyan-500/50" />
                <span className="text-sm font-medium uppercase font-mono">{activity.group_mode}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Sections */}
        <section className="space-y-16">
          
          {/* Mission Intent */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/[0.03] to-transparent border border-cyan-500/10">
              <h3 className="text-xs text-cyan-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Teacher Goal
              </h3>
              <p className="text-slate-300 leading-relaxed italic">
                {activity.teacher_value_line}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-500/[0.03] to-transparent border border-white/5">
              <h3 className="text-xs text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Student Takeaway
              </h3>
              <p className="text-slate-300 leading-relaxed italic">
                {activity.student_value_line}
              </p>
            </div>
          </div>

          {/* Flow Steps */}
          <div>
            <h2 className="text-xl font-outfit font-medium text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-mono">01</span>
              Activity Flow
            </h2>
            <div className="space-y-4">
              {activity.flow_steps.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 transition-colors group">
                   <div className="text-xs font-mono text-slate-500 w-12 pt-0.5 group-hover:text-cyan-500/70 transition-colors">
                     {step.t} min
                   </div>
                   <div className="text-slate-300 leading-relaxed">
                     {step.step}
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Moves & Watch-fors */}
          <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
            <div>
              <h2 className="text-lg font-outfit font-medium text-white mb-6 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-cyan-500" />
                Teacher Moves
              </h2>
              <ul className="space-y-4">
                {activity.teacher_moves.map((move: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    {move}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-outfit font-medium text-white mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-500" />
                What to Watch For
              </h2>
              <ul className="space-y-4">
                {activity.teacher_watch_fors.map((watch: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    {watch}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Evidence and Failure Points */}
          <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
            <div>
              <h2 className="text-lg font-outfit font-medium text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-500" />
                Observation Cues
              </h2>
              <ul className="space-y-4">
                {activity.observation_cues.map((cue: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0" />
                    {cue}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-outfit font-medium text-white mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Common Failures
              </h2>
              <div className="flex flex-wrap gap-2">
                {activity.common_failure_points.map((fail: string, idx: number) => (
                  <span key={idx} className="text-[10px] font-mono text-red-400 bg-red-500/5 border border-red-500/20 px-2 py-1 rounded">
                    {fail.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reflection Prompts */}
          {activity.reflection_prompts?.length > 0 && (
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <Repeat className="w-32 h-32 text-white" />
               </div>
               <h2 className="text-lg font-outfit font-medium text-white mb-6 flex items-center gap-2">
                <Repeat className="w-5 h-5 text-cyan-400" />
                Reflection Prompts
              </h2>
              <div className="space-y-6">
                {activity.reflection_prompts.map((prompt: string, idx: number) => (
                  <p key={idx} className="text-lg text-slate-300 font-outfit tracking-tight leading-relaxed pl-6 border-l-2 border-cyan-500/20">
                    "{prompt}"
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Follow Ups */}
          {followUps.length > 0 && (
            <div className="pt-8 border-t border-white/5">
              <h2 className="text-lg font-outfit font-medium text-white mb-8">Suggested Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followUps.map((fu: any) => (
                  <Link 
                    key={fu.id}
                    href={`/activities/${fu.slug}`}
                    className="flex flex-col p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all group"
                  >
                    <span className="text-[9px] text-cyan-500 uppercase tracking-widest font-mono mb-1">{fu.purpose}</span>
                    <h4 className="text-slate-100 font-medium group-hover:text-white mb-1">{fu.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{fu.short_promise}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <LastAdaptation activityId={activity.id} />
          <ActivityHistory activityId={activity.id} activitySlug={activity.slug} />
        </section>
      </div>
    </main>
  );
}

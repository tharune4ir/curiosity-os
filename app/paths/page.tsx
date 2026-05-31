import { getActivityIndex } from "@/lib/activities";
import Link from "next/link";
import { ArrowRight, Compass, HelpCircle, Layers, Compass as ObserverIcon, GraduationCap, Users, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Learning Paths // Curiosity OS",
  description: "Curated active learning paths to train observation, questioning, reasoning, and self-learning.",
};

const PATHS = [
  {
    id: "ask-better-questions",
    title: "Learn to Ask Better Questions",
    description: "Train yourself or others to break past surface-level assumptions and discover the core of any issue.",
    icon: HelpCircle,
    colorClass: "from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-400",
    activitySlugs: [
      "cos2_a28_listening-lab-paraphrase-clarify-confirm",
      "cos2_a02_signal-vs-noise-two-class-mystery",
      "cos2_a25_rewrite-clinic-social-friction-clarity"
    ]
  },
  {
    id: "think-clearly-not-fast",
    title: "Think Clearly, Not Just Fast",
    description: "Slow down your judgment, evaluate trade-offs, and map causal relationships systematically.",
    icon: Compass,
    colorClass: "from-purple-500/10 to-pink-500/5 border-purple-500/20 text-purple-400",
    activitySlugs: [
      "cos2_a15_decision-clinic-tradeoffs-trees-premortems",
      "cos2_a18_systems-dominoes-causal-chains",
      "cos2_a13_confidence-bayes-ladder-calibrate-certainty"
    ]
  },
  {
    id: "observe-before-judge",
    title: "Observe Before You Judge",
    description: "Distinguish factual data from interpretations, recognize biases, and see things from multiple view angles.",
    icon: ObserverIcon,
    colorClass: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-400",
    activitySlugs: [
      "cos2_a09_bias-court-same-facts-different-story",
      "cos2_a17_evidence-ladder-claim-strength-ranking",
      "cos2_a23_truth-reliability-ledger-reputation"
    ]
  },
  {
    id: "study-without-rote",
    title: "Study Without Rote Memorization",
    description: "Leverage proven cognitive science principles like active retrieval, interleaving, and debugging memory limits.",
    icon: GraduationCap,
    colorClass: "from-amber-500/10 to-orange-500/5 border-amber-500/20 text-amber-400",
    activitySlugs: [
      "cos2_a12_retrieval-showdown-beat-illusion-competence",
      "cos2_a14_interleaving-shuffle-lab-hidden-differences",
      "cos2_a10_working-memory-budget-brain-friendly-worksheet"
    ]
  },
  {
    id: "discuss-without-fighting",
    title: "Discuss Without Fighting",
    description: "Build trust, steelman opposing points of view, and learn to voice disagreements constructively.",
    icon: Users,
    colorClass: "from-indigo-500/10 to-blue-500/5 border-indigo-500/20 text-indigo-400",
    activitySlugs: [
      "cos2_a21_steelman-argument-map-disagreement",
      "cos2_a24_calibration-radar-social-cues",
      "cos2_a33_alliance-arena-communication-relay"
    ]
  },
  {
    id: "build-real-world-curiosity",
    title: "Build Real-World Curiosity",
    description: "Apply hands-on engineering hacks, trace loops of compounding growth, and analyze headline noise in daily life.",
    icon: Lightbulb,
    colorClass: "from-rose-500/10 to-orange-500/5 border-rose-500/20 text-rose-400",
    activitySlugs: [
      "cos2_a01_feed-hacker-headline-autopsy",
      "cos2_a04_growth-loops-compounding-simulator",
      "cos2_a32_hacksmiths-workshop-scrap-to-system"
    ]
  }
];

export default async function LearningPathsPage() {
  const activities = await getActivityIndex();

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-32 px-4 md:px-8 selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-outfit font-light text-white mb-6 tracking-tight">
            Learning <span className="text-cyan-400 font-normal underline decoration-cyan-500/30 underline-offset-8">Paths</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-outfit">
            Structured journeys for curiosity and mental play. Pick a path below to explore matching activities and build practical thinking habits.
          </p>
          <p className="text-sm text-slate-500 mt-4 font-outfit font-medium italic opacity-70">
            No signups. No progress trackers. Just free, open-source active exploration.
          </p>
        </section>

        {/* Paths Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PATHS.map((path) => {
            const Icon = path.icon;
            
            // Resolve activities belonging to this path
            const pathActivities = path.activitySlugs.map(slug => {
              return activities.find((a: any) => a.slug === slug);
            }).filter((a): a is any => !!a);

            return (
              <div 
                key={path.id}
                className={`p-8 rounded-3xl bg-gradient-to-br ${path.colorClass} border backdrop-blur-sm flex flex-col justify-between hover:scale-[1.01] transition-transform`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-outfit font-medium text-white tracking-tight">
                      {path.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed text-sm mb-8 font-light">
                    {path.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block mb-2">
                    Recommended Steps ({pathActivities.length})
                  </span>
                  
                  {pathActivities.map((act: any, idx: number) => (
                    <Link
                      key={act.id}
                      href={`/activities/${act.slug}`}
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 hover:bg-slate-950 border border-white/[0.03] hover:border-cyan-500/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-cyan-400 font-bold w-5">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {act.title}
                          </h4>
                          <span className="text-[9px] text-slate-500 uppercase font-mono tracking-wider block">
                            {act.purpose} • {act.duration?.typical} mins
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

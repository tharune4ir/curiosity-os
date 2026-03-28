import { getActivityIndex } from "@/lib/activities";
import { PlannerClient } from "./PlannerClient";

export const metadata = {
  title: "Activity Planner // Curiosity OS",
  description: "Lightweight teacher planning studio for Curiosity OS activities.",
};

export default async function PlannerPage() {
  const allActivities = await getActivityIndex();

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-40 px-4 md:px-8">
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-outfit font-light text-white mb-6 tracking-tight">
          Planning <span className="text-cyan-400 font-normal underline decoration-cyan-500/30 underline-offset-8">Studio</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-outfit">
          Organize activities, build sequences, and prepare for your next classroom session.
        </p>
      </div>

      <PlannerClient allActivities={allActivities} />
    </main>
  );
}

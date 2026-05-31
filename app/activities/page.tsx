import { Suspense } from "react";
import { getActivityIndex, getCollections } from "@/lib/activities";
import { ActivityLibraryClient } from "./ActivitiesClient";

export const metadata = {
  title: "Activity Library // Curiosity OS",
  description: "Free and open thinking playbooks for students, parents, and curious minds.",
};

export default async function ActivityLibrary() {
  const [activities, collections] = await Promise.all([
    getActivityIndex(),
    getCollections(),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-48 px-4 md:px-8">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-outfit font-light text-white mb-6 tracking-tight">
          Activity <span className="text-cyan-400 font-normal underline decoration-cyan-500/30 underline-offset-8">Library</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed font-outfit">
          Find activities you can run to build stronger thinking, discussion, judgment, and real-world capability.
        </p>
        <p className="text-sm text-slate-500 mt-4 font-outfit font-medium italic opacity-70">
          Free & open guides for curious students, teachers, parents, and self-learners.
        </p>
      </section>

      {/* Interactive Library Interface */}
      <Suspense fallback={<div className="text-slate-500 animate-pulse text-center">Loading activities...</div>}>
        <ActivityLibraryClient initialActivities={activities} collections={collections} />
      </Suspense>

    </main>
  );
}

import { getRunData, getActivityBySlug } from "@/lib/activities";
import { notFound } from "next/navigation";
import { ReflectionWorkspace } from "@/components/ReflectionWorkspace";

interface PageProps {
  params: Promise<{ slug: string; sessionId: string }>;
}

export default async function ReflectionPage({ params }: PageProps) {
  const { slug, sessionId } = await params;
  const activity = await getRunData(slug);

  if (!activity || !sessionId) {
    notFound();
  }

  // Fetch follow-up activities from content source
  const followUpActivities = await Promise.all(
    (activity.follow_ups || []).map(async (s) => await getActivityBySlug(s))
  );

  const cleanFollowUps = followUpActivities.filter((a): a is any => a !== null);

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-40 px-4 md:px-8 font-outfit">
      <ReflectionWorkspace 
        activity={activity} 
        sessionId={sessionId} 
        followUpActivities={cleanFollowUps}
      />
    </main>
  );
}

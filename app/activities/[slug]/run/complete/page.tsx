import { getRunData } from "@/lib/activities";
import { notFound } from "next/navigation";
import { PostRunReflection } from "@/components/PostRunReflection";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sessionId: string }>;
}

export default async function PostRunPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { sessionId } = await searchParams;
  const activity = await getRunData(slug);

  if (!activity || !sessionId) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-40 px-4 md:px-8 font-outfit">
      <PostRunReflection activity={activity} sessionId={sessionId} />
    </main>
  );
}

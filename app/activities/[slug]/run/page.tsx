import { getRunData } from "@/lib/activities";
import { notFound } from "next/navigation";
import { RunModeClient } from "./RunModeClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RunModePage({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getRunData(slug);

  if (!activity) {
    notFound();
  }

  return <RunModeClient activity={activity} />;
}

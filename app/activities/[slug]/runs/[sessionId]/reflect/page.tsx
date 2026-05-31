import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReflectionPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/activities/${slug}`);
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/CaseStudy";
import { getWorkCard, workCards } from "@/data/workCards";

type Params = { slug: string };

// Tell Next which slugs to pre-build at static-export time.
export function generateStaticParams(): Params[] {
  return workCards.map((card) => ({ slug: card.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = getWorkCard(slug);
  if (!card) return { title: "Project not found" };
  return {
    title: `${card.title} — Anshuman Singh`,
    description: card.tagline,
    openGraph: {
      title: `${card.title} — Anshuman Singh`,
      description: card.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const card = getWorkCard(slug);
  if (!card) notFound();
  return <CaseStudy card={card} />;
}

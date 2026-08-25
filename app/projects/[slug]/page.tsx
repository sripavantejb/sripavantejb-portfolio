import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { AgencyErpCaseStudy } from "@/components/projects/agency-erp/AgencyErpCaseStudy";
import { getSeedProjects } from "@/lib/models/project";
import { profile } from "@/lib/data";

export function generateStaticParams() {
  return getSeedProjects()
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getSeedProjects().find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — ${profile.name}`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSeedProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  if (slug === "agency-erp") {
    return (
      <>
        <Nav />
        <AgencyErpCaseStudy project={project} />
      </>
    );
  }

  notFound();
}

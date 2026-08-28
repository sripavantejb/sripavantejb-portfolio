import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { AgencyErpCaseStudy } from "@/components/projects/agency-erp/AgencyErpCaseStudy";
import { getSeedProjects } from "@/lib/models/project";
import { profile } from "@/lib/data";
import {
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return getSeedProjects()
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSeedProjects().find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — ${project.org}`;

  return buildPageMetadata({
    title,
    description: project.description,
    path: `/projects/${slug}`,
    ogType: "article",
  });
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getSeedProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  const pageTitle = `${project.title} — ${profile.name}`;
  const projectSchema = buildJsonLdGraph(
    buildWebPageSchema({
      path: `/projects/${slug}`,
      name: pageTitle,
      description: project.description,
    }),
    buildCreativeWorkSchema({
      name: project.title,
      description: project.description,
      path: `/projects/${slug}`,
      dateCreated: project.dates,
      keywords: project.stack,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#projects" },
      { name: project.title, path: `/projects/${slug}` },
    ])
  );

  if (slug === "agency-erp") {
    return (
      <>
        <JsonLd data={projectSchema} />
        <Nav />
        <AgencyErpCaseStudy project={project} />
      </>
    );
  }

  notFound();
}

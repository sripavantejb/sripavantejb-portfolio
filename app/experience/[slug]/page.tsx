import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { ExperienceDetail } from "@/components/sections/ExperienceDetail";
import {
  experience,
  aiBuilds,
  awards,
  leadership,
  education,
  certifications,
  stats,
  profile,
} from "@/lib/data";
import { listPublicProjects } from "@/lib/models/project";
import {
  buildBreadcrumbSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 60;

export function generateStaticParams() {
  return experience.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = experience.find((r) => r.slug === slug);
  if (!role) return {};

  const title = `${role.title} at ${role.org}`;
  const description = role.description;

  return buildPageMetadata({
    title,
    description,
    path: `/experience/${slug}`,
  });
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = experience.find((r) => r.slug === slug);
  if (!role) notFound();

  const projects = await listPublicProjects();
  const relatedProjects = projects.filter((p) => role.relatedProjectIds?.includes(p.id));
  const relatedAIBuilds = aiBuilds.filter((b) => role.relatedAIBuildTitles?.includes(b.title));
  const relatedAwards = awards.filter((a) => role.relatedAwardTitles?.includes(a.title));
  const roleLeadership = role.showAllLeadership ? leadership : [];
  const roleEducation = role.showEducationAndCerts ? education[0] : undefined;
  const roleCertifications = role.showEducationAndCerts ? certifications : [];
  const statHighlights = stats.filter((s) => role.statHighlightLabels?.includes(s.label));

  const pageTitle = `${role.title} at ${role.org} — ${profile.name}`;
  const experienceSchema = buildJsonLdGraph(
    buildWebPageSchema({
      path: `/experience/${slug}`,
      name: pageTitle,
      description: role.description,
    }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Experience", path: "/#experience" },
      { name: role.org, path: `/experience/${slug}` },
    ])
  );

  return (
    <>
      <JsonLd data={experienceSchema} />
      <Nav />
      <ExperienceDetail
        role={role}
        relatedProjects={relatedProjects}
        relatedAIBuilds={relatedAIBuilds}
        relatedAwards={relatedAwards}
        leadership={roleLeadership}
        education={roleEducation}
        certifications={roleCertifications}
        statHighlights={statHighlights}
      />
    </>
  );
}

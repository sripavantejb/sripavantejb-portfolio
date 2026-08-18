import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ExperienceDetail } from "@/components/sections/ExperienceDetail";
import {
  experience,
  projects,
  aiBuilds,
  awards,
  leadership,
  education,
  certifications,
  stats,
  profile,
} from "@/lib/data";

export function generateStaticParams() {
  return experience.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = experience.find((r) => r.slug === slug);
  if (!role) return {};

  const title = `${role.title} at ${role.org} — ${profile.name}`;
  return {
    title,
    description: role.description,
    openGraph: { title, description: role.description },
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = experience.find((r) => r.slug === slug);
  if (!role) notFound();

  const relatedProjects = projects.filter((p) => role.relatedProjectIds?.includes(p.id));
  const relatedAIBuilds = aiBuilds.filter((b) => role.relatedAIBuildTitles?.includes(b.title));
  const relatedAwards = awards.filter((a) => role.relatedAwardTitles?.includes(a.title));
  const roleLeadership = role.showAllLeadership ? leadership : [];
  const roleEducation = role.showEducationAndCerts ? education[0] : undefined;
  const roleCertifications = role.showEducationAndCerts ? certifications : [];
  const statHighlights = stats.filter((s) => role.statHighlightLabels?.includes(s.label));

  return (
    <>
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

import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AwardsHighlightSection } from "@/components/sections/AwardsHighlightSection";
import { WhyMeSection } from "@/components/sections/WhyMeSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FeaturedInSection } from "@/components/sections/FeaturedInSection";
import { HackathonsSection } from "@/components/sections/HackathonsSection";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSeedProjects, listPublicProjects } from "@/lib/models/project";
import { getResumeAvailability } from "@/lib/models/resume";
import { buildJsonLdGraph, buildWebPageSchema } from "@/lib/schema";
import {
  buildPageMetadata,
  defaultDescription,
  defaultTitle,
} from "@/lib/site";

export const revalidate = 60;

export const metadata = buildPageMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: "/",
});

async function HomeProjects() {
  const projects = await listPublicProjects();
  return <ProjectsSection projects={projects} />;
}

export default async function Home() {
  const resumeAvailable = await getResumeAvailability();

  const homeSchema = buildJsonLdGraph(
    buildWebPageSchema({
      path: "/",
      name: defaultTitle,
      description: defaultDescription,
    })
  );

  return (
    <>
      <JsonLd data={homeSchema} />
      <Nav resumeAvailable={resumeAvailable} />
      <main id="main" className="flex flex-1 flex-col overflow-x-clip [scroll-behavior:smooth]">
        {/* Sticky-stacking intro (desktop): each slide pins full-screen while the next covers it */}
        <HeroSection resumeAvailable={resumeAvailable} />
        <ExperienceSection />
        <AwardsHighlightSection />
        <WhyMeSection />

        {/* Normal flowing content, layered above the sticky stack */}
        <MarqueeStrip />
        <Suspense fallback={<ProjectsSection projects={getSeedProjects()} />}>
          <HomeProjects />
        </Suspense>
        <FeaturedInSection />
        <HackathonsSection />
        <OpenSourceSection />
        <LeadershipSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection resumeAvailable={resumeAvailable} />
      </main>
    </>
  );
}

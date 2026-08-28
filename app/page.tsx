import { Suspense } from "react";
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

export const revalidate = 60;

async function HomeProjects() {
  const projects = await listPublicProjects();
  return <ProjectsSection projects={projects} />;
}

export default async function Home() {
  const resumeAvailable = await getResumeAvailability();

  return (
    <>
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

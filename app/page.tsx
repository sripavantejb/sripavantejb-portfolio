import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AwardsHighlightSection } from "@/components/sections/AwardsHighlightSection";
import { WhyMeSection } from "@/components/sections/WhyMeSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AIBuildsSection } from "@/components/sections/AIBuildsSection";
import { AwardsScrollExpandSection } from "@/components/sections/AwardsScrollExpandSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col overflow-x-clip [scroll-behavior:smooth]">
        {/* Sticky-stacking intro (desktop): each slide pins full-screen while the next covers it */}
        <HeroSection />
        <ExperienceSection />
        <AwardsHighlightSection />
        <WhyMeSection />
        <TechStackSection />

        {/* Normal flowing content, layered above the sticky stack */}
        <MarqueeStrip />
        <AboutSection />
        <ProjectsSection />
        <AIBuildsSection />
        <AwardsScrollExpandSection />
        <AwardsSection />
        <SkillsSection />
        <EducationSection />
        <LeadershipSection />
        <ContactSection />
      </main>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { AboutSection } from "@/components/sections/AboutSection";
import { experience, profile } from "@/lib/data";
import {
  buildBreadcrumbSchema,
  buildJsonLdGraph,
  buildProfilePageSchema,
} from "@/lib/schema";
import { buildPageMetadata } from "@/lib/site";
import { getResumeAvailability } from "@/lib/models/resume";

const title = `About ${profile.name}`;
const description = profile.about[0];

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/about",
});

export default async function AboutPage() {
  const resumeAvailable = await getResumeAvailability();

  const aboutSchema = buildJsonLdGraph(
    buildProfilePageSchema({ path: "/about", name: title, description }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ])
  );

  return (
    <>
      <JsonLd data={aboutSchema} />
      <Nav resumeAvailable={resumeAvailable} />
      <main id="main" className="flex flex-1 flex-col">
        <header className="border-b-4 border-ink bg-[#050505] px-6 pb-8 pt-32 md:px-8 md:pb-10 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <nav aria-label="Breadcrumb" className="font-inter text-sm text-white/45">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-lime">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/70">About</li>
              </ol>
            </nav>
            <h1 className="mt-6 font-archivo text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1.05] tracking-tighter text-white">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-2xl font-inter text-base font-medium leading-relaxed text-white/70 md:text-lg">
              {profile.headline}. {profile.subHeadline}.
            </p>
          </div>
        </header>

        <AboutSection />

        <section className="border-t-4 border-ink bg-paper py-16 text-ink md:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-archivo text-2xl font-black uppercase tracking-tight md:text-3xl">
              Experience &amp; Work
            </h2>
            <p className="mt-3 max-w-2xl font-inter text-base font-medium leading-relaxed text-ink/70">
              Explore roles where Sri Pavan Tej Balam ships products, leads teams, and builds with{" "}
              <a
                href={profile.editco}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-lime decoration-2 underline-offset-2"
              >
                Editco Media
              </a>
              .
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {experience.map((role) => (
                <li key={role.slug}>
                  <Link
                    href={`/experience/${role.slug}`}
                    className="group flex h-full flex-col border-4 border-ink bg-white p-5 shadow-[6px_6px_0_0_#0a0a0a] transition-shadow hover:shadow-[10px_10px_0_0_#0a0a0a]"
                  >
                    <h3 className="font-archivo text-lg font-black uppercase tracking-tight">{role.title}</h3>
                    <p className="mt-1 font-inter text-sm font-semibold text-ink/60">{role.org}</p>
                    <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-ink/70">{role.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 font-inter text-xs font-bold uppercase tracking-wide text-ink/45 group-hover:text-ink">
                      View details <ArrowRight size={12} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 border-4 border-ink bg-lime px-5 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-ink shadow-[4px_4px_0_0_#0a0a0a]"
              >
                View Projects <ArrowRight size={14} />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border-4 border-ink bg-white px-5 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-ink shadow-[4px_4px_0_0_#0a0a0a]"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

const CompleteShelfScene = dynamic(
  () =>
    import("@/components/projects/CompleteShelfScene").then(
      (m) => m.CompleteShelfScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="shader-frame bg-[#171a24]" aria-busy="true" />
    ),
  },
);

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className={`bg-paper text-ink ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6 pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects"
          description="Things I built, shipped, and stood behind — open a volume on the shelf, then dig into the case studies below."
        />
        <p className="mt-5 max-w-2xl font-inter text-sm font-medium leading-relaxed text-ink/60 md:text-base">
          Scroll the shelf, pick a project, open the book. Same energy as the rest of this site: less pitch deck,
          more proof of work.
        </p>
      </div>

      <div className="mt-10 w-full border-y-4 border-ink bg-[#171a24]">
        <CompleteShelfScene />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-14 md:pb-32 md:pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-4">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              {"// Case studies"}
            </p>
            <h3 className="mt-2 font-archivo text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
              Written up. <span className="bg-lime px-1.5 text-ink">Ready to open.</span>
            </h3>
          </div>
          <p className="max-w-sm font-inter text-sm font-medium text-ink/55">
            Cards for the builds with a deeper write-up. The shelf above is the quick tour.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="font-inter text-base font-medium text-ink/50">
            Selected work coming soon.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const href = p.slug ? `/projects/${p.slug}` : p.link;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  {href ? (
                    <Link
                      href={href}
                      className="group flex h-full flex-col rounded-xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink"
                    >
                      <CardBody project={p} />
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-xl border border-ink/10 bg-white p-5">
                      <CardBody project={p} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function CardBody({ project: p }: { project: Project }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
          {p.category ?? p.dates}
        </p>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-ink/30 transition-colors group-hover:text-ink"
        />
      </div>
      <h3 className="mt-3 font-archivo text-lg tracking-tight text-ink">
        {p.title}
      </h3>
      <p className="mt-1 font-inter text-sm text-ink/50">
        {p.org}
        {p.role ? ` · ${p.role}` : ""}
      </p>
      <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-ink/65">
        {p.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-md bg-ink/[0.04] px-2 py-0.5 font-inter text-[11px] text-ink/55"
          >
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

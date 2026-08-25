"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className={`bg-paper py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow="Selected Work" title="Projects" />

        {projects.length === 0 ? (
          <p className="mt-14 font-inter text-base font-medium text-ink/50">Selected work coming soon.</p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <ArrowUpRight size={16} className="shrink-0 text-ink/30 transition-colors group-hover:text-ink" />
      </div>
      <h3 className="mt-3 font-archivo text-lg tracking-tight text-ink">{p.title}</h3>
      <p className="mt-1 font-inter text-sm text-ink/50">
        {p.org}
        {p.role ? ` · ${p.role}` : ""}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded-md bg-ink/[0.04] px-2 py-0.5 font-inter text-[11px] text-ink/55">
            {s}
          </span>
        ))}
      </div>
    </>
  );
}

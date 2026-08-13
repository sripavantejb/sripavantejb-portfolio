"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagChip } from "@/components/ui/TagChip";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { TiltCard } from "@/components/ui/TiltCard";

export function ProjectsSection() {
  return (
    <section id="projects" className={`bg-paper py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects"
          description="Seven shipped builds — from production MERN apps to AI-powered tools for real users."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <TiltCard className="flex h-full flex-col rounded-[20px] border-4 border-ink bg-white p-6 shadow-[6px_6px_0_0_#0a0a0a] transition-shadow hover:shadow-[10px_10px_0_0_#0a0a0a] md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="inline-block bg-ink px-1.5 py-0.5 font-archivo text-xs font-black uppercase tracking-widest text-lime">
                      {String(p.id).padStart(2, "0")} · {p.dates}
                    </p>
                    <h3 className="mt-1 font-archivo text-xl uppercase leading-tight tracking-tight md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-inter text-sm font-semibold text-ink/50">{p.org}</p>
                  </div>
                  {p.link && p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-white"
                      aria-label={`Open ${p.title}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <p className="mt-4 font-inter text-sm leading-relaxed text-ink/70">{p.description}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 font-inter text-sm text-ink/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <TagChip key={s} tone="light">
                      {s}
                    </TagChip>
                  ))}
                </div>

                <p className="mt-5 border-t border-ink/10 pt-3 font-inter text-sm font-semibold italic text-ink/60">
                  {p.outcome}
                </p>

                {p.linkLabel && (
                  <p className="mt-2 font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">
                    {p.linkLabel}
                  </p>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

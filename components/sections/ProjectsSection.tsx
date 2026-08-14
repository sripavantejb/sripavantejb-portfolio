"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
              <TiltCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_40px_-12px_rgba(10,10,10,0.18)]">
                <div className="h-1 w-full bg-gradient-to-r from-lime to-sky" />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-archivo text-xs font-black text-lime">
                        {String(p.id).padStart(2, "0")}
                      </span>
                      <p className="font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">
                        {p.dates}
                      </p>
                    </div>
                    {p.link && p.link !== "#" && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors hover:border-ink hover:bg-ink hover:text-white"
                        aria-label={`Open ${p.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <h3 className="mt-4 font-archivo text-xl leading-tight tracking-tight text-ink md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-inter text-sm font-medium text-ink/45">{p.org}</p>

                  <p className="mt-4 font-inter text-sm leading-relaxed text-ink/65">{p.description}</p>

                  <ul className="mt-4 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 font-inter text-sm text-ink/70">
                        <Check size={14} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-ink/[0.04] px-2.5 py-1 font-inter text-xs font-medium text-ink/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-5">
                    <div className="rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3">
                      <p className="font-inter text-[10px] font-bold uppercase tracking-widest text-ink/35">
                        Impact
                      </p>
                      <p className="mt-1 font-inter text-sm font-medium text-ink/75">{p.outcome}</p>
                    </div>
                    {p.linkLabel && (
                      <p className="mt-3 font-inter text-xs font-medium text-ink/35">{p.linkLabel}</p>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagChip } from "@/components/ui/TagChip";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

export function AboutSection() {
  return (
    <section id="about" className={`bg-ink py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow="About Me" title="Builder, Designer, Founder" light />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.58fr_0.42fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {profile.about.map((para) => (
              <p key={para} className="font-inter text-base font-medium leading-relaxed text-white/75 md:text-lg">
                {para}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.topSkills.map((s) => (
                <TagChip key={s}>{s}</TagChip>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlowParticleCard className="rounded-[20px] border-4 border-lime/40 bg-lime/[0.04] p-6 shadow-[8px_8px_0_0_#c8f542] md:rounded-[24px] md:p-8">
              <p className="font-archivo text-xs font-black uppercase tracking-[0.2em] text-lime">
                Quick Facts
              </p>
              <dl className="mt-5 space-y-4">
                {[
                  ["Based in", profile.location],
                  ["Current role", "SDE Intern @ NxtWave"],
                  ["Also building", "Co-Founder @ Editco Media"],
                  ["Studying", "CS · Data Science & ML @ NIAT"],
                  ["Status", "Open to internships & full-time roles"],
                ].map(([label, val]) => (
                  <div key={label} className="flex flex-col gap-0.5 border-b border-white/10 pb-3 last:border-0">
                    <dt className="font-inter text-xs font-semibold uppercase tracking-wide text-white/40">
                      {label}
                    </dt>
                    <dd className="font-display text-base font-medium text-white">{val}</dd>
                  </div>
                ))}
              </dl>
            </GlowParticleCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

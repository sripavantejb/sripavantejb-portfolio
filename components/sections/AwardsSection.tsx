"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { awards } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

const rest = awards.slice(3);

export function AwardsSection() {
  return (
    <section id="awards" className={`bg-ink py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="More Recognition"
          title="Awards & Wins"
          light
          description="A few more campus and community milestones — on top of the headline wins above."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {rest.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GlowParticleCard className="flex h-full flex-col rounded-[20px] border-4 border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <Trophy size={18} />
                </div>
                <h3 className="mt-4 font-archivo text-lg uppercase leading-tight tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-2 font-inter text-sm font-semibold text-white/50">
                  {a.issuer} · {a.when}
                </p>
                <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-white/70">
                  {a.detail}
                </p>
                {a.engagement && (
                  <p className="mt-4 border-t border-white/10 pt-3 font-inter text-xs font-semibold uppercase tracking-wide text-lime">
                    {a.engagement}
                  </p>
                )}
              </GlowParticleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { aiBuilds } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

export function AIBuildsSection() {
  return (
    <section id="ai-builds" className={`bg-[#050505] py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="AI & Automation"
          title="Systems That Ship"
          light
          description="National-finalist buildathon projects, a commercial AI product, and open-source contributions. Hover a card."
        />

        <div className="mt-14 space-y-5">
          {aiBuilds.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlowParticleCard className="grid gap-5 rounded-[20px] border-4 border-sky/40 bg-sky/[0.04] p-6 md:grid-cols-[0.3fr_0.7fr] md:p-8">
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky/15 text-sky">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="mt-4 font-archivo text-lg uppercase leading-tight tracking-tight md:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-2 font-inter text-xs font-semibold uppercase tracking-wide text-white/40">
                    {b.when}
                  </p>
                  <p className="mt-1 font-inter text-sm text-white/50">{b.stack}</p>
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-sky">{b.context}</p>
                  <ul className="mt-3 space-y-1.5">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex gap-2 font-inter text-sm leading-relaxed text-white/75">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t border-white/10 pt-3 font-inter text-sm font-semibold text-lime">
                    {b.result}
                  </p>
                </div>
              </GlowParticleCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

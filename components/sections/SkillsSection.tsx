"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

export function SkillsSection() {
  return (
    <section id="skills" className={`bg-paper py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow="Toolbox" title="Skills" />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <h3 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
                <span className="h-2.5 w-2.5 bg-lime" />
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="border-2 border-ink px-3 py-1.5 font-inter text-sm font-semibold text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

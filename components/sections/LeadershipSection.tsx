"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import { leadership } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

const rotations = ["md:-rotate-1", "md:rotate-1", "md:-rotate-1", "md:rotate-1", "md:-rotate-1"];
const accents = ["lime", "sky", "sky", "lime", "sky"] as const;

export function LeadershipSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`bg-paper py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Beyond Code"
          title="Leadership & Community"
          description="Two years as elected President of the NIAT Media Council — leading a creative team across campus events, workshops, and content. Tap a card for details."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {leadership.map((item, i) => {
            const isOpen = open === i;
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`cursor-pointer ${rotations[i % rotations.length]}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <GlowParticleCard className="border-2 border-ink/15 bg-white shadow-[4px_4px_0_0_rgba(10,10,10,0.08)] transition-shadow hover:shadow-[6px_6px_0_0_rgba(10,10,10,0.12)]">
                  <div className="flex items-center gap-4 p-5">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink ${
                        accent === "lime" ? "bg-lime" : "bg-sky"
                      }`}
                    >
                      <Users size={16} />
                    </span>
                    <h3 className="flex-1 font-archivo text-sm uppercase tracking-tight md:text-base">
                      {item.title}
                    </h3>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} className="text-ink/40" />
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-5 pb-5 pl-[68px] font-inter text-sm leading-relaxed text-ink/65">
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowParticleCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

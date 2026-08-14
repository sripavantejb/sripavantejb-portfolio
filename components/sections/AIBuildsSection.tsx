"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { aiBuilds } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { TiltCard } from "@/components/ui/TiltCard";

export function AIBuildsSection() {
  return (
    <section id="ai-builds" className={`bg-[#050505] py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="AI & Automation"
          title="Systems That Ship"
          light
          description="National-finalist buildathon projects, a commercial AI product, and open-source contributions."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {aiBuilds.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(150,200,255,0.2)]">
                <div className="h-1 w-full bg-gradient-to-r from-sky to-lime" />

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                      <Sparkles size={16} />
                    </span>
                    <p className="font-inter text-xs font-semibold uppercase tracking-wide text-white/40">
                      {b.when}
                    </p>
                  </div>

                  <h3 className="mt-4 font-archivo text-lg leading-tight tracking-tight text-white md:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-1 font-inter text-sm font-medium text-white/45">{b.context}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {b.stack.split(",").map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-white/[0.06] px-2.5 py-1 font-inter text-xs font-medium text-white/60"
                      >
                        {s.trim()}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 font-inter text-sm leading-relaxed text-white/70">
                        <Check size={14} className="mt-0.5 shrink-0 text-sky" strokeWidth={3} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                      <p className="font-inter text-[10px] font-bold uppercase tracking-widest text-white/35">
                        Result
                      </p>
                      <p className="mt-1 font-inter text-sm font-medium text-lime">{b.result}</p>
                    </div>
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

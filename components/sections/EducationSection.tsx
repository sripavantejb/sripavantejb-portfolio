"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, BadgeCheck, RotateCw } from "lucide-react";
import { education, certifications } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { FlipCard } from "@/components/ui/FlipCard";

const institutionLogos: Record<string, string> = {
  "NxtWave Institute of Advanced Technologies (NIAT)": "/images/niat-logo.jpg",
  "Chaitanya Deemed to be University": "/images/chaitanya-univ-logo.jpg",
};

export function EducationSection() {
  return (
    <section id="education" className={`bg-ink py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading eyebrow="Background" title="Education & Certifications" light />

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-lime">
              <GraduationCap size={16} /> Education
            </h3>
            <div className="relative mt-6">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-white/15" aria-hidden />
              <div className="space-y-7">
                {education.map((e, i) => (
                  <motion.div
                    key={e.institution}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative pl-7"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.15, type: "spring", stiffness: 300 }}
                      className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-lime bg-ink"
                    />
                    <p className="font-inter text-xs font-semibold uppercase tracking-wide text-white/40">
                      {e.dates} {e.grade ? `· Grade ${e.grade}` : ""}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {institutionLogos[e.institution] && (
                        <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white">
                          <Image
                            src={institutionLogos[e.institution]}
                            alt={`${e.institution} logo`}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      <p className="font-display text-base font-semibold text-white">
                        {e.institution}
                      </p>
                    </div>
                    <p className="mt-0.5 font-inter text-sm text-white/60">{e.degree}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-sky">
              <BadgeCheck size={16} /> Certifications
            </h3>
            <p className="mt-2 flex items-center gap-1.5 font-inter text-xs text-white/35">
              <RotateCw size={12} /> Hover or tap a card to flip it
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {certifications.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <FlipCard
                    height="h-36"
                    front={
                      <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-white/15 bg-white/[0.04] p-4">
                        <BadgeCheck size={18} className="text-sky" />
                        <div>
                          <p className="font-archivo text-sm font-black uppercase leading-tight tracking-tight text-white">
                            {c.name}
                          </p>
                          <p className="mt-1 font-inter text-xs text-white/45">{c.issuer}</p>
                        </div>
                      </div>
                    }
                    back={
                      <div className="flex h-full flex-col justify-between rounded-2xl border-2 border-sky/40 bg-sky/10 p-4">
                        <p className="font-inter text-[10px] font-black uppercase tracking-widest text-sky">
                          Credential
                        </p>
                        <div>
                          <p className="font-inter text-xs text-white/70">Issued {c.issued}</p>
                          {c.credentialId && (
                            <p className="mt-1 break-all font-mono text-[11px] text-white/50">
                              {c.credentialId}
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

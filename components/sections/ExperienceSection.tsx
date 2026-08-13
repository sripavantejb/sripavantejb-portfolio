"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { experience } from "@/lib/data";
import { stickySlide2 } from "@/lib/stickyStack";

const logos = ["/images/nxtwave-logo.jpg", "/images/editco-logo.jpg", "/images/niat-media-council-logo.jpg"];
const rotations = ["md:-rotate-1", "md:rotate-1", "md:-rotate-1"];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className={`flex flex-col justify-center bg-lime px-6 py-16 text-ink md:px-8 md:py-20 ${stickySlide2}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 max-w-3xl lg:mb-10"
        >
          <span className="inline-block border-2 border-ink bg-white px-3 py-1 font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_0_#0a0a0a]">
            Experience
          </span>
          <h2 className="mt-3 font-archivo text-[clamp(1.75rem,8vw,3.75rem)] font-black uppercase leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Where I&rsquo;ve{" "}
            <span className="inline-block bg-ink px-2 text-lime">worked</span>
          </h2>
          <p className="mt-3 max-w-xl font-inter text-sm font-medium leading-relaxed text-ink/70 md:text-base">
            Three roles, one thread — shipping real products for real users.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {experience.map((role, i) => {
            return (
              <motion.div
                key={role.title + role.org}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -8,
                  x: -4,
                  transition: { type: "spring", stiffness: 400, damping: 22 },
                }}
                className={`group relative flex flex-col border-4 border-ink bg-white p-5 shadow-[8px_8px_0_0_#0a0a0a] transition-shadow hover:shadow-[12px_12px_0_0_#0a0a0a] md:p-6 ${rotations[i]}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="relative h-12 w-12 overflow-hidden border-4 border-ink bg-white shadow-[4px_4px_0_0_#0a0a0a] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_0_#0a0a0a]">
                    <Image src={logos[i]} alt={`${role.org} logo`} fill sizes="48px" className="object-cover" />
                  </div>
                  <span className="font-archivo text-3xl font-black leading-none tracking-tighter text-ink/15 md:text-4xl">
                    0{i + 1}
                  </span>
                </div>

                <span className="mb-2 inline-flex w-fit border-2 border-ink bg-lime px-2 py-0.5 font-inter text-[9px] font-black uppercase tracking-widest">
                  {role.dates}
                </span>
                <h3 className="font-archivo text-lg font-black uppercase tracking-tight md:text-xl">
                  {role.title}
                </h3>
                <p className="mt-0.5 font-inter text-sm font-semibold text-ink/60">
                  {role.org} · {role.arrangement}
                </p>
                <p className="mt-2 font-inter text-sm font-medium leading-relaxed text-ink/65">
                  {role.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-ink/10 pt-4">
                  {role.skills.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-ink/20 bg-ink/5 px-2 py-0.5 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <div className="h-1.5 w-10 bg-ink transition-all duration-300 group-hover:w-20" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

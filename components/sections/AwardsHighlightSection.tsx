"use client";

import { motion } from "framer-motion";
import { awards } from "@/lib/data";
import { stickySlide3 } from "@/lib/stickyStack";

const featured = [awards[0], awards[1], awards[2]];

export function AwardsHighlightSection() {
  return (
    <section
      className={`flex flex-col justify-center bg-paper px-6 py-16 text-ink md:px-8 md:py-20 ${stickySlide3}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="mb-8 lg:mb-10"
        >
          <span className="inline-block border-2 border-ink bg-lime px-3 py-1 font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_0_#0a0a0a]">
            Headline wins
          </span>
          <h2 className="mt-3 font-archivo text-[clamp(1.75rem,8vw,3.75rem)] font-black uppercase leading-[1.05] tracking-tighter text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            Recognized on the{" "}
            <span className="inline-block bg-ink px-2 text-lime">national stage</span>
          </h2>
          <p className="mt-3 max-w-2xl font-inter text-sm font-medium leading-relaxed text-ink/65 md:text-base">
            One startup win, one open-source award, one national Top 10 — earned in the last twelve months.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {featured.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{
                y: -8,
                x: -4,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }}
              className={`relative flex flex-col border-4 border-ink p-5 shadow-[8px_8px_0_0_#0a0a0a] transition-shadow hover:shadow-[12px_12px_0_0_#0a0a0a] md:p-6 ${
                i === 0 ? "bg-lime text-ink" : "bg-white text-ink"
              }`}
            >
              {i === 0 && (
                <span className="absolute right-3 top-3 rotate-6 border-2 border-ink bg-white px-2.5 py-1 font-inter text-[9px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#0a0a0a]">
                  Latest
                </span>
              )}
              <p className="font-inter text-[10px] font-black uppercase tracking-[0.18em] text-ink/45">
                {a.when}
              </p>
              <h3 className="mt-1 font-archivo text-lg font-black uppercase tracking-tight md:text-xl">
                {a.title}
              </h3>
              <p className="mt-0.5 font-inter text-sm font-medium text-ink/60">{a.issuer}</p>
              <p className="mt-4 font-inter text-sm leading-relaxed text-ink/70">{a.detail}</p>
              {a.engagement && (
                <p className="mt-4 border-t-2 border-ink/10 pt-3 font-inter text-xs font-bold uppercase tracking-wide text-ink/50">
                  {a.engagement}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  description,
  light,
  chip = "lime",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  description?: string;
  light?: boolean;
  /** White chip on lime sections so the badge doesn't disappear into the page. */
  chip?: "lime" | "white";
  align?: "left" | "center";
}) {
  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span
        className={`inline-block border-2 border-ink px-3 py-1 font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_0_#0a0a0a] ${
          chip === "white" ? "bg-white" : "bg-lime"
        }`}
      >
        {eyebrow}
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-5 font-archivo text-3xl uppercase leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {accentWord ? (
          <>
            {parts[0]}
            <span className="inline-block bg-ink px-2 text-lime">{accentWord}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl font-inter text-base font-medium leading-relaxed md:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/75" : "text-ink/70"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

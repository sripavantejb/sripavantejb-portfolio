"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Users2 } from "lucide-react";
import { stickySlide4 } from "@/lib/stickyStack";
import { MotionItem, MotionSection, fadeUp } from "@/components/motion";

const highlights = [
  {
    icon: Rocket,
    title: "Ships production code, fast",
    body: "7 shipped projects and 4 AI systems in under a year — from MERN apps to national-buildathon builds.",
  },
  {
    icon: Target,
    title: "Solves real problems",
    body: "Built for actual users — clinics, farmers, HR leaders — not toy demos. Two clinics converted in 48 hours.",
  },
  {
    icon: Users2,
    title: "Leads without being asked",
    body: "Elected President of a ~2-year-running media council; co-founded and grew an agency from zero.",
  },
];

export function WhyMeSection() {
  return (
    <MotionSection
      className={`flex flex-col justify-center bg-lime px-6 py-16 text-ink md:px-8 md:py-20 ${stickySlide4}`}
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <MotionItem variants={fadeUp}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full bg-white px-3.5 py-1.5 font-inter text-xs font-semibold tracking-wide"
          >
            Why hire me
          </motion.span>
          <h2 className="mt-4 max-w-lg font-inter text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
            Built for teams that need someone who just ships
          </h2>
          <p className="mt-3 max-w-md font-inter text-sm leading-relaxed text-ink/65 md:text-base">
            Full-stack fundamentals, a design eye, and the instinct to go find the problem before building the solution.
          </p>
          <div className="mt-6">
            <div className="flex -space-x-1">
              {["🏆", "🚀", "💡", "🎯", "⚡"].map((emoji, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-lime bg-ink text-sm"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
            <p className="mt-2 font-inter text-sm font-medium text-ink/70">
              3 national buildathons · 1 startup win · 500+ network
            </p>
          </div>
        </MotionItem>

        <div className="space-y-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <MotionItem
                key={item.title}
                whileHover={{
                  x: 6,
                  backgroundColor: "rgba(255,255,255,0.75)",
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                }}
                className="flex gap-4 rounded-[22px] bg-white/55 p-4 backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.06 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink shadow-sm"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </motion.div>
                <div>
                  <h3 className="font-inter text-base font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 font-inter text-sm leading-relaxed text-ink/60">{item.body}</p>
                </div>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

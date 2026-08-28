"use client";

import { stickySlide4 } from "@/lib/stickyStack";
import { MotionItem, MotionSection, fadeUp } from "@/components/motion";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  { value: "7", label: "Products shipped" },
  { value: "4", label: "AI systems" },
  { value: "3", label: "National buildathons" },
  { value: "2", label: "Published npm packages" },
  { value: "1", label: "Open Source Award" },
] as const;

const currently = [
  {
    label: "Currently building",
    value: "AI · SaaS · Automation · Developer tools",
  },
  {
    label: "Currently leading",
    value: "President — NIAT Media Council",
  },
  {
    label: "Currently exploring",
    value: "Open Source · System Design · AI Engineering",
  },
] as const;

const ticker = ["Building", "Learning", "Shipping", "Breaking things", "Fixing them"];

export function WhyMeSection() {
  const loop = [...ticker, ...ticker, ...ticker, ...ticker];

  return (
    <MotionSection
      id="status"
      className={`flex flex-col justify-between bg-paper px-6 py-14 text-ink md:px-8 md:py-16 ${stickySlide4}`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-between gap-8">
        <MotionItem variants={fadeUp}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
            {"// Current status"}
          </p>
          <h2 className="mt-3 max-w-2xl font-archivo text-3xl font-black uppercase leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            Building things{" "}
            <span className="inline bg-lime px-1.5 text-ink md:px-2">that should exist.</span>
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-medium leading-relaxed text-ink/65 md:text-base">
            I&rsquo;m Sri Pavan Tej Balam — a full-stack developer who likes taking messy problems, figuring out how
            they work, and turning them into products people can actually use.
          </p>
        </MotionItem>

        <MotionItem variants={fadeUp}>
          <div className="grid grid-cols-2 border-4 border-ink md:grid-cols-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white px-4 py-4 md:px-5 md:py-5 ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${
                  i % 2 === 1 ? "max-md:border-l-4 max-md:border-ink" : ""
                } ${i < 4 ? "max-md:border-b-4 max-md:border-ink" : ""} ${i > 0 ? "md:border-l-4 md:border-ink" : ""}`}
              >
                <p className="font-archivo text-4xl font-black leading-none tracking-tighter text-ink md:text-5xl">
                  0<CountUp value={stat.value} />
                </p>
                <p className="mt-2 font-inter text-[10px] font-black uppercase tracking-[0.14em] text-ink/45 md:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </MotionItem>

        <MotionItem variants={fadeUp}>
          <div className="grid gap-3 md:grid-cols-3">
            {currently.map((item) => (
              <article
                key={item.label}
                className="border-4 border-ink bg-white p-4 shadow-[4px_4px_0_0_#0a0a0a] md:p-5"
              >
                <p className="font-inter text-[10px] font-black uppercase tracking-[0.18em] text-ink/50">
                  {item.label}
                </p>
                <p className="mt-2 font-archivo text-sm uppercase leading-snug tracking-tight text-ink md:text-base">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </MotionItem>

        <MotionItem variants={fadeUp} className="space-y-4">
          <p className="font-archivo text-lg uppercase tracking-tight text-ink md:text-xl">
            Still looking for harder problems.
          </p>
          <div className="flex items-stretch overflow-hidden border-4 border-ink bg-white text-ink">
            <div className="flex shrink-0 items-center gap-2 border-r-4 border-ink bg-lime px-3 py-2.5 md:px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
              </span>
              <span className="font-inter text-[10px] font-black uppercase tracking-[0.18em]">Online</span>
            </div>
            <div className="hide-scrollbar flex min-w-0 flex-1 items-center overflow-hidden">
              <div className="animate-ticker flex shrink-0 items-center gap-6 pr-6">
                {loop.map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="flex items-center gap-6 whitespace-nowrap font-archivo text-xs uppercase tracking-tight md:text-sm"
                  >
                    <span className="text-ink/35">Now</span>
                    <span>→ {item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MotionItem>
      </div>
    </MotionSection>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { StaggerWords, EASE } from "@/components/motion";
import { stickySlide1 } from "@/lib/stickyStack";
import SideRays from "@/components/ui/SideRays";
import { CountUp } from "@/components/ui/CountUp";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

export function HeroSection() {
  return (
    <section
      id="top"
      className={`flex flex-col justify-start overflow-x-clip bg-[#050505] px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40 ${stickySlide1}`}
    >
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <SideRays
          speed={2.2}
          rayColor1="#c8f542"
          rayColor2="#96c8ff"
          intensity={1.8}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.4}
          blend={0.7}
          falloff={1.6}
          opacity={0.9}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="min-w-0">
          {profile.openToWork && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="font-inter text-[11px] font-semibold tracking-wide text-lime">
                Open to work · SDE roles
              </span>
            </motion.div>
          )}

          <h1 className="select-none font-archivo font-black uppercase leading-[0.9] tracking-[-0.03em]">
            <motion.span
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="block bg-gradient-to-b from-white to-white/40 bg-clip-text text-[clamp(2.5rem,10vw,5.5rem)] text-transparent"
            >
              Sri Pavan
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
              className="block text-[clamp(2.5rem,10vw,5.5rem)] text-lime"
            >
              Tej Balam
            </motion.span>
          </h1>

          <StaggerWords
            delay={0.4}
            text={profile.headline}
            className="mt-5 max-w-xl font-display text-base font-medium tracking-tight text-white/80 sm:text-lg lg:text-xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-3 flex items-center gap-2 font-inter text-sm font-medium text-white/45"
          >
            <MapPin size={15} className="text-lime" />
            {profile.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <BrutalistLink href="#experience" variant="primary">
              View Work <ArrowRight size={16} />
            </BrutalistLink>
            <BrutalistLink href="#contact" variant="dark">
              Let&rsquo;s Talk
            </BrutalistLink>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="relative z-10 mx-auto mt-14 grid w-full max-w-[1200px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {stats.map((s) => (
          <GlowParticleCard
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
          >
            <p className="font-archivo text-2xl uppercase text-white md:text-4xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-wide text-white/50 md:text-sm">
              {s.label}
            </p>
          </GlowParticleCard>
        ))}
      </motion.div>
    </section>
  );
}

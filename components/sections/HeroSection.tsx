"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { profile, stats } from "@/lib/data";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { StaggerWords, EASE } from "@/components/motion";
import { stickySlide1 } from "@/lib/stickyStack";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import SideRays from "@/components/ui/SideRays";
import { CountUp } from "@/components/ui/CountUp";

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

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-10 md:grid-cols-[1.15fr_0.9fr] md:gap-12">
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-5 max-w-lg font-syne text-sm italic text-white/50 md:text-base"
          >
            &ldquo;{profile.tagline}&rdquo;
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

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative w-full"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-5 rounded-[36px] bg-lime/15 blur-3xl"
          />
          <div className="relative min-w-0 rounded-[24px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-lime/60">
                <Image
                  src="/images/profile-photo.jpg"
                  alt="Sri Pavan Tej Balam"
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <p className="font-inter text-base font-semibold text-white">Quick connect</p>
                <p className="mt-0.5 font-inter text-sm text-white/40">Usually replies within a day</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-lime/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <Mail size={14} />
                </span>
                <span className="font-inter text-sm font-medium text-white/85">{profile.email}</span>
              </a>
              <a
                href={profile.phoneHref}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-lime/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <Phone size={14} />
                </span>
                <span className="font-inter text-sm font-medium text-white/85">{profile.phone}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-lime/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <LinkedinIcon size={14} />
                </span>
                <span className="flex-1 font-inter text-sm font-medium text-white/85">
                  in/sripavantejbalam
                </span>
                <ArrowUpRight size={14} className="text-white/30" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="relative z-10 mx-auto mt-14 grid w-full max-w-[1200px] grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-6"
      >
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-archivo text-2xl uppercase text-white md:text-4xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-wide text-white/50 md:text-sm">
              {s.label}
            </p>
            <p className="font-inter text-xs text-white/30">{s.note}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

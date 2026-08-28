"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SiGithub, SiLeetcode, SiNpm } from "react-icons/si";
import { profile } from "@/lib/data";
import { RESUME_DOWNLOAD_PATH } from "@/lib/resume";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { ClickSpark } from "@/components/ui/ClickSpark";
import { CountUp } from "@/components/ui/CountUp";
import { EASE } from "@/components/motion";
import { sectionFlowAfter } from "@/lib/stickyStack";

const stats = [
  { value: "3", label: "Buildathons" },
  { value: "7+", label: "Shipped" },
  { value: "4", label: "AI Systems" },
  { value: "2", label: "Years Leading" },
  { value: "1", label: "Agency" },
] as const;

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: profile.github, icon: SiGithub },
  { label: "LeetCode", href: profile.leetcode, icon: SiLeetcode },
  { label: "NPM", href: profile.npm, icon: SiNpm },
  { label: "Instagram", href: profile.instagram, icon: InstagramIcon },
] as const;

export function ContactSection({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const reduceMotion = useReducedMotion();
  const fade = (delay = 0) =>
    reduceMotion
      ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <section id="contact" className={`relative overflow-hidden bg-lime py-10 text-ink md:py-12 ${sectionFlowAfter}`}>
      <div className="pointer-events-none absolute inset-0 grid-texture-ink opacity-50" />

      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <motion.div {...fade(0)} viewport={{ once: true }} className="max-w-xl">
            <p className="font-archivo text-[10px] font-black uppercase tracking-[0.28em] text-ink/45">
              Let&rsquo;s Build Something
            </p>
            <h2 className="mt-2 font-archivo text-[clamp(1.5rem,4vw,2.4rem)] uppercase leading-[0.95] tracking-tight">
              Have a problem{" "}
              <span className="inline-block bg-ink px-1.5 text-lime">worth building?</span>
            </h2>
            <p className="mt-2 max-w-md font-inter text-sm font-medium leading-relaxed text-ink/65">
              Open to SDE roles, internships, collaborations, and ambitious ideas.
            </p>
          </motion.div>

          <motion.div {...fade(0.08)} viewport={{ once: true }}>
            <ClickSpark sparkColor="#0a0a0a">
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-lime shadow-[3px_3px_0_0_#0a0a0a] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0a0a0a]"
                >
                  Let&rsquo;s Talk <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-white px-5 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#0a0a0a] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0a0a0a]"
                >
                  LinkedIn <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
                {resumeAvailable ? (
                  <a
                    href={RESUME_DOWNLOAD_PATH}
                    download
                    className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-lime px-5 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#0a0a0a] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0a0a0a]"
                  >
                    Download CV <Download size={14} strokeWidth={2.5} />
                  </a>
                ) : null}
              </div>
            </ClickSpark>
          </motion.div>
        </div>

        <motion.div
          {...fade(0.12)}
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-3 overflow-hidden border-4 border-ink bg-white sm:grid-cols-5"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 + i * 0.05, duration: 0.4, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className={`px-3 py-2.5 ${i > 0 ? "border-l-2 border-ink/15" : ""} ${i >= 3 ? "hidden sm:block" : ""}`}
            >
              <p className="font-archivo text-lg font-black leading-none tracking-tighter tabular-nums md:text-xl">
                0<CountUp value={stat.value} />
              </p>
              <p className="mt-1 font-inter text-[9px] font-black uppercase tracking-[0.14em] text-ink/45">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fade(0.2)}
          viewport={{ once: true }}
          className="mt-5 flex flex-col gap-3 border-t-2 border-ink/15 pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <nav aria-label="Social links" className="flex flex-wrap gap-x-4 gap-y-2">
            {socials.map(({ label, href, icon: Icon }, i) => {
              const external = href.startsWith("http");
              return (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22 + i * 0.04, duration: 0.35, ease: EASE }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  className="inline-flex items-center gap-1.5 font-archivo text-[10px] font-black uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-ink"
                >
                  <Icon size={12} />
                  {label}
                </motion.a>
              );
            })}
          </nav>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, rotate: -4, scale: 0.92 }}
            whileInView={{ opacity: 1, rotate: -1.5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 16 }}
            whileHover={reduceMotion ? undefined : { rotate: 1.5, y: -2 }}
            className="inline-block w-fit border-2 border-ink bg-ink px-2.5 py-1 font-inter text-[10px] font-black uppercase tracking-[0.12em] text-lime shadow-[3px_3px_0_0_#0a0a0a]"
          >
            Built with Next.js · Tailwind CSS · too much coffee
          </motion.p>
        </motion.div>

        <nav aria-label="Site sections" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/10 pt-4">
          {[
            { href: "/about", label: "About" },
            { href: "/#experience", label: "Experience" },
            { href: "/#projects", label: "Projects" },
            { href: "/#achievements", label: "Achievements" },
            { href: profile.editco, label: "Editco Media", external: true },
          ].map(({ href, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-inter text-[11px] font-semibold text-ink/50 transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="mt-3 font-inter text-[11px] text-ink/45">
          {profile.name} · © 2026
        </p>
      </div>
    </section>
  );
}

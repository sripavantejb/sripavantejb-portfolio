"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { sectionFlowAfter } from "@/lib/stickyStack";
import { Magnet } from "@/components/ui/Magnet";
import { ClickSpark } from "@/components/ui/ClickSpark";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone / WhatsApp", value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: "LinkedIn", value: "in/sripavantejbalam", href: profile.linkedin, icon: LinkedinIcon },
  { label: "Instagram", value: "@editco.media", href: profile.instagram, icon: InstagramIcon },
];

export function ContactSection() {
  return (
    <section id="contact" className={`relative overflow-hidden bg-[#050505] py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-30" />
      <div
        className="animate-pulse-glow pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-lime/20 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1000px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-archivo text-xs font-black uppercase tracking-[0.25em] text-lime"
        >
          Let&rsquo;s Build Something
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-4 font-archivo text-4xl uppercase leading-[1] tracking-tighter sm:text-5xl md:text-7xl"
        >
          Got a role or an
          <br />
          idea worth building?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl font-inter text-base font-medium text-white/70 md:text-lg"
        >
          Open to SDE internships, full-time roles, and interesting collaborations. I reply fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <ClickSpark sparkColor="#c8f542">
            <div className="flex flex-wrap justify-center gap-4">
              <Magnet padding={50} magnetStrength={6}>
                <BrutalistLink href={`mailto:${profile.email}`} variant="primary">
                  <Mail size={16} /> Email Me
                </BrutalistLink>
              </Magnet>
              <Magnet padding={50} magnetStrength={6}>
                <BrutalistLink href={profile.linkedin} variant="dark" external>
                  LinkedIn <ArrowUpRight size={16} />
                </BrutalistLink>
              </Magnet>
            </div>
          </ClickSpark>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-2xl gap-4 border-t-2 border-white/10 pt-10 text-left sm:grid-cols-2">
          {links.map(({ label, value, href, icon: Icon }) => (
            <Magnet key={label} padding={30} magnetStrength={10} wrapperClassName="block w-full">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 border-2 border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-lime hover:bg-white/[0.06]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lime">
                  <Icon size={16} />
                </span>
                <span>
                  <span className="block font-inter text-xs font-semibold uppercase tracking-wide text-white/40">
                    {label}
                  </span>
                  <span className="block font-inter text-sm font-semibold text-white">{value}</span>
                </span>
              </a>
            </Magnet>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-[1200px] border-t border-white/10 px-6 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-archivo text-sm uppercase tracking-wide text-white/50">
            {profile.name}
          </p>
          <p className="font-inter text-xs text-white/30">
            © {new Date().getFullYear()} · Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}

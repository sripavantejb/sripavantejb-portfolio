"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award as AwardIcon,
  Briefcase,
  Calendar,
  Check,
  GraduationCap,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import {
  experience,
  type Award,
  type AIBuild,
  type Certification,
  type EducationItem,
  type Experience,
  type LeadershipItem,
  type PostEmbed,
  type Project,
  profile,
} from "@/lib/data";
import { BrutalistLink } from "@/components/ui/BrutalistLink";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const reveal = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, margin: "-60px" },
  variants: fadeUp,
};

/** Hard-edged white card: 4px ink border + solid offset shadow, no blur. */
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-4 border-ink bg-white shadow-[6px_6px_0_0_#0a0a0a] ${className}`}>
      {children}
    </div>
  );
}

/** Same card, but it lifts into a deeper shadow on hover (see BrutalistLink). */
function LiftPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`border-4 border-ink bg-white shadow-[6px_6px_0_0_#0a0a0a] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#0a0a0a] ${className}`}
    >
      {children}
    </div>
  );
}

/** Numbered section rule — the detail-page counterpart to <SectionHeading>. */
function SectionTitle({
  index,
  icon,
  children,
  accent,
}: {
  index: string;
  icon: ReactNode;
  children: ReactNode;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b-4 border-ink pb-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center border-4 border-ink ${accent} text-ink shadow-[3px_3px_0_0_#0a0a0a]`}
      >
        {icon}
      </span>
      <h2 className="font-archivo text-lg uppercase leading-none tracking-tighter text-ink sm:text-xl md:text-2xl">
        {children}
      </h2>
      <span className="ml-auto font-archivo text-2xl leading-none tracking-tighter text-ink/15 md:text-3xl">
        {index}
      </span>
    </div>
  );
}

function MetaChip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 border-2 border-white/25 bg-white/5 px-3 py-1.5 font-inter text-xs font-bold uppercase tracking-wide text-white/80">
      {icon}
      {children}
    </span>
  );
}

export function ExperienceDetail({
  role,
  relatedProjects,
  relatedAIBuilds,
  relatedAwards,
  leadership,
  education,
  certifications,
  statHighlights,
}: {
  role: Experience;
  relatedProjects: Project[];
  relatedAIBuilds: AIBuild[];
  relatedAwards: Award[];
  leadership: LeadershipItem[];
  education?: EducationItem;
  certifications: Certification[];
  statHighlights: { label: string; value: string; note: string }[];
}) {
  const otherRoles = experience.filter((e) => e.slug !== role.slug);
  const embeds: PostEmbed[] = role.embeds ?? [];

  // Sections are numbered in render order, so a role that hides one still counts 01, 02, 03…
  let sectionCount = 0;
  const nextIndex = () => String(++sectionCount).padStart(2, "0");

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b-8 border-lime bg-ink pb-14 pt-28 md:pb-20 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1000px] px-6">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/#experience"
              className="group inline-flex items-center gap-2 border-2 border-white/25 bg-white/5 px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to portfolio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-start"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border-4 border-lime bg-white shadow-[6px_6px_0_0_#c8f542]">
              <Image src={role.logo} alt={`${role.org} logo`} fill sizes="80px" className="object-cover" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-block border-2 border-ink bg-lime px-3 py-1 font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_0_rgba(255,255,255,0.35)]">
                {role.type}
              </span>

              <h1 className="mt-5 font-archivo text-3xl uppercase leading-[1.02] tracking-tighter text-white sm:text-4xl md:text-5xl">
                {role.title}
              </h1>

              <p className="mt-3 font-archivo text-lg uppercase tracking-tight text-lime md:text-xl">
                {role.slug === "editco-media" ? (
                  <a
                    href={profile.editco}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-lime/50 underline-offset-4 transition-colors hover:decoration-lime"
                  >
                    {role.org}
                  </a>
                ) : (
                  role.org
                )}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <MetaChip icon={<Calendar size={13} />}>
                  {role.dates} · {role.duration}
                </MetaChip>
                <MetaChip icon={<MapPin size={13} />}>{role.location}</MetaChip>
                <MetaChip icon={<Briefcase size={13} />}>{role.arrangement}</MetaChip>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture-ink opacity-60" />

        <div className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-14 md:pt-16">
          {/* Overview */}
          <motion.div {...reveal}>
            <Panel className="border-l-[14px] border-l-lime p-6 md:p-8">
              <p className="font-inter text-base font-medium leading-relaxed text-ink/80 md:text-lg">
                {role.description}
              </p>
            </Panel>
          </motion.div>

          <motion.div {...reveal} className="mt-6 flex flex-wrap gap-2.5">
            {role.skills.map((s) => (
              <span
                key={s}
                className="border-2 border-ink bg-white px-3 py-1.5 font-inter text-xs font-black uppercase tracking-wide text-ink shadow-[3px_3px_0_0_#0a0a0a]"
              >
                {s}
              </span>
            ))}
          </motion.div>

          {statHighlights.length > 0 && (
            <motion.div {...reveal} className="mt-10 grid gap-5 sm:grid-cols-2">
              {statHighlights.map((s) => (
                <Panel key={s.label} className="bg-lime p-6">
                  <p className="font-archivo text-4xl leading-none tracking-tighter text-ink md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 font-inter text-xs font-black uppercase tracking-[0.15em] text-ink">
                    {s.label}
                  </p>
                  <p className="mt-1 font-inter text-xs font-medium text-ink/60">{s.note}</p>
                </Panel>
              ))}
            </motion.div>
          )}

          {/* Projects */}
          {relatedProjects.length > 0 && (
            <section className="mt-16">
              <SectionTitle index={nextIndex()} icon={<Briefcase size={18} />} accent="bg-lime">
                Projects from this role
              </SectionTitle>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {relatedProjects.map((p) => (
                  <motion.div key={p.id} {...reveal} className="h-full">
                    <LiftPanel className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-archivo text-lg uppercase leading-tight tracking-tight text-ink">
                          {p.title}
                        </h3>
                        {p.slug ? (
                          <Link
                            href={`/projects/${p.slug}`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-lime"
                            aria-label={`Open ${p.title}`}
                          >
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                          </Link>
                        ) : p.link && p.link !== "#" ? (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-lime"
                            aria-label={`Open ${p.title}`}
                          >
                            <ArrowUpRight size={15} strokeWidth={2.5} />
                          </a>
                        ) : null}
                      </div>

                      <p className="mt-3 font-inter text-sm leading-relaxed text-ink/70">{p.description}</p>

                      <ul className="mt-4 space-y-2">
                        {p.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex items-start gap-2.5 font-inter text-sm text-ink/75">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 border-ink bg-lime">
                              <Check size={9} strokeWidth={4} className="text-ink" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-auto border-t-4 border-ink pt-4 font-inter text-sm font-bold text-ink">
                        {p.outcome}
                      </p>
                    </LiftPanel>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* AI builds */}
          {relatedAIBuilds.length > 0 && (
            <section className="mt-16">
              <SectionTitle index={nextIndex()} icon={<Sparkles size={18} />} accent="bg-sky">
                Product built in this role
              </SectionTitle>

              <div className="mt-7 space-y-6">
                {relatedAIBuilds.map((b) => (
                  <motion.div key={b.title} {...reveal}>
                    <Panel className="border-l-[14px] border-l-sky p-6 md:p-7">
                      <p className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink/45">
                        {b.when}
                      </p>
                      <h3 className="mt-2 font-archivo text-xl uppercase leading-tight tracking-tight text-ink">
                        {b.title}
                      </h3>
                      <p className="mt-1.5 font-inter text-sm font-medium text-ink/55">{b.context}</p>

                      <ul className="mt-4 space-y-2">
                        {b.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 font-inter text-sm text-ink/75">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 border-ink bg-sky">
                              <Check size={9} strokeWidth={4} className="text-ink" />
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 border-t-4 border-ink pt-4 font-inter text-sm font-bold text-ink">
                        {b.result}
                      </p>
                    </Panel>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Recognition */}
          {relatedAwards.length > 0 && (
            <section className="mt-16">
              <SectionTitle index={nextIndex()} icon={<Trophy size={18} />} accent="bg-orange">
                Recognition
              </SectionTitle>

              <div className="mt-7 space-y-5">
                {relatedAwards.map((a) => (
                  <motion.div key={a.title} {...reveal}>
                    <LiftPanel className="flex gap-5 p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center border-4 border-ink bg-orange text-white">
                        <AwardIcon size={20} strokeWidth={2.5} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-archivo text-base uppercase leading-tight tracking-tight text-ink md:text-lg">
                          {a.title}
                        </h3>
                        <p className="mt-1 font-inter text-[10px] font-black uppercase tracking-[0.15em] text-ink/45">
                          {a.issuer} · {a.when}
                        </p>
                        <p className="mt-3 font-inter text-sm leading-relaxed text-ink/70">{a.detail}</p>
                      </div>
                    </LiftPanel>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership — also hosts any post embeds, which fill the grid's
              trailing empty cell beside the photo card. */}
          {(leadership.length > 0 || embeds.length > 0) && (
            <section className="mt-16">
              <SectionTitle index={nextIndex()} icon={<Users size={18} />} accent="bg-lime">
                Leadership &amp; community
              </SectionTitle>

              {/* CSS columns rather than a grid: these cards vary wildly in height
                  (one carries a photo strip, another a video embed) and a grid would
                  leave dead space beneath the short ones. */}
              <div className="mt-7 gap-5 sm:columns-2">
                {leadership.map((item) => (
                  <motion.div key={item.title} {...reveal} className="mb-5 break-inside-avoid">
                    <LiftPanel className="flex flex-col border-t-[10px] border-t-lime p-6">
                      <h3 className="font-archivo text-sm uppercase leading-tight tracking-tight text-ink md:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 font-inter text-sm leading-relaxed text-ink/70">{item.detail}</p>

                      {item.photos && item.photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                          {item.photos.map((photo, i) => (
                            <figure
                              key={photo.src}
                              /* Lead photo runs full width; the rest pair up beneath it. */
                              className={i === 0 ? "col-span-2" : undefined}
                            >
                              {/* Secondary shots are cropped to a shared ratio so the
                                  pair lines up regardless of each source's dimensions. */}
                              <div
                                className={`border-2 border-ink bg-ink ${
                                  i === 0 ? "" : "aspect-[4/3]"
                                }`}
                              >
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  width={photo.width}
                                  height={photo.height}
                                  sizes={
                                    i === 0
                                      ? "(min-width: 640px) 460px, 100vw"
                                      : "(min-width: 640px) 225px, 50vw"
                                  }
                                  className={i === 0 ? "h-auto w-full" : "h-full w-full object-cover"}
                                />
                              </div>
                              <figcaption className="mt-1.5 font-inter text-[9px] font-black uppercase tracking-[0.12em] text-ink/45">
                                {photo.caption}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                    </LiftPanel>
                  </motion.div>
                ))}

                {/* Sits in the grid's leftover cell, alongside the photos. No heading
                    or caption — the post card carries its own. */}
                {embeds.map((embed) => (
                  <motion.div key={embed.src} {...reveal} className="mb-5 break-inside-avoid">
                    {/* LinkedIn embeds have a fixed intrinsic size, so the frame is
                        pinned to its height and allowed to shrink on narrow screens. */}
                    <iframe
                      src={embed.src}
                      title={embed.title}
                      height={embed.height}
                      loading="lazy"
                      allowFullScreen
                      className="block w-full border-4 border-ink bg-white shadow-[6px_6px_0_0_#0a0a0a]"
                      style={{ height: embed.height }}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Education & certifications */}
          {(education || certifications.length > 0) && (
            <section className="mt-16">
              <SectionTitle index={nextIndex()} icon={<GraduationCap size={18} />} accent="bg-green">
                Education &amp; certifications
              </SectionTitle>

              <div className="mt-7 space-y-5">
                {education && (
                  <motion.div {...reveal}>
                    <Panel className="border-l-[14px] border-l-green p-6">
                      <p className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink/45">
                        {education.dates}
                      </p>
                      <h3 className="mt-2 font-archivo text-lg uppercase leading-tight tracking-tight text-ink">
                        {education.institution}
                      </h3>
                      <p className="mt-1.5 font-inter text-sm font-medium text-ink/65">{education.degree}</p>
                    </Panel>
                  </motion.div>
                )}

                {certifications.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {certifications.map((c) => (
                      <motion.div key={c.name} {...reveal} className="h-full">
                        <LiftPanel className="h-full p-5">
                          <p className="font-archivo text-sm uppercase leading-tight tracking-tight text-ink">
                            {c.name}
                          </p>
                          <p className="mt-1.5 font-inter text-[10px] font-black uppercase tracking-[0.15em] text-ink/45">
                            {c.issuer} · {c.issued}
                          </p>
                        </LiftPanel>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* CTA */}
          <motion.div
            {...reveal}
            className="mt-20 flex flex-col items-start justify-between gap-7 border-4 border-ink bg-ink p-7 shadow-[8px_8px_0_0_#c8f542] sm:flex-row sm:items-center md:p-9"
          >
            <div>
              <p className="font-archivo text-xl uppercase leading-tight tracking-tighter text-white md:text-2xl">
                Got a role like this to fill?
              </p>
              <p className="mt-2 font-inter text-sm font-medium text-white/60">
                Let&rsquo;s talk about what you&rsquo;re building.
              </p>
            </div>
            <BrutalistLink href="/#contact" variant="primary" className="shrink-0">
              Get in touch <ArrowUpRight size={16} strokeWidth={2.5} />
            </BrutalistLink>
          </motion.div>

          {/* Other roles */}
          {otherRoles.length > 0 && (
            <div className="mt-14">
              <p className="font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink/45">
                Other roles
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                {otherRoles.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/experience/${r.slug}`}
                    className="group flex items-center gap-2 border-4 border-ink bg-white px-4 py-2.5 font-archivo text-xs font-black uppercase tracking-wide text-ink shadow-[4px_4px_0_0_#0a0a0a] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:bg-lime hover:shadow-[7px_7px_0_0_#0a0a0a]"
                  >
                    {r.title} · {r.org}
                    <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

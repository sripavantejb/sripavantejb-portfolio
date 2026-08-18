"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  type Project,
} from "@/lib/data";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { TiltCard } from "@/components/ui/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[900px] px-6 pb-24 pt-32 md:pt-40">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            <Image src={role.logo} alt={`${role.org} logo`} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              {role.type}
            </p>
            <h1 className="mt-2 font-archivo text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {role.title}
            </h1>
            <p className="mt-1 font-inter text-lg font-medium text-ink/60">{role.org}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-inter text-sm text-ink/50">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {role.dates} · {role.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {role.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} /> {role.arrangement}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 max-w-2xl font-inter text-base leading-relaxed text-ink/70 md:text-lg"
        >
          {role.description}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-6 flex flex-wrap gap-2"
        >
          {role.skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/15 bg-white px-3 py-1.5 font-inter text-xs font-semibold text-ink/70"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {statHighlights.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {statHighlights.map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                <p className="font-archivo text-3xl text-ink">{s.value}</p>
                <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">
                  {s.label}
                </p>
                <p className="mt-0.5 font-inter text-xs text-ink/35">{s.note}</p>
              </div>
            ))}
          </motion.div>
        )}

        {relatedProjects.length > 0 && (
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
              <span className="h-2.5 w-2.5 bg-lime" /> Projects from this role
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {relatedProjects.map((p) => (
                <motion.div key={p.id} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <TiltCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_1px_2px_rgba(10,10,10,0.04)] transition-shadow hover:shadow-[0_20px_40px_-12px_rgba(10,10,10,0.18)]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-archivo text-lg leading-tight tracking-tight text-ink">{p.title}</h3>
                      {p.link && p.link !== "#" && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-colors hover:border-ink hover:bg-ink hover:text-white"
                          aria-label={`Open ${p.title}`}
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-ink/65">{p.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2 font-inter text-sm text-ink/60">
                          <Check size={13} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-ink/10 pt-3 font-inter text-sm font-medium text-ink/60">
                      {p.outcome}
                    </p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {relatedAIBuilds.length > 0 && (
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
              <Sparkles size={16} className="text-sky" /> Product built in this role
            </h2>
            <div className="mt-5 space-y-4">
              {relatedAIBuilds.map((b) => (
                <motion.div key={b.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                    <p className="font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">{b.when}</p>
                    <h3 className="mt-1 font-archivo text-lg tracking-tight text-ink">{b.title}</h3>
                    <p className="mt-1 font-inter text-sm text-ink/50">{b.context}</p>
                    <ul className="mt-3 space-y-1.5">
                      {b.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 font-inter text-sm text-ink/65">
                          <Check size={13} className="mt-0.5 shrink-0 text-sky" strokeWidth={3} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-ink/10 pt-3 font-inter text-sm font-medium text-ink/70">
                      {b.result}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {relatedAwards.length > 0 && (
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
              <Trophy size={16} className="text-lime" /> Recognition
            </h2>
            <div className="mt-5 space-y-4">
              {relatedAwards.map((a) => (
                <motion.div key={a.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
                  <div className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime/15 text-ink">
                      <AwardIcon size={18} />
                    </span>
                    <div>
                      <h3 className="font-archivo text-base tracking-tight text-ink">{a.title}</h3>
                      <p className="mt-0.5 font-inter text-xs font-semibold text-ink/40">
                        {a.issuer} · {a.when}
                      </p>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-ink/65">{a.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {leadership.length > 0 && (
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
              <Users size={16} className="text-sky" /> Leadership & community
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {leadership.map((item) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-archivo text-sm tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-1.5 font-inter text-sm leading-relaxed text-ink/60">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {(education || certifications.length > 0) && (
          <section className="mt-14">
            <h2 className="flex items-center gap-2 font-archivo text-sm font-black uppercase tracking-[0.2em] text-ink">
              <GraduationCap size={16} className="text-lime" /> Education & certifications
            </h2>
            <div className="mt-5 space-y-4">
              {education && (
                <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
                  <p className="font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">
                    {education.dates}
                  </p>
                  <h3 className="mt-1 font-archivo text-base tracking-tight text-ink">{education.institution}</h3>
                  <p className="mt-0.5 font-inter text-sm text-ink/60">{education.degree}</p>
                </div>
              )}
              {certifications.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {certifications.map((c) => (
                    <div key={c.name} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
                      <p className="font-archivo text-sm tracking-tight text-ink">{c.name}</p>
                      <p className="mt-0.5 font-inter text-xs text-ink/45">
                        {c.issuer} · {c.issued}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink/10 bg-white p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-archivo text-lg tracking-tight text-ink">Got a role like this to fill?</p>
            <p className="mt-1 font-inter text-sm text-ink/55">Let&rsquo;s talk about what you&rsquo;re building.</p>
          </div>
          <BrutalistLink href="/#contact" variant="primary">
            Get in touch <ArrowUpRight size={16} />
          </BrutalistLink>
        </motion.div>

        {otherRoles.length > 0 && (
          <div className="mt-10">
            <p className="font-inter text-xs font-semibold uppercase tracking-wide text-ink/40">Other roles</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {otherRoles.map((r) => (
                <Link
                  key={r.slug}
                  href={`/experience/${r.slug}`}
                  className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 font-inter text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  {r.title} · {r.org}
                  <ArrowUpRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

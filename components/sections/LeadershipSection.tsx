"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, Clapperboard, Mic, Scissors, Video, Vote } from "lucide-react";
import { leadership, leadershipRole } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

const initiativeIcons = [Clapperboard, Scissors, Mic, Video];

const lessons = [
  { n: "01", title: "Lead people", body: "Build teams around strengths, not titles." },
  { n: "02", title: "Ship under pressure", body: "Events don't wait for perfect execution." },
  { n: "03", title: "Create opportunities", body: "Workshops became spaces for students to learn." },
  { n: "04", title: "Tell better stories", body: "Good work deserves good storytelling." },
];

const card =
  "border-4 border-ink bg-white text-ink shadow-[8px_8px_0_0_#0a0a0a]";

const chip =
  "inline-flex w-fit items-center gap-1.5 border-2 border-ink bg-lime px-2 py-0.5 font-inter text-[9px] font-black uppercase tracking-widest text-ink";

export function LeadershipSection() {
  const coverage = leadership.find((item) => item.events?.length);
  const initiatives = leadership.filter((item) => item !== coverage);

  return (
    <section id="leadership" className={`bg-lime py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading
          eyebrow="Beyond Code"
          title="Leadership & Community"
          chip="white"
          description="I don't just build products. I build teams, communities, and experiences."
        />

        <p className="mt-6 max-w-2xl font-inter text-base font-medium leading-relaxed text-ink/70 md:text-lg">
          As the elected President of the NIAT Media Council, I&rsquo;ve spent the last 1.5+ years leading a creative
          team, managing campus media, organizing workshops, and turning ideas into experiences for hundreds of
          students.
        </p>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`group mt-12 overflow-hidden ${card} md:grid md:grid-cols-[1.1fr_0.9fr]`}
        >
          <div className="relative aspect-[4/3] min-h-[220px] border-b-4 border-ink md:aspect-auto md:min-h-[320px] md:border-b-0 md:border-r-4">
            <Image
              src={leadershipRole.photo.src}
              alt={leadershipRole.photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="flex flex-col justify-center bg-white p-5 text-ink md:p-6">
            <div className="mb-3 flex items-start justify-between gap-3">
              <span className={chip}>
                <Vote size={11} strokeWidth={2.5} /> {leadershipRole.badge}
              </span>
              <span className="font-archivo text-3xl font-black leading-none tracking-tighter text-ink/15 md:text-4xl">
                01
              </span>
            </div>
            <span className={chip}>
              {leadershipRole.dates} · {leadershipRole.duration}
            </span>
            <h3 className="mt-3 font-archivo text-lg font-black uppercase tracking-tight md:text-xl">
              {leadershipRole.org}
            </h3>
            <p className="mt-0.5 font-inter text-sm font-semibold text-ink/60">{leadershipRole.location}</p>
            <p className="mt-2 font-inter text-sm font-medium leading-relaxed text-ink/65">{leadershipRole.body}</p>
            <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-ink/10 pt-4">
              {leadershipRole.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink/20 bg-ink/5 px-2 py-0.5 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="h-1.5 w-10 bg-ink transition-all duration-300 group-hover:w-20" />
              <Link
                href={leadershipRole.href}
                className="flex items-center gap-1 font-inter text-xs font-bold uppercase tracking-wide text-ink"
              >
                View details <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.article>

        <p className="mt-14 font-inter text-[11px] font-black uppercase tracking-[0.2em] text-ink/45">
          Featured initiatives
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {initiatives.map((item, i) => {
            const Icon = initiativeIcons[i] ?? Camera;
            const photos = item.photos ?? [];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col overflow-hidden ${card}`}
              >
                {photos.length === 1 ? (
                  <div className="relative aspect-[16/10] border-b-4 border-ink">
                    <Image
                      src={photos[0].src}
                      alt={photos[0].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : photos.length > 1 ? (
                  <div className="grid grid-cols-3 gap-px border-b-4 border-ink bg-ink">
                    {photos.map((photo) => (
                      <div key={photo.src} className="relative aspect-square">
                        <Image src={photo.src} alt={photo.alt} fill sizes="20vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col bg-white p-5 text-ink">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <Icon size={18} strokeWidth={2.25} />
                    <span className="font-archivo text-3xl font-black leading-none tracking-tighter text-ink/15">
                      0{i + 2}
                    </span>
                  </div>
                  {item.role ? <span className={`${chip} mb-2`}>{item.role.split(" · ")[0]}</span> : null}
                  <h3 className="font-archivo text-lg font-black uppercase tracking-tight md:text-xl">{item.title}</h3>
                  <p className="mt-2 font-inter text-sm font-medium leading-relaxed text-ink/65">{item.detail}</p>
                  {item.stats ? (
                    <p className="mt-3 font-inter text-[11px] font-bold uppercase tracking-wide text-ink/45">
                      {item.stats}
                    </p>
                  ) : null}
                  {item.role ? <p className="mt-1 font-inter text-xs text-ink/50">{item.role}</p> : null}
                  {item.href && item.hrefLabel ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-4 inline-flex items-center gap-1 font-inter text-xs font-bold uppercase tracking-wide text-ink"
                    >
                      {item.hrefLabel} <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <div className="mt-auto pt-4">
                      <div className="h-1.5 w-10 bg-ink" />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {coverage ? (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-4 flex flex-col gap-5 bg-white p-5 text-ink ${card} md:flex-row md:items-center md:justify-between md:p-6`}
          >
            <div className="max-w-2xl">
              <span className={chip}>
                <Camera size={11} /> {coverage.title}
              </span>
              <p className="mt-3 font-inter text-sm font-medium leading-relaxed text-ink/65">{coverage.detail}</p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t-2 border-ink/10 pt-4">
                {coverage.events?.map((event) => (
                  <span
                    key={event}
                    className="rounded-full border border-ink/20 bg-ink/5 px-2 py-0.5 font-inter text-[10px] font-bold uppercase tracking-wide text-ink/70"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
            {coverage.href && coverage.hrefLabel ? (
              <Link
                href={coverage.href}
                className="inline-flex shrink-0 items-center gap-1 border-2 border-ink bg-lime px-4 py-2.5 font-archivo text-xs uppercase tracking-wide text-ink shadow-[4px_4px_0_0_#0a0a0a]"
              >
                {coverage.hrefLabel} <ArrowUpRight size={14} />
              </Link>
            ) : null}
          </motion.article>
        ) : null}

        <div className="mt-14 border-t-2 border-ink/20 pt-10">
          <p className="font-inter text-[11px] font-black uppercase tracking-[0.2em] text-ink/45">
            What leadership taught me
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {lessons.map((lesson) => (
              <div key={lesson.n} className="border-l-4 border-ink bg-white p-4 pl-4 shadow-[4px_4px_0_0_#0a0a0a]">
                <p className="font-mono text-[11px] font-bold text-ink/35">{lesson.n}</p>
                <p className="mt-1 font-archivo text-sm uppercase tracking-tight">{lesson.title}</p>
                <p className="mt-1 font-inter text-sm font-medium text-ink/60">→ {lesson.body}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-10 max-w-2xl">
            <p className="font-archivo text-sm uppercase tracking-tight text-ink/45">And the biggest lesson?</p>
            <p className="mt-3 font-display text-xl font-medium leading-snug tracking-tight md:text-2xl">
              Leadership isn&rsquo;t about being the person in front. It&rsquo;s about making sure everyone around you
              gets the opportunity to do their best work.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

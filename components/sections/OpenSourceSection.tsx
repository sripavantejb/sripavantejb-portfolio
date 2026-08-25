"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Trophy } from "lucide-react";
import { SiGithub, SiNpm } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { npmPackages, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { sectionFlowAfter } from "@/lib/stickyStack";

const contributions = [
  {
    icon: VscVscode,
    title: "Microsoft Visual Studio Code",
    body: "Explored and contributed to real engineering discussions and issues within one of the world's most widely used developer tools — analyzing bug reports, understanding maintainer discussions, and investigating issues affecting developers.",
  },
  {
    icon: SiNpm,
    title: "npm Ecosystem",
    body: "Contributed to npm documentation and published developer-focused packages to the npm ecosystem.",
  },
];

export function OpenSourceSection() {
  return (
    <section id="open-source" className={`bg-paper py-24 text-ink md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading
          eyebrow="Open Source"
          title="Beyond the Code"
          description="Building. Contributing. Learning in public."
        />

        <div className="mt-10 max-w-2xl space-y-4">
          <p className="font-inter text-base leading-relaxed text-ink/70 md:text-lg">
            Open source started as something I thought was only about writing code. Then I started contributing.
          </p>
          <p className="font-inter text-base leading-relaxed text-ink/70 md:text-lg">
            From investigating real issues in Microsoft&rsquo;s Visual Studio Code repository to contributing to npm
            documentation and publishing developer tools, I&rsquo;ve learned that open source is just as much about
            understanding problems as it is about solving them.
          </p>
        </div>

        <h3 className="mt-14 font-archivo text-sm uppercase tracking-[0.2em] text-ink">What I&rsquo;ve contributed</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {contributions.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="border-4 border-ink bg-white p-6 shadow-[5px_5px_0_0_#0a0a0a]"
            >
              <item.icon size={22} className="text-ink" />
              <h4 className="mt-4 font-archivo text-base uppercase tracking-tight">{item.title}</h4>
              <p className="mt-2 font-inter text-sm leading-relaxed text-ink/65">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <h3 className="mt-14 font-archivo text-sm uppercase tracking-[0.2em] text-ink">Published packages</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {npmPackages.map((pkg, i) => (
            <motion.a
              key={pkg.name}
              href={pkg.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col border-4 border-ink bg-ink p-6 text-white shadow-[5px_5px_0_0_#c8f542] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <code className="font-mono text-sm text-lime">{pkg.name}</code>
                <ArrowUpRight size={16} className="shrink-0 text-white/40 group-hover:text-lime" />
              </div>
              <p className="mt-3 font-inter text-sm leading-relaxed text-white/65">{pkg.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid overflow-hidden border-4 border-ink bg-lime text-ink shadow-[5px_5px_0_0_#0a0a0a] md:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative aspect-[800/539] min-h-[220px] md:aspect-auto md:min-h-[320px]">
            <Image
              src="/images/grit-award.jpg"
              alt="Receiving the GRIT Award for Open Source Contribution on stage"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <Trophy size={28} strokeWidth={2.25} />
            <p className="mt-4 font-inter text-[10px] font-black uppercase tracking-[0.2em]">
              Recognized for the journey
            </p>
            <h3 className="mt-2 font-archivo text-xl uppercase tracking-tight md:text-2xl">
              GRIT Award — Open Source Contribution
            </h3>
            <p className="mt-3 font-inter text-sm leading-relaxed text-ink/70">
              A recognition for work in open source, including npm documentation contributions and publishing developer
              tools for the wider community.
            </p>
          </div>
        </motion.div>

        <blockquote className="mt-14 max-w-2xl border-l-4 border-ink pl-5">
          <p className="font-display text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
            You don&rsquo;t have to start by changing the world. Start by understanding one problem, fixing one thing,
            and contributing one small piece at a time.
          </p>
        </blockquote>
        <p className="mt-6 max-w-xl font-inter text-sm leading-relaxed text-ink/60 md:text-base">
          Open source isn&rsquo;t just where I write code. It&rsquo;s where I learn how software is built by people
          beyond my own team.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <BrutalistLink href={profile.github} variant="primary" external>
            <SiGithub size={16} /> View GitHub
          </BrutalistLink>
          <BrutalistLink href={profile.npm} variant="dark" external>
            <SiNpm size={16} /> Explore npm Packages
          </BrutalistLink>
        </div>
      </div>
    </section>
  );
}

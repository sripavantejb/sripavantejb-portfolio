"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { pressFeatures, type PressFeature } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionFlowAfter } from "@/lib/stickyStack";

function PressCard({
  item,
  featured,
  sizes,
}: {
  item: PressFeature;
  featured?: boolean;
  sizes: string;
}) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group flex h-full flex-col overflow-hidden border-4 bg-white/[0.03] transition-colors hover:border-lime ${
        featured ? "border-lime" : "border-white/15"
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[16/10]"}`}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          priority={featured}
          sizes={sizes}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-8" : "p-5 md:p-6"}`}>
        <div className="flex h-11 w-fit items-center bg-white px-3 py-1.5">
          <Image
            src={item.logo}
            alt={`${item.publication} logo`}
            width={featured ? 180 : 140}
            height={32}
            className="h-7 w-auto max-w-[160px] object-contain object-left"
          />
        </div>
        <h3
          className={`mt-4 font-archivo uppercase leading-tight tracking-tight text-white ${
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
        >
          {item.title}
        </h3>
        <p className={`mt-3 font-inter leading-relaxed text-white/65 ${featured ? "text-sm md:text-base" : "text-sm"}`}>
          {item.body}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-inter text-[11px] font-semibold uppercase tracking-wide text-white/45">{item.stat}</p>
          <span className="inline-flex shrink-0 items-center gap-1 font-archivo text-[11px] uppercase tracking-wide text-lime">
            Read <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function FeaturedInSection() {
  const [featured, ...rest] = pressFeatures;

  return (
    <section id="featured" className={`bg-[#050505] py-24 md:py-32 ${sectionFlowAfter}`}>
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeading
          eyebrow="Featured In"
          title="Work that made it beyond my portfolio."
          accentWord="beyond"
          light
          description="Some of the products I’ve built and worked on have been featured by leading publications across technology, business, and construction."
        />

        <p className="mt-5 font-inter text-sm font-semibold uppercase tracking-[0.16em] text-lime">
          4+ publications · Featured across technology, business & industry media
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {pressFeatures.map((item) => (
            <a
              key={item.publication}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center border border-white/15 bg-white px-4 py-2 transition-colors hover:border-lime"
            >
              <Image
                src={item.logo}
                alt={item.publication}
                width={140}
                height={32}
                className="h-7 w-auto max-w-[140px] object-contain"
              />
            </a>
          ))}
        </div>

        <div className="mt-10">
          <PressCard item={featured} featured sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((item) => (
            <PressCard key={item.publication} item={item} sizes="(max-width: 768px) 100vw, 50vw" />
          ))}
        </div>

        <div className="mt-14 max-w-2xl border-t border-white/10 pt-10">
          <p className="font-archivo text-sm uppercase tracking-tight text-lime">From building products to getting them noticed.</p>
          <p className="mt-4 font-inter text-sm leading-relaxed text-white/60 md:text-base">
            The goal was never just to build something. It was to solve a real problem well enough that people outside
            the room started paying attention.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiPython,
  SiTailwindcss,
  SiCplusplus,
  SiN8N,
  SiFigma,
  SiVercel,
  SiDavinciresolve,
} from "react-icons/si";
import { stickySlideLast } from "@/lib/stickyStack";
import { MotionItem, MotionSection } from "@/components/motion";
import { GlowParticleCard } from "@/components/ui/GlowParticleCard";

const stack = [
  { icon: SiReact, name: "React.js", note: "Component-driven UI, hooks & context" },
  { icon: SiNodedotjs, name: "Node.js", note: "REST APIs & backend services" },
  { icon: SiTypescript, name: "TypeScript", note: "Type-safe apps end to end" },
  { icon: SiMongodb, name: "MongoDB", note: "Schema design & aggregation" },
  { icon: SiExpress, name: "Express", note: "API routing & middleware" },
  { icon: SiPython, name: "Python", note: "Data, ML & automation scripts" },
  { icon: SiTailwindcss, name: "Tailwind CSS", note: "Utility-first UI at speed" },
  { icon: SiCplusplus, name: "C++", note: "DSA & problem solving" },
  { icon: SiN8N, name: "n8n", note: "Workflow & AI agent automation" },
  { icon: SiFigma, name: "Figma", note: "UI design & prototyping" },
  { icon: SiVercel, name: "Vercel", note: "Zero-downtime deploys" },
  { icon: SiDavinciresolve, name: "DaVinci Resolve", note: "Video editing & color" },
];

export function TechStackSection() {
  return (
    <MotionSection
      className={`flex flex-col justify-center px-6 py-16 sm:px-8 lg:py-20 ${stickySlideLast}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <MotionItem className="mb-8 text-center">
          <p className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-lime">
            Toolbelt
          </p>
          <h2 className="mt-2 font-inter text-3xl font-bold tracking-tight text-white md:text-4xl">
            What I build with
          </h2>
        </MotionItem>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {stack.map(({ icon: Icon, name, note }) => (
            <MotionItem key={name}>
              <GlowParticleCard className="flex h-full flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Icon size={28} className="text-lime" />
                <div>
                  <p className="font-archivo text-sm font-black uppercase tracking-tight text-white">
                    {name}
                  </p>
                  <p className="mt-1 font-inter text-xs leading-relaxed text-white/45">{note}</p>
                </div>
              </GlowParticleCard>
            </MotionItem>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

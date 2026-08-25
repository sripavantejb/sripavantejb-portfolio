import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrutalistLink } from "@/components/ui/BrutalistLink";
import { ProductFrame } from "@/components/projects/ProductFrame";
import { DashboardMock } from "@/components/projects/agency-erp/AgencyErpMocks";
import type { Project } from "@/lib/data";

const modules = [
  "CRM",
  "Projects",
  "Creative",
  "Finance",
  "HR",
  "Credentials",
  "Analytics",
  "RBAC",
];

export function AgencyErpCaseStudy({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-[780px] px-6 pb-24 pt-28 md:pb-32 md:pt-36">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-inter text-sm text-white/45 transition-colors hover:text-lime"
        >
          <ArrowLeft size={14} />
          Projects
        </Link>

        <p className="mt-12 font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-lime">
          {project.category}
        </p>
        <h1 className="mt-4 font-archivo text-[clamp(2.75rem,10vw,5rem)] uppercase leading-[0.88] tracking-tighter">
          Agency ERP
        </h1>
        <p className="mt-5 max-w-xl font-inter text-base leading-relaxed text-white/55 md:text-lg">
          One system for clients, projects, people, money, and creative work — instead of a pile of spreadsheets and
          tools.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {[
            ["Role", project.role ?? "Full-Stack"],
            ["When", "Since Jun 2025"],
            ["Build", "Founding engineer"],
            ["Stack", "MERN + TS"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-inter text-[10px] uppercase tracking-widest text-white/30">{k}</dt>
              <dd className="mt-1 font-inter text-sm text-white/80">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <ProductFrame module="Dashboard">
            <DashboardMock />
          </ProductFrame>
        </div>

        <div className="mt-16 space-y-10 border-t border-white/10 pt-12">
          <div>
            <h2 className="font-archivo text-xs uppercase tracking-[0.2em] text-lime">Problem</h2>
            <p className="mt-3 font-inter text-sm leading-relaxed text-white/60 md:text-base">
              Delivery, finance, HR, and credentials lived in different tools. Nothing shared a source of truth.
            </p>
          </div>
          <div>
            <h2 className="font-archivo text-xs uppercase tracking-[0.2em] text-lime">What I built</h2>
            <p className="mt-3 font-inter text-sm leading-relaxed text-white/60 md:text-base">
              A modular ERP around the agency lifecycle — lead to payment — with role-based access and project-level
              finance.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {modules.map((m) => (
                <span
                  key={m}
                  className="border border-white/15 px-3 py-1.5 font-inter text-xs text-white/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {project.liveUrl && (
            <BrutalistLink href={project.liveUrl} variant="primary" external>
              Live Preview <ArrowUpRight size={16} />
            </BrutalistLink>
          )}
          <BrutalistLink href="/#projects" variant="dark">
            Back
          </BrutalistLink>
        </div>
      </div>
    </main>
  );
}

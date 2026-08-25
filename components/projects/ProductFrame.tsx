import type { ReactNode } from "react";

const NAV = [
  "Dashboard",
  "CRM",
  "Projects",
  "Creative",
  "Finance",
  "Team",
  "Credentials",
  "Analytics",
];

export function ProductFrame({
  module: active,
  children,
}: {
  module: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden border-4 border-ink bg-[#0b0b0b] shadow-[8px_8px_0_0_#c8f542]">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <p className="ml-3 font-archivo text-[10px] uppercase tracking-[0.18em] text-white/45">
          Agency ERP · {active}
        </p>
        <span className="ml-auto hidden rounded-full bg-lime/15 px-2 py-0.5 font-inter text-[10px] font-semibold text-lime sm:inline">
          admin@editco
        </span>
      </div>
      <div className="flex min-h-[280px]">
        <aside className="hidden w-40 shrink-0 border-r border-white/10 p-3 sm:block">
          <p className="px-2 pb-2 font-archivo text-[9px] uppercase tracking-[0.2em] text-lime">
            Modules
          </p>
          <ul className="space-y-0.5">
            {NAV.map((item) => (
              <li
                key={item}
                className={`rounded-md px-2 py-1.5 font-inter text-[11px] font-medium ${
                  item === active ? "bg-lime text-ink" : "text-white/50"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-4">{children}</div>
      </div>
    </div>
  );
}

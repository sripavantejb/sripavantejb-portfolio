export function DashboardMock() {
  const kpis = [
    { label: "Revenue MTD", value: "₹4.2L", note: "+18%" },
    { label: "Active projects", value: "11", note: "3 due" },
    { label: "Open leads", value: "27", note: "5 hot" },
    { label: "Outstanding", value: "₹86k", note: "2 overdue" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
            <p className="font-inter text-[9px] uppercase tracking-wide text-white/40">{k.label}</p>
            <p className="mt-1 font-archivo text-lg leading-none text-white">{k.value}</p>
            <p className="mt-1 font-inter text-[10px] text-lime">{k.note}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="font-inter text-[10px] uppercase tracking-wide text-white/40">Project performance</p>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {[40, 62, 48, 80, 55, 90, 70, 64, 78, 88].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-lime/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="font-inter text-[10px] uppercase tracking-wide text-white/40">Recent activity</p>
          <ul className="mt-2 space-y-2">
            {[
              "Invoice #104 marked paid",
              "Lead “Dental Care” moved to Proposal",
              "Creative brief approved — Brand film",
            ].map((item) => (
              <li key={item} className="font-inter text-[11px] leading-snug text-white/70">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

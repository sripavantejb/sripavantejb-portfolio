export function TagChip({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-block rounded-full border-2 px-3 py-1 font-inter text-xs font-black uppercase tracking-wider ${
        tone === "dark"
          ? "border-white/15 bg-white/5 text-white/80"
          : "border-ink/15 bg-ink/5 text-ink/80"
      }`}
    >
      {children}
    </span>
  );
}

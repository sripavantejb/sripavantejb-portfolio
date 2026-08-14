import SplitText from "@/components/ui/SplitText";

export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  description,
  light,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accentWord?: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span className="inline-block border-2 border-ink bg-lime px-3 py-1 font-inter text-[10px] font-black uppercase tracking-[0.2em] text-ink shadow-[3px_3px_0_0_#0a0a0a]">
        {eyebrow}
      </span>
      <SplitText
        tag="h2"
        splitType="words"
        delay={40}
        duration={0.7}
        ease="power3.out"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        textAlign={align === "center" ? "center" : "left"}
        className="mt-3 font-archivo text-3xl uppercase leading-[1.05] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {accentWord ? (
          <>
            {parts[0]}
            <span className="inline-block bg-ink px-2 text-lime">{accentWord}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </SplitText>
      {description ? (
        <p
          className={`mt-4 max-w-2xl font-inter text-base font-medium leading-relaxed md:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/75" : "text-ink/70"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

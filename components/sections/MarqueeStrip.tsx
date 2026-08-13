import { sectionFlowAfter } from "@/lib/stickyStack";

const items = [
  "MERN Stack",
  "React.js",
  "Node.js",
  "TypeScript",
  "Python",
  "C++",
  "AI Automation",
  "n8n",
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Growth Strategy",
];

export function MarqueeStrip() {
  const loop = [...items, ...items];
  return (
    <div className={`border-y-2 border-white/10 bg-ink py-4 ${sectionFlowAfter}`}>
      <div className="hide-scrollbar flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap font-archivo text-lg uppercase tracking-tight text-white/40 md:text-2xl"
            >
              {item}
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import ScrollExpand from "@/components/ui/ScrollExpand";
import { sectionFlowAfter } from "@/lib/stickyStack";

export function AwardsScrollExpandSection() {
  return (
    <div className={`bg-[#050505] ${sectionFlowAfter}`}>
      <ScrollExpand
        src="/images/awards-hero.svg"
        alt="Awards and recognition"
        title="AWARDS & WINS"
        scrollHint="Scroll to expand"
        useWindowScroll
        mediaZoom={1.3}
        scrollDistance={1}
        holdDistance={0.25}
        overlayScrim={0.55}
      >
        <p className="font-inter text-xs font-semibold uppercase tracking-[0.25em] text-lime">
          Headline wins
        </p>
        <h3 className="mt-3 max-w-2xl font-archivo text-2xl uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          3 national buildathons · 1 startup win · 1 open-source award
        </h3>
        <p className="mt-4 font-inter text-sm text-white/60 md:text-base">
          Keep scrolling for the full list.
        </p>
      </ScrollExpand>
    </div>
  );
}

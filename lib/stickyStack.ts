/**
 * Sticky "page slides" — only safe on short, opaque, single-viewport blocks.
 * These stack on top of each other as the user scrolls (desktop/lg+ only).
 *
 * Sticky slides stay in the stacking context for the rest of <main>, so every
 * section AFTER the sticky stack must use a higher z-index (sectionFlowAfter)
 * or it will render underneath the last sticky slide.
 */
const stickySlideCore =
  "relative w-full border-b-4 border-ink shadow-[0_-20px_40px_rgba(0,0,0,0.3)] lg:sticky lg:top-0 lg:min-h-[100svh] lg:overflow-y-auto";

export const stickySlide1 = `${stickySlideCore} z-10`;
export const stickySlide2 = `${stickySlideCore} z-20`;
export const stickySlide3 = `${stickySlideCore} z-[25]`;
export const stickySlide4 = `${stickySlideCore} z-30`;
export const stickySlideLast =
  "relative z-[40] w-full border-b-4 border-ink bg-[#050505]";

export const sectionFlowAfter = "relative z-[60] w-full";

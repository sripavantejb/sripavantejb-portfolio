"use client";

import { useEffect, useState } from "react";

export function ClientCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("hide-system-cursor");
    const frame = requestAnimationFrame(() => setEnabled(true));

    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], .cursor-pointer"));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("hide-system-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100000] hidden items-center justify-center mix-blend-difference transition-transform duration-75 ease-out md:flex"
      style={{ transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)` }}
      aria-hidden
    >
      <div
        className={`rounded-full bg-white transition-all duration-300 ${
          hovering ? "h-10 w-10 opacity-70" : "h-3.5 w-3.5 opacity-100"
        }`}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(raw: string) {
  const match = raw.match(/[\d,]+/);
  if (!match) return { prefix: raw, number: 0, suffix: "" };
  const start = match.index ?? 0;
  const end = start + match[0].length;
  return {
    prefix: raw.slice(0, start),
    number: parseInt(match[0].replace(/,/g, ""), 10),
    suffix: raw.slice(end),
  };
}

export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const { prefix, number, suffix } = parseValue(value);

  useEffect(() => {
    if (!inView) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setDisplay(number));
      return () => cancelAnimationFrame(raf);
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(number * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

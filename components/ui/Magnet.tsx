"use client";

import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Magnet({
  children,
  padding = 60,
  disabled = false,
  magnetStrength = 4,
  wrapperClassName = "",
  innerClassName = "",
  ...props
}: {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  wrapperClassName?: string;
  innerClassName?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    if (disabled) {
      inner.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const el = magnetRef.current;
      if (!el || !inner) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        inner.style.transition = "transform 0.3s ease-out";
        inner.style.transform = `translate3d(${(e.clientX - centerX) / magnetStrength}px, ${(e.clientY - centerY) / magnetStrength}px, 0)`;
      } else {
        inner.style.transition = "transform 0.5s ease-in-out";
        inner.style.transform = "translate3d(0, 0, 0)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, disabled, magnetStrength]);

  return (
    <div ref={magnetRef} className={cn("relative inline-block", wrapperClassName)} {...props}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

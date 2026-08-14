"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import "./PillNavLinks.css";

export type PillNavItem = { href: string; label: string };

export function PillNavLinks({
  items,
  ease = "power3.out",
  baseColor = "#c8f542",
  hoveredTextColor = "#0a0a0a",
  className = "",
  onItemClick,
}: {
  items: PillNavItem[];
  ease?: string;
  baseColor?: string;
  hoveredTextColor?: string;
  className?: string;
  onItemClick?: () => void;
}) {
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const navItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(layout).catch(() => {});

    const navItems = navItemsRef.current;
    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: "hidden" });
      gsap.to(navItems, { width: "auto", duration: 0.6, ease });
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const cssVars = {
    ["--base" as string]: baseColor,
    ["--hover-text" as string]: hoveredTextColor,
  } as CSSProperties;

  return (
    <div className={`pill-nav-items ${className}`} ref={navItemsRef} style={cssVars}>
      <ul className="pill-list" role="menubar">
        {items.map((item, i) => (
          <li key={item.href} role="none">
            <a
              role="menuitem"
              href={item.href}
              className="pill"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
              onClick={onItemClick}
            >
              <span
                className="hover-circle"
                aria-hidden="true"
                ref={(el) => {
                  circleRefs.current[i] = el;
                }}
              />
              <span className="label-stack">
                <span className="pill-label">{item.label}</span>
                <span className="pill-label-hover" aria-hidden="true">
                  {item.label}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

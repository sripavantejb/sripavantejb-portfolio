"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import "./GlowParticleCard.css";

const PARTICLE_COUNT = 8;
const GLOW_COLOR = "200, 245, 66";

function createParticle(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "gpc-particle";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  return el;
}

export function GlowParticleCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const particles = useRef<HTMLElement[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearParticles = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    particles.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      });
    });
    particles.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHovered.current || !ref.current) return;
        const particle = createParticle(Math.random() * width, Math.random() * height);
        ref.current.appendChild(particle);
        particles.current.push(particle);

        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(particle, { opacity: 0.3, duration: 1.4, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 110);
      timeouts.current.push(timeoutId);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onEnter = () => {
      isHovered.current = true;
      spawnParticles();
      gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
    };
    const onLeave = () => {
      isHovered.current = false;
      clearParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      gsap.to(el, {
        rotateX: ((y - cy) / cy) * -8,
        rotateY: ((x - cx) / cx) * 8,
        duration: 0.1,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      const relX = (x / rect.width) * 100;
      const relY = (y / rect.height) * 100;
      el.style.setProperty("--glow-x", `${relX}%`);
      el.style.setProperty("--glow-y", `${relY}%`);
      el.style.setProperty("--glow-intensity", "1");
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);

    return () => {
      isHovered.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      clearParticles();
    };
  }, [clearParticles, spawnParticles]);

  return (
    <div
      ref={ref}
      className={`glow-particle-card ${className}`}
      style={{ ...style, ["--glow-color" as string]: GLOW_COLOR }}
    >
      {children}
    </div>
  );
}

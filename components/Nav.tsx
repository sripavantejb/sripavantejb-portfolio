"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { profile } from "@/lib/data";
import { RESUME_DOWNLOAD_PATH } from "@/lib/resume";
import { PillNavLinks } from "@/components/ui/PillNavLinks";

const links = [
  { href: "/about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#featured", label: "Featured" },
  { href: "/#hackathons", label: "Hackathons" },
  { href: "/#open-source", label: "Open Source" },
  { href: "/#leadership", label: "Leadership" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

function parseCssColor(input: string) {
  if (!input || input === "transparent") return null;

  const rgb = input.match(/rgba?\(([^)]+)\)/i);
  if (rgb) {
    const parts = rgb[1]
      .replace(/\//g, " ")
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    }
  }

  const oklch = input.match(/oklch\(([^)]+)\)/i);
  if (oklch) {
    const parts = oklch[1].replace(/\//g, " ").split(/[\s,]+/).filter(Boolean);
    const raw = parts[0] ?? "";
    let lightness = parseFloat(raw);
    if (Number.isNaN(lightness)) return null;
    if (raw.includes("%") || lightness > 1) lightness /= 100;
    const gray = lightness * 255;
    const alpha = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
    return { r: gray, g: gray, b: gray, a: Number.isNaN(alpha) ? 1 : alpha };
  }

  return null;
}

function isLightBehind(chrome: HTMLElement | null) {
  if (!chrome || typeof document === "undefined") return false;
  const rect = chrome.getBoundingClientRect();
  const x = Math.min(window.innerWidth - 2, Math.max(2, rect.left + rect.width / 2));
  const y = Math.min(window.innerHeight - 2, Math.max(2, rect.top + rect.height / 2));

  for (const node of document.elementsFromPoint(x, y)) {
    if (!(node instanceof Element) || chrome.contains(node) || node === chrome) continue;
    let el: Element | null = node;
    while (el && el !== document.documentElement) {
      if (chrome.contains(el)) {
        el = el.parentElement;
        continue;
      }
      const parsed = parseCssColor(getComputedStyle(el).backgroundColor);
      if (parsed && parsed.a > 0.2) {
        const luminance = (0.2126 * parsed.r + 0.7152 * parsed.g + 0.0722 * parsed.b) / 255;
        return luminance > 0.45;
      }
      el = el.parentElement;
    }
  }
  return false;
}

export function Nav({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const chromeRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      setOnLight(isLightBehind(chromeRef.current));
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div ref={chromeRef} className="fixed inset-x-0 top-4 z-[9999] flex justify-center px-4 md:top-6">
        <nav
          className={`flex items-center gap-1 rounded-full border p-1.5 shadow-2xl backdrop-blur-md transition-colors duration-300 ${
            onLight
              ? `border-ink/15 ${scrolled ? "bg-white/85" : "bg-white/70"}`
              : `border-white/10 ${scrolled ? "bg-ink/70" : "bg-white/5"}`
          }`}
        >
          <motion.a
            href="/#top"
            whileHover={{ rotate: 360, scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-lime font-archivo text-[10px] font-black uppercase tracking-wide text-ink"
          >
            SPTB
          </motion.a>
          <div className="hidden md:flex">
            <PillNavLinks
              items={links}
              textColor={onLight ? "rgba(10, 10, 10, 0.78)" : "rgba(255, 255, 255, 0.72)"}
            />
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full bg-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-ink md:inline-flex"
          >
            Hire Me
          </a>
          {resumeAvailable ? (
            <a
              href={RESUME_DOWNLOAD_PATH}
              download
              className={`hidden rounded-full border px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide md:inline-flex ${
                onLight ? "border-ink text-ink" : "border-lime text-lime"
              }`}
            >
              CV
            </a>
          ) : null}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`ml-1 flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${
              onLight ? "border-ink/20 bg-white/40 text-ink" : "border-white/10 bg-white/5 text-white"
            }`}
          >
            <Menu size={18} />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-paper text-ink"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center gap-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="font-archivo text-[clamp(1.5rem,8vw,3rem)] uppercase tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
              {resumeAvailable ? (
                <motion.a
                  href={RESUME_DOWNLOAD_PATH}
                  download
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + links.length * 0.06 }}
                  className="flex items-center gap-2 font-archivo text-[clamp(1.5rem,8vw,3rem)] uppercase tracking-tight text-lime"
                >
                  Download CV <Download size={24} />
                </motion.a>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

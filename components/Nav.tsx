"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { profile } from "@/lib/data";
import { RESUME_DOWNLOAD_PATH } from "@/lib/resume";
import { PillNavLinks } from "@/components/ui/PillNavLinks";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#featured", label: "Featured" },
  { href: "/#hackathons", label: "Hackathons" },
  { href: "/#open-source", label: "Open Source" },
  { href: "/#leadership", label: "Leadership" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Nav({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-[9999] flex justify-center px-4 md:top-6">
        <nav
          className={`flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-md transition-all ${
            scrolled ? "bg-ink/70" : ""
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
            <PillNavLinks items={links} />
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
              className="hidden rounded-full border border-lime px-4 py-2 font-archivo text-xs font-black uppercase tracking-wide text-lime md:inline-flex"
            >
              CV
            </a>
          ) : null}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
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

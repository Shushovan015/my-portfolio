"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: id === "projects" ? "start" : "center",
  });
};

export default function ScrollHud() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.4 });

  const [activeId, setActiveId] = useState("home");
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setPercent(Math.max(0, Math.min(100, Math.round(value * 100))));
  });

  useEffect(() => {
    const sectionEls = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    sectionEls.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hud-panel fixed bottom-6 right-6 z-[90] hidden w-56 lg:block">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-soft)]">Navigation</p>
        <p className="font-mono text-[11px] text-[var(--ink)]">{percent}%</p>
      </div>

      <div className="hud-track mb-3">
        <motion.div className="hud-fill origin-left" style={{ scaleX: progress }} />
      </div>

      <div className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToId(section.id)}
            className={`block w-full rounded-md px-2 py-1 text-left font-mono text-[11px] uppercase tracking-[0.08em] transition ${
              activeId === section.id
                ? "bg-[color:rgba(63,210,255,0.14)] text-[var(--ink)]"
                : "text-[var(--ink-soft)] hover:bg-[color:rgba(63,210,255,0.1)] hover:text-[var(--ink)]"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

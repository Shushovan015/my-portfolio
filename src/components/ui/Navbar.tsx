"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: id === "projects" ? "start" : "center",
  });
};

type NavbarProps = {
  onSwitchToChat?: () => void;
};

export default function Navbar({ onSwitchToChat }: NavbarProps) {
  const [activeId, setActiveId] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

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

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const onNavigate = (id: string) => {
    scrollToId(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(4,11,20,0.78)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-4 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(63,210,255,0.8)]" />
            SHUSHOVAN SHAKYA
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition ${isActive
                      ? "bg-[color:rgba(63,210,255,0.16)] text-[var(--ink)]"
                      : "text-[var(--ink-soft)] hover:bg-[color:rgba(63,210,255,0.1)] hover:text-[var(--ink)]"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic className="hidden md:inline-block">
              <a href="/resume.pdf" download data-cursor="Download" className="cmd-btn">
                <Download className="h-3.5 w-3.5" />
                Resume PDF
              </a>
            </Magnetic>
            {onSwitchToChat ? (
              <button type="button" onClick={onSwitchToChat} className="cmd-btn hidden md:inline-flex">
                Chat View
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mt-3 grid gap-1 rounded-xl border border-[var(--line)] bg-[color:rgba(11,23,40,0.9)] p-2 md:hidden">
            {navItems.map((item) => (
              <button
                key={`mobile-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className="rounded-lg px-3 py-2 text-left font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)] hover:bg-[color:rgba(63,210,255,0.1)] hover:text-[var(--ink)]"
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

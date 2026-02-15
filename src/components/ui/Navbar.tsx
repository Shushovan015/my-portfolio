"use client";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

type NavbarProps = {
  onSwitchToChat?: () => void;
};

export default function Navbar({ onSwitchToChat }: NavbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(244,241,232,0.9)] backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => scrollToId("home")}
            className="text-sm font-semibold uppercase tracking-[0.13em]"
          >
            SHUSHOVAN SHAKYA
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-[var(--ink-soft)] hover:bg-[var(--bg-soft)] hover:text-[var(--ink)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="/resume.pdf" download className="pill hover:bg-[var(--ink)] hover:text-[var(--bg)]">
              Resume
            </a>
            {onSwitchToChat ? (
              <button
                type="button"
                onClick={onSwitchToChat}
                className="hidden rounded-full border border-[var(--line)] px-3 py-1.5 text-xs uppercase tracking-[0.1em] md:inline-flex"
              >
                Chat View
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-2 flex gap-1 overflow-x-auto pb-1 md:hidden">
          {navItems.map((item) => (
            <button
              key={`mobile-${item.id}`}
              onClick={() => scrollToId(item.id)}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] uppercase tracking-[0.08em]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

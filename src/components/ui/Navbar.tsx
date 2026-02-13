"use client";

const nav = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <button onClick={() => scrollToId("home")} className="font-semibold tracking-tight">
          SHUSHOVAN SHAKYA
        </button>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 text-sm">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-2xl px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-900/40 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {onSwitchToChat ? (
            <button
              type="button"
              onClick={onSwitchToChat}
              className="rounded-xl border border-zinc-700 px-3 py-2 text-xs text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900/50"
            >
              Conversation View
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

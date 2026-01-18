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
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-14">
        <button onClick={() => scrollToId("home")} className="font-semibold tracking-tight">
          SHUSHOVAN SHAKYA
        </button>

        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className="rounded-2xl px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-900/40 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

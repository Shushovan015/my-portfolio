const skills = [
  {
    title: "Buttons / Inputs",
    desc: "Accessible states, focus rings, loading, validation.",
    chips: ["A11y", "Variants", "Forms"],
  },
  {
    title: "Navigation",
    desc: "Sticky nav, active routes, page transitions.",
    chips: ["App Router", "Framer Motion", "UX"],
  },
  {
    title: "Performance",
    desc: "Core Web Vitals, image strategy, minimal client JS.",
    chips: ["LCP", "INP", "SEO"],
  },
  {
    title: "Motion System",
    desc: "Consistent micro-interactions that feel premium.",
    chips: ["Transitions", "Hover", "Reduced motion"],
  },
  {
    title: "3D (Lightweight)",
    desc: "Small WebGL details that don’t hurt performance.",
    chips: ["R3F", "DPR tuning", "Client-only"],
  },
  {
    title: "UI Architecture",
    desc: "Scalable structure, reusable sections, data-driven pages.",
    chips: ["Components", "Content model", "Maintainable"],
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

export default function SkillsAsComponents() {
  return (
    <section className="py-20">
      <h2 className="text-2xl font-semibold tracking-tight">Skills, as components</h2>
      <p className="mt-3 max-w-2xl text-zinc-300">
        I don’t just list tools — I ship systems. Each “skill” maps to real UI patterns I build in production.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skills.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

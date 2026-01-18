const strengths = [
  {
    title: "UI Engineering",
    desc: "Reusable components, clean architecture, and consistent interaction patterns.",
  },
  {
    title: "Motion with restraint",
    desc: "Transitions and micro-interactions that feel premium—never distracting.",
  },
  {
    title: "Performance",
    desc: "Fast LCP, good Core Web Vitals, minimal client JS, smart rendering decisions.",
  },
  {
    title: "Accessibility",
    desc: "Keyboard-first, reduced motion, semantic structure, clear focus states.",
  },
];

export default function Strengths() {
  return (
    <section className="pb-20">
      <h2 className="text-2xl font-semibold tracking-tight">What you get</h2>
      <p className="mt-3 max-w-2xl text-zinc-300">
        I focus on shipping interfaces that look great, feel smooth, and perform well in production.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {strengths.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const clusters = [
  {
    title: "Core Stack",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Visual & Motion",
    items: ["Framer Motion", "Three.js", "D3.js", "OpenLayers"],
  },
  {
    title: "Workflow",
    items: ["Git", "CI/CD", "Performance Audits", "Accessibility", "Design Systems"],
  },
];

export default function ToolsGrid() {
  return (
    <section id="skills" className="section-wrap">
      <p className="eyebrow">Capabilities</p>
      <h2 className="section-title mt-3">Skills</h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {clusters.map((cluster) => (
          <article
            key={cluster.title}
            className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.35)] p-5"
          >
            <h3 className="text-lg font-semibold">{cluster.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {cluster.items.map((item) => (
                <span
                  key={`${cluster.title}-${item}`}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-[0.08em]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

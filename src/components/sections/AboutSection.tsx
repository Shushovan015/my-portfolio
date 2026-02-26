const highlights = [
  "Product-first frontend engineering with clean architecture",
  "Strong geospatial + data-viz implementation experience",
  "Interaction-rich UI without sacrificing accessibility/performance",
];

const stats = [
  { value: "4+", label: "Years of frontend delivery" },
  { value: "6+", label: "Complex production projects" },
  { value: "3", label: "Core domains (GIS, Data Viz, Product UI)" },
];

export default function AboutSection() {
  return (
   <section id="about" className="section-wrap screen-section">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow">Profile</p>
          <h2 className="section-title mt-3">Professional Value</h2>
        </div>

        <article className="pro-panel overflow-hidden">
          <div className="panel-head">
            <div className="panel-dots">
              <span className="dot bg-[var(--accent-2)]" />
              <span className="dot bg-[var(--accent)]" />
              <span className="dot bg-[var(--ok)]" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] muted">Summary</p>
          </div>

          <div className="space-y-4 p-5 text-sm leading-relaxed muted">
            <p>
              I am Shushovan Shakya, a frontend developer focused on building robust interfaces for complex workflows.
            </p>
            <p>
              My stack includes React, Next.js, TypeScript, D3, Three.js, and OpenLayers. I prioritize maintainability,
              performance, and user trust.
            </p>

            <ul className="space-y-2">
              {highlights.map((item) => (
                <li key={item} className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="pro-panel p-5">
            <p className="text-3xl font-semibold">{item.value}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] muted">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

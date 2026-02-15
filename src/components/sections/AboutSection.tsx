export default function AboutSection() {
  return (
    <section id="about" className="section-wrap">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="eyebrow">Who I am</p>
          <h2 className="section-title mt-3">Design + Engineering</h2>
        </div>

        <div className="space-y-5 text-base leading-relaxed text-[var(--ink-soft)]">
          <p>
            I am Shushovan Shakya, a frontend developer focused on turning complex product ideas into clean,
            expressive interfaces.
          </p>
          <p>
            My stack includes React, Next.js, TypeScript, Three.js, and data visualization tooling. I care
            about readability, accessibility, and speed from day one.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <article className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.45)] p-5">
          <p className="text-3xl font-semibold">4+</p>
          <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">Years Experience</p>
        </article>
       <article className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.45)] p-5">
  <p className="text-3xl font-semibold">3</p>
  <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">
    Domains: GIS, Data Viz, Product UI
  </p>
</article>
        <article className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.45)] p-5">
          <p className="text-3xl font-semibold">100%</p>
          <p className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--ink-soft)]">Performance Mindset</p>
        </article>
      </div>
    </section>
  );
}

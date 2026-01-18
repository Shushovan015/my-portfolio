import PageTransition from "@/components/ui/PageTransition";

const values = [
  {
    title: "Performance-first",
    desc: "I treat speed as a feature: fast LCP, smooth interactions, and minimal client JS where possible.",
  },
  {
    title: "Polish & interaction",
    desc: "Micro-interactions, motion, and layout rhythm that make UI feel premium—not noisy.",
  },
  {
    title: "Accessible by default",
    desc: "Keyboard support, focus states, reduced-motion, and semantic structure from the start.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Focused on UI systems + motion",
    desc: "Built reusable components, refined animations, and improved design consistency across apps.",
  },
  {
    year: "2024",
    title: "Next.js performance + product UX",
    desc: "Optimized pages for SEO and speed, improved UX patterns, and shipped production features.",
  },
  {
    year: "2023",
    title: "Frontend foundation",
    desc: "Strengthened React/TypeScript fundamentals and built multiple projects end-to-end.",
  },
];

const toolbox = [
  "Next.js (App Router)",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js / R3F",
  "Web Performance",
  "Accessibility",
  "UI Architecture",
];

export default function AboutSection() {
  return (
    <PageTransition>
      <section id="about" className="py-16">
        <header>
          <h1 className="text-3xl font-semibold">About</h1>
          <p className="mt-4 max-w-2xl text-zinc-300 leading-relaxed">
            I’m <span className="text-zinc-100 font-medium">Your Name</span> — a frontend developer who builds
            fast, clean, and visually polished web experiences. I enjoy turning design into reliable UI systems,
            and adding small 3D/motion details that elevate the feel without hurting performance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Replace links */}
            <a
              href="/projects"
              className="rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700"
            >
              Download Resume
            </a>

          </div>
        </header>

        {/* Values */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold">How I work</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6"
              >
                <h3 className="text-base font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <div className="mt-6 space-y-4">
            {timeline.map((t) => (
              <div
                key={t.year}
                className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6"
              >
                <p className="text-xs text-zinc-400">{t.year}</p>
                <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Toolbox */}
        <section className="mt-14">
          <h2 className="text-xl font-semibold">Toolbox</h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            Tools I use to ship production-ready UI with performance and polish.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {toolbox.map((s) => (
              <span
                key={s}
                className="rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6">
          <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.10),transparent_60%)]" />
          <h2 className="text-xl font-semibold">Let’s build something clean and fast.</h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-300">
            If you’re hiring or building a product that needs strong UI engineering, I’d love to help.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
            >
              Contact me
            </a>
          </div>
        </section>
      </section>
    </PageTransition>
  );
}

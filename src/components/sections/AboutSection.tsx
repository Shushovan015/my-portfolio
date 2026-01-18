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
            <section id="about" className="py-16 scroll-mt-24">
                <header className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-start">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">About</h1>

                        <p className="mt-4 max-w-2xl text-zinc-300 leading-relaxed text-justify hyphens-auto">
                            I’m <span className="text-zinc-100 font-medium">Shushovan Shakya</span> — a frontend
                            developer with 4+ years of experience building scalable, high-performance web applications
                            using React, TypeScript, and modern frontend tooling. I focus on UI architecture, state
                            management, and performance optimization for data-intensive and visualization-heavy products.
                            I’m comfortable integrating REST APIs and working in agile teams. Currently completing an
                            M.Sc. in Software Systems in Germany.
                        </p>


                    </div>

                    <aside className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                            Profile Overview
                        </p>

                        <div className="mt-4 space-y-4 text-sm">
                            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                                <p className="text-zinc-400">Focus</p>
                                <p className="mt-1 text-zinc-200">Frontend Development • Data Visualization • Interaction Design</p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                                <p className="text-zinc-400">Primary stack</p>
                                <p className="mt-1 text-zinc-200">React • Next.js • TypeScript • Javascript</p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                                <p className="text-zinc-400">Currently</p>
                                <p className="mt-1 text-zinc-200">M.Sc. International Software System Science (Germany)</p>
                            </div>
                        </div>
                    </aside>
                </header>


                {/* <section className="mt-14">
                    <h2 className="text-xl font-semibold">How I work</h2>
                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
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
                </section> */}

                {/* <section className="mt-14">
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
                </section> */}

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

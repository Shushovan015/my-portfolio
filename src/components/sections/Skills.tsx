"use client";

import dynamic from "next/dynamic";

const SkillsConstellationCanvas = dynamic(
    () => import("@/components/three/SkillsConstellationCanvas"),
    { ssr: false }
);

const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Framer Motion",
    "Three.js / R3F",
    "Performance",
    "Accessibility",
    "UI Systems",
    "Animations",
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 scroll-mt-24">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Skills constellation</h2>
                    <p className="mt-4 max-w-xl text-zinc-300 leading-relaxed">
                        I focus on building interfaces that feel premium: clean UI, thoughtful motion, and fast loading.
                        The 3D details are light, accessible, and performance-first.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {skills.map((s) => (
                            <span
                                key={s}
                                className="rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative h-[360px] overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 md:h-[420px]">
                    <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.12),transparent_55%)]" />
                    <div className="absolute inset-0">
                        <SkillsConstellationCanvas />
                    </div>
                </div>
            </div>
        </section>
    );
}

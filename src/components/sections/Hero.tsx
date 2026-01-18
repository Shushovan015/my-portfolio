"use client";

import dynamic from "next/dynamic";

const PortraitParticlesCanvas = dynamic(
    () => import("@/components/three/PortraitParticlesCanvas"),
    { ssr: false }
);

export default function Hero() {
    return (
        <section id="home" className="py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                    <p className="text-sm text-zinc-400">Frontend Developer • Next.js • Motion • WebGL</p>

                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        I build fast, polished UIs.
                    </h1>

                    <p className="mt-5 max-w-xl text-zinc-300 leading-relaxed">
                        I combine clean engineering with motion and lightweight 3D to create interfaces that feel premium
                        and ship reliably.
                    </p>

                    <div className="mt-8 flex gap-3">
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
                    </div>
                </div>

                <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 md:h-[520px]">
                    {/* real photo (recognizable) */}
                    <div className="absolute inset-0">
                        <img
                            src="/me.jpg"
                            alt="Portrait"
                            className="h-full w-full object-cover opacity-85"
                        />
                        {/* darken slightly so particles + UI fit */}
                        <div className="absolute inset-0 bg-zinc-950/35" />
                    </div>

                    {/* subtle glow */}
                    <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.10),transparent_60%)]" />

                    {/* particles overlay */}
                    <div className="absolute inset-0">
                        <PortraitParticlesCanvas src="/me.jpg" />
                    </div>
                </div>
            </div>
        </section>
    );
}

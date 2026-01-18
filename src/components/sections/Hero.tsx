"use client";

import dynamic from "next/dynamic";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const PortraitParticlesCanvas = dynamic(
    () => import("@/components/three/PortraitParticlesCanvas"),
    { ssr: false }
);

export default function Hero() {
    return (
        <section id="home" className="py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                    <p className="text-sm text-zinc-400">Frontend Developer • Next.js • React.js • Vue.js</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        I build fast, polished UIs.
                    </h1>

                    <p className="mt-5 max-w-xl text-zinc-300 leading-relaxed">
                        I combine clean engineering with motion and lightweight 3D to create interfaces that feel premium
                        and ship reliably.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="/resume.pdf"
                            download
                            className="rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
                        >
                            Download Resume
                        </a>

                        <a
                            href="https://www.linkedin.com/in/shushovan-shakya/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700"
                        >
                            <FaLinkedin className="h-4 w-4" />
                            LinkedIn
                        </a>

                        <a
                            href="https://github.com/Shushovan015"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700"
                        >
                            <FaGithub className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>

                </div>

                <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 md:h-[520px]">
                    <div className="absolute inset-0">
                        <img
                            src="/me.jpg"
                            alt="Portrait"
                            className="h-full w-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-zinc-950/35" />
                    </div>

                    <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.10),transparent_60%)]" />

                    <div className="absolute inset-0">
                        <PortraitParticlesCanvas src="/me.jpg" />
                    </div>
                </div>
            </div>
        </section>
    );
}



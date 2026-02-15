"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const marqueeWords = [
    "Frontend Engineering",
    "Interaction Design",
    "Performance-First",
    "Creative Development",
    "Data Visualization",
];

export default function Hero() {
    return (
        <section id="home" className="pb-14">
            <p className="eyebrow">Berlin based frontend engineer</p>

            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">

                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    Building digital products that feel alive.
                </motion.h1>

                <motion.div
                    className="space-y-6 text-base leading-relaxed text-[var(--ink-soft)]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
                >
                    <p>
                        I design and build modern interfaces with strong motion language, clear hierarchy, and fast
                        performance.
                    </p>

                    <div className="rounded-2xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.45)] p-4">
                        <p className="eyebrow">Currently</p>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                            Open to frontend roles and available for full-time, contract, or freelance opportunities.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.08em]">
                                Berlin / Remote
                            </span>
                            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.08em]">
                                Open to Work
                            </span>
                            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.08em]">
                                Frontend + Data Viz
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] !text-white transition hover:bg-[#1a1a1a]"
                        >
                            View Work
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em]"
                        >
                            Contact
                        </a>
                    </div>
                </motion.div>
            </div>


            <div className="marquee mt-12 py-5">
                <div className="marquee-track">
                    {[0, 1].map((group) => (
                        <div key={group} className="marquee-group text-[10vw] font-semibold uppercase leading-none tracking-[-0.03em] sm:text-[8vw]">
                            {marqueeWords.map((word) => (
                                <span key={`${group}-${word}`} className="marquee-word">
                                    {word}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

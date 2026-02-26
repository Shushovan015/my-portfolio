"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, ShieldCheck, Sparkles, TerminalSquare } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import HeroOrbs from "@/components/ui/HeroOrbs";

const areas = ["Frontend Architecture", "Design Systems", "Data Visualization", "3D Interactions"];

const stats = [
    { label: "Experience", value: "4+ years", progress: 82 },
    { label: "Delivery", value: "Production-ready", progress: 91 },
    { label: "Focus", value: "Performance-first", progress: 88 },
];

const feed = [
    "Built a real-time crowd visualization dashboard by integrating React UI with Redis and MongoDB data pipelines.",
    "Implemented high-performance WebGL/Three.js interactions for browser-based 3D product tooling.",
    "Designed and shipped a municipal open-data interface that reduced manual workflows by 40% (~15 hours/week).",
];

export default function Hero() {
    const [activeStat, setActiveStat] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveStat((prev) => (prev + 1) % stats.length);
        }, 2200);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section id="home" className="screen-section relative overflow-hidden">
            <HeroOrbs />
            <div className="relative z-10">
                <p className="eyebrow">Frontend Engineer | React | Next.js | Data Visualization</p>
                <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.03fr_0.97fr]">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                        <h1 className="section-title">Frontend Engineer.</h1>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed muted">
                            I build scalable React/Next.js interfaces for geospatial systems, dashboards, and interactive data products with
                            strong performance and maintainable architecture.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {areas.map((item) => (
                                <span key={item} className="data-chip">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Magnetic className="inline-block">
                                <a href="#projects" data-cursor="Explore" className="cmd-btn primary">
                                    Explore Work
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </Magnetic>

                            <Magnetic className="inline-block">
                                <a href="#contact" data-cursor="Contact" className="cmd-btn">
                                    Contact
                                </a>
                            </Magnetic>
                        </div>
                    </motion.div>

                    <motion.article
                        className="pro-panel overflow-hidden"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.55 }}
                    >
                        <div className="panel-head">
                            <div className="panel-dots">
                                <span className="dot bg-[var(--accent-2)]" />
                                <span className="dot bg-[var(--accent)]" />
                                <span className="dot bg-[var(--ok)]" />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.1em] muted">System Overview</p>
                        </div>

                        <div className="space-y-5 p-5">
                            <div className="space-y-2 rounded-xl border border-[var(--line)] bg-[color:rgba(4,11,20,0.74)] p-4 font-mono text-xs muted">
                                {feed.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>

                            <div className="space-y-3">
                                {stats.map((item, index) => {
                                    const isActive = index === activeStat;
                                    return (
                                        <div
                                            key={item.label}
                                            className={`rounded-xl border border-[var(--line)] px-3 py-2.5 transition ${isActive ? "bg-[color:rgba(63,210,255,0.12)]" : "bg-[color:rgba(255,255,255,0.02)]"
                                                }`}
                                        >
                                            <div className="mb-2 flex items-center justify-between text-xs">
                                                <span className="font-mono uppercase tracking-[0.1em] muted">{item.label}</span>
                                                <span className="font-semibold">{item.value}</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-[color:rgba(255,255,255,0.08)]">
                                                <motion.div
                                                    className="h-1.5 rounded-full bg-[var(--accent)]"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.progress}%` }}
                                                    transition={{ duration: 0.8, delay: 0.1 + index * 0.08 }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="data-chip">
                                    <TerminalSquare className="mr-1 inline h-3.5 w-3.5" />
                                    Build Fast
                                </span>
                                <span className="data-chip">
                                    <Activity className="mr-1 inline h-3.5 w-3.5" />
                                    Measure Always
                                </span>
                                <span className="data-chip">
                                    <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
                                    Ship Clean
                                </span>
                                <span className="data-chip">
                                    <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                                    UX Quality
                                </span>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}

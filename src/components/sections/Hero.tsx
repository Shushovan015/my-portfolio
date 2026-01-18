"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [split, setSplit] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const splitRef = useRef(50);
    const targetRef = useRef(50);
    const rafRef = useRef<number | null>(null);

    const animateToTarget = () => {
        const current = splitRef.current;
        const target = targetRef.current;
        const next = current + (target - current) * 0.28;

        splitRef.current = next;
        setSplit(next);

        if (Math.abs(target - next) > 0.05) {
            rafRef.current = requestAnimationFrame(animateToTarget);
        } else {
            splitRef.current = target;
            setSplit(target);
            rafRef.current = null;
        }
    };

    const updateSplit = (value: number) => {
        splitRef.current = value;
        setSplit(value);
    };

    const setTarget = (value: number) => {
        targetRef.current = value;
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(animateToTarget);
        }
    };

    useEffect(() => {
        const handleMove = (event: PointerEvent) => {
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
            const percent = (x / rect.width) * 100;
            const rounded = Math.round(percent * 10) / 10;
            updateSplit(rounded);
        };

        const handleUp = () => {
            setIsDragging(false);
            targetRef.current = splitRef.current;
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
        window.addEventListener("pointercancel", handleUp);

        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
            window.removeEventListener("pointercancel", handleUp);
        };
    }, [isDragging]);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
        const percent = (x / rect.width) * 100;
        const rounded = Math.round(percent * 10) / 10;
        updateSplit(rounded);
        setTarget(rounded);
    };

    return (
        <section id="home" className="py-16 md:py-24">
            <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                    <p className="text-sm text-zinc-400">Frontend Developer - Next.js - React.js - Vue.js</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        I design and build high-performance web interfaces.
                    </h1>

                    <p className="mt-5 max-w-xl text-zinc-300 leading-relaxed">
                        Focused on frontend engineering, performance, and interaction design, with experience
                        in data visualization and modern UI systems.
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
                    <div
                        ref={containerRef}
                        className="relative h-full w-full select-none touch-none"
                        onPointerDown={handlePointerDown}
                    >
                        {/* Base SVG */}
                        <img
                            src="/me.svg"
                            alt="Vector portrait"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />

                        {/* JPG overlay clipped by drag */}
                        <img
                            src="/me.jpg"
                            alt="Photo portrait"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                            style={{
                                clipPath: `inset(0 ${100 - split}% 0 0)`,
                            }}
                        />

                        {/* Divider line */}
                        <div
                            className="absolute top-0 h-full w-[2px] bg-gradient-to-b from-white/10 via-white/90 to-white/10 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                            style={{ left: `${split}%` }}
                        />

                        {/* Drag handle */}
                        <button
                            type="button"
                            className="absolute top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-zinc-950/80 p-2 shadow-lg backdrop-blur"
                            style={{ left: `calc(${split}% - 18px)` }}
                            aria-label="Drag to compare"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M8 7L4 12L8 17"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 7L20 12L16 17"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import type { Project } from "@/content/projects";
import { useEffect, useState } from "react";

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300">
            {children}
        </span>
    );
}

export default function ProjectCard({ project }: { project: Project }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    return (
        <>
            <article
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6 transition-colors hover:border-zinc-700/70"
                onClick={() => setIsOpen(true)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setIsOpen(true);
                    }
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                {/* subtle hover glow */}
                <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.12),transparent_60%)]" />

                <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs text-zinc-400">
                                {project.year}
                                {project.role ? ` • ${project.role}` : ""}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight">
                                {project.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                                {project.summary}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            {project.links.live && (
                                <a
                                    className="rounded-xl border border-zinc-800 px-3 py-2 text-zinc-200 hover:border-zinc-700"
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Live ↗
                                </a>
                            )}
                            {project.links.github && (
                                <a
                                    className="rounded-xl border border-zinc-800 px-3 py-2 text-zinc-200 hover:border-zinc-700"
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    GitHub ↗
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                        ))}
                    </div>

                    {project.highlights?.length ? (
                        <ul className="mt-5 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                            {project.highlights.map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </article>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${project.title} details`}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-800/70 bg-zinc-950 p-6 text-zinc-200 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs text-zinc-400">
                                    {project.year}
                                    {project.role ? ` • ${project.role}` : ""}
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                                    {project.summary}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="rounded-xl border border-zinc-800 px-3 py-2 text-xs text-zinc-200 hover:border-zinc-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>

                        {project.cover ? (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800/70">
                                <img
                                    src={project.cover.src}
                                    alt={project.cover.alt}
                                    className="h-56 w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ) : null}

                        {project.caseStudy ? (
                            <div className="mt-6 space-y-5 text-sm text-zinc-300">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                                        Problem
                                    </p>
                                    <p className="mt-2 leading-relaxed">
                                        {project.caseStudy.problem}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                                        Approach
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        {project.caseStudy.approach.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-zinc-400">
                                        Outcome
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        {project.caseStudy.outcome.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : project.highlights?.length ? (
                            <div className="mt-6">
                                <p className="text-xs uppercase tracking-wide text-zinc-400">
                                    Highlights
                                </p>
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                                    {project.highlights.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.tags.map((t) => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2 text-sm">
                            {project.links.live && (
                                <a
                                    className="rounded-xl border border-zinc-800 px-3 py-2 text-zinc-200 hover:border-zinc-700"
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Live ↗
                                </a>
                            )}
                            {project.links.github && (
                                <a
                                    className="rounded-xl border border-zinc-800 px-3 py-2 text-zinc-200 hover:border-zinc-700"
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "@/content/projects";

type ProjectItem = (typeof projects)[number];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeProject]);

  return (
    <section id="projects" className="section-wrap">
      <header className="max-w-4xl">
        <p className="eyebrow">Selected work</p>
        <h2 className="section-title mt-3">Projects</h2>
        <p className="mt-6 text-base leading-relaxed text-[var(--ink-soft)]">
          A curated set of frontend and visualization projects. Click any card to open full details, cover image, approach, and outcomes.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setActiveProject(project)}
            className="project-card group h-full rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.35)] p-6 text-left transition hover:-translate-y-0.5 hover:bg-[color:rgba(235,230,216,0.62)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <span className="text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)]">{project.year}</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{project.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={`${project.slug}-${tag}`}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.07em]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
              View details
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        ))}
      </div>

      {activeProject ? (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/55 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <div className="mx-auto my-4 w-full max-w-4xl rounded-3xl border border-[var(--line)] bg-[var(--bg)] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="modal-scroll max-h-[calc(100vh-4rem)] overflow-y-auto p-5 sm:max-h-[calc(100vh-6rem)] sm:p-7">
              <div className="mb-4 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
                <div>
                  <p className="eyebrow">Project details</p>
                  <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{activeProject.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">
                    {activeProject.year}
                    {activeProject.role ? ` - ${activeProject.role}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)]"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {activeProject.cover ? (
                <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--line)]">
                  <Image src={activeProject.cover.src} alt={activeProject.cover.alt} fill className="object-cover" />
                </div>
              ) : null}

              <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">{activeProject.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={`${activeProject.slug}-modal-${tag}`}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] uppercase tracking-[0.07em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeProject.highlights?.length ? (
                <div className="mt-7">
                  <p className="eyebrow">Highlights</p>
                  <ul className="mt-3 space-y-2">
                    {activeProject.highlights.map((item, index) => (
                      <li
                        key={`${activeProject.slug}-h-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[color:rgba(244,241,232,0.72)] px-3 py-2.5"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]/70" />
                        <span className="text-sm leading-relaxed text-[var(--ink-soft)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {activeProject.caseStudy?.problem ? (
                <div className="mt-7">
                  <p className="eyebrow">Problem</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{activeProject.caseStudy.problem}</p>
                </div>
              ) : null}

              {activeProject.caseStudy?.approach?.length ? (
                <div className="mt-7">
                  <p className="eyebrow">Approach</p>
                  <ul className="mt-3 space-y-2">
                    {activeProject.caseStudy.approach.map((item, index) => (
                      <li
                        key={`${activeProject.slug}-a-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[color:rgba(244,241,232,0.72)] px-3 py-2.5"
                      >
                        <span className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--line)] text-[10px] font-semibold text-[var(--ink-soft)]">
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-[var(--ink-soft)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {activeProject.caseStudy?.outcome?.length ? (
                <div className="mt-7">
                  <p className="eyebrow">Outcome</p>
                  <ul className="mt-3 space-y-2">
                    {activeProject.caseStudy.outcome.map((item, index) => (
                      <li
                        key={`${activeProject.slug}-o-${index}`}
                        className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[color:rgba(244,241,232,0.72)] px-3 py-2.5"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]/70" />
                        <span className="text-sm leading-relaxed text-[var(--ink-soft)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                {activeProject.links.live ? (
                  <a href={activeProject.links.live} target="_blank" rel="noreferrer" className="pill">
                    Live
                  </a>
                ) : null}
                {activeProject.links.github ? (
                  <a href={activeProject.links.github} target="_blank" rel="noreferrer" className="pill">
                    GitHub
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

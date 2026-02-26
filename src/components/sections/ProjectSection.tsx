"use client";

import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { projects } from "@/content/projects";
import CountUp from "@/components/ui/CountUp";

type ProjectItem = (typeof projects)[number];
type Filter = "All" | "Frontend" | "Data Viz" | "3D" | "Geospatial";

const filters: Filter[] = ["All", "Frontend", "Data Viz", "3D", "Geospatial"];

function matchesFilter(project: ProjectItem, filter: Filter) {
  if (filter === "All") return true;

  const tags = project.tags.map((tag) => tag.toLowerCase());

  if (filter === "Frontend") {
    return tags.some((tag) => ["react", "next.js", "typescript", "javascript", "ui"].includes(tag));
  }

  if (filter === "Data Viz") {
    return tags.some((tag) => ["d3.js", "visualization", "crowd analytics", "data visualization"].includes(tag));
  }

  if (filter === "3D") {
    return tags.some((tag) => ["three.js", "webgl", "3d"].includes(tag));
  }

  if (filter === "Geospatial") {
    return tags.some((tag) => ["openlayers", "geospatial", "gis", "urban planning"].includes(tag));
  }

  return true;
}

const updateSpotlight = (event: MouseEvent<HTMLButtonElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

const resetSpotlight = (event: MouseEvent<HTMLButtonElement>) => {
  event.currentTarget.style.setProperty("--mx", "50%");
  event.currentTarget.style.setProperty("--my", "50%");
};

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(() => projects.filter((project) => matchesFilter(project, activeFilter)), [activeFilter]);

  const metrics = useMemo(
    () => [
      { label: "Projects Shipped", value: projects.length, suffix: "+" },
      { label: "Live Deployments", value: projects.filter((p) => Boolean(p.links.live)).length, suffix: "" },
      // { label: "GitHub Cases", value: projects.filter((p) => Boolean(p.links.github)).length, suffix: "" },
      {
        label: "Tech Tags",
        value: new Set(projects.flatMap((p) => p.tags.map((t) => t.toLowerCase()))).size,
        suffix: "+",
      },
    ],
    []
  );

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
        <p className="eyebrow">Selected Work</p>
        <h2 className="section-title mt-3">Project Library</h2>
        <p className="mt-6 text-base leading-relaxed muted">
          Case studies with problem context, technical decisions, implementation details, and measurable outcomes.
        </p>
      </header>

      <div className="mt-6 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
        {metrics.map((metric) => (
          <article key={metric.label} className="pro-panel px-4 py-3">
            <p className="text-2xl font-semibold">
              <CountUp value={metric.value} suffix={metric.suffix} />
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] muted">
              {metric.label}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            data-cursor="Filter"
            onClick={() => setActiveFilter(filter)}
            className={`data-chip transition ${activeFilter === filter
              ? "border-[rgba(63,210,255,0.72)] bg-[color:rgba(63,210,255,0.12)] text-[var(--ink)]"
              : "hover:border-[rgba(63,210,255,0.42)]"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="mt-8 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.button
                key={project.slug}
                layout
                type="button"
                data-cursor="Open Case"
                onClick={() => setActiveProject(project)}
                onMouseMove={updateSpotlight}
                onMouseLeave={resetSpotlight}
                style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
                className="project-card spotlight-card pro-panel group flex h-full min-h-[520px] flex-col overflow-hidden p-0 text-left"
                initial={{ opacity: 0, y: 22, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.34, delay: index * 0.04 } }}
                exit={{ opacity: 0, y: 14, scale: 0.975, transition: { duration: 0.22 } }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.992 }}
              >
                <div className="panel-head">
                  <div className="panel-dots">
                    <span className="dot bg-[var(--accent-2)]" />
                    <span className="dot bg-[var(--accent)]" />
                    <span className="dot bg-[var(--ok)]" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] muted">{project.year}</span>
                </div>

                <motion.div
                  layoutId={`project-image-${project.slug}`}
                  className="relative aspect-[16/9] w-full border-b border-[var(--line)]"
                >
                  {project.cover?.src ? (
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[color:rgba(255,255,255,0.03)] font-mono text-xs uppercase tracking-[0.1em] muted">
                      Preview coming soon
                    </div>
                  )}
                </motion.div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <motion.h3 layoutId={`project-title-${project.slug}`} className="min-h-[3.5rem] text-xl font-semibold">
                      {project.title}
                    </motion.h3>
                    {project.role ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] muted">{project.role}</span>
                    ) : null}
                  </div>

                  <p className="min-h-[4.5rem] text-sm leading-relaxed muted">{project.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={`${project.slug}-${tag}`} className="card-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 ? (
                      <span className="card-tag card-tag-muted">+{project.tags.length - 3}</span>
                    ) : null}
                  </div>

                  <div className="mt-auto pt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
                    View Case
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.button>
            ))}

          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[120] overflow-y-auto bg-black/72 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setActiveProject(null);
            }}
          >
            <motion.div
              className="mx-auto my-4 w-full max-w-4xl pro-panel overflow-hidden"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{ duration: 0.26 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="panel-head">
                <div className="panel-dots">
                  <span className="dot bg-[var(--accent-2)]" />
                  <span className="dot bg-[var(--accent)]" />
                  <span className="dot bg-[var(--ok)]" />
                </div>

                <button
                  type="button"
                  data-cursor="Close"
                  onClick={() => setActiveProject(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[color:rgba(255,255,255,0.03)]"
                  aria-label="Close popup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="modal-scroll max-h-[calc(100vh-7rem)] overflow-y-auto p-5 sm:p-7">
                <p className="eyebrow">Case Study</p>
                <motion.h3 layoutId={`project-title-${activeProject.slug}`} className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {activeProject.title}
                </motion.h3>
                <p className="mt-2 text-sm muted">
                  {activeProject.year}
                  {activeProject.role ? ` | ${activeProject.role}` : ""}
                </p>

                {activeProject.cover ? (
                  <motion.div layoutId={`project-image-${activeProject.slug}`} className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line)]">
                    <Image src={activeProject.cover.src} alt={activeProject.cover.alt} fill className="object-cover" />
                  </motion.div>
                ) : null}

                <p className="mt-5 text-sm leading-relaxed muted">{activeProject.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span key={`${activeProject.slug}-modal-${tag}`} className="data-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {activeProject.highlights?.length ? (
                  <div className="mt-7">
                    <p className="eyebrow">Highlights</p>
                    <ul className="mt-3 space-y-2">
                      {activeProject.highlights.map((item, index) => (
                        <li key={`${activeProject.slug}-h-${index}`} className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeProject.caseStudy?.problem ? (
                  <div className="mt-7">
                    <p className="eyebrow">Problem</p>
                    <p className="mt-3 text-sm leading-relaxed muted">{activeProject.caseStudy.problem}</p>
                  </div>
                ) : null}

                {activeProject.caseStudy?.approach?.length ? (
                  <div className="mt-7">
                    <p className="eyebrow">Approach</p>
                    <ul className="mt-3 space-y-2">
                      {activeProject.caseStudy.approach.map((item, index) => (
                        <li key={`${activeProject.slug}-a-${index}`} className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted">
                          <span className="mr-2 font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}.</span>
                          {item}
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
                        <li key={`${activeProject.slug}-o-${index}`} className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  {activeProject.links.live ? (
                    <a href={activeProject.links.live} target="_blank" rel="noreferrer" data-cursor="Visit" className="cmd-btn primary">
                      Live Project
                    </a>
                  ) : null}
                  {activeProject.links.github ? (
                    <a href={activeProject.links.github} target="_blank" rel="noreferrer" data-cursor="Source" className="cmd-btn">
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

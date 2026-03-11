"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
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

function ProjectCardMedia({
  project,
  isActive,
  isTouchLike,
}: {
  project: ProjectItem;
  isActive: boolean;
  isTouchLike: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [index, setIndex] = useState(0);

  const previews = project.previewMedia ?? [];
  const hasPreview = previews.length > 0;
  const current = hasPreview ? previews[index] : null;

  const next = () => {
    if (previews.length <= 1) return;
    setIndex((prev) => (prev + 1) % previews.length);
  };

  useEffect(() => {
    if (!isActive) {
      setIndex(0);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive, project.slug]);

  useEffect(() => {
    if (!isActive || !current) return;

    if (current.kind === "video" && videoRef.current) {
      void videoRef.current.play().catch(() => { });
      return;
    }

    if (current.kind === "gif" && previews.length > 1) {
      const id = window.setTimeout(next, current.durationMs ?? 1600);
      return () => window.clearTimeout(id);
    }
  }, [isActive, current, previews.length]);

  if (!project.cover?.src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[color:rgba(255,255,255,0.03)] font-mono text-xs uppercase tracking-[0.1em] muted">
        Preview coming soon
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--line)]">
      <Image
        src={project.cover.src}
        alt={project.cover.alt || project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition duration-500 ${hasPreview ? (isActive ? "opacity-0" : "opacity-100 group-hover:scale-[1.03]") : "group-hover:scale-[1.03]"
          }`}
      />

      {hasPreview && current
        ? current.kind === "video"
          ? (
            <video
              key={current.src}
              ref={videoRef}
              src={current.src}
              poster={current.poster || project.cover.src}
              muted
              playsInline
              preload="metadata"
              loop={previews.length === 1}
              onEnded={next}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
                }`}
            />
          )
          : (
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt || `${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`absolute inset-0 object-cover transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
                }`}
            />
          )
        : null}

      {hasPreview ? (
        <span className="absolute bottom-2 left-2 rounded-full border border-[var(--line)] bg-[rgba(11,23,40,0.82)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink)]">
          {isTouchLike ? "Tap to preview" : "Hover to preview"} {previews.length > 1 ? `(${index + 1}/${previews.length})` : ""}
        </span>
      ) : null}
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [tapPreviewSlug, setTapPreviewSlug] = useState<string | null>(null);
  const [isTouchLike, setIsTouchLike] = useState(false);

  const [modalPreviewIndex, setModalPreviewIndex] = useState<number | null>(null);

  const modalPreviews = activeProject?.previewMedia ?? [];
  const modalCurrentPreview =
    modalPreviewIndex === null ? null : (modalPreviews[modalPreviewIndex] ?? null);

  const filteredProjects = useMemo(() => projects.filter((project) => matchesFilter(project, activeFilter)), [activeFilter]);

  const metrics = useMemo(
    () => [
      { label: "Projects Shipped", value: projects.length, suffix: "+" },
      { label: "Live Deployments", value: projects.filter((p) => Boolean(p.links.live)).length, suffix: "" },
      {
        label: "Tech Tags",
        value: new Set(projects.flatMap((p) => p.tags.map((t) => t.toLowerCase()))).size,
        suffix: "+",
      },
    ],
    []
  );

  useEffect(() => {
    if (activeProject && modalPreviews.length > 0) {
      setModalPreviewIndex(0);
      return;
    }
    setModalPreviewIndex(null);
  }, [activeProject?.slug, modalPreviews.length]);

  const advanceModalPreview = () => {
    setModalPreviewIndex((prev) => {
      if (prev === null) return null;
      const next = prev + 1;
      return next < modalPreviews.length ? next : null; // finished -> show cover
    });
  };

  useEffect(() => {
    if (!activeProject || !modalCurrentPreview) return;
    if (modalCurrentPreview.kind !== "gif") return;

    const id = window.setTimeout(() => {
      advanceModalPreview();
    }, modalCurrentPreview.durationMs ?? 1600);

    return () => window.clearTimeout(id);
  }, [activeProject, modalCurrentPreview]);


  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouchLike(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setHoveredSlug(null);
    setTapPreviewSlug(null);
  }, [activeFilter, activeProject]);

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
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] muted">{metric.label}</p>
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
            {filteredProjects.map((project, index) => {
              const hasPreview = (project.previewMedia?.length ?? 0) > 0;
              const isPreviewActive = hoveredSlug === project.slug || tapPreviewSlug === project.slug;

              return (
                <motion.button
                  key={project.slug}
                  layout
                  type="button"
                  data-cursor="Open Case"
                  onClick={() => {
                    if (isTouchLike && hasPreview && tapPreviewSlug !== project.slug) {
                      setTapPreviewSlug(project.slug);
                      return;
                    }
                    setTapPreviewSlug(null);
                    setActiveProject(project);
                  }}
                  onMouseEnter={() => {
                    if (!isTouchLike) setHoveredSlug(project.slug);
                  }}
                  onFocus={() => {
                    if (!isTouchLike) setHoveredSlug(project.slug);
                  }}
                  onMouseMove={updateSpotlight}
                  onMouseLeave={(event) => {
                    resetSpotlight(event);
                    if (!isTouchLike) {
                      setHoveredSlug((prev) => (prev === project.slug ? null : prev));
                    }
                  }}
                  onBlur={() => {
                    if (!isTouchLike) {
                      setHoveredSlug((prev) => (prev === project.slug ? null : prev));
                    }
                  }}
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

                  <motion.div layoutId={`project-image-${project.slug}`}>
                    <ProjectCardMedia project={project} isActive={isPreviewActive} isTouchLike={isTouchLike} />
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
                      {project.tags.length > 3 ? <span className="card-tag card-tag-muted">+{project.tags.length - 3}</span> : null}
                    </div>

                    <div className="mt-auto inline-flex items-center gap-2 pt-4 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
                      View Case
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
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
              className="mx-auto my-4 w-full max-w-4xl overflow-hidden pro-panel"
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

                {modalCurrentPreview ? (
                  <motion.div
                    layoutId={`project-image-${activeProject.slug}`}
                    className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-black"
                  >
                    {modalCurrentPreview.kind === "video" ? (
                      <video
                        key={modalCurrentPreview.src}
                        src={modalCurrentPreview.src}
                        poster={modalCurrentPreview.poster || activeProject.cover?.src}
                        autoPlay
                        muted
                        playsInline
                        // controls
                        preload="metadata"
                        onEnded={advanceModalPreview}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                        onContextMenu={(event) => event.preventDefault()}
                        className="h-full w-full object-cover pointer-events-none select-none"
                      />
                    ) : (
                      <Image
                        key={modalCurrentPreview.src}
                        src={modalCurrentPreview.src}
                        alt={modalCurrentPreview.alt || activeProject.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </motion.div>
                ) : activeProject.cover ? (
                  <motion.div
                    layoutId={`project-image-${activeProject.slug}`}
                    className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line)]"
                  >
                    <Image src={activeProject.cover.src} alt={activeProject.cover.alt} fill className="object-cover" />
                  </motion.div>
                ) : null}

                {/* {modalCurrentPreview ? (
                  <motion.div
                    layoutId={`project-image-${activeProject.slug}`}
                    className="relative mt-5 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-black"
                  >
                    <div className="relative h-[min(70vh,560px)] w-full">
                      {modalCurrentPreview.kind === "video" ? (
                        <video
                          key={modalCurrentPreview.src}
                          src={modalCurrentPreview.src}
                          poster={modalCurrentPreview.poster || activeProject.cover?.src}
                          autoPlay
                          muted
                          playsInline
                          preload="metadata"
                          onEnded={advanceModalPreview}
                          disablePictureInPicture
                          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                          onContextMenu={(event) => event.preventDefault()}
                          className="h-full w-full object-contain pointer-events-none select-none"
                        />
                      ) : (
                        <Image
                          key={modalCurrentPreview.src}
                          src={modalCurrentPreview.src}
                          alt={modalCurrentPreview.alt || activeProject.title}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </motion.div>
                ) : activeProject.cover ? (
                  <motion.div
                    layoutId={`project-image-${activeProject.slug}`}
                    className="relative mt-5 w-full overflow-hidden rounded-xl border border-[var(--line)] bg-black"
                  >
                    <div className="relative h-[min(70vh,560px)] w-full">
                      <Image src={activeProject.cover.src} alt={activeProject.cover.alt} fill className="object-contain" />
                    </div>
                  </motion.div>
                ) : null} */}


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
                      {activeProject.highlights.map((item, itemIndex) => (
                        <li
                          key={`${activeProject.slug}-h-${itemIndex}`}
                          className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted"
                        >
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
                      {activeProject.caseStudy.approach.map((item, itemIndex) => (
                        <li
                          key={`${activeProject.slug}-a-${itemIndex}`}
                          className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted"
                        >
                          <span className="mr-2 font-mono text-xs text-[var(--accent)]">
                            {String(itemIndex + 1).padStart(2, "0")}.
                          </span>
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
                      {activeProject.caseStudy.outcome.map((item, itemIndex) => (
                        <li
                          key={`${activeProject.slug}-o-${itemIndex}`}
                          className="rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5 text-sm leading-relaxed muted"
                        >
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

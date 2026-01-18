import Link from "next/link";
import type { Project } from "@/content/projects";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6 transition-colors hover:border-zinc-700/70">
      {/* subtle hover glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(120,120,255,0.12),transparent_60%)]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-400">{project.year}{project.role ? ` • ${project.role}` : ""}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{project.summary}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
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

        {/* internal case study link placeholder (we’ll create pages next step) */}
        <div className="mt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-200 hover:text-white"
          >
            Read case study <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

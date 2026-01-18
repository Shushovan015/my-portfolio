import ProjectCard from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 2);

  return (
    <section className="pb-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Featured work</h2>
          <p className="mt-3 max-w-2xl text-zinc-300">
            A couple projects that represent my current taste: clean UI, strong UX, and real performance.
          </p>
        </div>

        <a
          href="/projects"
          className="hidden rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700 md:inline-flex"
        >
          View all
        </a>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <a
          href="/projects"
          className="inline-flex rounded-2xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-100 hover:border-zinc-700"
        >
          View all projects
        </a>
      </div>
    </section>
  );
}

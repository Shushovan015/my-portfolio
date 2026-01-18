import PageTransition from "@/components/ui/PageTransition";
import ProjectCard from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

export default function ProjectsSection() {
  return (
    <PageTransition>
      <section id="projects" className="py-16 scroll-mt-24">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          A selection of work focused on performance, polish, and user experience.
          Click a project to read the case study.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

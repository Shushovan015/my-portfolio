import type { IconType } from "react-icons";
import {
  SiCss3,
  SiD3Dotjs,
  SiDocker,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";
import { BiGitBranch } from "react-icons/bi";
import { TbApi, TbMap2, TbAccessible  } from "react-icons/tb";

type SkillLevel = "Intermediate" | "Proficient" | "Learning";

type Skill = {
  name: string;
  Icon: IconType;
  level: SkillLevel;
};

type SkillGroup = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

const groups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    subtitle: "Core UI stack and state management",
    skills: [
      { name: "React", Icon: SiReact, level: "Intermediate" },
      { name: "Next.js", Icon: SiNextdotjs, level: "Proficient" },
      { name: "JavaScript", Icon: SiJavascript, level: "Intermediate" },
      { name: "TypeScript", Icon: SiTypescript, level: "Proficient" },
      { name: "Redux", Icon: SiRedux, level: "Intermediate" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, level: "Intermediate" },
    //   { name: "HTML5", Icon: SiHtml5, level: "Intermediate" },
    //   { name: "CSS3", Icon: SiCss3, level: "Intermediate" },
    ],
  },
  {
    title: "Visualization & Motion",
    subtitle: "Interactive UI, animation, and map tooling",
    skills: [
      { name: "Framer Motion", Icon: SiFramer, level: "Intermediate" },
      { name: "Three.js", Icon: SiThreedotjs, level: "Proficient" },
      { name: "D3.js", Icon: SiD3Dotjs, level: "Proficient" },
      { name: "OpenLayers", Icon: TbMap2, level: "Proficient" },
    ],
  },
  {
    title: "Backend & Integration",
    subtitle: "API integration and scripting",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, level: "Proficient" },
      { name: "Python", Icon: SiPython, level: "Proficient" },
      { name: "REST APIs", Icon: TbApi, level: "Intermediate" },
    ],
  },
  {
    title: "Tooling & Workflow",
    subtitle: "Delivery, quality, and collaboration",
    skills: [
      { name: "Git", Icon: SiGit, level: "Intermediate" },
      { name: "GitHub", Icon: SiGithub, level: "Intermediate" },
      { name: "GitLab CI", Icon: SiGitlab, level: "Proficient" },
      { name: "Docker", Icon: SiDocker, level: "Proficient" },
      { name: "Webpack", Icon: SiWebpack, level: "Proficient" },
      { name: "CI/CD", Icon: BiGitBranch, level: "Proficient" },
    //   { name: "Accessibility", Icon: TbAccessible , level: "Proficient" },
    ],
  },
];

const levelClass: Record<SkillLevel, string> = {
  Intermediate: "bg-[color:rgba(19,18,15,0.07)] text-[var(--ink)]",
  Proficient: "bg-[color:rgba(229,95,43,0.10)] text-[var(--ink)]",
  Learning: "bg-[color:rgba(31,92,110,0.10)] text-[var(--ink)]",
};

function SkillRow({ skill }: { skill: Skill }) {
  const Icon = skill.Icon;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[color:rgba(244,241,232,0.72)] px-3 py-2.5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)]">
          <Icon className="h-4 w-4 text-[var(--ink)]" />
        </div>
        <span className="text-sm font-medium">{skill.name}</span>
      </div>

      <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] ${levelClass[skill.level]}`}>
        {skill.level}
      </span>
    </div>
  );
}

export default function ToolsGrid() {
  return (
    <section id="skills" className="section-wrap">
      <header className="max-w-4xl">
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title mt-3">Skills</h2>
        <p className="mt-6 text-base leading-relaxed text-[var(--ink-soft)]">
          Practical stack I use to build production-ready interfaces and data-driven web apps.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <article
            key={group.title}
            className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.40)] p-5"
          >
            <div className="mb-4 border-b border-[var(--line)] pb-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{group.subtitle}</p>
            </div>

            <div className="space-y-2.5">
              {group.skills.map((skill) => (
                <SkillRow key={`${group.title}-${skill.name}`} skill={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

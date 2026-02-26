import type { IconType } from "react-icons";
import {
  SiD3Dotjs,
  SiDocker,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
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
import { TbApi, TbMap2 } from "react-icons/tb";

type Skill = {
  name: string;
  Icon: IconType;
};

type SkillGroup = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

const groups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    subtitle: "UI architecture and product interfaces",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Redux", Icon: SiRedux },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    title: "Visualization & Interaction",
    subtitle: "Data storytelling and advanced interaction",
    skills: [
      { name: "D3.js", Icon: SiD3Dotjs },
      { name: "OpenLayers", Icon: TbMap2 },
      { name: "Three.js", Icon: SiThreedotjs },
      { name: "Framer Motion", Icon: SiFramer },
    ],
  },
  {
    title: "Backend Integration",
    subtitle: "APIs, services, and data flow",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Python", Icon: SiPython },
      { name: "REST APIs", Icon: TbApi },
    ],
  },
  {
    title: "Tooling & Delivery",
    subtitle: "Versioning, CI/CD, and deployment workflow",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "GitLab CI", Icon: SiGitlab },
      { name: "Docker", Icon: SiDocker },
      { name: "Webpack", Icon: SiWebpack },
      { name: "CI/CD", Icon: BiGitBranch },
    ],
  },
];

function SkillRow({ skill }: { skill: Skill }) {
  const Icon = skill.Icon;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[color:rgba(255,255,255,0.02)] px-3 py-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[color:rgba(255,255,255,0.03)]">
        <Icon className="h-4 w-4 text-[var(--ink)]" />
      </div>
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
}

export default function ToolsGrid() {
  return (
    <section id="skills" className="section-wrap screen-section">
      <header className="max-w-4xl">
        <p className="eyebrow">Technical Profile</p>
        <h2 className="section-title mt-3">Technical Stack</h2>
        <p className="mt-6 text-base leading-relaxed muted">
          Production-focused technologies I use to design, build, and ship frontend systems.
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <article key={group.title} className="pro-panel p-5">
            <div className="mb-4 border-b border-[var(--line)] pb-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm muted">{group.subtitle}</p>
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

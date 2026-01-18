import {
    SiNextdotjs,
    SiReact,
    SiVuedotjs,
    SiAngular,
    SiTypescript,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiMui,
    SiWebpack,
    SiRedux,
    SiD3Dotjs,
    SiThreedotjs,
    SiNodedotjs,
    SiGit,
    SiGitlab,
    SiGithub,
    SiDocker,
    SiEslint,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";
import { BiGitBranch } from "react-icons/bi";
import type { IconType } from "react-icons";

type SkillKey = keyof typeof iconByName;

const iconByName = {
    "React.js": SiReact,
    "Next.js": SiNextdotjs,
    "Vue.js": SiVuedotjs,
    Angular: SiAngular,
    TypeScript: SiTypescript,
    "JavaScript (ES6+)": SiJavascript,
    HTML5: SiHtml5,
    CSS3: SiCss3,
    "Tailwind CSS": SiTailwindcss,
    "Material UI": SiMui,
    Webpack: SiWebpack,

    Redux: SiRedux,
    "Redux-Saga": SiRedux,

    "D3.js": SiD3Dotjs,
    "Three.js": SiThreedotjs,
    WebGL: SiThreedotjs,
    OpenLayers: TbApi,

    "Node.js": SiNodedotjs,
    "REST APIs": TbApi,

    Git: SiGit,
    GitHub: SiGithub,
    "GitLab CI": SiGitlab,
    Docker: SiDocker,
    "CI/CD": BiGitBranch,
    "ES-Lint": SiEslint,

    "Agile Development": BiGitBranch,
    Scrum: BiGitBranch,
    Kanban: BiGitBranch,
} as const satisfies Record<string, IconType>;

const categories: { title: string; items: SkillKey[] }[] = [
    {
        title: "Frontend Engineering",
        items: [
            "React.js",
            "Next.js",
            "Vue.js",
            "TypeScript",
            "Angular",
            "JavaScript (ES6+)",
            "HTML5",
            "CSS3",
            "Material UI",
            "Webpack",
            "Tailwind CSS",
        ],
    },
    { title: "State Management", items: ["Redux", "Redux-Saga"] },
    {
        title: "Data Visualization",
        items: ["D3.js", "Three.js", "WebGL", "OpenLayers"],
    },
    { title: "Backend & Integration", items: ["Node.js", "REST APIs"] },
    {
        title: "Tooling",
        items: ["Git", "GitLab CI", "Docker", "CI/CD", "ES-Lint", "GitHub"],
    },
    { title: "Methods", items: ["Agile Development", "Scrum", "Kanban"] },
];

function SkillCard({ name, Icon }: { name: string; Icon: IconType }) {
    return (
        <div className="group flex items-center gap-3 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-4 hover:border-zinc-700/70 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/30">
                <Icon className="h-5 w-5 text-zinc-200" />
            </div>
            <p className="text-sm font-medium text-zinc-100">{name}</p>
        </div>
    );
}

export default function SkillsWithIcons() {
    return (
        <section id="skills" className="py-20 scroll-mt-24">
            <h2 className="text-2xl font-semibold tracking-tight">Technical Skills</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
                A categorized snapshot of the technologies and methods I use to ship production work.
            </p>

            <div className="mt-10 space-y-10">
                {categories.map((cat) => (
                    <div key={cat.title}>
                        <h3 className="relative pl-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                            <span className="absolute left-0 top-0 h-full w-[2px] rounded-full bg-zinc-600" />
                            {cat.title}
                        </h3>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {cat.items.map((name) => {
                                const Icon = iconByName[name];
                                return <SkillCard key={name} name={name} Icon={Icon} />;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si";

const tools = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Vercel", Icon: SiVercel },
  { name: "Figma", Icon: SiFigma },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="py-20">
      <h2 className="text-2xl font-semibold tracking-tight">Tools I use</h2>
      <p className="mt-3 max-w-2xl text-zinc-300">
        The stack I’m confident shipping with — from UI engineering to motion and 3D.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tools.map(({ name, Icon }) => (
          <div
            key={name}
            className="group flex items-center gap-3 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-4 hover:border-zinc-700/70 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800/70 bg-zinc-950/30">
              <Icon className="h-5 w-5 text-zinc-200" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-100">{name}</p>
              <p className="text-xs text-zinc-400">Production use</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

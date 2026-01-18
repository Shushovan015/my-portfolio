export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/60 py-10 text-sm text-zinc-400">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <p>© {new Date().getFullYear()} My Portfolio</p>
        <p className="text-zinc-500">Built with Next.js + Three.js</p>
      </div>
    </footer>
  );
}

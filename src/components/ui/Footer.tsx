export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 font-mono text-xs uppercase tracking-[0.08em] muted sm:px-8">
        <p>(c) {new Date().getFullYear()} Shushovan Shakya</p>
        <p>Frontend Engineer Portfolio</p>
      </div>
    </footer>
  );
}

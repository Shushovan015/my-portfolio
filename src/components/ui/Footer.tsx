export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 text-xs uppercase tracking-[0.08em] text-[var(--ink-soft)] sm:px-8">
        <p>© {new Date().getFullYear()} Shushovan Shakya</p>
        <p>Next.js Portfolio</p>
      </div>
    </footer>
  );
}

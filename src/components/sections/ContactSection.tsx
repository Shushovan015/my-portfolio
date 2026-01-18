"use client";

import PageTransition from "@/components/ui/PageTransition";
import { useMemo, useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // TODO: replace with YOUR email
  const yourEmail = "you@example.com";

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "Someone"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}\n\n— Sent from my portfolio`
    );
    return `mailto:${yourEmail}?subject=${subject}&body=${body}`;
  }, [name, email, message, yourEmail]);

  return (
    <PageTransition>
      <section id="contact" className="py-16">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Want to work together? Send a message — I usually reply within 24–48 hours.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Form */}
          <section className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <p className="mt-2 text-sm text-zinc-400">
              This form opens your email app so it works everywhere (no backend needed).
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-zinc-300">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="text-sm text-zinc-300">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what you’re building and what you need help with…"
                  rows={6}
                  className="mt-2 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
                />
              </div>

              <a
                href={mailto}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 hover:bg-white"
              >
                Open email draft ↗
              </a>

              <p className="text-xs text-zinc-500">
                Prefer direct email?{" "}
                <a className="underline hover:text-zinc-300" href={`mailto:${yourEmail}`}>
                  {yourEmail}
                </a>
              </p>
            </div>
          </section>

          {/* Info */}
          <section className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6">
            <h2 className="text-lg font-semibold">Details</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Add your real links here — it boosts trust.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                <p className="text-zinc-400">Location</p>
                <p className="mt-1 text-zinc-200">Your City (Remote friendly)</p>
              </div>

              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                <p className="text-zinc-400">Links</p>
                <div className="mt-2 flex flex-col gap-2">
                  <a className="text-zinc-200 hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <a className="text-zinc-200 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                  <a className="text-zinc-200 hover:text-white" href="/projects">
                    Projects →
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/30 p-4">
                <p className="text-zinc-400">What I’m open to</p>
                <p className="mt-1 text-zinc-200">
                  Frontend roles • Creative dev • UI engineering • WebGL experiments
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </PageTransition>
  );
}

"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(serviceId, templateId, { name, email, message }, publicKey);

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="section-wrap">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Let us talk</p>
          <h2 className="section-title mt-3">Contact</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
            Open to frontend roles, product collaborations, and creative web projects.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
            <a href="mailto:shushovanshakya015@gmail.com">shushovanshakya015@gmail.com</a>
            <a href="https://www.linkedin.com/in/shushovan-shakya/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Shushovan015" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[var(--line)] bg-[color:rgba(235,230,216,0.45)] p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)]">Name</label>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--ink)]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)]">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--ink)]"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs uppercase tracking-[0.1em] text-[var(--ink-soft)]">Message</label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--ink)]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 inline-flex rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--bg)] disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" ? <p className="mt-3 text-sm text-emerald-700">Message sent successfully.</p> : null}
          {status === "error" ? <p className="mt-3 text-sm text-red-700">{errorText}</p> : null}
        </form>
      </div>
    </section>
  );
}

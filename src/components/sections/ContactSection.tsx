"use client";

import { useState, type FormEvent } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Magnetic from "@/components/ui/Magnetic";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
    "mt-2 w-full rounded-xl border border-[var(--line)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]";

const CONTACT = {
    email: "shushovanshakya015@gmail.com",
    linkedin: "https://www.linkedin.com/in/shushovan-shakya/",
    github: "https://github.com/Shushovan015",
    location: "Kathmandu, Nepal",
    timezone: "NPT (UTC+5:45)",
    response: "Usually replies within 24 hours",
    resumeUpdated: "February 2026",
};


export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorText, setErrorText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
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
        <section id="contact" className="section-wrap screen-section">
            <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                <div>
                    <p className="eyebrow">Contact</p>
                    <h2 className="section-title mt-3">Lets Work Together</h2>
                    <p className="mt-6 max-w-md text-base leading-relaxed muted">
                        I am open to frontend engineering roles, product collaborations, and contract opportunities.
                    </p>

                    <div className="mt-6 space-y-3 text-sm muted">
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="inline-flex items-center gap-2 hover:text-[var(--ink)]"
                        >
                            <MdEmail className="h-4 w-4" />
                            {CONTACT.email}
                        </a>

                        <div className="flex items-center gap-5">
                            <a
                                href={CONTACT.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 hover:text-[var(--ink)]"
                            >
                                <FaLinkedin className="h-4 w-4" />
                                LinkedIn
                            </a>

                            <a
                                href={CONTACT.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 hover:text-[var(--ink)]"
                            >
                                <FaGithub className="h-4 w-4" />
                                GitHub
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 pro-panel overflow-hidden">
                        <div className="panel-head">
                            <div className="panel-dots">
                                <span className="dot bg-[var(--accent-2)]" />
                                <span className="dot bg-[var(--accent)]" />
                                <span className="dot bg-[var(--ok)]" />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.1em] muted">Availability</p>
                        </div>

                        <div className="space-y-3 p-4">
                            <p className="text-sm leading-relaxed">
                                Open to <span className="font-semibold">Frontend Engineer</span> or <span className="font-semibold">Frontend Developer</span> roles and selected contract engagements.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <span className="data-chip">Remote</span>
                                <span className="data-chip">Hybrid</span>
                                <span className="data-chip">Full-time / Contract</span>
                            </div>

                            <p className="text-xs muted">Response time: usually within 24 hours.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="pro-panel overflow-hidden">
                    <div className="panel-head">
                        <div className="panel-dots">
                            <span className="dot bg-[var(--accent-2)]" />
                            <span className="dot bg-[var(--accent)]" />
                            <span className="dot bg-[var(--ok)]" />
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] muted">Send Message</p>
                    </div>

                    <div className="space-y-4 p-6 sm:p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="font-mono text-xs uppercase tracking-[0.1em] muted">Name</label>
                                <input required value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="font-mono text-xs uppercase tracking-[0.1em] muted">Email</label>
                                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label className="font-mono text-xs uppercase tracking-[0.1em] muted">Message</label>
                            <textarea
                                required
                                rows={6}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <Magnetic className="inline-block">
                            <button type="submit" disabled={status === "loading"} data-cursor="Send" className="cmd-btn primary disabled:opacity-60">
                                {status === "loading" ? "Sending..." : "Send Message"}
                            </button>
                        </Magnetic>

                        {status === "success" ? <p className="text-sm text-[var(--ok)]">Message sent successfully.</p> : null}
                        {status === "error" ? <p className="text-sm text-red-400">{errorText}</p> : null}
                    </div>
                </form>
            </div>
        </section>
    );
}

"use client";

import PageTransition from "@/components/ui/PageTransition";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                { name, email, message },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <section id="contact" className="py-16 scroll-mt-24">
                <h1 className="text-3xl font-semibold">Contact</h1>
                <p className="mt-4 max-w-2xl text-zinc-300">
                    Let’s build something great. I usually reply within 24–48 hours.
                </p>

                <div className="mt-10">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-zinc-800/60 bg-zinc-900/20 p-6 md:p-8"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold">Send a message</h2>
                                <p className="mt-1 text-sm text-zinc-400">
                                    Your message goes straight to my inbox.
                                </p>
                            </div>
                            <span className="hidden rounded-full border border-zinc-800/70 px-3 py-1 text-xs text-zinc-400 md:inline">
                                Available for new projects
                            </span>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm text-zinc-300">Name</label>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-zinc-300">Email</label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-sm text-zinc-300">Message</label>
                            <textarea
                                required
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="mt-2 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-100"
                            />
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <p className="text-xs text-zinc-400">
                                By sending, you agree to be contacted back.
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded-2xl bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-950 hover:bg-white disabled:opacity-60"
                            >
                                {loading ? "Sending…" : "Send message"}
                            </button>
                        </div>

                        {success && (
                            <p className="mt-4 text-sm text-emerald-400">
                                Message sent successfully!
                            </p>
                        )}

                        {error && (
                            <p className="mt-4 text-sm text-red-400">{error}</p>
                        )}
                    </form>
                </div>
            </section>
        </PageTransition>
    );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    BriefcaseBusiness,
    FileText,
    Mail,
    MapPin,
    SendHorizontal,
    Sparkles,
    UserRound,
} from "lucide-react";
import Image from "next/image";
import emailjs from "emailjs-com";
import { projects } from "@/content/projects";

type ChatRole = "assistant" | "user";

type ChatLink = {
    label: string;
    href?: string;
    action?: "open_contact_form";
};

type ProjectCard = {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    live?: string;
    github?: string;
};

type ChatMessage = {
    id: string;
    role: ChatRole;
    text: string;
    links?: ChatLink[];
    projectCards?: ProjectCard[];
    locationMap?: boolean;
};

const quickQuestions = [
    "Where are you located?",
    "Show me your best projects.",
    "What is your tech stack?",
    "Can I download your resume?",
    "How can I contact you?",
];

const stackHighlights = [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "OpenLayers",
    "D3.js",
    "Node.js",
    "Python",
];

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const isExternal = (href: string) => href.startsWith("http") || href.startsWith("mailto:");

function BerlinMapZoom() {
    const [phase, setPhase] = useState<"world" | "zooming" | "berlin">("world");

    useEffect(() => {
        const holdWorld = window.setTimeout(() => setPhase("zooming"), 500);
        const showBerlin = window.setTimeout(() => setPhase("berlin"), 2500);

        return () => {
            window.clearTimeout(holdWorld);
            window.clearTimeout(showBerlin);
        };
    }, []);

    const worldSrc =
        "https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-85%2C180%2C85&layer=mapnik";
    const berlinSrc =
        "https://www.openstreetmap.org/export/embed.html?bbox=13.0883%2C52.3383%2C13.7612%2C52.6755&layer=mapnik&marker=52.5200%2C13.4050";

    return (
        <div className="mt-3 overflow-hidden rounded-xl border border-white/12 bg-slate-950/80">
            <div className="relative h-56 w-full overflow-hidden">
                <iframe
                    title="World map zoom"
                    src={worldSrc}
                    loading="eager"
                    className="absolute inset-0 h-full w-full border-0"
                    style={{
                        transformOrigin: "53.6% 20.8%",
                        transform:
                            phase === "world"
                                ? "translate(0%, 0%) scale(1)"
                                : "translate(-3.6%, 29.2%) scale(6.2)",
                        transition:
                            phase === "world"
                                ? "none"
                                : "transform 7800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease",
                        opacity: phase === "berlin" ? 0 : 1,
                    }}
                />
                <iframe
                    title="Berlin map"
                    src={berlinSrc}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                    style={{
                        opacity: phase === "berlin" ? 1 : 0,
                        transition: "opacity 1100ms ease 120ms",
                    }}
                />
                <div className="pointer-events-none absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[11px] text-white">
                    {phase === "berlin" ? "Berlin, Germany" : "Zooming to Berlin..."}
                </div>
            </div>
        </div>
    );
}

export default function PortfolioChat({
    onSwitchToShowcase,
}: {
    onSwitchToShowcase?: () => void;
}) {
    const logRef = useRef<HTMLDivElement | null>(null);
    const bootedFromQueryRef = useRef(false);
    const timerRef = useRef<number | null>(null);
    const busyRef = useRef(false);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "intro",
            role: "assistant",
            text:
                "Hi, I'm Shushovan's portfolio assistant.\nAsk me about projects, skills, resume, or availability.",
            links: [
                { label: "Download Resume", href: "/resume.pdf" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/shushovan-shakya/" },
                { label: "GitHub", href: "https://github.com/Shushovan015" },
            ],
        },
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const [showContactForm, setShowContactForm] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactMessage, setContactMessage] = useState("");
    const [contactSending, setContactSending] = useState(false);
    const [contactError, setContactError] = useState("");

    const featuredProjects = useMemo<ProjectCard[]>(
        () =>
            projects.slice(0, 3).map((project) => ({
                slug: project.slug,
                title: project.title,
                summary: project.summary,
                tags: project.tags.slice(0, 4),
                live: project.links.live,
                github: project.links.github,
            })),
        []
    );

    const buildReply = useCallback(
        (question: string): Omit<ChatMessage, "id" | "role"> => {
            const q = question.toLowerCase().trim();
            const has = (...keywords: string[]) => keywords.some((keyword) => q.includes(keyword));

            if (has("where", "located", "location", "based", "live")) {
                return {
                    text:
                        "Shushovan is currently based in Berlin, Germany and open to remote collaborations and frontend roles across Europe.",
                    links: [{ label: "Let's Connect", href: "https://www.linkedin.com/in/shushovan-shakya/" }],
                    locationMap: true,
                };
            }

            if (has("project", "work", "portfolio", "case study", "best")) {
                return {
                    text: "Here are selected projects with strong frontend and visualization work:",
                    projectCards: featuredProjects,
                };
            }

            if (has("skill", "stack", "technology", "tech", "tools")) {
                return {
                    text: `Core stack:\n${stackHighlights.join(
                        " | "
                    )}\n\nAlso experienced in performance optimization, accessibility, and UI architecture.`,
                };
            }

            if (has("resume", "cv")) {
                return {
                    text: "You can download the latest resume directly here:",
                    links: [{ label: "Download Resume", href: "/resume.pdf" }],
                };
            }

            if (has("contact", "email", "hire", "reach", "message")) {
                return {
                    text: "Best ways to contact Shushovan:",
                    links: [
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/shushovan-shakya/" },
                        { label: "GitHub", href: "https://github.com/Shushovan015" },
                        { label: "Send Message", action: "open_contact_form" },
                    ],
                };
            }

            if (has("about", "who are you", "introduce", "background")) {
                return {
                    text:
                        "Shushovan is a frontend developer focused on performant, scalable interfaces. He works heavily with React, Next.js, TypeScript, and interactive data and 3D visualization.",
                };
            }

            return {
                text:
                    "I can help with projects, tech stack, resume, and contact details.\nTry one of the quick questions below.",
            };
        },
        [featuredProjects]
    );

    const sendQuestion = useCallback(
        (raw: string) => {
            const trimmed = raw.trim();
            if (!trimmed || busyRef.current) return;

            setMessages((prev) => [...prev, { id: makeId(), role: "user", text: trimmed }]);
            setInput("");
            setIsThinking(true);
            busyRef.current = true;

            const reply = buildReply(trimmed);
            timerRef.current = window.setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: makeId(),
                        role: "assistant",
                        ...reply,
                    },
                ]);
                setIsThinking(false);
                busyRef.current = false;
            }, 520);
        },
        [buildReply]
    );

    const handleChatContactSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setContactSending(true);
        setContactError("");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: contactName,
                    email: contactEmail,
                    message: contactMessage,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: makeId(),
                    role: "assistant",
                    text: "Thanks. Your message has been sent successfully. I will get back to you soon.",
                },
            ]);

            setContactName("");
            setContactEmail("");
            setContactMessage("");
            setShowContactForm(false);
        } catch {
            setContactError("Failed to send message. Please try again.");
        } finally {
            setContactSending(false);
        }
    };

    useEffect(() => {
        if (bootedFromQueryRef.current) return;
        if (typeof window === "undefined") return;

        const query = new URLSearchParams(window.location.search).get("query");
        if (!query) return;

        bootedFromQueryRef.current = true;
        sendQuestion(query);
    }, [sendQuestion]);

    useEffect(() => {
        if (!logRef.current) return;
        logRef.current.scrollTo({
            top: logRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isThinking]);

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <main className="mx-auto flex h-screen w-full max-w-7xl overflow-hidden px-5 py-6 md:px-8 md:py-8">
            <div className="grid h-full w-full gap-5 grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[340px_minmax(0,1fr)] md:grid-rows-1">
                <aside className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-slate-950/45 p-6 shadow-[0_12px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-800/40 px-3 py-1 text-xs font-medium text-slate-200">
                        <Sparkles className="h-3.5 w-3.5" />
                        Portfolio Assistant
                    </div>

                    <div className="mt-5">
                        <h1 className="text-center text-2xl font-semibold tracking-tight">Shushovan Shakya</h1>

                        <div className="relative mt-4 h-52 w-full overflow-hidden rounded-3xl border border-[var(--line)] shadow-lg md:h-64">
                            <Image
                                src="/me.jpg"
                                alt="Shushovan Shakya"
                                fill
                                priority
                                className="object-cover object-center"
                            />
                        </div>

                        <p className="mt-4 text-center text-sm text-[var(--text-1)]">
                            Frontend Developer - UI Engineering - Data Visualization
                        </p>
                    </div>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-[var(--text-1)]">
                            <MapPin className="h-4 w-4" />
                            Berlin, Germany
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-1)]">
                            <BriefcaseBusiness className="h-4 w-4" />
                            Open to remote roles
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-1)]">
                            <FileText className="h-4 w-4" />
                            Resume available
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <a
                            href="/resume.pdf"
                            className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs text-slate-100 hover:bg-white/5"
                        >
                            Resume
                        </a>
                        <a
                            href="https://github.com/Shushovan015"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs text-slate-100 hover:bg-white/5"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shushovan-shakya/"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs text-slate-100 hover:bg-white/5"
                        >
                            LinkedIn
                        </a>
                    </div>

                    {onSwitchToShowcase ? (
                        <div className="mt-auto pt-5">
                            <div className="mb-4 border-t border-[var(--line)]" />
                            <div className="mb-3 rounded-xl border border-[var(--line)] bg-slate-900/35 px-3 py-2">
                                <p className="text-xs leading-relaxed text-[var(--text-1)]">
                                    Want the classic section-based website layout? You can switch to the normal portfolio here.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onSwitchToShowcase}
                                className="w-full rounded-xl border border-[var(--line)] px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                            >
                                Normal Portfolio
                            </button>
                        </div>
                    ) : null}
                </aside>

                <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-slate-950/45 backdrop-blur-xl">
                    <header className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--text-1)]">
                        <UserRound className="h-4 w-4" />
                        Ask anything about Shushovan&apos;s portfolio
                    </header>

                    <div ref={logRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 md:p-5">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message-enter flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[82%] ${message.role === "user"
                                        ? "bg-slate-100 text-slate-900 shadow-sm"
                                        : "border border-white/10 bg-slate-900/65 text-slate-100"
                                        }`}
                                >
                                    <p className="whitespace-pre-line">{message.text}</p>
                                    {message.locationMap ? <BerlinMapZoom /> : null}

                                    {message.links && message.links.length > 0 ? (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {message.links.map((link) =>
                                                link.action === "open_contact_form" ? (
                                                    <button
                                                        key={`${message.id}-${link.label}`}
                                                        type="button"
                                                        onClick={() => setShowContactForm(true)}
                                                        className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
                                                    >
                                                        {link.label}
                                                    </button>
                                                ) : link.href ? (
                                                    <a
                                                        key={`${message.id}-${link.href}`}
                                                        href={link.href}
                                                        target={isExternal(link.href) ? "_blank" : undefined}
                                                        rel={isExternal(link.href) ? "noreferrer" : undefined}
                                                        className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
                                                    >
                                                        {link.label}
                                                    </a>
                                                ) : null
                                            )}
                                        </div>
                                    ) : null}

                                    {message.projectCards && message.projectCards.length > 0 ? (
                                        <div className="mt-3 grid gap-2">
                                            {message.projectCards.map((project) => (
                                                <article
                                                    key={`${message.id}-${project.slug}`}
                                                    className="rounded-xl border border-white/12 bg-slate-950/65 p-3"
                                                >
                                                    <h3 className="text-sm font-semibold">{project.title}</h3>
                                                    <p className="mt-1 text-xs text-slate-300">{project.summary}</p>
                                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                                        {project.tags.map((tag) => (
                                                            <span
                                                                key={`${project.slug}-${tag}`}
                                                                className="rounded-full border border-white/15 px-2 py-1 text-[11px] text-slate-300"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 flex gap-2 text-xs">
                                                        {project.live ? (
                                                            <a
                                                                href={project.live}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-cyan-300 hover:underline"
                                                            >
                                                                Live
                                                            </a>
                                                        ) : null}
                                                        {project.github ? (
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-cyan-300 hover:underline"
                                                            >
                                                                GitHub
                                                            </a>
                                                        ) : null}
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}

                        {isThinking ? (
                            <div className="message-enter flex justify-start">
                                <div className="rounded-2xl border border-[var(--line)] bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
                                    Thinking...
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="border-t border-[var(--line)] p-4">
                        {showContactForm ? (
                            <form
                                onSubmit={handleChatContactSubmit}
                                className="mb-3 rounded-xl border border-[var(--line)] bg-slate-900/45 p-3"
                            >
                                <p className="mb-2 text-xs text-[var(--text-1)]">Send a message directly from chat</p>
                                <div className="grid gap-2 md:grid-cols-2">
                                    <input
                                        value={contactName}
                                        onChange={(event) => setContactName(event.target.value)}
                                        placeholder="Your name"
                                        required
                                        className="rounded-lg border border-[var(--line)] bg-slate-900/70 px-3 py-2 text-sm text-slate-100"
                                    />
                                    <input
                                        type="email"
                                        value={contactEmail}
                                        onChange={(event) => setContactEmail(event.target.value)}
                                        placeholder="Your email"
                                        required
                                        className="rounded-lg border border-[var(--line)] bg-slate-900/70 px-3 py-2 text-sm text-slate-100"
                                    />
                                </div>
                                <textarea
                                    value={contactMessage}
                                    onChange={(event) => setContactMessage(event.target.value)}
                                    placeholder="Your message"
                                    required
                                    rows={4}
                                    className="mt-2 w-full rounded-lg border border-[var(--line)] bg-slate-900/70 px-3 py-2 text-sm text-slate-100"
                                />
                                <div className="mt-2 flex items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={contactSending}
                                        className="rounded-lg border border-slate-300/60 bg-slate-100 px-3 py-2 text-xs text-slate-900"
                                    >
                                        {contactSending ? "Sending..." : "Send"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowContactForm(false);
                                            setContactError("");
                                        }}
                                        className="rounded-lg border border-[var(--line)] px-3 py-2 text-xs text-slate-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                {contactError ? <p className="mt-2 text-xs text-red-300">{contactError}</p> : null}
                            </form>
                        ) : null}

                        <div className="mb-3 flex flex-wrap gap-2">
                            {quickQuestions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    onClick={() => sendQuestion(question)}
                                    disabled={isThinking}
                                    className="rounded-lg border border-[var(--line)] bg-slate-900/35 px-3 py-1.5 text-xs text-[var(--text-1)] transition hover:bg-slate-800/45 disabled:opacity-60"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                sendQuestion(input);
                            }}
                            className="flex gap-2"
                        >
                            <input
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder="Ask a question..."
                                className="w-full rounded-xl border border-[var(--line)] bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300/40"
                            />
                            <button
                                type="submit"
                                disabled={isThinking || !input.trim()}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-300/60 bg-slate-100 px-4 text-slate-900 transition hover:bg-white disabled:opacity-50"
                            >
                                <SendHorizontal className="h-4 w-4" />
                            </button>
                        </form>

                        <p className="mt-2 flex items-center gap-2 text-xs text-[var(--text-1)]">
                            <Mail className="h-3.5 w-3.5" />
                            Quick tip: Start by asking about projects, skills, location, or contact details.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

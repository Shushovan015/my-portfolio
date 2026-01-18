import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "Shushovan Shakya — Frontend Developer",
    template: "%s — Shushovan Shakya",
  },
  description:
    "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
  metadataBase: new URL("https://shushovan-shakya.vercel.app/"),
  openGraph: {
    title: "Your Name — Frontend Developer",
    description:
      "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shushovan Shakya — Frontend Developer",
    description:
      "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
    images: ["/og.png"],
  },
};


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <div className="mx-auto max-w-6xl px-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

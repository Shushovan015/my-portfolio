// import type { Metadata } from "next";
// import "./globals.css";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";

// export const metadata: Metadata = {
//   title: {
//     default: "Shushovan Shakya — Frontend Developer",
//     template: "%s — Shushovan Shakya",
//   },
//   description:
//     "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
//   metadataBase: new URL("https://shushovan-shakya.vercel.app/"),
//   openGraph: {
//     title: "Your Name — Frontend Developer",
//     description:
//       "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
//     type: "website",
//     images: ["/og.png"],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Shushovan Shakya — Frontend Developer",
//     description:
//       "Creative frontend developer portfolio built with Next.js, Three.js, and performance-first UI engineering.",
//     images: ["/og.png"],
//   },
// };


// export default function SiteLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
//         <Navbar />
//         <div className="mx-auto max-w-6xl px-6">{children}</div>
//         <Footer />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shushovan Shakya | Portfolio",
    template: "%s | Shushovan Shakya",
  },
  description: "Frontend engineer portfolio with bold, editorial web design.",
  icons: {
    icon: "/Shushovan.png",
    shortcut: "/Shushovan.png",
    apple: "/Shushovan.png",
  },
};


export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>{children}</body>
    </html>
  );
}


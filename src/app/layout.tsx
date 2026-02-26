import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Shushovan Shakya | Frontend Engineer",
    template: "%s | Shushovan Shakya",
  },
  description:
    "Frontend engineer portfolio focused on high-performance interfaces, data visualization, and product UI architecture.",
  icons: {
    icon: "/Shushovan.png",
    shortcut: "/Shushovan.png",
    apple: "/Shushovan.png",
  },
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

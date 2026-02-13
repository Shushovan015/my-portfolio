"use client";

import { useState } from "react";
import PortfolioChat from "@/components/sections/PortfolioChart";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import ToolsGrid from "@/components/sections/ToolsGrid";
import ContactSection from "@/components/sections/ContactSection";

type ViewMode = "conversation" | "showcase";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("conversation");

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {viewMode === "conversation" ? (
        <PortfolioChat onSwitchToShowcase={() => setViewMode("showcase")} />
      ) : (
        <div className="h-screen overflow-y-auto bg-zinc-950 text-zinc-100">
          <Navbar onSwitchToChat={() => setViewMode("conversation")} />
          <div className="mx-auto max-w-6xl px-6 pt-16">
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <ToolsGrid />
            <ContactSection />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

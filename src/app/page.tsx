import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import ContactSection from "@/components/sections/ContactSection";
import ToolsGrid from "@/components/sections/ToolsGrid";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ToolsGrid />
      <ContactSection />
    </main>
  );
}

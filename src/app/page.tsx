import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import ToolsGrid from "@/components/sections/ToolsGrid";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="grain min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-4 pt-28 sm:px-8">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ToolsGrid />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

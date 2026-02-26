import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectSection";
import ToolsGrid from "@/components/sections/ToolsGrid";
import ContactSection from "@/components/sections/ContactSection";
import ScrollHud from "@/components/ui/ScrollHud";
import SectionReveal from "@/components/ui/SectionReveal";
import PageLoader from "@/components/ui/PageLoader";

export default function HomePage() {
  return (
    <div className="app-shell min-h-screen">
      <PageLoader />
      <ScrollHud />
      <Navbar />
      <main id="main-content" className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <Hero />
        <SectionReveal delay={0.03}>
          <AboutSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <ProjectsSection />
        </SectionReveal>
        <SectionReveal delay={0.07}>
          <ToolsGrid />
        </SectionReveal>
        <SectionReveal delay={0.09}>
          <ContactSection />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

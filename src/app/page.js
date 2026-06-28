import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

import { AboutSection } from "@/components/sections/AboutSection";
import ScrollStackSection from "@/components/sections/ScrollStackSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Homepage — light → dark → light rhythm:
 * Hero (light) → About (light) → Principles (light) → Work (DARK) → Process (DARK)
 * → Skills (light) → Experience (light) → Testimonials (light) → Contact (light)
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ScrollStackSection />
        <WorkSection />
        <ProcessSection />
        <SkillsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

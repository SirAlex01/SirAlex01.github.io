"use client";

import { useEffect } from "react";
import FadeInSection from "./components/ui/fadein-section";
import Presentation from "./components/home-sections/presentation";
import Education from "./components/home-sections/education/education";
import CTFs from "./components/home-sections/ctfs";
import Projects from "./components/home-sections/projects";
import Skills from "./components/home-sections/skills";
import Contact from "./components/home-sections/contact";

const sections = [
  { id: "presentation", component: <Presentation /> },
  { id: "education", component: <Education /> },
  { id: "ctfs", component: <CTFs /> },
  { id: "projects", component: <Projects /> },
  { id: "skills", component: <Skills /> }, 
  { id: "contact", component: <Contact /> },
];

export default function Home() {
  // ✅ Scroll to top when page (re)loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <>
      {sections.map((section, index) => {
        const SectionContent = section.component;
        const backgroundClass =
          (index & 1) === 1 ? "bg-background/80" : "bg-transparent";

        // First section without FadeIn
        if (index === 0) {
          return (
            <div key={section.id} className={backgroundClass}>
              {SectionContent}
            </div>
          );
        }

        // Other sections with fade-in
        return (
          <FadeInSection key={section.id}>
            <div className={backgroundClass}>{SectionContent}</div>
          </FadeInSection>
        );
      })}
    </>
  );
}

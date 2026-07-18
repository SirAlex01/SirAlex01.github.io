"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import FadeInSection from "./components/ui/fadein-section";
import Presentation from "./components/home-sections/presentation";

const Education = dynamic(() => import("./components/home-sections/education/education"));
const Work = dynamic(() => import("./components/home-sections/work/work"));
const CTFs = dynamic(() => import("./components/home-sections/ctfs"));
const Projects = dynamic(() => import("./components/home-sections/projects"));
const Skills = dynamic(() => import("./components/home-sections/skills"));
const Contact = dynamic(() => import("./components/home-sections/contact"));

const sections = [
  { id: "presentation", component: <Presentation /> },
  { id: "education", component: <Education /> },
  { id: "work", component: <Work /> },
  { id: "ctfs", component: <CTFs /> },
  { id: "projects", component: <Projects /> },
  { id: "skills", component: <Skills /> }, 
  { id: "contact", component: <Contact /> },
];

export default function Home() {
  // ✅ Scroll to top when page (re)loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
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
            <div key={section.id} id={section.id} className={backgroundClass}>
              {SectionContent}
            </div>
          );
        }

        // Other sections with fade-in
        return (
          <FadeInSection key={section.id}>
            <div id={section.id} className={backgroundClass}>{SectionContent}</div>
          </FadeInSection>
        );
      })}
    </>
  );
}

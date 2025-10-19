"use client";

import FadeInSection from "./components/ui/fadein-section";
import Presentation from "./components/home-sections/presentation";
import Education from "./components/home-sections/education/education";
import Palle from "./components/home-sections/palle";
const sections = [
  {
    id: "presentation",
    component: <Presentation />,
    colored: false, // first section transparent
  },
  {
    id: "education",
    component: <Education />,
    colored: true, // this one colored background
  },
  // You can continue adding more sections below 👇
   {
     id: "palle",
     component: <Palle />,
     colored: false,
   },
  // {
  //   id: "projects",
  //   component: <Projects />,
  //   colored: true,
  // },
];

export default function Home() {
  return (
    <>
      {sections.map((section, index) => {
        const SectionContent = section.component;
        const backgroundClass = section.colored
          ? "bg-background"
          : "bg-transparent";

        // First section without FadeIn
        if (index === 0) {
          return (
            <div key={section.id} className={backgroundClass}>
              {SectionContent}
            </div>
          );
        }

        // All other sections wrapped in FadeIn
        return (
          <FadeInSection key={section.id}>
            <div className={backgroundClass}>{SectionContent}</div>
          </FadeInSection>
        );
      })}
    </>
  );
}

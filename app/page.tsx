"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Presentation from "./components/home-sections/presentation";

// Everything below the fold is code-split; the hero ships in the first payload.
const Education = dynamic(() => import("./components/home-sections/education/education"));
const Work = dynamic(() => import("./components/home-sections/work/work"));
const CTFs = dynamic(() => import("./components/home-sections/ctfs"));
const Projects = dynamic(() => import("./components/home-sections/projects"));
const Skills = dynamic(() => import("./components/home-sections/skills"));
const Contact = dynamic(() => import("./components/home-sections/contact"));

export default function Home() {
  // Open at the top, regardless of restored scroll position - unless the URL
  // asks for a specific section, which forcing the scroll would override.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Each section owns its own id, spacing and tint - the alternating rhythm
  // is declared in the components themselves via <Section tinted>.
  return (
    <>
      <Presentation />
      <Work />
      <Education />
      <Projects />
      <CTFs />
      <Skills />
      <Contact />
    </>
  );
}

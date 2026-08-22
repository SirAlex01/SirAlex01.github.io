"use client";

import { useEffect, useRef, useState } from "react";
import { projectsMetadata, projects } from "../components/projects-data";
import ProjectCard from "../components/ui/project-card";
import Reveal from "../components/ui/reveal";
import PrimaryButton from "../components/ui/primary-button";
import { FiMail } from "react-icons/fi";

// Full span covered by the portfolio, derived from the project periods so it
// can never drift out of sync with the data.
const years = projects.flatMap((p) => p.period.match(/\d{4}/g) ?? []).map(Number);
const yearSpan = `${Math.min(...years)} - ${Math.max(...years)}`;

export default function ProjectsPage() {
  // One ref per card so a `/projects#id` deep link can jump straight to it.
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [hasHashNavigation, setHasHashNavigation] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    setHasHashNavigation(Boolean(hash));

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  // Runs on every render so the jump happens as soon as the ref is attached.
  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      const element = projectRefs.current[hash];
      if (element) {
        element.scrollIntoView({
          behavior: "instant" as ScrollBehavior,
          block: "center",
        });
      }
    }
  });

  useEffect(() => {
    const handleHashChange = () => setHasHashNavigation(Boolean(window.location.hash));
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {/* --- Header --- */}
      <section className="section pb-0">
        <div className="page">
          <Reveal className="flex flex-col items-start gap-5">
            <h1 className="display">{projectsMetadata.title}</h1>
            <hr className="rule w-24" />
            <p className="lead">{projectsMetadata.subtitle}</p>

            <div className="mt-2 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              <span>
                {String(projects.length).padStart(2, "0")} projects
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-[var(--line-strong)]" />
              <span>{yearSpan}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Grid --- */}
      <section className="section pt-12">
        <div className="page">
          {/* auto-rows-fr makes every row as tall as the tallest card, and the
              h-full chain below passes that height down to the card itself, so
              the whole grid stays on one baseline. */}
          <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                id={project.id}
                ref={(el) => {
                  projectRefs.current[project.id] = el;
                }}
                className="h-full scroll-mt-28"
              >
                <Reveal
                  className="h-full"
                  delay={hasHashNavigation ? 0 : Math.min(index, 3) * 0.06}
                >
                  <ProjectCard
                    title={project.title}
                    src={project.src}
                    video={project.video}
                    links={project.links}
                    description={project.description}
                    skills={project.skills}
                    period={project.period}
                  />
                </Reveal>
              </div>
            ))}
          </div>

          <Reveal className="mt-16 flex justify-center">
            <PrimaryButton label="Get in touch" icon={<FiMail />} href="/contacts" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

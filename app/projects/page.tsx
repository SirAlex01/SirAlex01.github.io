"use client";

import { useEffect, useRef } from "react";
import { projectsMetadata, projects } from "../components/projects-data";
import Lottie from "lottie-react";
import computerAnimation from "@/public/animations/computer.json";
import ProjectCard from "../components/ui/project-card";

export default function ProjectsPage() {
  // Create refs for each project card
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle scroll behavior on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    
    if (!hash) {
      // Only scroll to top if there's no hash
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  // Separate effect to handle hash scrolling immediately when ref is available
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    
    if (hash) {
      const element = projectRefs.current[hash];
      if (element) {
        // Scroll instantly to position as soon as element is available
        element.scrollIntoView({ 
          behavior: "instant" as ScrollBehavior,
          block: "center"
        });
      }
    }
  });

  return (
    <div className="min-h-screen py-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title and Subtitle Section with Animation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mb-6">
          {/* Lottie Animation on the left - 600x450 aspect ratio (4:3) */}
          <div className="w-[240px] h-[180px] sm:w-[320px] sm:h-[240px] md:w-[400px] md:h-[300px] lg:w-[480px] lg:h-[360px] flex-shrink-0">
            <Lottie
              animationData={computerAnimation}
              loop
            />
          </div>

          {/* Title and Subtitle on the right */}
          <div className="flex flex-col text-center md:text-left max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {projectsMetadata.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
              {projectsMetadata.subtitle}
            </p>
          </div>
        </div>

        {/* Horizontal Separator */}
        <div className="w-full h-px bg-neutral-300 dark:bg-neutral-700 mb-6" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[project.id] = el;
              }}
            >
              <ProjectCard
                title={project.title}
                src={project.src}
                links={project.links}
                description={project.description}
                skills={project.skills}
                period={project.period}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


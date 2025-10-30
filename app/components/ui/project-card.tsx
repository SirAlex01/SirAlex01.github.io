"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  src: string;
  links: string[];
  description: string;
  skills: string[];
  period: string;
}

export default function ProjectCard({
  title,
  src,
  links,
  description,
  skills,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isDraggingSkills = useRef(false);

  useEffect(() => {
    const skillsElement = skillsRef.current;
    if (!skillsElement) return;

    const isOverflowing = () => {
      return skillsElement.scrollWidth > skillsElement.clientWidth;
    };

    // Set initial cursor
    skillsElement.style.cursor = isOverflowing() ? 'grab' : 'default';

    // Mouse wheel scrolling
    const handleWheel = (e: WheelEvent) => {
      if (isOverflowing()) {
        e.preventDefault();
        skillsElement.scrollLeft += e.deltaY;
      }
    };

    // Mouse drag scrolling
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasMoved = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isOverflowing()) return;
      isDown = true;
      hasMoved = false;
      isDraggingSkills.current = false;
      startX = e.pageX - skillsElement.offsetLeft;
      scrollStart = skillsElement.scrollLeft;
      skillsElement.style.cursor = 'grabbing';
      e.stopPropagation();
    };

    const resetDraggingFlag = () => {
      if (isDraggingSkills.current) {
        setTimeout(() => {
          isDraggingSkills.current = false;
        }, 0);
      }
    };

    const handleMouseLeave = () => {
      if (!isDown && !hasMoved) {
        return;
      }
      isDown = false;
      resetDraggingFlag();
      if (isOverflowing()) {
        skillsElement.style.cursor = 'grab';
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDown && !hasMoved) {
        return;
      }
      isDown = false;
      if (hasMoved) {
        e.stopPropagation();
        isDraggingSkills.current = true;
        resetDraggingFlag();
      } else {
        isDraggingSkills.current = false;
      }
      hasMoved = false;
      if (isOverflowing()) {
        skillsElement.style.cursor = 'grab';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      e.stopPropagation();
      const currentX = e.pageX - skillsElement.offsetLeft;
      const delta = currentX - startX;
      if (!hasMoved && Math.abs(delta) > 3) {
        hasMoved = true;
        isDraggingSkills.current = true;
      }
      skillsElement.scrollLeft = scrollStart - delta;
    };

    skillsElement.addEventListener('wheel', handleWheel, { passive: false });
    skillsElement.addEventListener('mousedown', handleMouseDown);
    skillsElement.addEventListener('mouseleave', handleMouseLeave);
    skillsElement.addEventListener('mouseup', handleMouseUp);
    skillsElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      skillsElement.removeEventListener('wheel', handleWheel);
      skillsElement.removeEventListener('mousedown', handleMouseDown);
      skillsElement.removeEventListener('mouseleave', handleMouseLeave);
      skillsElement.removeEventListener('mouseup', handleMouseUp);
      skillsElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isExpanded]);

  const handleToggle = (e: React.MouseEvent) => {
    if (isDraggingSkills.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (isExpanded) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsExpanded(true);
  };

  return (
    <div
      className="relative w-full min-h-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={handleToggle}
    >
      {/* Background Image - Fits above the title card */}
      <div className="absolute inset-0 pb-[45px]">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-fit"
        />
      </div>

      {/* Bottom Card - Always visible with title, expands on hover/click */}
      <motion.div
        initial={{ height: "45px" }}
        animate={{ height: isExpanded ? "75%" : "45px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-xl dark:backdrop-blur-lg flex flex-col rounded-b-xl"
      >
        {/* Title - Always visible */}
        <div className="px-4 py-2 flex-shrink-0">
          <h3 className={`text-base font-bold text-foreground ${isExpanded ? 'line-clamp-none' : 'line-clamp-1'}`}>
            {title}
          </h3>
        </div>

        {/* Content that appears on hover/click */}
        {isExpanded && (
          <div className="flex flex-col flex-1 overflow-hidden px-4 pb-4 min-h-0">
            {/* Skills - Scrollable horizontal row with mouse wheel and drag */}
            <div 
              ref={skillsRef}
              className="flex gap-2 mb-2 flex-shrink-0 overflow-x-auto scrollbar-hide select-none"
            >
              {skills.map((skill, index) => (
                <SkillBadge key={index}>{skill}</SkillBadge>
              ))}
            </div>

            {/* Description - Scrollable */}
            <div className="flex-1 overflow-y-auto mb-3 pr-2 custom-scrollbar min-h-0">
              <ProjectDescription>
                {description}
              </ProjectDescription>
            </div>

            {/* GitHub Buttons - One for each link, arranged horizontally with wrap */}
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/90 dark:bg-white/20 text-neutral-800 dark:text-foreground rounded-lg hover:bg-neutral-200 dark:hover:bg-white/35 hover:shadow-md transition-all duration-300 font-semibold backdrop-blur-sm border border-neutral-300 dark:border-neutral-500/30 hover:border-neutral-400 dark:hover:border-neutral-400/50 shadow-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className="text-lg" />
                  {links.length > 1 ? `View repository ${index + 1}` : 'View on GitHub'}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Reusable skill badge component for project cards
 */
function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 text-xs font-medium bg-neutral-300 dark:bg-neutral-600 text-neutral-900 dark:text-white rounded-full whitespace-nowrap">
      {children}
    </span>
  );
}

/**
 * Reusable project description component
 */
function ProjectDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4 overflow-y-auto flex-1 font-medium">
      {children}
    </p>
  );
}

export { SkillBadge, ProjectDescription };

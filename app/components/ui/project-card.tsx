"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import LazyVideo from "./lazy-video";
import useSpotlight from "./use-spotlight";

interface ProjectCardProps {
  title: string;
  src?: string;
  video?: { mp4: string };
  links: string[];
  description: string;
  skills: string[];
  period: string;
}

/**
 * Project card for the /projects grid.
 *
 * Everything is visible without interaction - a recruiter scanning the page
 * shouldn't have to hover each card to discover what it is. Hover only adds
 * emphasis (lift, accent border, a slow image push-in).
 */
export default function ProjectCard({
  title,
  src,
  video,
  links,
  description,
  skills,
  period,
}: ProjectCardProps) {
  const spotlight = useSpotlight();
  const isGitHub = (url: string) => url.includes("github.com");

  return (
    <article
      {...spotlight}
      className="card card-interactive spotlight group flex h-full flex-col overflow-hidden p-0"
    >
      {/* --- Media --- */}
      {/* `contain`, not `cover`: these are screenshots and diagrams whose
          aspect ratios vary widely, and cropping one loses actual content. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--line)] bg-[var(--bg-sunk)]">
        {video ? (
          <LazyVideo
            mp4={video.mp4}
            className="h-full w-full object-contain transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
          />
        ) : (
          src && (
            <Image
              src={src}
              alt={title}
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 92vw"
              className="object-contain transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
            />
          )
        )}

        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {period}
        </span>
      </div>

      {/* --- Body --- */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="title-sm text-[var(--fg)]">{title}</h3>

        <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{description}</p>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>

        {/* --- Links, pinned to the bottom so cards line up --- */}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {links.map((link, index) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm flex-1 justify-center"
            >
              {isGitHub(link) ? <FaGithub /> : <FiExternalLink />}
              {links.length > 1
                ? `Repository ${index + 1}`
                : isGitHub(link)
                  ? "View on GitHub"
                  : "View project"}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

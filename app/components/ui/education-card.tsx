"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EducationItem } from "../home-sections/education/education-data";
import { getIcon } from "./icon-registry";
import useSpotlight from "./use-spotlight";

export default function EducationCard({
  title,
  school,
  years,
  thesis,
  mark,
  icon = "graduation-cap",
  link,
}: EducationItem) {
  const spotlight = useSpotlight();
  const IconComponent = getIcon(icon, "graduation-cap");

  const Card = (
    <article
      {...spotlight}
      className="card card-interactive spotlight group flex h-full flex-col gap-4 p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-inset)] text-[var(--accent-text)] transition-colors duration-[var(--t-base)] group-hover:border-[var(--accent-ring)] group-hover:bg-[var(--accent-soft)]">
          <IconComponent className="h-6 w-6" />
        </span>

        <span className="chip chip-accent chip-mono">{mark}</span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="title-sm text-[var(--fg)]">{title}</h3>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--fg-muted)]">
          <span>{school}</span>
          <span aria-hidden="true" className="text-[var(--fg-subtle)]">·</span>
          <span className="font-mono text-xs tracking-wide text-[var(--fg-subtle)]">
            {years}
          </span>
        </p>

        {thesis && (
          <p className="mt-4 border-l-2 border-[var(--accent-ring)] pl-3 text-sm leading-relaxed text-[var(--fg-muted)]">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              Thesis
            </span>
            <br />
            {thesis}
          </p>
        )}
      </div>

      {link && (
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-[var(--fg-subtle)] transition-colors duration-[var(--t-base)] group-hover:text-[var(--accent-text)]">
          Visit
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-[var(--t-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </article>
  );

  if (link) {
    const isExternal = link.startsWith("http");
    return isExternal ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className="h-full">
        {Card}
      </a>
    ) : (
      <Link href={link} className="h-full">
        {Card}
      </Link>
    );
  }

  return Card;
}

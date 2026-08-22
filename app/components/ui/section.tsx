import type { ReactNode } from "react";
import Reveal from "./reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  /** Adds the feathered background tint used to alternate section rhythm. */
  tinted?: boolean;
  className?: string;
  /** Narrower container for text-led sections. */
  narrow?: boolean;
}

/**
 * The single section shell used by every block on the site: consistent
 * vertical rhythm, container width and optional alternating tint.
 */
export function Section({
  id,
  children,
  tinted = false,
  narrow = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section ${tinted ? "section--tinted" : ""} ${className}`}
    >
      <div className={narrow ? "page-narrow" : "page"}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Title → hairline → lead. Every section opens with this so the page has one
 * predictable entry pattern instead of seven slightly different ones.
 */
export function SectionHeader({
  title,
  lead,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      <h2 className="title">{title}</h2>
      <hr className={`rule mt-5 w-24 ${centered ? "" : "ml-0"}`} />
      {lead && <p className={`lead mt-5 ${centered ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

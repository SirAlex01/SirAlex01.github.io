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
 *
 * Left-aligned by default, deliberately. Centring every header flattens the
 * hierarchy, forces the eye back to the middle on each line, and detaches the
 * heading from the grid it introduces. Anchoring headers to the same left
 * spine as the content below gives the page a readable structure. Centre is
 * reserved for the one place it argues for itself: the closing call to action.
 */
export function SectionHeader({
  title,
  lead,
  align = "left",
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
      {/* Short rule reads as a spine marker when it starts at the text edge,
          rather than as decoration floating under a centred title. */}
      <hr className={`${centered ? "rule" : "rule-start"} mt-5 w-16`} />
      {lead && <p className={`lead mt-5 ${centered ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

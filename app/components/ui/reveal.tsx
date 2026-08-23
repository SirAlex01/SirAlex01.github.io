"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import useInView from "./use-in-view";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Where the element travels from. */
  from?: Direction;
  /** Travel distance in px. */
  distance?: number;
  /** Scale to grow from. 1 means no scaling. */
  scale?: number;
  className?: string;
}

/** Turns a direction into the offsets `.reveal` reads. */
function offsetVars(from: Direction, distance: number) {
  switch (from) {
    case "up":
      return { "--rv-y": `${distance}px` };
    case "down":
      return { "--rv-y": `${-distance}px` };
    case "left":
      return { "--rv-x": `${-distance}px` };
    case "right":
      return { "--rv-x": `${distance}px` };
    default:
      return { "--rv-y": "0px" };
  }
}

/**
 * Scroll-triggered entrance. Used site-wide instead of ad-hoc
 * IntersectionObservers, so timing and easing stay consistent and the whole
 * site honours `prefers-reduced-motion` from one place.
 *
 * The animation itself is CSS - see the MOTION section of globals.css. All
 * this component does is hand one element to the shared observer, which adds
 * a class when it arrives. There is no per-frame JavaScript and no re-render.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 24,
  scale,
  className,
}: RevealProps) {
  const ref = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          ...offsetVars(from, distance),
          ...(scale !== undefined ? { "--rv-scale": scale } : null),
          ...(delay ? { "--rv-delay": `${Math.round(delay * 1000)}ms` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Wraps a list so its children animate in one after another.
 * Pair with <RevealItem> for each child.
 *
 * The group is the observed element, not the items: a six-card grid is one
 * observer target instead of six, and the stagger is a CSS `transition-delay`
 * computed from each item's index rather than a JS timeline.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className ? `reveal-group ${className}` : "reveal-group"}
      style={
        {
          "--rv-stagger": `${Math.round(stagger * 1000)}ms`,
          ...(delay ? { "--rv-delay": `${Math.round(delay * 1000)}ms` } : null),
        } as React.CSSProperties
      }
    >
      {/* Each item is told its position so CSS can offset its delay. Doing it
          here rather than asking every call site to pass an index keeps the
          consumers identical to what they were. */}
      {Children.map(children, (child, index) =>
        isValidElement<{ index?: number }>(child)
          ? cloneElement(child, { index })
          : child
      )}
    </div>
  );
}

export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Set by <RevealGroup>; drives the stagger. */
  index?: number;
}) {
  return (
    <div
      className={className ? `reveal-item ${className}` : "reveal-item"}
      style={{ "--rv-i": index } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

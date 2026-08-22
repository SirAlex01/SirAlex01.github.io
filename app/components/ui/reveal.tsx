"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Where the element travels from. */
  from?: Direction;
  /** Travel distance in px. */
  distance?: number;
  className?: string;
  /** Re-run the animation every time the element re-enters the viewport. */
  repeat?: boolean;
}

const offset = (from: Direction, d: number) => {
  switch (from) {
    case "up":
      return { y: d };
    case "down":
      return { y: -d };
    case "left":
      return { x: -d };
    case "right":
      return { x: d };
    default:
      return {};
  }
};

/**
 * Scroll-triggered entrance. Used site-wide instead of ad-hoc
 * IntersectionObservers so timing and easing stay consistent, and so the
 * whole site honours `prefers-reduced-motion` from one place.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 24,
  className,
  repeat = false,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset(from, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list so its children animate in one after another.
 * Pair with <RevealItem> for each child.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

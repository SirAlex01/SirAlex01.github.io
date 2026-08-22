"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline reading-progress bar that rides the navbar's bottom edge.
 *
 * The wrapper is what makes it fit the pill: the bar itself is a full-width
 * rectangle, so without a rounded, clipping parent it runs straight past the
 * navbar's rounded caps and the whole thing reads as a square box. The
 * wrapper matches the pill's radius and clips to it, so the line starts and
 * ends exactly where the pill's flat bottom edge does.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
    >
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="absolute bottom-0 left-0 h-px w-full rounded-full bg-gradient-to-r from-transparent via-[var(--accent)] to-[var(--accent)]"
      />
    </div>
  );
}

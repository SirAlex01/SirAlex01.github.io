"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LazyVideo from "./lazy-video";

type Project = {
  id: string;
  title: string;
  src?: string;
  video?: { mp4: string };
  links: string[];
  description: string;
  skills: string[];
  period: string;
};

interface ProjectPostcardsProps {
  projects: Project[];
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

const SWIPE_THRESHOLD = 50;
const CLICK_TOLERANCE = 5;

export default function ProjectPostcards({ projects }: ProjectPostcardsProps) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const dragOffset = useRef(0);
  const dragging = useRef(false);
  const wasDragged = useRef(false);
  // While a card is mid-transition, its logical position (index/offset)
  // has already updated but its visual position hasn't caught up yet -
  // so a rapid click can land on what looks like a side card but is
  // already, logically, the center one. This only guards the "open
  // project" click below; rotation clicks still queue up freely so
  // fast clicking isn't throttled.
  // Reset via a fixed timer rather than the spring's onAnimationComplete:
  // that callback waits for strict physical rest (near-zero velocity),
  // which for this spring lags well behind the point where the card
  // already looks settled on screen.
  const SETTLE_MS = 250;
  const isAnimating = useRef(false);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = (dir: 1 | -1) => {
    isAnimating.current = true;
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      isAnimating.current = false;
    }, SETTLE_MS);
    setIndex((i) => mod(i + dir, projects.length));
  };

  useEffect(() => {
    return () => {
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    };
  }, []);

  // --- Dragging logic ---
  // dragOffset is a ref (not state): it's only read once in handleEnd, so
  // tracking it in state would force a full re-render of every card on
  // each mousemove/touchmove pixel with no visual benefit.
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    wasDragged.current = false;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current || startX.current === null) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragOffset.current = x - startX.current;
    if (Math.abs(dragOffset.current) > CLICK_TOLERANCE) wasDragged.current = true;
  };

  const handleEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;

    if (Math.abs(dragOffset.current) >= SWIPE_THRESHOLD) {
      step(dragOffset.current < 0 ? 1 : -1);
    }

    dragOffset.current = 0;
    startX.current = null;
  };

  // --- Helpers ---
  const offsetFor = (i: number) => {
    const n = projects.length;
    const diff = mod(i - index, n);
    return diff > n / 2 ? diff - n : diff;
  };

  // --- Click handler ---
  const handleClick = (offset: number) => {
    if (Math.abs(offset) < 0.3) return; // ignore center clicks
    step(offset > 0 ? 1 : -1);
  };

  return (
    <>
    {/* stack-local keeps the cards' internal z-index range (78-100) from
        competing with the navbar and the mobile drawer, which are painted
        in the root stacking context. */}
    <div
      className="stack-local relative w-full h-[56vw] sm:h-[46vw] md:h-[38vw] lg:h-[34vw] xl:h-[30vw] max-h-[560px]
      flex items-center justify-center overflow-hidden select-none"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      {projects.map((p, i) => {
        const offset = offsetFor(i);
        const abs = Math.abs(offset);

        if (abs > 2.2) return null;

        // Transformations
        const scale = 1 - abs * 0.15;
        const rotate = offset * 14;
        const x = offset * 24;
        const y = abs * 4;
        const opacity = 1 - abs * 0.35;
        const blur =
          abs > 1.5 ? "blur(3px)" : abs > 0.75 ? "blur(1.5px)" : "none";
        const zIndex = 100 - Math.round(abs * 10);

        const clickable =
          abs > 0.3 && abs <= 2.1; // side cards only, not the center one
        const isCenterCard = abs < 0.3; // center card can link to projects page

        // Every card is a "postcard": media on top, a solid label strip
        // below. Rendering the strip on all of them (not just the focused
        // one) keeps the geometry identical as cards rotate through, and a
        // solid token-coloured strip reads far more cleanly than a black
        // gradient burned over screenshots of wildly varying brightness.
        const cardContent = (
          <div className="relative flex h-full w-full flex-col bg-[var(--surface-solid)]">
            {/* Source images run from 1.50 to 2.25 aspect against a ~1.86
                frame, so `cover` would crop up to a quarter off a screenshot
                and `fill` would visibly stretch it. `contain` keeps every
                one of them intact and legible; the letterbox is the card's
                own surface colour, so it reads as matting. */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              {p.video ? (
                <LazyVideo mp4={p.video.mp4} className="h-full w-full object-contain" />
              ) : (
                p.src && (
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 45vw, (min-width: 640px) 58vw, 76vw"
                    className="object-contain"
                    draggable={false}
                    // The deck sits well below the fold, so nothing here is
                    // preloaded; only the focused card loads eagerly.
                    loading={isCenterCard ? "eager" : "lazy"}
                  />
                )
              )}
            </div>

            <div className="flex flex-none items-center gap-2 border-t border-[var(--line)] px-3 py-2 sm:px-4 sm:py-2.5">
              <p className="line-clamp-1 flex-1 text-left text-[0.6875rem] font-semibold text-[var(--fg)] sm:text-xs md:text-sm">
                {p.title}
              </p>
              <FiArrowUpRight
                aria-hidden="true"
                className={`h-3.5 w-3.5 flex-none transition-opacity duration-300 sm:h-4 sm:w-4 ${
                  isCenterCard ? "text-[var(--fg-muted)]" : "opacity-0"
                }`}
              />
            </div>

            {/* Side cards recede behind a scrim so the centre one reads first. */}
            {abs > 0.05 && (
              <div className="pointer-events-none absolute inset-0 bg-[var(--bg)]/45" />
            )}
          </div>
        );

        return (
          <motion.div
            key={i}
            onClick={() => {
              if (wasDragged.current) return; // suppress click after a real drag
              if (clickable) {
                handleClick(offset);
              } else if (isCenterCard) {
                if (isAnimating.current) return; // don't open mid-transition
                window.location.href = `/projects#${p.id}`;
              }
            }}
            // Width is a class, not an inline style, so it can scale down the
            // breakpoints: at 45vw a phone card is only ~175px wide, far too
            // small to carry the caption.
            className={`absolute aspect-[16/10] w-[76vw] max-w-[480px] overflow-hidden rounded-[var(--r-xl)]
              border border-[var(--line-strong)] shadow-[var(--shadow-xl)] transition-shadow duration-300
              sm:w-[58vw] lg:w-[45vw]
              ${clickable || isCenterCard ? "cursor-pointer hover:scale-[1.03]" : "cursor-default"}`}
            style={{
              zIndex,
              filter: blur,
              willChange: "transform",
            }}
            animate={{
              scale,
              rotate,
              x: `${x}%`,
              y: `${y}%`,
              opacity,
            }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 20,
              mass: 0.5,
            }}
          >
            {cardContent}
          </motion.div>
        );
      })}
    </div>

    {/* Position in the deck */}
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous project"
        className="btn-icon border border-[var(--line)]"
      >
        <FiChevronLeft />
      </button>

      <span className="font-mono text-xs tabular-nums tracking-[0.16em] text-[var(--fg-subtle)]">
        {String(index + 1).padStart(2, "0")}
        <span className="mx-1 text-[var(--line-strong)]">/</span>
        {String(projects.length).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next project"
        className="btn-icon border border-[var(--line)]"
      >
        <FiChevronRight />
      </button>
    </div>
    </>
  );
}

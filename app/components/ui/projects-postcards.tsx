"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Project = { 
  id: string;
  title: string;
  src: string;
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
  // has already updated but its visual position hasn't caught up yet —
  // so a rapid click can land on what looks like a side card but is
  // already, logically, the center one. This only guards the "open
  // project" click below; rotation clicks still queue up freely so
  // fast clicking isn't throttled.
  // Reset via a fixed timer rather than the spring's onAnimationComplete:
  // that callback waits for strict physical rest (near-zero velocity),
  // which for this spring lags well behind the point where the card
  // already looks settled on screen.
  const SETTLE_MS = 300;
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
    <div
      className="relative w-full h-[60vw] sm:h-[46vw] md:h-[38vw] lg:h-[34vw] xl:h-[30vw] max-h-[560px]
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

        const cardContent = (
          <div className="relative w-full h-full">
            <Image
              src={p.src}
              alt={p.title}
              fill
              sizes="(min-width: 1280px) 35vw, (min-width: 1024px) 45vw, (min-width: 768px) 60vw, 80vw"
              className="object-fill rounded-xl"
              draggable={false}
              priority={abs <= 2}
            />
            {abs > 0.05 && (
              <div className="absolute inset-0 rounded-xl bg-black/25" />
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
            className={`absolute aspect-[16/10] rounded-xl overflow-hidden shadow-2xl
              ${clickable || isCenterCard ? "cursor-pointer hover:scale-[1.03]" : "cursor-default"}`}
            style={{
              width: "45vw",
              maxWidth: "480px",
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
  );
}

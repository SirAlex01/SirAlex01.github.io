"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Project = { src: string };

interface ProjectPostcardsProps {
  projects: Project[];
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function ProjectPostcards({ projects }: ProjectPostcardsProps) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  // --- Dragging logic (unchanged) ---
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging.current || startX.current === null) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const delta = x - startX.current;
    const fraction = Math.max(Math.min(-delta / 200, 1), -1); // invert direction
    setDragOffset(fraction);
  };

  const handleEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;

    if (dragOffset > 0.35) setIndex((i) => mod(i + 1, projects.length));
    else if (dragOffset < -0.35) setIndex((i) => mod(i - 1, projects.length));

    setDragOffset(0);
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
    if (offset > 0) setIndex((i) => mod(i + 1, projects.length));
    else if (offset < 0) setIndex((i) => mod(i - 1, projects.length));
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
        const offset = offsetFor(i) - dragOffset;
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

        return (
          <motion.div
            key={i}
            onClick={() => clickable && handleClick(offset)}
            className={`absolute aspect-[16/10] rounded-xl overflow-hidden shadow-2xl 
              ${clickable ? "cursor-pointer hover:scale-[1.03]" : "cursor-default"}`}
            style={{
              width: "45vw",
              maxWidth: "480px",
              zIndex,
              filter: blur,
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
            <img
              src={p.src}
              alt={`Project ${i}`}
              className="w-full h-full object-cover rounded-xl"
              draggable={false}
            />
            {abs > 0.05 && (
              <div
                className="absolute inset-0 rounded-xl bg-black/25"
                style={{
                  boxShadow: "0 15px 40px rgba(0,0,0,0.45)",
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

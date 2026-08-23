"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

/**
 * How long a card takes to reach its new place. Must match the transition
 * duration on `.deck-card` in globals.css - it is only used to decide when a
 * card has visually settled, not to drive the motion.
 */
const SETTLE_MS = 380;

/**
 * The project deck.
 *
 * The rotation is a CSS transition on `transform` and `opacity`, which the
 * compositor runs on its own thread. It used to be a physics spring evaluated
 * in JavaScript, which woke the main thread on every frame to recompute five
 * cards and write five inline styles - while those same cards were also
 * carrying a blur and a two-layer shadow. That combination is what made the
 * deck feel heavy on a phone; the phone-only throttles in `.deck-card` were
 * treating the symptom.
 */
export default function ProjectPostcards({ projects }: ProjectPostcardsProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const startX = useRef<number | null>(null);
  const dragOffset = useRef(0);
  const dragging = useRef(false);
  const wasDragged = useRef(false);

  // While a card is mid-transition, its logical position (index/offset) has
  // already updated but its visual position hasn't caught up - so a rapid
  // click can land on what looks like a side card but is already, logically,
  // the centre one. This only guards the "open project" click below; rotation
  // clicks still queue up freely, so fast clicking isn't throttled.
  const isAnimating = useRef(false);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      isAnimating.current = true;
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      settleTimeout.current = setTimeout(() => {
        isAnimating.current = false;
        settleTimeout.current = null;
      }, SETTLE_MS);
      setIndex((i) => mod(i + dir, projects.length));
    },
    [projects.length]
  );

  useEffect(
    () => () => {
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    },
    []
  );

  // --- Dragging ---
  // dragOffset is a ref, not state: it is only read once in handleEnd, so
  // tracking it in state would re-render every card on every moved pixel with
  // no visual benefit.
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

          const scale = 1 - abs * 0.15;
          const rotate = offset * 14;
          const x = offset * 24;
          const y = abs * 4;
          // Rounded: the raw float lands on values like 0.30000000000000004,
          // which then ship in the static HTML as an inline style.
          const opacity = Math.round((1 - abs * 0.35) * 100) / 100;

          // Kept small on purpose: `filter: blur()` forces the card onto its
          // own layer and re-rasterises it whenever the radius changes, so a
          // large radius on a large card is expensive. Dropped entirely on
          // touch devices by the `.deck-card` rule.
          const blur = abs > 1.5 ? "blur(2px)" : abs > 0.75 ? "blur(1px)" : "none";
          const zIndex = 100 - Math.round(abs * 10);

          const clickable = abs > 0.3 && abs <= 2.1; // side cards, not the centre
          const isCenterCard = abs < 0.3; // the centre card links to /projects

          return (
            <div
              key={p.id}
              onClick={() => {
                if (wasDragged.current) return; // suppress click after a real drag
                if (clickable) {
                  step(offset > 0 ? 1 : -1);
                } else if (isCenterCard && !isAnimating.current) {
                  // Client-side navigation. A `window.location.href` here threw
                  // away the loaded application and re-downloaded, re-parsed
                  // and re-hydrated the whole site to move one route across.
                  router.push(`/projects#${p.id}`);
                }
              }}
              // Width is a class, not an inline style, so it can scale down
              // the breakpoints: at 45vw a phone card is only ~175px wide, far
              // too small to carry the caption.
              // No `transition-shadow` and no `hover:scale`: the shadow never
              // changes, and a CSS scale would fight the transform below.
              className={`deck-card absolute aspect-[16/10] w-[70vw] max-w-[480px] overflow-hidden
                rounded-[var(--r-xl)] border border-[var(--line-strong)]
                sm:w-[58vw] lg:w-[45vw]
                ${abs > 1.5 ? "deck-card--far" : ""}
                ${clickable || isCenterCard ? "cursor-pointer" : "cursor-default"}`}
              // One composited transform rather than five animated properties.
              // No `will-change`: the browser promotes the card for the length
              // of the transition on its own, whereas a standing `will-change`
              // would keep five layers alive for as long as the page is open.
              style={{
                zIndex,
                opacity,
                filter: blur,
                transform: `translate3d(${x}%, ${y}%, 0) rotate(${rotate}deg) scale(${scale})`,
              }}
            >
              {/* Every card is a "postcard": media on top, a solid label strip
                  below. Rendering the strip on all of them keeps the geometry
                  identical as cards rotate through, and a solid token-coloured
                  strip reads far more cleanly than a black gradient burned over
                  screenshots of wildly varying brightness. */}
              <div className="relative flex h-full w-full flex-col bg-[var(--surface-solid)]">
                {/* `object-fill`: the media is stretched to occupy the whole
                    block, so no card shows letterbox bars. This distorts aspect
                    ratio, which is the accepted trade - unlike `object-cover`
                    it still never crops content out of a screenshot. Matches
                    the /projects cards. */}
                <div className="relative min-h-0 flex-1 overflow-hidden">
                  {p.video ? (
                    <LazyVideo mp4={p.video.mp4} className="h-full w-full object-fill" />
                  ) : (
                    p.src && (
                      <Image
                        src={p.src}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 58vw, 70vw"
                        className="object-fill"
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
                    className={`h-3.5 w-3.5 flex-none transition-opacity duration-[var(--t-base)] sm:h-4 sm:w-4 ${
                      isCenterCard ? "text-[var(--fg-muted)]" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Side cards recede behind a scrim so the centre one reads first. */}
                {abs > 0.05 && (
                  <div className="pointer-events-none absolute inset-0 bg-[var(--bg)]/45" />
                )}
              </div>
            </div>
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

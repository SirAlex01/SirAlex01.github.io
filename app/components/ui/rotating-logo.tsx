"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** Time a face stays up before the medallion flips. */
const FLIP_EVERY_MS = 5000;

/**
 * Portrait medallion: an animated conic accent ring around a glass disc that
 * flips every few seconds between the SA monogram and Alessio's photo.
 *
 * The flip is a 3D transform of a preserve-3d subtree carrying two images and
 * a deep shadow, so it is the most expensive repeating animation on the site.
 * It therefore runs only while the medallion is actually on screen: the timer
 * used to keep firing forever, flipping a disc several sections above the
 * reader for as long as the tab stayed open.
 */
export default function RotatingLogo() {
  const [flipped, setFlipped] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Honour the reader's motion preference: no flipping at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let kickoff: ReturnType<typeof setTimeout> | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;

    const stop = () => {
      if (kickoff) clearTimeout(kickoff);
      if (interval) clearInterval(interval);
      kickoff = null;
      interval = null;
    };

    const start = () => {
      if (interval || kickoff) return;
      // First flip shortly after arriving, then keep alternating.
      kickoff = setTimeout(() => {
        kickoff = null;
        setFlipped(true);
        interval = setInterval(() => setFlipped((prev) => !prev), FLIP_EVERY_MS);
      }, 900);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(host);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <div ref={hostRef} className="relative">
      {/* Ambient bloom behind the medallion. A gradient, not a blurred solid -
          see `.bloom` in globals.css. */}
      <div aria-hidden="true" className="bloom absolute inset-0 -z-10 scale-125" />

      <div className="conic-ring relative aspect-square w-[clamp(10rem,17vw,13.5rem)] rounded-full p-[2px]">
        <div className="relative h-full w-full [perspective:1200px]">
          <div
            className={`relative h-full w-full rounded-full transition-transform duration-[1400ms] ease-[var(--ease-in-out)] [transform-style:preserve-3d]
              ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
          >
            {/* FRONT - monogram, inverted per theme so it stays monochrome.
                Only this face is preloaded; the back is hidden until the
                first flip, so it can load lazily. */}
            <Face
              src="/logo.webp"
              alt="Alessio Maiola logo"
              imgClass="object-contain p-[5%] dark:invert"
              priority
            />
            {/* BACK - photo */}
            <Face src="/alex.webp" alt="Portrait of Alessio Maiola" imgClass="object-cover" back />
          </div>
        </div>
      </div>
    </div>
  );
}

function Face({
  src,
  alt,
  imgClass,
  back = false,
  priority = false,
}: {
  src: string;
  alt: string;
  imgClass: string;
  back?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-full border border-[var(--line)]
        bg-[var(--surface-solid)] shadow-[var(--shadow-xl)] [backface-visibility:hidden]
        ${back ? "[transform:rotateY(180deg)]" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 16vw, 50vw"
        className={imgClass}
        priority={priority}
      />
      {/* Inner rim light keeps the disc from reading as a flat cut-out. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-24px_48px_-24px_rgba(0,0,0,0.3)]"
      />
    </div>
  );
}

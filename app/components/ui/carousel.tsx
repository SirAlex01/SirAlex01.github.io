"use client";

import Image from "next/image";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import YoutubePlayer, { YouTubePlayerHandle } from "./youtube-player";

interface CarouselItem {
  src?: string;
  video?: { id: string; start?: number };
}
interface CarouselProps {
  items: CarouselItem[];
}

const SWIPE_THRESHOLD = 25;

// Iframes (YouTube) swallow pointer move/up events once a touch enters them,
// so a carousel drag can't be tracked through the video itself. These two
// transparent strips sit on top of the iframe's edges (avoiding its center,
// where the play/scrub/fullscreen controls live) purely to capture the swipe.
function SwipeShield({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const startX = React.useRef(0);
  const movedX = React.useRef(0);

  const handleDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    movedX.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    e.preventDefault();
  };

  const handleMove = (e: React.PointerEvent) => {
    movedX.current = e.clientX - startX.current;
  };

  const handleUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    if (Math.abs(movedX.current) >= SWIPE_THRESHOLD) {
      if (movedX.current > 0) onPrev();
      else onNext();
    }
  };

  const handleStyle: React.CSSProperties = {
    top: "16%",
    bottom: "16%",
    width: "clamp(8%, 64px, 12%)",
    background: "transparent",
    cursor: "default",
    touchAction: "none",
  };

  return (
    <>
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`absolute ${side}-0 z-10`}
          style={handleStyle}
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
        />
      ))}
    </>
  );
}

export default function Carousel({ items }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const playerRefs = React.useRef<(YouTubePlayerHandle | null)[]>([]);

  // Sync index & pause inactive videos
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    playerRefs.current.forEach((ref, i) => {
      if (ref && i !== idx) ref.pauseVideo();
    });
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Navigation helpers
  const goPrev = React.useCallback(() => {
    if (!emblaApi) return;
    const count = emblaApi.scrollSnapList().length;
    emblaApi.scrollTo((selectedIndex - 1 + count) % count);
  }, [emblaApi, selectedIndex]);

  const goNext = React.useCallback(() => {
    if (!emblaApi) return;
    const count = emblaApi.scrollSnapList().length;
    emblaApi.scrollTo((selectedIndex + 1) % count);
  }, [emblaApi, selectedIndex]);

  return (
    <>
      <div
      ref={emblaRef}
      className="group relative mx-auto overflow-hidden rounded-2xl shadow-lg bg-transparent
                 aspect-[16/9] w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[50vw]
                 max-h-[620px]"
      >
      {/* --- Slides --- */}
      <div className="flex h-full">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-[0_0_100%] relative flex items-center justify-center select-none"
          >
            {item.video ? (
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <SwipeShield onPrev={goPrev} onNext={goNext} />

                {/* YouTube Player */}
                <YoutubePlayer
                  ref={(el) => {
                    playerRefs.current[i] = el;
                  }}
                  videoId={item.video.id}
                  start={item.video.start}
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={item.src!}
                  alt={`CyberChallenge.IT slide ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 80vw, 90vw"
                  className="object-cover rounded-2xl select-none"
                  draggable={false}
                  priority={i === 0}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- Navigation (hidden until hover / hidden on small screens) --- */}
      <button
        onClick={goPrev}
        className="hidden sm:flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all
                   absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                   bg-neutral-200/70 dark:bg-neutral-800/70 hover:bg-neutral-300
                   dark:hover:bg-neutral-700 z-20"
      >
        <HiOutlineChevronLeft className="w-6 h-6" />
      </button>
            
      <button
        onClick={goNext}
        className="hidden sm:flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all
                   absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                   bg-neutral-200/70 dark:bg-neutral-800/70 hover:bg-neutral-300
                   dark:hover:bg-neutral-700 z-20"
      >
        <HiOutlineChevronRight className="w-6 h-6" />
      </button>
            
      {/* --- Dots (hidden on small screens + fade on hover) --- */}
      <div
        className="hidden md:flex opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all
                   absolute bottom-3 left-0 right-0 justify-center gap-2 z-20"
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === selectedIndex
                ? "bg-neutral-800 dark:bg-white scale-110"
                : "bg-neutral-400 dark:bg-neutral-600 hover:opacity-80"
            }`}
          />
        ))}
      </div>
      </div>

      {/* Mobile dots placed below the carousel */}
      <div className="flex md:hidden justify-center gap-1.5 mt-3">
        {items.map((_, i) => (
          <button
            key={`mobile-${i}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === selectedIndex
                ? "bg-neutral-800 dark:bg-white scale-110"
                : "bg-neutral-400 dark:bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </>
  );
}

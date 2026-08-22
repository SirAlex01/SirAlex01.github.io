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
          data-swipe-shield
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
    // Drags starting on a SwipeShield strip are handled entirely by that
    // component's own pointer handlers; without this, Embla's native drag
    // recognition also reacts to the same gesture and the slide can jump
    // by two instead of one.
    watchDrag: (_emblaApi, evt) =>
      !(evt.target as HTMLElement)?.closest?.("[data-swipe-shield]"),
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
      {/* The frame (border, inset, shadow) is a separate element from the
          Embla viewport. If the viewport itself carried the padding, its
          overflow would clip at the padding edge and let a sliver of the
          neighbouring slide show through. */}
      <div
        className="group relative mx-auto aspect-[16/9] max-h-[620px] w-full max-w-4xl
                   rounded-[var(--r-xl)] border border-[var(--line)] bg-[var(--surface-inset)]
                   p-1.5 shadow-[var(--shadow-lg)]"
      >
      <div ref={emblaRef} className="h-full w-full overflow-hidden rounded-[var(--r-lg)]">
      {/* --- Slides --- */}
      <div className="flex h-full">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative flex min-w-0 flex-[0_0_100%] select-none items-center justify-center"
          >
            {item.video ? (
              <div className="relative h-full w-full overflow-hidden rounded-[var(--r-lg)]">
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
              <div className="relative h-full w-full overflow-hidden rounded-[var(--r-lg)]">
                <Image
                  src={item.src!}
                  alt={`CyberChallenge.IT slide ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 55vw, (min-width: 768px) 80vw, 90vw"
                  className="select-none object-cover"
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      </div>

      {/* --- Navigation (hidden until hover / hidden on small screens) --- */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-[var(--line)]
                   bg-[var(--surface-solid)]/80 p-2.5 text-[var(--fg)] opacity-0 shadow-[var(--shadow-md)]
                   backdrop-blur-md transition-all duration-300 pointer-events-none
                   hover:border-[var(--accent-ring)] hover:bg-[var(--surface-solid)]
                   group-hover:pointer-events-auto group-hover:opacity-100 sm:flex"
      >
        <HiOutlineChevronLeft className="w-6 h-6" />
      </button>
            
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-[var(--line)]
                   bg-[var(--surface-solid)]/80 p-2.5 text-[var(--fg)] opacity-0 shadow-[var(--shadow-md)]
                   backdrop-blur-md transition-all duration-300 pointer-events-none
                   hover:border-[var(--accent-ring)] hover:bg-[var(--surface-solid)]
                   group-hover:pointer-events-auto group-hover:opacity-100 sm:flex"
      >
        <HiOutlineChevronRight className="w-6 h-6" />
      </button>
            
      {/* --- Dots (desktop: floating over the slide, on hover) --- */}
      <div
        className="pointer-events-none absolute bottom-4 left-0 right-0 z-20 hidden justify-center
                   opacity-0 transition-all duration-300 group-hover:pointer-events-auto
                   group-hover:opacity-100 md:flex"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-solid)]/75 px-3 py-2 backdrop-blur-md">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-6 bg-[var(--accent)]"
                  : "w-1.5 bg-[var(--line-strong)] hover:bg-[var(--fg-subtle)]"
              }`}
            />
          ))}
        </div>
      </div>
      </div>

      {/* Mobile dots placed below the carousel */}
      <div className="mt-4 flex justify-center gap-1.5 md:hidden">
        {items.map((_, i) => (
          <button
            key={`mobile-${i}`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-[var(--line-strong)]"
            }`}
          />
        ))}
      </div>
    </>
  );
}

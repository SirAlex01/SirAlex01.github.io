"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  mp4: string;
  className?: string;
}

/**
 * Autoplaying loop that only exists while it is worth existing.
 *
 * Two separate savings, and the second is the one that was missing: the
 * element is not created until it is near the viewport, *and* it is paused
 * again once it leaves. A looping video keeps decoding frames for as long as
 * it is playing whether or not anyone can see it, and the /projects grid can
 * hold several of them - so scrolling past the top of that page used to leave
 * a decoder running per card for the rest of the visit.
 */
export default function LazyVideo({ mp4, className }: LazyVideoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          // `autoPlay` covers the first pass; this covers every return.
          videoRef.current?.play().catch(() => {
            // Autoplay can be refused (low power mode, for one). The poster
            // frame is still the right thing to show, so there is nothing to
            // recover from.
          });
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(host);

    return () => {
      observer.disconnect();

      // Detaching a media element does not, on its own, free what it has
      // buffered or the decoder behind it. Clearing the source and reloading
      // is the documented way to make the browser let go.
      // Found through `host`, not through the ref: React has already cleared
      // the ref by the time a cleanup runs.
      const video = host.querySelector("video");
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {mounted && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          src={mp4}
          className={className}
        />
      )}
    </div>
  );
}

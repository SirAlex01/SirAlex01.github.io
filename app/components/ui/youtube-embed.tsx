"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

export interface YouTubeEmbedHandle {
  /** Pauses playback if this embed has been opened; a no-op otherwise. */
  pause: () => void;
}

interface YouTubeEmbedProps {
  videoId: string;
  start?: number;
  title: string;
}

/**
 * A YouTube video that costs a thumbnail until someone wants to watch it.
 *
 * The player used to be mounted for every video slide as soon as the section
 * rendered. Each one pulls in YouTube's iframe API and a full embedded player
 * - hundreds of kilobytes of third-party JavaScript, several network round
 * trips and a live iframe with its own event loop - for a slide most readers
 * scroll straight past. Two of them, before a single frame of video is asked
 * for.
 *
 * Now the slide is an image and a play button. The iframe is created on the
 * first click, and only then, which also removes the `react-youtube`
 * dependency and the ~35 KB wrapper it brought with it.
 *
 * Control still works without that wrapper: `enablejsapi=1` lets the carousel
 * pause a playing video with a postMessage when the reader swipes away.
 * `youtube-nocookie.com` is the privacy-preserving host, and it behaves
 * identically.
 */
const YouTubeEmbed = forwardRef<YouTubeEmbedHandle, YouTubeEmbedProps>(
  ({ videoId, start = 0, title }, ref) => {
    const [active, setActive] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        pause: () => {
          iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
            "https://www.youtube-nocookie.com"
          );
        },
      }),
      []
    );

    const open = useCallback(() => setActive(true), []);

    if (active) {
      const params = new URLSearchParams({
        autoplay: "1",
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
        enablejsapi: "1",
        // Documented alongside `enablejsapi`: it tells the player which page
        // is allowed to command it, which is what makes `pause()` below land.
        // Safe to read here - this branch only ever renders after a click.
        origin: window.location.origin,
        ...(start ? { start: String(start) } : null),
      });

      return (
        <iframe
          ref={iframeRef}
          className="h-full w-full rounded-[var(--r-lg)]"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      );
    }

    return (
      <button
        type="button"
        onClick={open}
        aria-label={`Play video: ${title}`}
        className="group relative h-full w-full overflow-hidden rounded-[var(--r-lg)] bg-[var(--bg-sunk)]"
      >
        {/* A plain <img>: the source is a remote thumbnail on a static export
            with image optimisation switched off, so next/image would emit the
            same tag with extra machinery around it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <span className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-[var(--t-base)] group-hover:bg-black/35" />

        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/55 pl-1 text-xl text-white transition-transform duration-[var(--t-base)] ease-[var(--ease-out)] group-hover:scale-110">
          <FaPlay aria-hidden="true" />
        </span>
      </button>
    );
  }
);

YouTubeEmbed.displayName = "YouTubeEmbed";
export default YouTubeEmbed;

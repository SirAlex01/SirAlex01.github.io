"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

export interface YouTubePlayerHandle {
  pauseVideo: () => void;
  getPlayer: () => YouTubePlayer | null;
}

interface YoutubePlayerProps {
  videoId: string;
  start?: number;
}

const YoutubePlayer = forwardRef<YouTubePlayerHandle, YoutubePlayerProps>(
  ({ videoId, start = 0 }, ref) => {
    const playerRef = useRef<YouTubePlayer | null>(null);

    const opts: YouTubeProps["opts"] = {
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
        start,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1, // required for JS control
      },
    };

    const onReady: YouTubeProps["onReady"] = (e) => {
      playerRef.current = e.target;
    };

    useImperativeHandle(ref, () => ({
      pauseVideo: () => {
        const p = playerRef.current;
        if (p && typeof p.pauseVideo === "function") p.pauseVideo();
      },
      getPlayer: () => playerRef.current,
    }));

    return (
      <div className="w-full h-full pointer-events-auto">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          className="w-full h-full rounded-2xl overflow-hidden"
          iframeClassName="w-full h-full rounded-2xl overflow-hidden"
        />
      </div>
    );
  }
);

YoutubePlayer.displayName = "YoutubePlayer";
export default YoutubePlayer;

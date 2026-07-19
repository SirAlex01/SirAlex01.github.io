"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  mp4: string;
  className?: string;
}

export default function LazyVideo({ mp4, className }: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {isVisible && (
        <video autoPlay loop muted playsInline src={mp4} className={className} />
      )}
    </div>
  );
}

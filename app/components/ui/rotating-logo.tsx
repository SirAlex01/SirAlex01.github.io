"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/transparent.webp", "/alex.webp"];

export default function RotatingLogo() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // First flip
    setFlipped(true);

    // Continue flipping every 5 seconds
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-48 h-48 aspect-square rounded-full backdrop-blur-sm overflow-hidden perspective-[1000px] shadow-[0_8px_25px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_25px_rgba(255,255,255,0.05)]">
      <div
        className={`relative w-full h-full rounded-full shadow-lg transition-transform duration-3000 [transform-style:preserve-3d]
          ${flipped ? "rotate-y-180" : ""}
        `}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full backface-hidden overflow-hidden">
          <Image
            src={images[0]}
            alt="Alessio Maiola Logo"
            fill       // 👈 makes it fill the parent div
            className="object-cover rounded-full"
          />
        </div>
        {/* BACK */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full rotate-y-180 backface-hidden overflow-hidden">
          <Image
            src={images[1]}
            alt="Alessio Maiola Picture"
            fill       // 👈 also fills
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

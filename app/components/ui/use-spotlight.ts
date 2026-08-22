"use client";

import { useCallback } from "react";

/**
 * Feeds the pointer position into the `--mx` / `--my` custom properties that
 * the `.spotlight` class reads, so a card's glow tracks the cursor.
 *
 * Spread the returned props onto any element that also has `.spotlight`.
 */
export default function useSpotlight() {
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return { onPointerMove };
}

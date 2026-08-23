"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Feeds the pointer position into the `--mx` / `--my` custom properties that
 * the `.spotlight` class reads, so a card's glow tracks the cursor.
 *
 * Spread the returned props onto any element that also has `.spotlight`.
 *
 * Two things keep this cheap, both of which the naive version got wrong:
 *
 * - It ignores anything that is not a mouse. A touch drag across a card emits
 *   a stream of pointermove events, and every one of them used to repaint the
 *   card's gradient - on the device least able to afford it, for a glow that
 *   is invisible without a cursor to track.
 * - It coalesces into an animation frame. Pointer events fire faster than the
 *   screen refreshes, and the handler measures the element, so the unthrottled
 *   version forced a layout several times per frame to produce one visible
 *   result.
 */
export default function useSpotlight() {
  const frame = useRef(0);
  const pending = useRef<{ el: HTMLElement; x: number; y: number } | null>(null);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      // Drop the element reference too: `pending` outlives the frame that
      // used it, and a ref still pointing at a removed node keeps it alive.
      pending.current = null;
    },
    []
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;

    pending.current = { el: e.currentTarget, x: e.clientX, y: e.clientY };
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const next = pending.current;
      if (!next) return;

      pending.current = null;

      const rect = next.el.getBoundingClientRect();
      next.el.style.setProperty("--mx", `${((next.x - rect.left) / rect.width) * 100}%`);
      next.el.style.setProperty("--my", `${((next.y - rect.top) / rect.height) * 100}%`);
    });
  }, []);

  return { onPointerMove };
}

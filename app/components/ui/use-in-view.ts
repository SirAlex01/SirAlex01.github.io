"use client";

import { useEffect, useRef } from "react";

/**
 * One IntersectionObserver for the whole site.
 *
 * Every scroll entrance on the page goes through here. The alternative - the
 * one the animation library used, and the one an ad-hoc `useEffect` in each
 * component would use - is an observer *per animated element*: forty-odd of
 * them on the home page, each with its own callback closure and its own entry
 * in the browser's intersection bookkeeping, all recomputed on every scroll
 * frame. A single observer with forty targets costs the browser one pass.
 *
 * The callback only adds a class. It never sets React state, so scrolling
 * past the page never renders a component.
 *
 * Targets are unobserved the moment they fire: an entrance plays once, so
 * keeping the element under observation afterwards is pure overhead, and
 * dropping it also releases the callback for collection.
 */

const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const run = callbacks.get(entry.target);
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
        run?.();
      }
    },
    // The element has to clear the fold by 80px before it counts as arrived,
    // so an entrance never plays half off the bottom of the screen. No
    // threshold: a tall block should start as soon as its top edge crosses,
    // not once some fraction of a full-height section is on screen.
    { rootMargin: "0px 0px -80px 0px" }
  );

  return observer;
}

/** Registers `onEnter` to run once, the first time `el` reaches the viewport. */
export function observeOnce(el: Element, onEnter: () => void): () => void {
  const io = getObserver();
  callbacks.set(el, onEnter);
  io.observe(el);

  return () => {
    callbacks.delete(el);
    io.unobserve(el);
  };
}

/**
 * Ref to attach to an element that should gain `className` when it scrolls
 * into view. Adding the class directly, rather than flipping state, keeps the
 * whole entrance out of React's hands.
 */
export default function useInView<T extends HTMLElement>(className = "is-in") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return observeOnce(el, () => el.classList.add(className));
  }, [className]);

  return ref;
}

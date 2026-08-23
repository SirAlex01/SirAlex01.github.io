"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { Menu } from "lucide-react";
import { navLinks } from "./nav-links";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "../ui/theme-toggle";

/** Scroll distance at which the bar condenses into its pill. */
const CONDENSE_AT = 24;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /**
   * The site's only scroll listener.
   *
   * It feeds two things that used to be separate: whether the bar is
   * condensed, and how far down the page the reader is. The second used to be
   * a spring animation in the animation library, which ran a JS frame loop
   * for the entire time anyone was scrolling; it is now one custom property
   * that CSS scales the hairline from, so scrolling costs a single style
   * write and no React render at all.
   *
   * Coalesced into an animation frame, because a scroll event can fire many
   * times per frame and there is no point computing this more than once per
   * paint. The page height is cached and refreshed by a ResizeObserver rather
   * than measured inside the handler - reading it there would force a layout
   * on every frame of every scroll.
   */
  useEffect(() => {
    const bar = barRef.current;
    let frame = 0;
    let scrollable = 0;

    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > CONDENSE_AT);
      bar?.style.setProperty(
        "--scroll-progress",
        scrollable > 0 ? String(Math.min(y / scrollable, 1)) : "0"
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    // Run immediately on mount so a reload part-way down the page is correct.
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // The document grows as below-the-fold sections stream in and as images
    // settle, so the scrollable height has to be re-measured rather than
    // taken once at mount.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, []);

  const rawPathname = usePathname();
  const pathname = rawPathname?.replace(/\/$/, "") || "/";

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
        {/* `.navbar-shell` carries the condense transition; see globals.css. */}
        <div
          ref={barRef}
          className={`navbar-shell mx-auto flex w-[calc(100%-1.5rem)] items-center justify-between
            ${
              scrolled
                ? "glass mt-2 max-w-5xl rounded-full border border-[var(--line-strong)] bg-[var(--surface-nav)] px-3 py-2 shadow-[var(--shadow-md)] sm:px-4"
                : "mt-0 max-w-6xl rounded-none border border-transparent bg-transparent px-5 py-3 shadow-none sm:px-8"
            }`}
        >
          <Link
            href="/"
            aria-label="Alessio Maiola - home"
            className="group relative flex items-center"
          >
            <Image
              src="/logo.webp"
              alt=""
              width={48}
              height={48}
              priority
              className={`transition-[width,height] duration-[var(--t-base)] ease-[var(--ease-out)] dark:invert
                ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
            />
            <span className="bloom pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-[var(--t-base)] group-hover:opacity-100" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const normalized = link.path.replace(/\/$/, "") || "/";
              const isActive = pathname === normalized;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-[var(--t-base)]
                    ${
                      isActive
                        ? "text-[var(--fg)]"
                        : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                    }`}
                >
                  {/* A plain span, not a shared-layout animation. The pill can
                      only move when the route changes, which unmounts the page
                      anyway, so the slide was never actually visible. */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--accent-ring)] bg-[var(--accent-soft)]"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            {!isOpen && (
              <button
                type="button"
                onClick={toggleMenu}
                className="btn-icon md:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu size={22} />
              </button>
            )}
          </div>

          {scrolled && <div aria-hidden="true" className="nav-progress" />}
        </div>
      </header>

      {/* Spacer so content never starts underneath the bar. */}
      <div className="h-[var(--nav-h)]" aria-hidden="true" />

      {mounted &&
        isOpen &&
        createPortal(<MobileMenu links={navLinks} onClose={closeMenu} />, document.body)}
    </>
  );
}

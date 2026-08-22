"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "./nav-links";
import MobileMenu from "./mobile-menu";
import ThemeToggle from "../ui/theme-toggle";
import ScrollProgress from "../ui/scroll-progress";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => setScrolled(window.scrollY > 24);

    // Run immediately on mount so a reload part-way down the page is correct.
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rawPathname = usePathname();
  const pathname = rawPathname?.replace(/\/$/, "") || "/";

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[var(--ease-out)]
            ${
              scrolled
                ? "mt-2 max-w-5xl rounded-full border border-[var(--line-strong)] bg-[var(--surface-nav)] px-3 py-2 shadow-[var(--shadow-md)] backdrop-blur-xl sm:px-4"
                : "mt-0 max-w-6xl rounded-none border border-transparent bg-transparent px-5 py-3 shadow-none sm:px-8"
            }`}
          style={{ width: "calc(100% - 1.5rem)" }}
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
              className={`transition-all duration-500 ease-[var(--ease-out)] group-hover:scale-110 dark:invert
                ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
            />
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--accent-glow)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          </Link>

          {/* Desktop links - the active pill slides between items. */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const normalized = link.path.replace(/\/$/, "") || "/";
              const isActive = pathname === normalized;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "text-[var(--fg)]"
                        : "text-[var(--fg-subtle)] hover:text-[var(--fg)]"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--accent-ring)] bg-[var(--accent-soft)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            {mounted && <ThemeToggle />}
            {mounted && !isOpen && (
              <button
                onClick={toggleMenu}
                className="btn-icon md:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
              >
                <Menu size={22} />
              </button>
            )}
          </div>

          {scrolled && <ScrollProgress />}
        </div>
      </header>

      {/* Spacer so content never starts underneath the bar. */}
      <div className="h-[var(--nav-h)]" aria-hidden="true" />

      {mounted &&
        isOpen &&
        createPortal(
          <MobileMenu links={navLinks} onClose={toggleMenu} />,
          document.body
        )}
    </>
  );
}

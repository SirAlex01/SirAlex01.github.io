"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import MobileMenuLink from "./mobile-menu-link";
import { contacts } from "../contact-data";

interface MobileMenuProps {
  links: { name: string; path: string; icon: React.ReactNode }[];
  onClose: () => void;
}

/** Must match the drawer's slide-out transition, below. */
const CLOSE_MS = 300;

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);

  // The drawer unmounts itself once it has slid out, so the timer that does
  // the unmounting has to be cancellable - closing twice, or unmounting from
  // somewhere else mid-slide, would otherwise leave it pending.
  const handleClose = useCallback(() => {
    setVisible(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  // Animate the drawer in on mount, and never leave a timer behind.
  useEffect(() => {
    setVisible(true);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Close on outside click or Escape.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleClose]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[var(--z-overlay)] flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-[var(--t-base)]
          ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        ref={menuRef}
        className={`glass relative z-10 flex h-full w-[min(20rem,85vw)] flex-col border-l border-[var(--line)]
          bg-[var(--surface-solid)]/95 p-6 transition-transform duration-[var(--t-base)] ease-[var(--ease-out)]
          ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="eyebrow">Menu</span>
          <button onClick={handleClose} className="btn-icon" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link, i) => (
            <div
              key={link.path}
              style={{ transitionDelay: `${visible ? 60 + i * 50 : 0}ms` }}
              className={`transition-[opacity,translate] duration-[var(--t-slow)] ease-[var(--ease-out)]
                ${visible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            >
              <MobileMenuLink
                name={link.name}
                path={link.path}
                icon={link.icon}
                onClick={handleClose}
              />
            </div>
          ))}
        </nav>

        <div className="mt-auto">
          <hr className="rule mb-5" />
          <div className="flex items-center gap-2">
            {contacts.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn-icon text-lg"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

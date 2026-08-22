"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import MobileMenuLink from "./mobile-menu-link";
import { contacts } from "../contact-data";

interface MobileMenuProps {
  links: { name: string; path: string; icon: React.ReactNode }[];
  onClose: () => void;
}

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  // Animate the drawer in on mount.
  useEffect(() => setVisible(true), []);

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
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        ref={menuRef}
        className={`relative z-10 flex h-full w-[min(20rem,85vw)] flex-col border-l border-[var(--line)]
          bg-[var(--surface-solid)]/95 p-6 backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out)]
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
              style={{ transitionDelay: `${visible ? 80 + i * 60 : 0}ms` }}
              className={`transition-all duration-500 ease-[var(--ease-out)]
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

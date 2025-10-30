"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import MobileMenuLink from "./mobile-menu-link";

interface MobileMenuProps {
  links: { name: string; path: string; icon: React.ReactNode }[];
  onClose: () => void;
}

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 400);
  }, [onClose]);

  // Animate drawer opening
  useEffect(() => setVisible(true), []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
    {/* Overlay that starts below the navbar */}
      <div
        className={`absolute left-0 right-0 top-[70px] bottom-0 transition-opacity duration-400 ease-in-out
          bg-black/5 dark:bg-black/30
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className={`relative z-50 w-72 h-full flex flex-col p-6 transform transition-transform duration-400 ease-in-out
          bg-white/80 text-neutral-900 dark:bg-black/80 dark:text-white
          backdrop-blur-lg border-l border-neutral-200 dark:border-neutral-800
          transition-colors duration-500
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-4 transition-colors duration-500">
          <h3 className="text-neutral-700 dark:text-neutral-300 font-semibold text-xl transition-colors duration-500">
            Menu
          </h3>
          <div className="w-full border-b border-neutral-300 dark:border-neutral-700 mt-2 transition-colors duration-500" />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 mt-2">
          {links.map((link) => (
            <MobileMenuLink
              key={link.path}
              name={link.name}
              path={link.path}
              icon={link.icon}
              onClick={handleClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

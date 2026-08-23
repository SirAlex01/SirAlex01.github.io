"use client";

import { useCallback } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Light/dark switch.
 *
 * Self-contained on purpose. This used to read a React context that wrapped
 * the entire application, which meant flipping the theme re-rendered every
 * component on the page - to change one class on <html>, which CSS then
 * handles on its own. Nothing else ever consumed that context.
 *
 * The two icons are both rendered and crossfaded by CSS off the `.dark` class
 * (see `.theme-toggle__icon` in globals.css), so the button holds no state,
 * has nothing to hydrate and cannot mismatch the class the boot script wrote
 * before first paint.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = useCallback(() => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Private mode or blocked storage: the theme just will not persist.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className={`btn-icon relative overflow-hidden ${className}`}
    >
      <span aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--light">
        <Moon size={18} />
      </span>
      <span aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--dark">
        <Sun size={18} />
      </span>
    </button>
  );
}

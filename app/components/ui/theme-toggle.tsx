"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full transition-colors duration-300 cursor-pointer
        text-neutral-600 hover:text-black hover:bg-neutral-200/60
        dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/60
        focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700
        ${className}`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

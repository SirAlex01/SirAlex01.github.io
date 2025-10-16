"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface MobileMenuLinkProps {
  name: string;
  path: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function MobileMenuLink({
  name,
  path,
  icon,
  onClick,
}: MobileMenuLinkProps) {
  const pathname = usePathname();
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const isActive = pathname === normalizedPath;

  return (
    <Link
      href={path}
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
        ${
          isActive
            ? "bg-neutral-200 text-white dark:bg-neutral-800 dark:text-white"
            : "text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
        }
        transition-colors duration-500
      `}
    >
      {/* Icon */}
      <span
        className={`transition-colors duration-300 ease-in-out ${
          isActive
            ? "text-black dark:text-white"
            : "text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200"
        }`}
      >
        {icon}
      </span>

      {/* Text */}
      <span
        className={`font-sans text-lg transition-colors duration-300 ease-in-out ${
          isActive
            ? "text-black dark:text-white"
            : "text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200"
        }`}
      >
        {name}
      </span>
    </Link>
  );
}

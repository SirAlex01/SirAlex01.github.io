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
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-[var(--r-md)] border px-4 py-3 text-base font-medium
        transition-all duration-[var(--t-base)] ease-[var(--ease-out)]
        ${
          isActive
            ? "border-[var(--accent-ring)] bg-[var(--accent-soft)] text-[var(--fg)]"
            : "border-transparent text-[var(--fg-muted)] hover:border-[var(--line)] hover:bg-[var(--surface-inset)] hover:text-[var(--fg)]"
        }`}
    >
      <span
        className={`transition-colors duration-[var(--t-base)] ${
          isActive ? "text-[var(--accent-text)]" : "text-[var(--fg-subtle)] group-hover:text-[var(--fg)]"
        }`}
      >
        {icon}
      </span>
      {name}
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  label: string;
  icon?: ReactNode;
  /** Rendered after the label - use for arrows and other trailing affordances. */
  trailingIcon?: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: Variant;
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * The site's only button. Visual variants live in globals.css (`.btn`,
 * `.btn-primary`…) so they stay in step with the rest of the design system.
 */
export default function PrimaryButton({
  label,
  icon,
  trailingIcon,
  onClick,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} group ${className}`;

  const content = (
    <>
      {icon && <span className="shrink-0 text-[1.1em]">{icon}</span>}
      {label}
      {trailingIcon !== undefined ? (
        trailingIcon
      ) : variant === "primary" ? (
        <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (href && !external && href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

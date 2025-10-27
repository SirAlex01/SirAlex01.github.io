"use client";

import { FiArrowRight } from "react-icons/fi";

interface PrimaryButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function PrimaryButton({
  label,
  icon = <FiArrowRight />,
  onClick,
  href,
}: PrimaryButtonProps) {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className="
        inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-xl
        dark:bg-neutral-900 bg-neutral-100
        dark:text-white text-neutral-900
        font-semibold text-base sm:text-lg
        hover:opacity-90 transition-transform duration-300
        hover:-translate-y-0.5 active:scale-95
      "
    >
      {icon}
      {label}
    </Component>
  );
}

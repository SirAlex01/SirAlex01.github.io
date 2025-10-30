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
        inline-flex items-center gap-2 px-6 py-3 rounded-xl
        bg-neutral-100 dark:bg-neutral-900
        text-neutral-900 dark:text-white
        font-semibold text-base sm:text-lg
        hover:bg-neutral-200 dark:hover:bg-neutral-800
        hover:shadow-md
        transition-all duration-300
        hover:-translate-y-0.5 active:scale-95
      "
    >
      {icon}
      {label}
    </Component>
  );
}

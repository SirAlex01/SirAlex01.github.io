"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { EducationItem } from "../home-sections/education/education-data";

export default function EducationCard({
  title,
  school,
  years,
  thesis,
  mark,
  icon = "graduation-cap",
  link,
}: EducationItem) {
  // Dynamically get the Lucide icon component
  const iconName = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof Icons;

  const IconComponent = (Icons[iconName] ?? Icons.GraduationCap) as React.ComponentType<{
    className?: string;
  }>;

  const Card = (
    <div
      className="flex items-center gap-4 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800
                 bg-white/70 dark:bg-neutral-900/50 shadow-sm transition-all duration-300 ease-out
                 backdrop-blur-sm max-w-sm w-full transform hover:scale-105"
    >
      {/* Icon (centered) */}
      <div className="flex-shrink-0 flex justify-center items-center w-12">
        <IconComponent className="w-9 h-9 text-neutral-800 dark:text-neutral-200" />
      </div>

      {/* Text content */}
      <div className="flex flex-col text-left">
        <h5 className="text-base font-semibold text-neutral-800 dark:text-white">
          {title}
        </h5>
        <p className="text-sm text-neutral-700 dark:text-neutral-400">{school}</p>
        <p className="text-sm text-neutral-700 dark:text-neutral-400 mb-1">{years}</p>

        {thesis && (
          <p className="text-sm text-neutral-800 dark:text-neutral-300">
            <span className="font-medium">Thesis:</span> {thesis}
          </p>
        )}

        <p className="text-sm text-neutral-800 dark:text-neutral-300">
          <span className="font-medium">Mark:</span> {mark}
        </p>
      </div>
    </div>
  );

  // ✅ Wrap in link if provided (no style change)
  if (link) {
    const isExternal = link.startsWith("http");
    return isExternal ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {Card}
      </a>
    ) : (
      <Link href={link}>{Card}</Link>
    );
  }

  return Card;
}

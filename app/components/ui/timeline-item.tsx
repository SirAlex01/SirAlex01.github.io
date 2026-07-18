"use client";

import * as Icons from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WorkItem } from "../home-sections/work/work-data";

interface TimelineItemProps extends WorkItem {
  index: number;
}

export default function TimelineItem({
  role,
  company,
  location,
  period,
  current = false,
  icon = "briefcase",
  logo,
  bullets,
  link,
  index,
}: TimelineItemProps) {
  const iconName = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof Icons;

  const IconComponent = (Icons[iconName] ?? Icons.Briefcase) as React.ComponentType<{
    className?: string;
  }>;

  const CompanyName = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline underline-offset-2"
    >
      {company}
    </a>
  ) : (
    company
  );

  return (
    <div className="relative flex gap-5 sm:gap-8">
      {/* --- Node: dot on the timeline --- */}
      <div className="relative flex-shrink-0 w-14 sm:w-20 flex justify-center">
        {current && (
          <motion.span
            className="absolute top-0 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-blue-400/40 dark:bg-blue-500/30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 200 }}
          className="relative z-10 w-14 h-14 sm:w-20 sm:h-20 rounded-full p-[2px]
                     bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md shadow-blue-500/20"
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center overflow-hidden
                       bg-white dark:bg-neutral-950"
          >
            {logo ? (
              <Image
                src={logo}
                alt={`${company} logo`}
                width={56}
                height={56}
                className="object-contain w-10 h-10 sm:w-14 sm:h-14"
              />
            ) : (
              <IconComponent className="w-7 h-7 sm:w-9 sm:h-9 text-neutral-800 dark:text-neutral-200" />
            )}
          </div>
        </motion.div>
      </div>

      {/* --- Card --- */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1, ease: "easeOut" }}
        className="flex-1 pb-6 sm:pb-8"
      >
        <div
          className="text-left rounded-2xl border border-neutral-200 dark:border-neutral-800
                     bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm
                     p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                     hover:border-blue-400/60 dark:hover:border-blue-500/50"
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <h5 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-white">
              {role}
            </h5>
            {current && (
              <span className="text-[11px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-400">{CompanyName}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-3 whitespace-nowrap">
            {location} · {period}
          </p>

          <ul className="space-y-1.5">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

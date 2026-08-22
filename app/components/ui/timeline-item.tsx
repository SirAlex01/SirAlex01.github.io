"use client";

import * as Icons from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WorkItem } from "../home-sections/work/work-data";
import useSpotlight from "./use-spotlight";

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
  const spotlight = useSpotlight();

  const iconName = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as keyof typeof Icons;

  const IconComponent = (Icons[iconName] ?? Icons.Briefcase) as React.ComponentType<{
    className?: string;
  }>;

  return (
    <div className="relative flex gap-5 sm:gap-8">
      {/* --- Node on the rail --- */}
      <div className="relative flex w-14 shrink-0 justify-center sm:w-20">
        {current && (
          <motion.span
            className="absolute top-0 h-14 w-14 rounded-full bg-[var(--accent)] sm:h-20 sm:w-20"
            animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12, type: "spring", stiffness: 190 }}
          className={`relative z-10 h-14 w-14 rounded-full p-[1.5px] shadow-[var(--shadow-md)] sm:h-20 sm:w-20
            ${current ? "bg-[var(--accent)]" : "bg-[var(--line-strong)]"}`}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[var(--surface-solid)]">
            {logo ? (
              <Image
                src={logo}
                alt={`${company} logo`}
                width={56}
                height={56}
                className="h-9 w-9 object-contain sm:h-12 sm:w-12"
              />
            ) : (
              <IconComponent className="h-6 w-6 text-[var(--accent-text)] sm:h-8 sm:w-8" />
            )}
          </div>
        </motion.div>
      </div>

      {/* --- Card --- */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.12 + 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="min-w-0 flex-1 pb-8 sm:pb-12"
      >
        <article
          {...spotlight}
          className="card card-interactive spotlight group p-5 text-left sm:p-7"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="title-sm text-[var(--fg)]">{role}</h3>
            {current && (
              <span className="chip chip-accent chip-mono">
                <span className="status-dot" aria-hidden="true" />
                Current
              </span>
            )}
          </div>

          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[var(--fg)] transition-colors duration-300 hover:text-[var(--accent-text)]"
              >
                {company}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="font-medium text-[var(--fg)]">{company}</span>
            )}
            <span aria-hidden="true" className="text-[var(--fg-subtle)]">·</span>
            <span className="font-mono text-xs tracking-wide text-[var(--fg-subtle)]">
              {location}
            </span>
            <span aria-hidden="true" className="text-[var(--fg-subtle)]">·</span>
            <span className="font-mono text-xs tracking-wide text-[var(--fg-subtle)]">
              {period}
            </span>
          </p>

          <hr className="rule my-5" />

          <ul className="space-y-2.5">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-muted)] sm:text-[0.9375rem]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                />
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      </motion.div>
    </div>
  );
}

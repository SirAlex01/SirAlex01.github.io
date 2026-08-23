"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { skillCategories } from "../skills-data";
import { Section, SectionHeader } from "../ui/section";
import Reveal from "../ui/reveal";

export default function Skills() {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleOpen = (i: number) =>
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <Section id="skills" tinted>
      <SectionHeader title="Skills & Expertise" />

      <Reveal className="mt-10">
        <div className="card overflow-hidden p-0">
          {skillCategories.map((cat, i) => {
            const isOpen = openItems.includes(i);
            const panelId = `skills-panel-${i}`;

            return (
              <div
                key={cat.title}
                className={
                  i < skillCategories.length - 1 ? "border-b border-[var(--line)]" : ""
                }
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-[var(--surface-inset)] sm:gap-4 sm:px-6"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--r-sm)] border text-base transition-colors duration-300 sm:h-10 sm:w-10 sm:text-lg
                      ${
                        isOpen
                          ? "border-[var(--accent-ring)] bg-[var(--accent-soft)] text-[var(--fg)]"
                          : "border-[var(--line)] bg-[var(--surface-inset)] text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                      }`}
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>

                  <span className="min-w-0 flex-1 text-sm font-semibold text-[var(--fg)] sm:text-base">
                    {cat.title}
                  </span>

                  <motion.span
                    className="shrink-0 text-[var(--fg-subtle)] group-hover:text-[var(--fg)]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Indented to line up with the title on ≥sm; full width
                          on phones, where the extra indent would squeeze the
                          longer skill lines into unreadable columns.
                          The top padding keeps the first row clear of the
                          row button's hover highlight, which ends flush at
                          this element's top edge. */}
                      <ul className="grid gap-x-8 gap-y-2.5 px-4 pb-5 pt-2 sm:grid-cols-2 sm:px-6 sm:pb-6 sm:pl-[4.5rem] sm:pt-3">
                        {cat.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--fg-muted)]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.6em] h-px w-2.5 shrink-0 bg-[var(--line-strong)]"
                            />
                            <span className="min-w-0">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}

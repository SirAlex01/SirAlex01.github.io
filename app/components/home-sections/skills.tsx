"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../skills-data";

export default function Skills() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleOpen = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <section className="px-6 py-8 flex flex-col items-center text-center">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
        Skills & Expertise
      </h3>

      {/* ✅ Single box around all skills */}
      <div className="mt-8 w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {skillCategories.map((cat, i) => {
          const isOpen = openItems.includes(i);
          return (
            <div key={cat.title}>
              {/* Clickable row */}
              <div
                className="px-6 py-4 cursor-pointer flex items-center justify-between
                           hover:bg-neutral-100 dark:hover:bg-neutral-800
                           transition-colors duration-200"
                onClick={() => toggleOpen(i)}
              >
                <div className="flex items-center gap-3 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  <span className="text-2xl">{cat.icon}</span>
                  {cat.title}
                </div>
                <motion.span
                  className="text-neutral-600 dark:text-neutral-400 text-xl font-bold"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  ▼
                </motion.span>
              </div>

              {/* Expandable list */}
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-10 pb-3 text-left text-sm sm:text-base overflow-hidden 
                               text-neutral-700 dark:text-neutral-300 list-disc"
                  >
                    {cat.skills.map((skill) => (
                      <li key={skill} className="py-1">
                        {skill}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Divider inside box (except last) */}
              {i < skillCategories.length - 1 && (
                <div className="border-b border-neutral-300 dark:border-neutral-700" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

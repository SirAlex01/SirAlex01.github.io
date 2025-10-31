"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../skills-data";
import { SectionWrapper, SectionTitle } from "../ui/section-wrapper";

export default function Skills() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleOpen = (i: number) => {
    setOpenItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <SectionWrapper className="px-6">
      <SectionTitle>Skills & Expertise</SectionTitle>

      {/* Unified box */}
      <div className="mt-8 w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        {skillCategories.map((cat, i) => {
          const isOpen = openItems.includes(i);
          return (
            <div key={cat.title}>
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

              <motion.div
                initial={false}
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                  open: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="px-10 text-left text-sm sm:text-base text-neutral-700 dark:text-neutral-300 overflow-hidden"
                style={{ pointerEvents: isOpen ? "auto" : "none", willChange: "height, opacity" }}
              >
                <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="before:content-['•'] before:mr-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {i < skillCategories.length - 1 && (
                <div className="border-b border-neutral-300 dark:border-neutral-700" />
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

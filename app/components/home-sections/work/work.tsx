"use client";

import { motion } from "framer-motion";
import TimelineItem from "../../ui/timeline-item";
import { workData } from "./work-data";
import { Section, SectionHeader } from "../../ui/section";

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader
        title="Work Experience"
        lead="My contributions and what I've learned: designing, building, securing, and shipping systems."
      />

      <div className="relative mt-14">
        {/* Rail, drawn downwards as the section scrolls into view. */}
        <motion.div
          className="absolute left-7 top-7 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[var(--line-strong)] to-transparent sm:left-10 sm:top-10"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {workData.map((item, index) => (
          <TimelineItem
            key={`${item.company}-${item.role}`}
            {...item}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}

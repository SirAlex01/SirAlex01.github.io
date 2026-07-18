"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import workAnimation from "@/public/animations/work.json";
import TimelineItem from "../../ui/timeline-item";
import { workData } from "./work-data";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../../ui/section-wrapper";

export default function Work() {
  return (
    <SectionWrapper className="px-6">
      <SectionTitle>Work Experience</SectionTitle>

      <SectionSubtitle className="max-w-none lg:whitespace-nowrap">
        My contributions and what I&apos;ve learned: designing, building, securing, and shipping systems.
      </SectionSubtitle>

      <div className="relative w-full max-w-4xl lg:max-w-[68rem] mt-8">
        {/* Connecting line, drawn on scroll into view */}
        <motion.div
          className="absolute left-7 sm:left-10 top-0 bottom-6 sm:bottom-8 w-px -translate-x-1/2
                     bg-gradient-to-b from-neutral-500 dark:from-neutral-300 to-transparent"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {workData.map((item, index) => (
          <TimelineItem key={`${item.company}-${item.role}`} {...item} index={index} />
        ))}
      </div>

      <div className="w-[180px] sm:w-[220px] -mt-4">
        <Lottie animationData={workAnimation} loop />
      </div>
    </SectionWrapper>
  );
}

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
      <div className="flex flex-col items-center gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 w-full">
        {/* Spacer balancing the animation's width so the title stays centered on the page */}
        <div className="hidden lg:block" />

        <div className="order-1 text-center">
          <SectionTitle>Work Experience</SectionTitle>

          <SectionSubtitle className="max-w-none lg:whitespace-nowrap">
            My contributions and what I&apos;ve learned: designing, building, securing, and shipping systems.
          </SectionSubtitle>
        </div>

        <div className="order-2 justify-self-center lg:justify-self-start w-[160px] sm:w-[200px] flex-shrink-0">
          <Lottie animationData={workAnimation} loop />
        </div>
      </div>

      <div className="relative w-full max-w-4xl lg:max-w-[68rem] mt-8">
        {/* Connecting line, drawn on scroll into view */}
        <motion.div
          className="absolute left-7 sm:left-10 top-0 bottom-6 sm:bottom-8 w-px -translate-x-1/2
                     bg-gradient-to-b from-blue-500 via-neutral-500 dark:via-neutral-700 to-transparent"
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
    </SectionWrapper>
  );
}

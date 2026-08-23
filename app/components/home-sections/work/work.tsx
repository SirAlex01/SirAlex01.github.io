"use client";

import TimelineItem from "../../ui/timeline-item";
import { workData } from "./work-data";
import { Section, SectionHeader } from "../../ui/section";
import useInView from "../../ui/use-in-view";

export default function Work() {
  // `.rail` scales from the top; the shared observer flips it on arrival.
  const railRef = useInView<HTMLDivElement>();

  return (
    <Section id="work">
      <SectionHeader
        title="Work Experience"
        lead="My contributions and what I've learned: designing, building, securing, and shipping systems."
      />

      <div className="relative mt-10">
        {/* Rail, drawn downwards as the section scrolls into view. */}
        <div
          ref={railRef}
          aria-hidden="true"
          className="rail absolute left-7 top-7 bottom-10 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--accent)] via-[var(--line-strong)] to-transparent sm:left-10 sm:top-10"
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

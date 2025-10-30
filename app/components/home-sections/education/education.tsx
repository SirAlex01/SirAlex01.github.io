"use client";

import EducationCard from "../../ui/education-card";
import { educationData } from "./education-data";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import educationAnimation from "@/public/animations/walking_robot.json";

import { useEffect, useState } from "react";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../../ui/section-wrapper";

export default function Education() {
    const [duration, setDuration] = useState(25); // default fallback

    useEffect(() => {
    const updateDuration = () => {
      const vw = window.innerWidth;
      const baseWidth = 1229; // your screen width for which 25s is perfect
      const baseDuration = 25; // time for base width
      const proportionalDuration = (vw / baseWidth) * baseDuration;
      // We move 200vw, so scale by 2 for consistent velocity across widths
      setDuration(proportionalDuration);
      // console.log(`Viewport width: ${vw}px, Animation duration set to: ${proportionalDuration}s`);
    };

    updateDuration(); // run initially
    window.addEventListener("resize", updateDuration); // update when resizing

    return () => window.removeEventListener("resize", updateDuration);
  }, []);
  return (
    <SectionWrapper className="px-6 pt-2 pb-0">
      <SectionTitle className="mt-4">
        Education
      </SectionTitle>

      <SectionSubtitle className="mb-8">
        A journey of growth, learning, and discovery — shaping who I am today.
      </SectionSubtitle>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {educationData.map((item) => (
          <EducationCard key={item.title} {...item} />
        ))}
      </div>

      {/* --- Continuous walking animation (fluid) --- */}
      <div className="relative w-full overflow-hidden h-38 mt-2 mb-0">
        <motion.div
          className="absolute w-40 h-40"
          key={duration}       
          initial={{ x: "100vw" }}          // start fully off-screen right
          animate={{ x: "-100vw" }}         // move fully off-screen left
          transition={{
            duration: duration,
            ease: "linear",                 // constant smooth speed
            repeat: Infinity,               // infinite loop
            repeatType: "loop",             // restart from right edge
          }}
        >
          <Lottie animationData={educationAnimation} loop />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

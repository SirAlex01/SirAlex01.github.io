"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiFolder, FiMail } from "react-icons/fi";
import RotatingLogo from "../ui/rotating-logo";
import PrimaryButton from "../ui/primary-button";

const headline = ["Software Engineer.", "AI Enthusiast.", "CTF Player."];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Presentation() {
  const reduced = useReducedMotion();

  return (
    <section id="presentation" className="relative">
      <div className="page flex min-h-[calc(100svh-var(--nav-h)-2rem)] flex-col justify-center py-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Left: identity ---------------- */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-8 lg:items-start lg:text-left">
            <motion.span
              className="eyebrow"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Alessio Maiola · Rome, Italy
            </motion.span>

            <h1 className="display mt-6">
              {headline.map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={reduced ? false : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12 + i * 0.11, ease }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="mt-8 max-w-xl space-y-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              <p className="prose-body">
                Hi, I&apos;m <b>Alessio Maiola</b>, and I&apos;m a Master&apos;s graduate in{" "}
                <b>Engineering in Computer Science</b> from{" "}
                <b>Sapienza University of Rome</b>, with a strong focus on{" "}
                <b>artificial intelligence</b>, <b>machine learning</b>, and{" "}
                <b>data engineering</b>.
              </p>
              <p className="prose-body">
                I&apos;m also passionate about <b>cybersecurity</b>: I actively compete in
                CTFs with <b>TRX</b> and was proud to be among the{" "}
                <b>winners of CyberChallenge.IT 2025</b>.
              </p>
              <p className="prose-body">
                I enjoy solving complex problems, building intelligent systems, and
                collaborating in <b>dynamic, knowledge-sharing environments</b>. Curious
                and determined, I love projects where <b>innovation</b>, <b>teamwork</b>,
                and <b>technical precision</b> come together to create meaningful results.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.62, ease }}
            >
              <PrimaryButton label="View Projects" icon={<FiFolder />} href="/projects" />
              <PrimaryButton
                label="Get in touch"
                icon={<FiMail />}
                href="/contacts"
                variant="secondary"
              />
              <PrimaryButton
                label="GitHub"
                icon={<FaGithub />}
                href="https://github.com/SirAlex01"
                variant="ghost"
                external
              />
            </motion.div>
          </div>

          {/* ---------------- Right: portrait ---------------- */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:col-span-4"
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease }}
          >
            <div className={reduced ? "relative" : "float relative"}>
              <RotatingLogo />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

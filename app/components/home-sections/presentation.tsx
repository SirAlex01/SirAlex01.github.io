"use client";

import RotatingLogo from "../ui/rotating-logo";

export default function Presentation() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-8 gap-12 text-foreground">
      {/* --- Left: Logo inside circle --- */}
      <RotatingLogo />

      {/* --- Right: Title and Description --- */}
      <div className="max-w-xl text-center md:text-left space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Software Engineer.
          <br /> 
          AI Enthusiast. 
          <br />
          CTF Player.
        </h1>

        <p className="text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed">
          Hi, I&apos;m <b>Alessio Maiola</b>, and I&apos;m a Master&apos;s graduate in{" "}
          <b>Engineering in Computer Science</b> from{" "}
          <b>Sapienza University of Rome</b>, with a strong focus on{" "}
          <b>artificial intelligence</b>, <b>machine learning</b>, and{" "}
          <b>data engineering</b>.
          <br />
          <br />
          I&apos;m also passionate about <b>cybersecurity</b>: I actively compete in
          CTFs with <b>TRX</b> and was proud to be among the{" "}
          <b>winners of CyberChallenge.IT 2025</b>.
          <br />
          <br />
          I enjoy solving complex problems, building intelligent systems, and
          collaborating in <b>dynamic, knowledge-sharing environments</b>.
          Curious and determined, I love projects where <b>innovation</b>,{" "}
          <b>teamwork</b>, and <b>technical precision</b> come together to create
          meaningful results.
          <br />
          <br />
        </p>
      </div>
    </section>
  );
}

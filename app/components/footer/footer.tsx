"use client";

import { SiGithub, SiLinkedin} from "react-icons/si";
import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* --- Grey Separator (matches mobile menu) --- */}
        <div className="w-3/4 border-b border-neutral-300 dark:border-neutral-700 transition-colors duration-500 mb-4" />

        {/* --- Icon Row --- */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://github.com/SirAlex01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <SiGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/alessio-maiola-275718331"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <SiLinkedin />
          </a>

          <a
            href="mailto:alessio.maiola2001@gmail.com"
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* --- Footer Text --- */}
        <p className="text-sm text-black dark:text-white text-center">
          © {new Date().getFullYear()} Alessio Maiola. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import { contacts } from "../contact-data";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-background/80">
      <div className="flex flex-col items-center space-y-4">
        {/* Divider */}
        <div className="w-3/4 border-b border-neutral-300 dark:border-neutral-700 transition-colors duration-500 mb-4" />

        {/* Icons */}
        <div className="flex space-x-6 text-2xl">
          {contacts.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-sm text-black dark:text-white text-center">
          © {new Date().getFullYear()} Alessio Maiola. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

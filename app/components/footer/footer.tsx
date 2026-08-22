"use client";

import Image from "next/image";
import Link from "next/link";
import { contacts } from "../contact-data";
import { navLinks } from "../navbar/nav-links";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[var(--line)]">
      <div className="page py-7">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Alessio Maiola, home"
          >
            <Image
              src="/logo.webp"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 dark:invert"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--fg)]">
                Alessio Maiola
              </span>
              <span className="text-xs text-[var(--fg-subtle)]">Rome, Italy</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-sm text-[var(--fg-muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Elsewhere */}
          <div className="flex items-center gap-1">
            {contacts.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn-icon text-lg"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <hr className="rule my-6" />

        <p className="text-center text-xs text-[var(--fg-subtle)]">
          © {new Date().getFullYear()} Alessio Maiola. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiFileText } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
import { contacts } from "../components/contact-data";
import Reveal, { RevealGroup, RevealItem } from "../components/ui/reveal";
import PrimaryButton from "../components/ui/primary-button";
import { CV_PATH } from "../components/cv";

/** How long the "Copied" confirmation stays up. */
const COPIED_FOR_MS = 2000;

export default function ContactsPage() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  // The reset is cancellable so that neither a second click nor navigating
  // away mid-confirmation leaves a timer running against a gone component.
  const copyEmail = useCallback((email: string) => {
    navigator.clipboard.writeText(email).catch(() => {
      // Clipboard access can be refused; the address is on screen either way.
    });
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_FOR_MS);
  }, []);

  return (
    // Sized to sit inside the viewport alongside the navbar and footer, so
    // the whole page reads without scrolling on a normal desktop screen.
    <section className="flex min-h-full flex-col justify-center py-10">
      <div className="page-narrow flex flex-col items-center">
        <Reveal className="flex flex-col items-center text-center">
          <h1 className="title-xl">Let&apos;s connect!</h1>
          <hr className="rule mt-5 w-24" />
          <p className="lead mt-5">
            Email is the surest way to reach me - about a role, a collaboration, or
            anything on this site you would like to know more about.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 flex w-full max-w-xl flex-col gap-3" stagger={0.1}>
          {contacts.map((contact) => {
            const isEmail = contact.href.startsWith("mailto:");
            const emailAddress = isEmail ? contact.href.replace("mailto:", "") : "";

            return (
              <RevealItem key={contact.label}>
                <div className="card card-interactive group flex items-center gap-4 p-4">
                  <a
                    href={contact.href}
                    {...(isEmail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-inset)] text-lg text-[var(--fg-muted)] transition-colors duration-[var(--t-base)] group-hover:border-[var(--accent-ring)] group-hover:text-[var(--fg)]">
                      {contact.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block font-semibold text-[var(--fg)]">
                        {contact.label}
                      </span>
                      <span className="block break-all font-mono text-xs text-[var(--fg-muted)]">
                        {isEmail
                          ? emailAddress
                          : contact.href.replace(/^https?:\/\/(www\.)?/, "")}
                      </span>
                    </span>
                  </a>

                  {isEmail ? (
                    <button
                      type="button"
                      onClick={() => copyEmail(emailAddress)}
                      aria-label={copied ? "Email copied" : "Copy email address"}
                      className="btn btn-secondary btn-sm shrink-0"
                    >
                      {copied ? <FiCheck /> : <FiCopy />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                    </button>
                  ) : (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-[var(--fg-subtle)] transition-[translate,color] duration-[var(--t-base)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--fg)]"
                    />
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col items-center gap-3" delay={0.1}>
          <PrimaryButton
            label="Curriculum Vitae"
            icon={<FiFileText />}
            href={CV_PATH}
            variant="secondary"
            external
          />
        </Reveal>
      </div>
    </section>
  );
}

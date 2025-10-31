"use client";

import { contacts } from "../components/contact-data";
import { useState, useEffect, useRef } from "react";
import FadeInSection from "../components/ui/fadein-section";

export default function ContactsPage() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // ✅ Scroll to top when page (re)loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (buttonsRef.current) observer.observe(buttonsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col items-center px-6 py-16 min-h-[80vh] overflow-hidden">
      {/* Title - fade in from below */}
      <FadeInSection delay={0}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white mb-6 text-center">
          Let&aposs connect!
        </h1>
      </FadeInSection>

      {/* Description - fade in from below */}
      <FadeInSection delay={100}>
        <p className="text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-2xl text-center mb-12">
          I&aposd love to hear from you! Whether you have a question, want to collaborate, 
          or just want to connect, feel free to reach out through any of the platforms below.
        </p>
      </FadeInSection>

      {/* Social Buttons - Vertically stacked, horizontally arranged, equal width */}
      <div ref={buttonsRef} className="flex flex-col gap-4 w-full max-w-md">
        {contacts.map((contact, index) => {
          const isEmail = contact.href.startsWith("mailto:");
          const emailAddress = isEmail ? contact.href.replace("mailto:", "") : "";
          
          // First and last from left, middle from right
          const slideFrom = index === 1 ? "translate-x-20" : "-translate-x-20";
          const animationDelay = `${200 + index * 150}ms`;

          return isEmail ? (
            <div
              key={contact.label}
              style={{ transitionDelay: animationDelay }}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${slideFrom}`
              }`}
            >
              <div className="flex flex-col sm:flex-row items-stretch w-full">
                {/* Email button - same as others */}
                <a
                  href={contact.href}
                  className="flex items-center justify-center gap-4 px-8 py-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg"
                >
                  <span className="text-2xl">{contact.icon}</span>
                  <span>{contact.label}</span>
                </a>
                
                {/* Copyable email address with background - attached to button */}
                <button
                  onClick={(e) => handleEmailClick(e, emailAddress)}
                  className="flex-1 px-4 py-4 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg cursor-pointer break-all overflow-hidden"
                >
                  {copied ? "✓ Copied!" : emailAddress}
                </button>
              </div>
            </div>
          ) : (
            <div
              key={contact.label}
              style={{ transitionDelay: animationDelay }}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${slideFrom}`
              }`}
            >
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 px-8 py-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg w-full"
              >
                <span className="text-2xl">{contact.icon}</span>
                <span>{contact.label}</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

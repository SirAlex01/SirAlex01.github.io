import { FiMail } from "react-icons/fi";
import { Section } from "../ui/section";
import PrimaryButton from "../ui/primary-button";
import Reveal from "../ui/reveal";
import { contacts } from "../contact-data";

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[var(--r-2xl)] border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center sm:px-12">
          {/* Accent bloom behind the panel. A gradient, not a blurred block -
              see `.bloom` in globals.css. */}
          <div
            aria-hidden="true"
            className="bloom pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2"
          />

          <div className="relative flex flex-col items-center">
            <span className="conic-ring relative flex h-16 w-16 items-center justify-center rounded-full p-[2px]">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--surface-solid)] text-2xl text-[var(--accent-text)]">
                <FiMail />
              </span>
            </span>

            <h2 className="title mt-8">Let&apos;s keep in touch</h2>

            <hr className="rule mt-5 w-24" />

            <p className="lead mt-5 max-w-lg">
              Open to roles, collaborations, and questions about anything you have seen
              here.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton label="Contact Me" icon={<FiMail />} href="/contacts" />
            </div>

            <div className="mt-10 flex items-center gap-3">
              {contacts.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon border border-[var(--line)] text-lg"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

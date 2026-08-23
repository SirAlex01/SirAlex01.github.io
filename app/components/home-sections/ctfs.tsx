import Image from "next/image";
import type { ReactNode } from "react";
import { FaTrophy, FaDesktop, FaShieldAlt, FaMedal } from "react-icons/fa";
import Carousel from "../ui/carousel";
import { Section, SectionHeader } from "../ui/section";
import Reveal, { RevealGroup, RevealItem } from "../ui/reveal";

const ctfItems = [
  { src: "/cc/IMG_3661.webp" },
  { video: { id: "m0b_5nNsiu4", title: "CyberChallenge.IT 2025 finals" } },
  { src: "/cc/067A2641.webp" },
  { src: "/cc/067A3373.webp" },
  { src: "/cc/067A4466.webp" },
  { src: "/cc/067A4500.webp" },
  { src: "/cc/067A4734.webp" },
  {
    video: {
      id: "WapZTAImkdQ",
      start: 2125,
      title: "CyberChallenge.IT 2025 award ceremony",
    },
  },
];

const teams = [
  {
    href: "https://theromanxpl0.it/members/siralex/",
    src: "/trx.webp",
    alt: "TRX Team Logo",
    imgClass: "dark:invert",
  },
  {
    href: "https://cyberchallenge.it/halloffame/2025",
    src: "/ccit.webp",
    alt: "CyberChallenge Logo",
    imgClass: "invert dark:invert-0",
  },
];

/**
 * The icons are deliberately monochrome. They previously carried four
 * different hues, which made them the only colour anywhere on the site and
 * assigned that colour arbitrarily - there is no reason "best defense" is
 * blue. The glyphs already distinguish the awards; the tint only broke the
 * palette.
 */
const awards: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <FaTrophy />,
    title: "National Winner",
    body: "First place at CyberChallenge.IT 2025 finals, defeating 40+ Italian universities in an Attack/Defense competition organized by CINI.",
  },
  {
    icon: <FaDesktop />,
    title: "Best Presentation Award",
    body: "Recognized for delivering a clear, well-structured technical presentation to the national judging panel.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Best Defense Award",
    body: "Awarded for implementing robust security measures and demonstrating superior defensive capabilities during the Attack/Defense competition.",
  },
  {
    icon: <FaMedal />,
    title: "Top 5% - National Selection",
    body: "Top 5% out of 1000+ participants in the CyberChallenge.IT 2025 national Jeopardy qualification phase.",
  },
];

function TeamLogo({ team }: { team: (typeof teams)[number] }) {
  return (
    <a
      href={team.href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex h-24 w-24 shrink-0 items-center justify-center rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-4 transition-[translate,border-color,box-shadow] duration-[var(--t-base)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-[var(--accent-ring)] hover:shadow-[var(--shadow-lg)] sm:h-28 sm:w-28"
    >
      <Image
        src={team.src}
        alt={team.alt}
        width={112}
        height={112}
        className={`h-full w-full object-contain transition-transform duration-[var(--t-base)] ease-[var(--ease-out)] group-hover:scale-110 ${team.imgClass}`}
      />
    </a>
  );
}

export default function CTFs() {
  return (
    <Section id="ctfs" tinted>
      <SectionHeader title="CTF Experience" />

      {/* --- Teams + intro --- */}
      <Reveal className="mt-9">
        <div className="card flex flex-col items-center gap-7 p-6 sm:p-8 md:flex-row md:gap-10">
          <div className="flex shrink-0 gap-4">
            {teams.map((team) => (
              <TeamLogo key={team.alt} team={team} />
            ))}
          </div>

          <p className="prose-body text-center md:text-left">
            I am a CTF player for the TRX team. With them, I have participated in several
            Capture The Flag competitions and contributed to our victories in the 2025
            editions of CrewCTF, SnakeCTF, and LITCTF.
            <br />
            I also took part in the University Program CyberChallenge.IT 2025, where I
            represented Team Sapienza and achieved victory in the final national
            competition against 40 other universities.
          </p>
        </div>
      </Reveal>

      {/* --- Gallery --- */}
      <Reveal className="mt-9" delay={0.05}>
        <Carousel items={ctfItems} />
      </Reveal>

      {/* --- Awards --- */}
      <div className="mt-12">
        <Reveal className="flex flex-col items-start">
          <h3 className="title-sub">Awards</h3>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2">
          {awards.map((award) => (
            <RevealItem key={award.title} className="h-full">
              <article className="card card-interactive group flex h-full gap-4 p-6 text-left">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--surface-inset)] text-xl text-[var(--fg-muted)] transition-colors duration-[var(--t-base)] group-hover:border-[var(--accent-ring)] group-hover:text-[var(--fg)]"
                  aria-hidden="true"
                >
                  {award.icon}
                </span>
                <div>
                  <h4 className="title-sm text-[var(--fg)]">{award.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                    {award.body}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

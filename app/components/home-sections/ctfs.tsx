import { FaTrophy, FaDesktop, FaShieldAlt, FaMedal } from "react-icons/fa";
import Carousel from "../ui/carousel";
import { FaD } from "react-icons/fa6";

const ctfItems = [
  { src: "/cc/IMG_3661.jpg" },
  { video: { id: "m0b_5nNsiu4" } },
  { src: "/cc/067A2641.jpg" },
  { src: "/cc/067A3373.jpg" },
  { src: "/cc/067A4466.jpg" },
  { src: "/cc/067A4500.jpg" },
  { src: "/cc/067A4734.jpg" },
  { video: { id: "WapZTAImkdQ", start: 2125 } },
];

export default function CTFs() {
  return (
    <section className="text-center flex flex-col items-center px-4 sm:px-8 py-8">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
        CTF Experience
      </h3>

      {/* --- Intro paragraph with responsive logos --- */}
      <div className="mt-4 mb-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Two logos side-by-side on small screens */}
        <div className="flex md:hidden flex-row items-center justify-center gap-4 mb-2">
          <a
            href="https://theromanxpl0.it/members/siralex/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img
              src="/trx.png"
              alt="TRX Team Logo"
              className="w-22 h-22 sm:w-26 sm:h-26 object-contain dark:invert"
            />
          </a>
          <a
            href="https://cyberchallenge.it/halloffame/2025"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img
              src="/ccit.png"
              alt="CyberChallenge Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain invert dark:invert-0"
            />
          </a>
        </div>

        {/* Left logo on medium and larger screens */}
        <a
          href="https://theromanxpl0.it/members/siralex/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block transition-transform hover:scale-110"
        >
          <img
            src="/trx.png"
            alt="TRX Team Logo"
            className="w-36 h-36 object-contain dark:invert"
          />
        </a>

        {/* Main text */}
        <p className="text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-3xl text-center md:text-justify">
          I am a CTF player for the TRX team. With them, I have participated in several Capture The Flag competitions and contributed to our victories in the 2025 editions of CrewCTF, SnakeCTF, and LITCTF.
          <br />
          I also took part in the University Program CyberChallenge.IT 2025, where I represented Team Sapienza and achieved victory in the final national competition against 40 other universities.
        </p>

        {/* Right logo on medium and larger screens */}
        <a
          href="https://cyberchallenge.it/halloffame/2025"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block transition-transform hover:scale-110"
        >
          <img
            src="/ccit.png"
            alt="CyberChallenge Logo"
            className="w-32 h-32 object-contain invert dark:invert-0"
          />
        </a>
      </div>

      {/* --- Carousel --- */}
      <Carousel items={ctfItems} />

      {/* --- Awards Section --- */}
      <div className="mt-6 mb-4 space-y-7 w-full max-w-3xl text-left">
        <h3 className="text-xl lg:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2 text-center">
          Awards
        </h3>

        {/* 1. National Winner */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
            <FaTrophy className="text-yellow-400 text-base w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-base sm:text-lg lg:text-xl text-neutral-800 dark:text-neutral-200">National Winner</p>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
              First place at CyberChallenge.IT 2025 finals, defeating 40+ Italian universities in an Attack/Defense competition organized by CINI.
            </p>
          </div>
        </div>

        {/* 2. Best Presentation Award */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
            <FaDesktop className="text-green-400 text-base w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-base sm:text-lg lg:text-xl text-neutral-800 dark:text-neutral-200">Best Presentation Award</p>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
              Recognized for delivering a clear, well-structured technical presentation to the national judging panel.
            </p>
          </div>
        </div>

        {/* 3. Best Defense Award */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
            <FaShieldAlt className="text-blue-400 text-base w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-base sm:text-lg lg:text-xl text-neutral-800 dark:text-neutral-200">Best Defense Award</p>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
              Awarded for implementing robust security measures and demonstrating superior defensive capabilities during the Attack/Defense competition.
            </p>
          </div>
        </div>

        {/* 4. Top 5% – Jeopardy Competition */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center">
            <FaMedal className="text-orange-400 text-base w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-base sm:text-lg lg:text-xl text-neutral-800 dark:text-neutral-200">Top 5% – National Selection</p>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-400">
              Top 5% out of 1000+ participants in the CyberChallenge.IT 2025 national Jeopardy qualification phase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
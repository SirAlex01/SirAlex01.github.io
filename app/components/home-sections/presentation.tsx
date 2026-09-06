import { FaGithub } from "react-icons/fa";
import { FiFileText, FiFolder, FiMail } from "react-icons/fi";
import { CV_PATH } from "../cv";
import RotatingLogo from "../ui/rotating-logo";
import PrimaryButton from "../ui/primary-button";

const headline = ["Software Engineer.", "AI Enthusiast.", "CTF Player."];

/**
 * Hero.
 *
 * A server component with no JavaScript of its own: the staggered entrance is
 * the `.enter` keyframe from globals.css, timed by a `--enter-delay` custom
 * property. It used to be nine animated components from the animation
 * library, which was the first JavaScript the page had to hydrate and run -
 * on the one block that is already on screen when the page opens.
 */
export default function Presentation() {
  return (
    <section id="presentation" className="relative">
      <div className="page flex min-h-[calc(100svh-var(--nav-h)-2rem)] flex-col justify-center py-8 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Left: identity ---------------- */}
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:col-span-8 lg:items-start lg:text-left">
            <span className="eyebrow enter">Alessio Maiola · Rome, Italy</span>

            <h1 className="display mt-6">
              {headline.map((line, i) => (
                <span
                  key={line}
                  className="enter block"
                  style={
                    {
                      "--enter-y": "1.625rem",
                      "--enter-delay": `${120 + i * 110}ms`,
                    } as React.CSSProperties
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            <div
              className="enter mt-6 max-w-xl space-y-4"
              style={{ "--enter-delay": "500ms" } as React.CSSProperties}
            >
              <p className="prose-body">
                Hi, I&apos;m <b>Alessio</b>. I studied Engineering in Computer Science
                at <b>Sapienza</b>, where I focused on AI and machine learning.
                I also love a good security challenge: I play CTFs with <b>TRX</b>{" "}
                and helped Sapienza win <b>CyberChallenge.IT 2025</b>.
              </p>
              <p className="prose-body">
                These days I&apos;m a <b>Cyber Technology Researcher at Leonardo</b>,
                after building production software at Daikin. What matters most to
                me is making things colleagues can rely on, and sharing what I learn
                along the way.
              </p>
            </div>

            <div
              className="enter mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{ "--enter-delay": "620ms" } as React.CSSProperties}
            >
              <PrimaryButton label="View Projects" icon={<FiFolder />} href="/projects" />
              <PrimaryButton
                label="View CV"
                icon={<FiFileText />}
                href={CV_PATH}
                variant="secondary"
                external
              />
            </div>
            <div
              className="enter mt-3 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{ "--enter-delay": "620ms" } as React.CSSProperties}
            >
              <PrimaryButton
                label="Get in touch"
                icon={<FiMail />}
                href="/contacts"
                variant="ghost"
              />
              <PrimaryButton
                label="GitHub"
                icon={<FaGithub />}
                href="https://github.com/SirAlex01"
                variant="ghost"
                external
              />
            </div>
          </div>

          {/* ---------------- Right: portrait ---------------- */}
          <div
            className="enter order-1 flex justify-center lg:order-2 lg:col-span-4"
            style={
              {
                "--enter-y": "0px",
                "--enter-scale": "0.9",
                "--enter-delay": "150ms",
              } as React.CSSProperties
            }
          >
            {/* The float is on an inner element so its transform never fights
                the entrance keyframe's. */}
            <div className="float relative">
              <RotatingLogo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

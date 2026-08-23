import { FaGithub } from "react-icons/fa";
import { FiFolder, FiMail } from "react-icons/fi";
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
      <div className="page flex min-h-[calc(100svh-var(--nav-h)-2rem)] flex-col justify-center py-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
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
              className="enter mt-8 max-w-xl space-y-5"
              style={{ "--enter-delay": "500ms" } as React.CSSProperties}
            >
              <p className="prose-body">
                Hi, I&apos;m <b>Alessio Maiola</b>, and I&apos;m a Master&apos;s graduate in{" "}
                <b>Engineering in Computer Science</b> from{" "}
                <b>Sapienza University of Rome</b>, with a strong focus on{" "}
                <b>artificial intelligence</b>, <b>machine learning</b>, and{" "}
                <b>data engineering</b>.
              </p>
              <p className="prose-body">
                I&apos;m also passionate about <b>cybersecurity</b>: I actively compete in
                CTFs with <b>TRX</b> and was proud to be among the{" "}
                <b>winners of CyberChallenge.IT 2025</b>.
              </p>
              <p className="prose-body">
                I enjoy solving complex problems, building intelligent systems, and
                collaborating in <b>dynamic, knowledge-sharing environments</b>. Curious
                and determined, I love projects where <b>innovation</b>, <b>teamwork</b>,
                and <b>technical precision</b> come together to create meaningful results.
              </p>
            </div>

            <div
              className="enter mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              style={{ "--enter-delay": "620ms" } as React.CSSProperties}
            >
              <PrimaryButton label="View Projects" icon={<FiFolder />} href="/projects" />
              <PrimaryButton
                label="Get in touch"
                icon={<FiMail />}
                href="/contacts"
                variant="secondary"
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

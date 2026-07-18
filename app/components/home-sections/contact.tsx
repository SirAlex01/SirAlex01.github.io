import { useRef } from "react";
import { LottieRefCurrentProps } from "lottie-react";
import PrimaryButton from "../ui/primary-button";
import { FiMail } from "react-icons/fi";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../ui/section-wrapper";
import LazyLottie from "../ui/lazy-lottie";

export default function Contact() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <SectionWrapper className="px-6">
      <SectionTitle>
        Let&apos;s keep in touch
      </SectionTitle>

      <SectionSubtitle className="max-w-lg">
        Whether you have a question, a project idea or just want to say hi, feel free to reach out!
      </SectionSubtitle>

      {/* ✅ Controlled speed animation */}
      <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]">
        <LazyLottie
          loader={() => import("@/public/animations/contact-email.json")}
          lottieRef={lottieRef}
          onDOMLoaded={() => lottieRef.current?.setSpeed(0.5)} // ✅ Slow down animation
          loop
        />
      </div>

      {/* ✅ Button */}
      <div className="mt-6">
        <PrimaryButton 
          label="Contact Me"
          icon={<FiMail className="text-xl" />}
          href="/contacts"
        />
      </div>
    </SectionWrapper>
  );
}
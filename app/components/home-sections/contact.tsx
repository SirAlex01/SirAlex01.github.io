import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/animations/contact-email.json"; // your json
import PrimaryButton from "../ui/primary-button";
import { FiMail } from "react-icons/fi";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../ui/section-wrapper";

export default function Contact() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // ✅ Slow down animation
    }
  }, []);

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
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
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
import { useRef, useEffect } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "@/public/animations/contact-email.json"; // your json
import PrimaryButton from "../ui/primary-button";
import { FiMail } from "react-icons/fi";

export default function Contact() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.5); // ✅ Slow down animation
    }
  }, []);

  return (
    <section className="px-6 py-12 flex flex-col items-center text-center">
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
        Let&apos;s keep in touch
      </h3>

      <p className="mt-4 mb-6 max-w-lg text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
        Whether you have a question, a project idea or just want to say hi, feel free to reach out!
      </p>

      {/* ✅ Controlled speed animation */}
      <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
        />
      </div>

      {/* ✅ Button */}
      <PrimaryButton 
        label="Contact Me"
        icon={<FiMail className="text-xl" />}
        href="/contacts"
      />
    </section>
  );
}
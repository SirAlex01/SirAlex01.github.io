"use client";

import { useEffect, useState } from "react";
import Lottie, { LottieComponentProps } from "lottie-react";

interface LazyLottieProps extends Omit<LottieComponentProps, "animationData"> {
  loader: () => Promise<{ default: object }>;
}

export default function LazyLottie({ loader, ...lottieProps }: LazyLottieProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;
    loader().then((mod) => {
      if (!cancelled) setAnimationData(mod.default);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!animationData) return null;

  return <Lottie animationData={animationData} {...lottieProps} />;
}

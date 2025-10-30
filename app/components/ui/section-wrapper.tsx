import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable section wrapper component for home sections.
 * Provides consistent padding and layout structure.
 */
export function SectionWrapper({ children, className = "" }: SectionWrapperProps) {
  const baseClasses = "flex flex-col items-center text-center";
  const defaultPadding = "px-4 sm:px-8 py-8";
  
  return (
    <section className={`${baseClasses} ${defaultPadding} ${className}`}>
      {children}
    </section>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable section title component for home sections.
 * Provides consistent typography styling.
 */
export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  const baseClasses = "text-xl sm:text-2xl lg:text-3xl font-bold text-foreground";
  
  return (
    <h3 className={`${baseClasses} ${className}`}>
      {children}
    </h3>
  );
}

interface SectionSubtitleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable section subtitle component for home sections.
 * Provides consistent typography and spacing for descriptive text.
 */
export function SectionSubtitle({ children, className = "" }: SectionSubtitleProps) {
  const baseClasses = "text-neutral-600 dark:text-neutral-400 text-base";
  const defaultSpacing = "mt-4 mb-6";
  
  return (
    <p className={`${baseClasses} ${defaultSpacing} ${className}`}>
      {children}
    </p>
  );
}

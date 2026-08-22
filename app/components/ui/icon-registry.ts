import {
  Briefcase,
  Factory,
  GraduationCap,
  Languages,
  School,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit registry of every Lucide icon referenced by name from a data file.
 *
 * This exists for bundle size. The obvious implementation - `import * as Icons
 * from "lucide-react"` and then `Icons[name]` - cannot be tree-shaken, because
 * the lookup is dynamic and the bundler has to assume any icon might be used.
 * That pulled the whole ~1,500-icon library into the first load (~549 KB of
 * JS, on the home page). Listing them explicitly costs ~1 KB instead.
 *
 * To add an icon: import it above and add it here. `IconName` is derived from
 * this object, so a data file referencing an unregistered name is a type
 * error rather than a silent fallback at runtime.
 */
export const iconRegistry = {
  briefcase: Briefcase,
  factory: Factory,
  "graduation-cap": GraduationCap,
  languages: Languages,
  school: School,
  "shield-check": ShieldCheck,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

/** Resolves a registered name to its component, falling back to `fallback`. */
export function getIcon(name: IconName | undefined, fallback: IconName): LucideIcon {
  return iconRegistry[name ?? fallback] ?? iconRegistry[fallback];
}

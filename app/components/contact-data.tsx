// contact-data.ts
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export interface ContactItem {
  label: string;       // Accessible name
  href: string;        // Link target
  icon: React.ReactNode; // JSX icon component
}

export const contacts: ContactItem[] = [
  {
    label: "Email",
    href: "mailto:alessio.maiola2001@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alessio-maiola-275718331",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/SirAlex01",
    icon: <FaGithub />,
  },
];

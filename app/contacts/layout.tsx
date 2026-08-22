import { Metadata } from "next";

const title = "Contact Alessio Maiola - Software Engineer in Rome";
const description =
  "Get in touch with Alessio Maiola. Connect via email, LinkedIn, GitHub, or other platforms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contacts",
  },
  openGraph: {
    title,
    description,
    url: "https://siralex01.github.io/contacts",
  },
  twitter: {
    title,
    description,
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Alessio Maiola",
  description: "Get in touch with Alessio Maiola. Connect via email, LinkedIn, GitHub, or other platforms.",
  openGraph: {
    title: "Contact | Alessio Maiola",
    description: "Get in touch with Alessio Maiola. Connect via email, LinkedIn, GitHub, or other platforms.",
    url: "https://siralex01.github.io/contacts",
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

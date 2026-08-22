import { Metadata } from "next";

const title = "AI, Machine Learning & Security Projects | Alessio Maiola";
const description =
  "Explore my portfolio of AI, Machine Learning, and Cybersecurity projects. Including neural networks, data engineering solutions, and full stack applications.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title,
    description,
    url: "https://siralex01.github.io/projects",
  },
  twitter: {
    title,
    description,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

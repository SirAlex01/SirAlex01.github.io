import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Alessio Maiola",
  description: "Explore my portfolio of AI, Machine Learning, and Cybersecurity projects. Including neural networks, data engineering solutions, and full stack applications.",
  openGraph: {
    title: "Projects | Alessio Maiola",
    description: "Explore my portfolio of AI, Machine Learning, and Cybersecurity projects. Including neural networks, data engineering solutions, and full stack applications.",
    url: "https://siralex01.github.io/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

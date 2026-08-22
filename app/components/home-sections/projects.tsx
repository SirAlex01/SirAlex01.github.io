import { projects, projectsMetadata } from "../projects-data";
import ProjectPostcards from "../ui/projects-postcards";
import { Section, SectionHeader } from "../ui/section";
import PrimaryButton from "../ui/primary-button";
import Reveal from "../ui/reveal";
import { FaFolderOpen } from "react-icons/fa";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        title={projectsMetadata.title}
        lead={projectsMetadata.subtitle}
      />

      <Reveal className="mt-12">
        <ProjectPostcards projects={projects} />
      </Reveal>

      <Reveal className="mt-10 flex flex-col items-center gap-3" delay={0.1}>
        <PrimaryButton
          label="View All Projects"
          icon={<FaFolderOpen />}
          href="/projects"
        />
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
          Drag or click the deck to browse
        </p>
      </Reveal>
    </Section>
  );
}

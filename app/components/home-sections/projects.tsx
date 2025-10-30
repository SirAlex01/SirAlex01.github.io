import { projects, projectsMetadata } from "../projects-data";
import ProjectPostcards from "../ui/projects-postcards";
import { SectionWrapper, SectionTitle, SectionSubtitle } from "../ui/section-wrapper";
import PrimaryButton from "../ui/primary-button";
import { FaFolderOpen } from "react-icons/fa";

export default function Projects() {
  return (
    <SectionWrapper>
      <SectionTitle>
        {projectsMetadata.title}
      </SectionTitle>

      <SectionSubtitle>
        {projectsMetadata.subtitle}
      </SectionSubtitle>

      <div className="mt-0 w-full max-w-6xl">
        <ProjectPostcards projects={projects} />
      </div>

      {/* Button to view all projects */}
      <div className="mt-2">
        <PrimaryButton 
          label="View All Projects"
          icon={<FaFolderOpen className="text-xl" />}
          href="/projects"
        />
      </div>
    </SectionWrapper>
  );
}

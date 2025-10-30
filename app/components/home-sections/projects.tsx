import { projects } from "../projects-data";
import ProjectPostcards from "../ui/projects-postcards";

export default function Projects() {
  return (
    <section className="text-center flex flex-col items-center px-4 sm:px-8 py-8">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
        Projects
      </h3>

      <div className="mt-0 w-full max-w-6xl">
        <ProjectPostcards projects={projects} />
      </div>
    </section>
  );
}

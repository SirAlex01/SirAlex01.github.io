import { projects } from "../projects-data";
import ProjectPostcards from "../ui/projects-postcards";

export default function Projects() {
  return (
    <section className="text-center flex flex-col items-center px-4 sm:px-8">
      <h3 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
        Projects
      </h3>

      <div className="mt-6 w-full max-w-6xl">
        <ProjectPostcards projects={projects} />
      </div>
    </section>
  );
}

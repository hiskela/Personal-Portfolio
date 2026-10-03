import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      className="border-t border-gray-100 bg-gray-50 py-24 dark:border-gray-800 dark:bg-[#0f0f0f]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Portfolio
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Featured Projects
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            A selection of projects I have built using modern
            web technologies.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">
            No projects available.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
function ProjectCard({ project }) {
const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${import.meta.env.VITE_API_URL}${image}`;
  }

  return image;
};
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-200/60 dark:border-gray-800 dark:bg-[#111111] dark:hover:shadow-black/40">
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
  src={getImageUrl(project.image)}
  alt={project.title}
  className="h-full w-full object-cover"
/>

        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur dark:bg-black/70 dark:text-white">
            Featured
          </span>
        )}
      </div>

      <div className="p-7">
        <h2 className="text-2xl font-semibold">{project.title}</h2>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-7 flex gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Live Demo ↗
            </a>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
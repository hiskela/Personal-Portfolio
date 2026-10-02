import { useEffect, useState } from "react";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/skills");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch skills");
        }

        setSkills(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section 
      className="border-t border-gray-100 bg-white py-24 dark:border-gray-800 dark:bg-[#0a0a0a]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Technical Skills
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Technologies and tools I use to build modern applications.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading skills...</p>
        ) : skills.length === 0 ? (
          <p className="text-gray-500">No skills available.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-[#111111]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {skill.category}
                    </p>
                  </div>

                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
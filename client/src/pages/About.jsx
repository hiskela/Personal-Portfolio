import { useEffect, useState } from "react";

function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/about?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch about information"
          );
        }

        setAbout(data);
      } catch (error) {
        console.error("About fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-20 text-gray-900 transition-colors duration-300 sm:py-24 dark:bg-[#0a0a0a] dark:text-white">
      <section className="mx-auto max-w-7xl">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : about ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center lg:gap-20">
            
            {/* About Content */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm sm:tracking-[0.25em] dark:text-blue-400">
                About Me
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:mt-5 sm:text-5xl lg:text-5xl">
                {about.title}
              </h1>

              <div className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:mt-7 sm:text-lg sm:leading-8 lg:mx-0 dark:text-gray-400">
                <p>{about.description}</p>
              </div>
            </div>

            {/* Information Card */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-[#111111]">
              <p className="text-sm font-medium text-gray-500">
                Currently
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-8 sm:text-2xl">
                {about.education}
              </h2>

              <div className="my-6 h-px bg-gray-200 sm:my-8 dark:bg-gray-800" />

              <div className="space-y-6">
                {about.location && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Location
                    </p>

                    <p className="mt-2 text-sm font-medium sm:text-base">
                      {about.location}
                    </p>
                  </div>
                )}

                {about.email && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Email
                    </p>

                    <a
                      href={`mailto:${about.email}`}
                      className="mt-2 block break-all text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline sm:text-base dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {about.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-gray-500">
              About information is not available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default About;
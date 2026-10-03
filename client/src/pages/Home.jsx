import { useEffect, useState } from "react";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

function Home() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/home?t=${Date.now()}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch home information"
          );
        }

        setHome(data);
      } catch (error) {
        console.error("Home fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-white">
      <section id="home" className="relative scroll-mt-20">
        <div className="absolute left-0 top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-14 sm:gap-16 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/40" />

              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {home?.status || "Available for opportunities"}
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm sm:tracking-[0.25em] dark:text-blue-400">
              {home?.title || "Software Engineering Student"}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:mt-5 sm:text-6xl lg:text-7xl">
              {home?.name || "Hiskel Dibera"}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:mt-7 sm:text-lg sm:leading-8 lg:mx-0 dark:text-gray-400">
              {loading
                ? "Loading..."
                : home?.description || "Building modern web applications."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
              <a
                href="#projects"
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-600 sm:px-6 sm:py-3.5 sm:text-base dark:bg-white dark:text-gray-900 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                View My Work
              </a>

              {home?.cv && (
                <a
                  href={`${import.meta.env.VITE_API_URL}${home.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 sm:px-6 sm:py-3.5 sm:text-base dark:border-gray-700 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  View CV
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium lg:justify-start">
              {home?.github && (
                <a
                  href={home.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  GitHub ↗
                </a>
              )}

              {home?.linkedin && (
                <a
                  href={home.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Profile */}
          <div className="relative mx-auto w-full max-w-xs sm:max-w-md">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/10 blur-3xl sm:-inset-6" />

            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-50 p-2.5 shadow-2xl shadow-gray-200/50 sm:rounded-[2.5rem] sm:p-3 dark:border-gray-800 dark:bg-[#111111] dark:shadow-black/40">
              <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
             {home?.profileImage && (
  <img
    src={`${import.meta.env.VITE_API_URL}${home.profileImage}`}
    alt={home?.name || "Profile"}
    className="aspect-square w-full object-cover object-center transition duration-500 hover:scale-105"
  />
)}
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-7 sm:rounded-2xl sm:px-5 sm:py-4">
                <p className="text-xs text-gray-300 sm:text-sm">
                  Software Engineering
                </p>

                <p className="mt-1 text-sm font-semibold sm:text-base">
                  Full-Stack Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="skills" className="scroll-mt-20">
        <Skills />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
    </main>
  );
}

export default Home;
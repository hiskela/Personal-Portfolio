import { useEffect, useState } from "react";

function Footer() {
  const [home, setHome] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/home`);
        const data = await response.json();

        if (response.ok) {
          setHome(data);
        }
      } catch (error) {
        console.error("Footer fetch error:", error);
      }
    };

    fetchHome();
  }, []);

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-[#080808] dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          
          {/* Brand */}
          <div className="max-w-md text-center md:text-left">
            <a
              href="#home"
              className="inline-block text-2xl font-bold tracking-tight text-gray-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
              Hiskel<span className="text-blue-600 dark:text-blue-400">.</span>
            </a>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-500">
              {home?.title ||
                "Software Engineering Student | Full-Stack Developer"}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-500">
              Building modern, practical, and user-focused web applications.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:justify-end md:gap-8">
            <a
              href="#home"
              className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </a>

            <a
              href="#projects"
              className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Projects
            </a>

            <a
              href="#contact"
              className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </a>

            {home?.github && (
              <a
                href={home.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                GitHub ↗
              </a>
            )}

            {home?.linkedin && (
              <a
                href={home.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>

        <div className="my-8 h-px bg-gray-200 dark:bg-gray-800 sm:my-10" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-2sm text-gray-500 dark:text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} {home?.name || "Hiskel Dibera"}.
            All rights reserved.
          </p>

          <a
            href="#home"
            className="text-xs font-medium text-gray-500 transition hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 sm:text-sm"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
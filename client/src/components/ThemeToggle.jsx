import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg transition hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:bg-[#111111] dark:hover:border-blue-500 dark:hover:bg-blue-500/10"
      aria-label="Toggle theme"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
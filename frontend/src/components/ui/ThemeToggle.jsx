import React from "react";
import { useTheme } from "../../state/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "", size = 16 }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={"p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 " + className}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
    >
      {theme === "dark" ? <Sun size={size} /> : <Moon size={size} />}
    </button>
  );
}

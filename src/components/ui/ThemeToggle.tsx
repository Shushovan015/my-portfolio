"use client";

import { Grid3X3, Moon } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "dark" | "blueprint";

const STORAGE_KEY = "portfolio-theme";

const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem(STORAGE_KEY) === "blueprint" ? "blueprint" : "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "blueprint" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="Theme"
      className="cmd-btn !px-3 sm:!px-4"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to blueprint theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? <Grid3X3 className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span className="hidden xl:inline">{theme === "dark" ? "Blueprint" : "Dark"}</span>
    </button>
  );
}

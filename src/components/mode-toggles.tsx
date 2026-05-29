"use client";

type ThemeMode = "light" | "dark";
type ReadMode = "off" | "on";

function readTheme(): ThemeMode {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function readReadMode(): ReadMode {
  return document.documentElement.dataset.readMode === "on" ? "on" : "off";
}

function applyPreferences(theme: ThemeMode, readMode: ReadMode) {
  const root = document.documentElement;
  const body = document.body;

  root.dataset.theme = theme;
  root.dataset.readMode = readMode;
  body.dataset.readMode = readMode;

  window.localStorage.setItem("tiny-link-theme", theme);
  window.localStorage.setItem("tiny-link-read-mode", readMode);
}

export function ModeToggles() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => {
          const currentTheme = readTheme();
          const currentReadMode = readReadMode();
          applyPreferences(currentTheme === "light" ? "dark" : "light", currentReadMode);
        }}
        className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      >
        Toggle theme
      </button>
      <button
        type="button"
        onClick={() => {
          const currentTheme = readTheme();
          const currentReadMode = readReadMode();
          applyPreferences(currentTheme, currentReadMode === "off" ? "on" : "off");
        }}
        className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      >
        Toggle read mode
      </button>
    </div>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const THEME_CHANGE_EVENT = "portfolio:theme-change";
const getTheme = () => document.documentElement.dataset.theme === "dark";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getTheme, () => false);
  const label = `Switch to ${dark ? "light" : "dark"} theme`;

  function toggle() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Theme switching also works in storage-restricted browsers.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return <button type="button" className="folio-nav-control" onClick={toggle} aria-label={label} title={label}>{dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>;
}

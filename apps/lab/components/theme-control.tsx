"use client";

import { SunMoon } from "lucide-react";

export function ThemeControl() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };
  return <button className="theme-control" type="button" onClick={toggle} aria-label="Toggle color theme" title="Toggle color theme"><SunMoon size={17} aria-hidden="true" /></button>;
}

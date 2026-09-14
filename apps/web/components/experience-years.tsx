"use client";

import { useSyncExternalStore } from "react";
import { getProfessionalExperienceYears } from "@/lib/professional-experience";

function subscribe(onChange: () => void) {
  let timeout: ReturnType<typeof setTimeout>;

  function scheduleNextDay() {
    const now = new Date();
    const nextDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
    timeout = setTimeout(() => {
      onChange();
      scheduleNextDay();
    }, nextDay - now.getTime());
  }

  scheduleNextDay();
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function ExperienceYears({ initialYears }: { initialYears: number }) {
  const years = useSyncExternalStore(subscribe, getProfessionalExperienceYears, () => initialYears);
  return <>{years} {years === 1 ? "year" : "years"}</>;
}

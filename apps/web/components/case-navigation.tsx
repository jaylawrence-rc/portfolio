"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "context", label: "Context" },
  { id: "decisions", label: "Decisions" },
  { id: "reflection", label: "Reflection" },
] as const;

export function CaseNavigation() {
  const [activeChapter, setActiveChapter] = useState<string>("context");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveChapter(entry.target.id);
      }
    }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });

    for (const chapter of chapters) {
      const section = document.getElementById(chapter.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="case-editorial-nav" aria-label="Case study chapters">
      <p className="case-editorial-label">In this project</p>
      <ol>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`} aria-current={activeChapter === chapter.id ? "location" : undefined} onClick={() => setActiveChapter(chapter.id)}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{chapter.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

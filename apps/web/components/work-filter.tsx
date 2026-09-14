import Link from "next/link";
import { filters, projects } from "@/lib/projects";
import { ProjectRow } from "./project-row";

export function WorkFilter({ filter }: { filter?: string }) {
  const current = filter && filters.includes(filter) ? filter : "All";
  const visible = current === "All" ? projects : projects.filter(project => project.disciplines.includes(current));

  return (
    <>
      <nav className="filters" aria-label="Filter projects">
        {filters.map(filter => (
          <Link
            key={filter}
            href={filter === "All" ? "/work" : `/work?filter=${encodeURIComponent(filter)}`}
            scroll={false}
            aria-current={current === filter ? "page" : undefined}
          >
            {filter}
          </Link>
        ))}
      </nav>
      <p className="result-count" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
      <div className="project-list">
        {visible.map(project => <ProjectRow project={project} index={projects.indexOf(project)} key={project.slug} />)}
      </div>
    </>
  );
}

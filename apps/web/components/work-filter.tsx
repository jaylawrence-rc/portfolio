"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { filters, projects } from "@/lib/projects";
import { ProjectRow } from "./project-row";

export function WorkFilter() {
  const router = useRouter(); const params = useSearchParams(); const current = params.get("filter") || "All";
  const visible = current === "All" ? projects : projects.filter(p => p.disciplines.includes(current));
  function select(filter: string) { router.replace(filter === "All" ? "/work" : `/work?filter=${encodeURIComponent(filter)}`, { scroll: false }); }
  return <><div className="filters" aria-label="Filter projects">{filters.map(filter => <button key={filter} aria-pressed={current === filter} onClick={() => select(filter)}>{filter}</button>)}</div><p className="result-count" aria-live="polite">{visible.length} {visible.length === 1 ? "project" : "projects"}</p><div className="project-list">{visible.map(project => <ProjectRow project={project} index={projects.indexOf(project)} key={project.slug}/>)}</div></>;
}

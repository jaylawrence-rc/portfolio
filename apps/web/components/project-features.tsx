import type { Project } from "@/lib/projects";

export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <ol className="case-editorial-decisions">
      {project.decisions.map((decision, index) => (
        <li key={decision.title}>
          <span className="case-editorial-decision-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{decision.title}</h3>
            <p>{decision.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

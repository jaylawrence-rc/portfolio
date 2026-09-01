import type { Project } from "@/lib/projects";

type Feature = { title: string; body: string };

function getFeatures(project: Project): Feature[] {
  return [
    project.decisions[0] ?? {
      title: "Begin with the real task",
      body: project.challenge,
    },
    project.decisions[1] ?? {
      title: "Make constraints legible",
      body: project.constraints.join(" "),
    },
    project.decisions[2] ?? {
      title: "Lead to a useful outcome",
      body: project.result,
    },
  ];
}

function FeatureArtifact({ index }: { index: number }) {
  if (index === 0) {
    return <div className="feature-artifact feature-query" aria-hidden="true">
      <div className="artifact-toolbar"><i/><i/><span>Focused input</span></div>
      <div className="artifact-query"><span>What do you need to decide?</span><b>→</b></div>
      <div className="artifact-lines"><i/><i/><i/></div>
    </div>;
  }

  if (index === 1) {
    return <div className="feature-artifact feature-flow" aria-hidden="true">
      <div><b>01</b><span>Input</span><i/></div>
      <div><b>02</b><span>Review</span><i/></div>
      <div><b>03</b><span>Decision</span><i/></div>
    </div>;
  }

  return <div className="feature-artifact feature-evidence" aria-hidden="true">
    <div className="evidence-status"><i/><span>Evidence ready</span><b>Live</b></div>
    <div className="evidence-bars"><i/><i/><i/><i/></div>
    <div className="evidence-foot"><span>Clear state</span><span>Next action ↗</span></div>
  </div>;
}

export function ProjectFeatures({ project }: { project: Project }) {
  const features = getFeatures(project);

  return <section className="project-features media-rail">
    <div className="project-feature-heading">
      <p className="eyebrow">Product features</p>
      <h2>Capabilities shaped around the work.</h2>
      <p>Three product choices that turned complexity into a clearer path forward.</p>
    </div>
    <div className="project-feature-grid">
      {features.map((feature, index) => <article className="project-feature" key={`${feature.title}-${index}`}>
        <FeatureArtifact index={index}/>
        <span className="feature-number">0{index + 1}</span>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
      </article>)}
    </div>
  </section>;
}

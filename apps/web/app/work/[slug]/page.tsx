import { notFound } from "next/navigation";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { ProjectFeatures } from "@/components/project-features";
import { ProjectVisual } from "@/components/project-visual";

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) { const p=getProject((await params).slug); return p ? {title:p.title,description:p.summary}:{}; }
export default async function ProjectPage({ params }: { params: Promise<{slug:string}> }) {
  const project = getProject((await params).slug); if(!project) notFound(); const index=projects.indexOf(project); const next=projects[(index+1)%projects.length];
  return <article className="case-study" style={{"--project-accent":project.accent} as React.CSSProperties}>
    <header className="case-hero shell"><Link className="back-link" href="/work"><ArrowLeft size={15}/> All work</Link><p className="eyebrow">{project.industry} · {String(index+1).padStart(2,"0")}</p><h1>{project.title}</h1><p className="case-outcome">{project.outcome}</p><dl className="case-meta"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Company</dt><dd>{project.company}</dd></div><div><dt>Period</dt><dd>{project.period}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl>{project.liveUrl&&<a className="text-button" target="_blank" rel="noreferrer" href={project.liveUrl}>Visit public product <ArrowUpRight size={16}/></a>}</header>
    <ViewTransition name={`project-visual-${project.slug}`} share="project-expand" default="none">
      <figure className="case-media media-rail"><ProjectVisual project={project}/><figcaption><span>Redacted / reconstructed</span> A system-led reconstruction used until approved product media is supplied.</figcaption></figure>
    </ViewTransition>
    <section className="executive media-rail"><div><span>Challenge</span><p>{project.challenge}</p></div><div><span>Contribution</span><p>{project.contribution}</p></div><div><span>Result</span><p>{project.result}</p></div></section>
    <div className="article-body reading-rail">
      <section><p className="eyebrow">Context</p><h2>The product in one clear frame.</h2><p>{project.context}</p></section>
      <section><p className="eyebrow">Constraints</p><h2>The boundaries shaped the work.</h2><ul>{project.constraints.map(x=><li key={x}>{x}</li>)}</ul></section>
      <section><p className="eyebrow">My role</p><h2>Ownership stated without ambiguity.</h2><p>{project.contribution}</p><aside><span>{project.proof ? "Public attribution" : "Personal contribution"}</span><p>{project.proof?.detail ?? "This describes my current public account of the work. Exact dates, team boundaries, and private implementation details remain draft until confirmed."}</p>{project.proof&&<a className="evidence-link" href={project.proof.href} target="_blank" rel="noreferrer">View {project.proof.label}<ArrowUpRight size={14}/></a>}</aside></section>
    </div>
    <ProjectFeatures project={project}/>
    <section className="walkthrough media-rail"><div><p className="eyebrow">Experience walkthrough</p><h2>From intent to a trustworthy result.</h2></div><div className="flow"><div><span>01</span><strong>Express intent</strong><p>A focused entry point asks for only what the system needs.</p></div><i>→</i><div><span>02</span><strong>Understand state</strong><p>Progress, uncertainty, and recovery remain legible.</p></div><i>→</i><div><span>03</span><strong>Act on evidence</strong><p>The result leads to a clear next decision.</p></div></div></section>
    <div className="article-body reading-rail"><section><p className="eyebrow">System underneath</p><h2>Shared structure, product-specific evidence.</h2><p>A small set of semantic states and content contracts creates consistency without forcing every workflow into the same visual template. This architecture is reconstructed from the public product story and will be replaced with approved technical evidence.</p></section><section><p className="eyebrow">Outcome</p><h2>Shipped capability over invented metrics.</h2><p>{project.result}</p><aside><span>Qualitative result</span><p>No unverified traffic, conversion, revenue, or performance number is published here.</p></aside></section><section><p className="eyebrow">What I learned</p><h2>The next version starts with the lesson.</h2><p>{project.learning}</p></section></div>
    <Link href={`/work/${next.slug}`} className="next-project shell"><span>Next project · {String((index+1)%projects.length+1).padStart(2,"0")}</span><strong>{next.title}</strong><p>{next.summary}</p><i>↗</i></Link>
  </article>;
}

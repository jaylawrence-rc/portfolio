import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseNavigation } from "@/components/case-navigation";
import { ProjectFeatures } from "@/components/project-features";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/lib/projects";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return pageMetadata({ title: project.title, description: project.summary, path: `/work/${project.slug}` });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const hasUnconfirmedScope = /to confirm/i.test(`${project.role} ${project.period}`);

  return (
    <article className="case-editorial" style={{ "--project-accent": project.accent } as CSSProperties}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
          { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/work/${project.slug}`) },
        ],
      }} />
      <header className="case-editorial-header shell">
        <Link className="case-editorial-back" href="/work">
          <ArrowLeft size={16} aria-hidden="true" /> All work
        </Link>
        <div className="case-editorial-opening">
          <div className="case-editorial-title">
            <p className="case-editorial-label">{project.industry} <span aria-hidden="true">/</span> {String(index + 1).padStart(2, "0")}</p>
            <h1>{project.title}</h1>
            <p className="case-editorial-outcome">{project.outcome}</p>
          </div>
          <div className="case-editorial-details">
            <dl className="case-editorial-meta">
              <div><dt>My role</dt><dd>{project.role}</dd></div>
              <div><dt>With</dt><dd>{project.company}</dd></div>
              <div><dt>Period</dt><dd>{project.period}</dd></div>
            </dl>
            {project.liveUrl && (
              <a className="case-editorial-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live site <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </header>

      <figure className="case-editorial-media media-rail">
        <ViewTransition name={`project-visual-${project.slug}`} share="project-expand" default="none">
          <div><ProjectVisual project={project} eager /></div>
        </ViewTransition>
        <figcaption>{project.image?.caption ?? `Project overview · ${project.title}`}</figcaption>
      </figure>

      <div className="case-editorial-summary shell">
        <div className="case-editorial-executive">
          <div>
            <h2 className="case-editorial-label">My contribution</h2>
            <p>{project.contribution}</p>
          </div>
          <div>
            <h2 className="case-editorial-label">Shipped result</h2>
            <p>{project.result}</p>
          </div>
        </div>
        {project.proof ? (
          <aside className="case-editorial-attribution">
            <p>{project.proof.detail}</p>
            <a className="case-editorial-link" href={project.proof.href} target="_blank" rel="noreferrer">
              {project.proof.label} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </aside>
        ) : hasUnconfirmedScope ? (
          <p className="case-editorial-scope">Scope note: exact dates and contribution boundaries are still being confirmed.</p>
        ) : null}
      </div>

      <div className="case-editorial-reading media-rail">
        <CaseNavigation key={project.slug} />
        <div className="case-editorial-chapters">
          <section id="context" className="case-editorial-section" aria-labelledby="context-heading">
            <p className="case-editorial-label">01 <span aria-hidden="true">/</span> Context</p>
            <h2 id="context-heading">{project.challenge}</h2>
            <p className="case-editorial-prose">{project.context}</p>
            <div className="case-editorial-constraints">
              <h3>Working within</h3>
              <ul>{project.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
            </div>
          </section>
          <section id="decisions" className="case-editorial-section" aria-labelledby="decisions-heading">
            <h2 id="decisions-heading" className="case-editorial-label">02 <span aria-hidden="true">/</span> Product decisions</h2>
            <ProjectFeatures project={project} />
            {project.hoverPage ? <a className="editorial-link" href={project.hoverPage.url} target="_blank" rel="noreferrer">Explore {project.hoverPage.label} <ArrowUpRight size={16} aria-hidden="true" /></a> : null}
            {project.detailImage ? (
              <figure className="case-editorial-detail">
                <Image
                  src={project.detailImage.src}
                  width={project.detailImage.width}
                  height={project.detailImage.height}
                  alt={project.detailImage.alt}
                  sizes="(max-width: 780px) 100vw, 760px"
                />
                <figcaption>
                  <strong>{project.detailImage.label}</strong>
                  <p>{project.detailImage.caption}</p>
                </figcaption>
              </figure>
            ) : null}
          </section>
          <section id="reflection" className="case-editorial-section case-editorial-reflection" aria-labelledby="reflection-heading">
            <p className="case-editorial-label">03 <span aria-hidden="true">/</span> Reflection</p>
            <h2 id="reflection-heading">{project.learning}</h2>
          </section>
        </div>
      </div>
      <div className="case-editorial-continuation shell">
        <p className="case-editorial-label">Keep exploring</p>
        <Link href={`/work/${next.slug}`} className="case-editorial-next">
          <div>
            <span className="case-editorial-next-caption">Next project <span aria-hidden="true">/</span> {next.industry}</span>
            <h2>{next.title}</h2>
            <p>{next.summary}</p>
          </div>
          <span className="case-editorial-next-arrow"><ArrowRight size={32} strokeWidth={1.5} aria-hidden="true" /></span>
        </Link>
      </div>
    </article>
  );
}

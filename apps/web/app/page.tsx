import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectRow } from "@/components/project-row";
import { PortfolioBento } from "@/components/portfolio-bento";
import { experience, skillGroups } from "@/lib/profile";

export default function Home() {
  return <>
    <section className="hero shell">
      <p className="status"><i/> Available for selected product engineering roles <button className="location-reveal" type="button" aria-label="Remote from the Philippines. Hover or focus to reveal the Philippine flag."><span className="location-copy">· remote from the Philippines</span><span className="location-flag" aria-hidden="true">🇵🇭</span></button></p>
      <h1>I build software that solves <em>real business problems.</em></h1>
      <p className="hero-lead">Product engineer and frontend-focused full-stack developer turning complex workflows into clear, scalable products—across AI, healthcare, music data, recruitment, and B2B software—for clients and teams in the US, Germany, and London.</p>
      <div className="hero-actions"><Link className="button explore-work-button" href="#selected-work">Explore selected work <span className="explore-arrow" aria-hidden="true"><ArrowDown size={16}/><ArrowDown size={16}/></span></Link><Link className="text-button" href="/resume">View résumé <ArrowRight size={16}/></Link></div>
      <dl className="proof-strip"><div><dt>Experience</dt><dd><strong>4+</strong><span>years building products</span></dd></div><div><dt>Production</dt><dd><strong>7</strong><span>apps shipped</span></dd></div><div><dt>Product reach</dt><dd><strong>5,000+</strong><span>users across products</span></dd></div></dl>
    </section>
    <PortfolioBento
      projects={projects.map(({ slug, title, company, summary, industry, accent, liveUrl, allowsEmbedding }) => ({ slug, title, company, summary, industry, accent, liveUrl, allowsEmbedding }))}
      experience={experience}
      skillGroups={skillGroups}
    />
    <section id="selected-work" className="section shell"><div className="section-heading"><div><p className="eyebrow">Selected work · 01—04</p><h2>Products shaped around the hard part.</h2></div><Link href="/work">View all seven projects <ArrowRight size={16}/></Link></div><div className="project-list">{projects.filter(p=>p.featured).map((project,index)=><ProjectRow project={project} index={index} key={project.slug}/>)}</div></section>
    <section className="section shell experience"><div className="section-heading"><div><p className="eyebrow">Experience</p><h2>A through-line of product ownership.</h2></div><Link href="/resume">Read the full résumé <ArrowRight size={16}/></Link></div><div className="timeline">{experience.map((item,i)=><details key={`${item.company}-${item.period}`} open={i===0}><summary><span>{item.period}</span><strong>{item.company}</strong><span>{item.role}</span><p>{item.summary}</p><i>+</i></summary><div><p>{item.bullets.join(" ")}</p></div></details>)}</div></section>
    <section className="section shell principles"><p className="eyebrow">How I work</p><ol><li><span>01</span>Product judgment before implementation.</li><li><span>02</span>Systems that remain clear as they grow.</li><li><span>03</span>Motion that explains state and rewards attention.</li></ol></section>
  </>;
}

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { companyUrls, experience } from "@/lib/profile";
import { CompanyLink } from "@/components/editorial-links";
import { ProjectHoverLink } from "@/components/project-hover-link";
import { ProjectHoverArrow, ProjectHoverMedia } from "@/components/project-hover-media";
import { Reveal } from "@/components/reveal";
import { DecisionExplorer } from "@/components/decision-explorer";

export default function Home() {
  const music = projects[0];
  const xoots = projects[1];
  const evelan = projects[2];

  return (
    <div className="editorial-home">
      <section className="home-opening shell" aria-labelledby="home-title">
        <div className="home-opening-top">
          <p className="editorial-label">Independent thinking. Shared ambition.</p>
          <p className="availability-note"><span aria-hidden="true" /> Open to the right team</p>
        </div>
        <h1 id="home-title">Complex workflows.<br /><span>Clear software.</span></h1>
        <div className="home-opening-bottom">
          <div className="home-opening-actions">
            <a className="editorial-action" href="#selected-work">Explore selected work <span className="action-disc"><ArrowDown size={18} aria-hidden="true" /></span></a>
            <Link className="editorial-link" href="/resume">View résumé <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="home-opening-description">
            <p>I’m Jay, a product engineer. Yes, I use AI too. I’m still picky about what ships.</p>
            <p>I care about what’s worth building, how it feels to use, and the code the next person inherits. That’s where taste, judgment, and standards make the difference.</p>
            <p>And yes, this portfolio is AI-generated. <strong>With taste.</strong> 😭 No ordinary AI slop here.</p>
          </div>
        </div>
        <div className="home-proof-line">
          <span>Based in the Philippines · Working globally</span>
          <span>Previously building at <strong><CompanyLink href={companyUrls.chartmetric}>Chartmetric</CompanyLink></strong> & <strong>Xoots</strong></span>
        </div>
      </section>

      <section id="selected-work" className="home-work shell" aria-labelledby="work-heading">
        <header className="editorial-section-heading">
          <p className="editorial-label"><span>01 /</span> Selected work</p>
          <h2 id="work-heading">Different problems.<br />The same care.</h2>
          <span className="editorial-section-note">A closer look at two products</span>
        </header>
        <article className="featured-story featured-story--music" aria-labelledby="music-title">
          <div className="featured-story-heading">
            <div>
              <p className="editorial-label">Music intelligence <span>· 2024—2025</span></p>
              <h3 id="music-title"><Link href="/work/music-stats" transitionTypes={["project-expand"]}>Music Stats <ArrowUpRight aria-hidden="true" /></Link></h3>
            </div>
            <p>Making a world of music data<br className="desktop-break" /> feel immediately useful.</p>
          </div>
          <Reveal className="featured-story-media">
            <ProjectHoverLink href="/work/music-stats" className="featured-media-link" aria-label="Explore the Music Stats case study" transitionTypes={["project-expand"]}>
              <ProjectHoverMedia project={music} />
            </ProjectHoverLink>
          </Reveal>
          <div className="featured-story-footer">
            <div><span className="editorial-label">My contribution</span><p>A public product for <Link className="contribution-company-link" href="/resume#chartmetric" aria-label="View my Chartmetric experience on the résumé">Chartmetric</Link>, bringing four music tools into one clear experience.</p></div>
            <div className="featured-story-role"><span className="editorial-label">Role</span><p>Product Engineer</p></div>
            <Link className="editorial-link" href="/work/music-stats" transitionTypes={["project-expand"]}>Read the story <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </article>

        <article className="featured-story featured-story--xoots" aria-labelledby="xoots-title">
          <div className="xoots-story-copy">
            <p className="editorial-label">AI recruitment <span>· 2023—2026</span></p>
            <h3 id="xoots-title">Xoots.ai</h3>
            <p className="featured-story-deck">AI can do more.<br />People should stay in control.</p>
            <p className="featured-story-summary">I built the frontend across a connected suite for talent search, interviewing, assessment, and learning.</p>
            <Link className="editorial-link" href="/work/xoots-ai" transitionTypes={["project-expand"]}>Explore the decisions <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="xoots-story-evidence">
            <Reveal><ProjectHoverLink className="featured-media-link" href="/work/xoots-ai" aria-label="Explore the Xoots.ai case study" transitionTypes={["project-expand"]}><ProjectHoverMedia project={xoots} /></ProjectHoverLink></Reveal>
            <DecisionExplorer decisions={xoots.decisions} />
          </div>
        </article>
      </section>

      <section className="home-breadth shell" aria-labelledby="breadth-heading">
        <div className="home-breadth-intro">
          <p className="editorial-label"><span>02 /</span> Beyond the product</p>
          <h2 id="breadth-heading">Systems that make<br />the next thing easier.</h2>
          <p>The same care goes into the foundations: reusable interfaces, flexible content, and room for a brand to be itself.</p>
        </div>
        <div className="home-breadth-work">
          <ProjectHoverLink className="breadth-project" href="/work/evelan" transitionTypes={["project-expand"]}>
            <span className="editorial-label">Digital studio · 2023—2024</span>
            <span className="breadth-project-title">{evelan.title} <ProjectHoverArrow /></span>
            <span>Reusable Sanity foundations for distinct client websites.</span>
            <span className="breadth-project-meta">Full-stack engineering · Content systems</span>
            <ProjectHoverMedia project={evelan} />
          </ProjectHoverLink>
          <Link className="archive-invitation" href="/work"><span>There’s more to explore.</span><strong>View the work archive <ArrowRight size={21} aria-hidden="true" /></strong><span className="editorial-label">07 projects</span></Link>
        </div>
      </section>

      <section className="home-approach" aria-labelledby="approach-heading">
        <div className="shell home-approach-grid">
          <div className="home-approach-intro">
            <p className="editorial-label"><span>03 /</span> The way I work</p>
            <h2 id="approach-heading">A thoughtful partner.<br />From question<br />to shipped product.</h2>
            <p>I work close to the problem, connect product and engineering, and care about the details people use every day.</p>
            <Link className="editorial-link" href="/about">A little more about me <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="home-principles">
            <article><span>01</span><div><h3>Start with the real question.</h3><p>At Music Stats, the task comes before the dataset. Give people a useful starting point.</p><Link href="/work/music-stats#decisions">See it in Music Stats <ArrowUpRight size={15} aria-hidden="true" /></Link></div></article>
            <article><span>02</span><div><h3>Make the difficult states clear.</h3><p>In AI workflows, progress, uncertainty, and human review deserve as much care as the happy path.</p><Link href="/work/xoots-ai#decisions">See it in Xoots <ArrowUpRight size={15} aria-hidden="true" /></Link></div></article>
            <article><span>03</span><div><h3>Build for what comes next.</h3><p>Reusable foundations should make teams faster while leaving room for each product’s personality.</p><Link href="/work/evelan#decisions">See it in Evelan <ArrowUpRight size={15} aria-hidden="true" /></Link></div></article>
          </div>
          <details className="home-career">
            <summary><span>Experience, briefly</span><span>From frontend craft to product ownership <span className="disclosure-mark" aria-hidden="true">+</span></span></summary>
            <div className="home-career-content">{experience.slice(0, 4).map(role => <div key={role.company}><span>{role.period}</span><strong>{role.companyUrl ? <CompanyLink href={role.companyUrl}>{role.company}</CompanyLink> : role.company}</strong><span>{role.role}</span></div>)}<Link className="editorial-link" href="/resume">Read the full résumé <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
          </details>
        </div>
      </section>
    </div>
  );
}

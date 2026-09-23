import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ShipDirectionFlow } from "./demo-ship-flow";
import { profileStyle, profileUrl, type DesignProfile } from "@/lib/design-profile";
import "./demo-ship.css";

export const directions = [
  {
    slug: "first-project",
    number: "01",
    label: "First project",
    title: "Make the next step obvious.",
    brief: "A sample onboarding flow for a solo founder's project workspace.",
    detail: "The first session should produce one named project and a clear next action. The page gives the primary task the most space, keeps optional setup aside, and makes the empty state useful.",
    steps: ["Name the project", "Set the first milestone", "See a useful empty state"],
    pattern: "Onboarding → first useful object",
    className: "project",
  },
  {
    slug: "availability",
    number: "02",
    label: "Availability",
    title: "Let a booking feel settled.",
    brief: "A sample service booking flow with explicit availability and confirmation.",
    detail: "Selection, review, and confirmation stay in one legible sequence. The chosen time remains visible, and the final screen tells the visitor what happens next.",
    steps: ["Choose a time", "Review the choice", "Confirm the next step"],
    pattern: "Browse → select → confirm",
    className: "booking",
  },
] as const;

export type Direction = (typeof directions)[number];

function href(path: string, profile: DesignProfile) {
  return profileUrl(path, profile);
}

function ShipHeader({ profile }: { profile: DesignProfile }) {
  return <header className="demo-ship__header">
    <Link className="demo-ship__brand" href={href("/sites/ship-onwards", profile)} aria-label="Ship Onwards home"><span aria-hidden="true">S/O</span><strong>Ship<br />Onwards</strong></Link>
    <nav aria-label="Ship Onwards"><Link href={href("/sites/ship-onwards/directions", profile)}>Explore directions</Link><Link href={href("/sites/ship-onwards/how-it-works", profile)}>How it works</Link><Link href={href("/experiments/design-profile?site=ship-onwards", profile)}>Tune this site</Link></nav>
    <Link className="demo-ship__header-cta" href="/#early-access">Early access <span aria-hidden="true">↗</span></Link>
  </header>;
}

function ShipFooter({ profile }: { profile: DesignProfile }) {
  return <footer className="demo-ship__footer">
    <Link className="demo-ship__footer-wordmark" href={href("/sites/ship-onwards", profile)}>Keep<br />shipping<span>.</span></Link>
    <div><p>Ship Onwards is a prototype for solo builders. Its examples are conceptual and assembled manually for this Lab release.</p><Link href={href("/showcase/ship-onwards", profile)}>Read the case study ↗</Link></div>
    <div><span>Explore</span><Link href={href("/sites/ship-onwards/directions", profile)}>Directions</Link><Link href={href("/sites/ship-onwards/how-it-works", profile)}>The process</Link><Link href={href("/experiments/design-profile?site=ship-onwards", profile)}>Configurator</Link></div>
  </footer>;
}

export function ShipSite({ profile, children }: { profile: DesignProfile; children: ReactNode }) {
  return <div className="demo-ship" style={profileStyle(profile) as CSSProperties}>
    <div className="demo-ship__prototype"><span>Working prototype / Jay&apos;s Lab Showcase</span><Link href={href("/showcase/ship-onwards", profile)}>View process ↗</Link></div>
    <ShipHeader profile={profile} />
    <main>{children}</main>
    <ShipFooter profile={profile} />
  </div>;
}

export function DirectionVisual({ variant, detailed = false }: { variant: Direction["className"]; detailed?: boolean }) {
  if (variant === "booking") return <div className={`demo-ship__visual demo-ship__visual--booking${detailed ? " is-detailed" : ""}`} aria-label="Sample booking interface: available dates, selected time, and confirmation">
    <div className="demo-ship__visual-top"><span>ATELIER / SERVICE</span><span>01 — 03</span></div>
    <div className="demo-ship__booking-head"><small>Book a session</small><strong>Make room for<br />what matters.</strong><p>Find a time that works. We&apos;ll take care of the details.</p></div>
    <div className="demo-ship__booking-dates"><span>Mon<br /><b>16</b></span><span className="active">Tue<br /><b>17</b></span><span>Wed<br /><b>18</b></span><span>Thu<br /><b>19</b></span></div>
    <div className="demo-ship__booking-bottom"><span>Selected / Tue 17, 10:30 AM</span><b>Continue →</b></div>
  </div>;
  return <div className={`demo-ship__visual demo-ship__visual--project${detailed ? " is-detailed" : ""}`} aria-label="Sample project workspace: first project creation and next steps">
    <div className="demo-ship__visual-top"><span>GOODWORK / HOME</span><span>↗</span></div>
    <div className="demo-ship__project-layout"><aside><span>Overview</span><span>Projects</span><span>Notes</span></aside><div><small>MONDAY, 14 SEPTEMBER</small><strong>Your next good<br />idea starts here.</strong><p>Give it a name. We&apos;ll help you find the shape.</p><div className="demo-ship__project-input"><span>Project name</span><b>Continue →</b></div><small>01 / 03 · Your first project</small></div></div>
  </div>;
}

export function ShipHome({ profile }: { profile: DesignProfile }) {
  return <>
    <section className="demo-ship__hero">
      <div className="demo-ship__hero-label"><span>01 / A product direction for the build ahead</span><span>For solo builders + their coding agents</span></div>
      <div className="demo-ship__hero-main"><div><h1>Make the first<br /><em>flow</em> feel finished<span>.</span></h1><p>A curated design direction, a clear system, and one complete product journey to build from. Ship Onwards is taking shape in public.</p><div className="demo-ship__hero-actions"><Link className="demo-ship__button" href={href("/sites/ship-onwards/directions", profile)}>Explore the sample directions <span>↗</span></Link><Link className="demo-ship__text-link" href={href("/sites/ship-onwards/how-it-works", profile)}>See the intended process →</Link></div></div><div className="demo-ship__hero-mark" aria-hidden="true"><span>S</span><span>↗</span><span>O</span></div></div>
      <div className="demo-ship__hero-bottom"><span>Prototype, not a product for sale yet.</span><span>Scroll to inspect ↓</span></div>
    </section>

    <section className="demo-ship__home-directions"><div className="demo-ship__section-head"><span>02 / Working examples</span><h2>From brief to a useful first screen.</h2><p>Two conceptual flows show how content hierarchy and interaction states can be made concrete. The sample product names are fictional.</p></div><div className="demo-ship__direction-list">{directions.map((direction) => <Link key={direction.slug} className="demo-ship__direction-card" href={href(`/sites/ship-onwards/directions/${direction.slug}`, profile)}><div className="demo-ship__direction-meta"><span>{direction.number} / {direction.label}</span><span>{direction.pattern}</span></div><DirectionVisual variant={direction.className} /><div className="demo-ship__direction-caption"><h3>{direction.title}</h3><span aria-hidden="true">↗</span></div></Link>)}</div></section>

    <section className="demo-ship__home-method"><span>03 / The promise being tested</span><div><h2>Start with decisions.<br />Then make them visible.</h2><p>The planned Design Skill reads a product brief, proposes a page and flow structure for review, then helps a coding agent build a design foundation and one complete user flow inside the builder&apos;s repository. That workflow still needs private implementation and outside-user validation.</p><Link className="demo-ship__text-link" href={href("/sites/ship-onwards/how-it-works", profile)}>Understand the scope →</Link></div></section>

    <section className="demo-ship__home-final"><span>04 / Try the prototype</span><h2>Change the<br />visual rules.</h2><p>See this site respond to semantic color, type, corners, and spacing. Export the exact versioned profile you made.</p><Link className="demo-ship__button" href={href("/experiments/design-profile?site=ship-onwards", profile)}>Tune this site <span>↗</span></Link></section>
  </>;
}

export function ShipDirections({ profile }: { profile: DesignProfile }) {
  return <div className="demo-ship__inner-page"><header className="demo-ship__page-header"><span>Explore / 02 sample directions</span><h1>Useful flows begin<br />with a point of view.</h1><p>These fictional product examples expose the page structure and interaction decisions. They are manually built prototypes, not outputs attributed to a private skill.</p></header><div className="demo-ship__direction-list">{directions.map((direction) => <Link key={direction.slug} className="demo-ship__direction-card" href={href(`/sites/ship-onwards/directions/${direction.slug}`, profile)}><div className="demo-ship__direction-meta"><span>{direction.number} / {direction.label}</span><span>{direction.pattern}</span></div><DirectionVisual variant={direction.className} /><div className="demo-ship__direction-caption"><h2>{direction.title}</h2><span aria-hidden="true">↗</span></div><p>{direction.brief}</p></Link>)}</div></div>;
}

export function ShipDirectionDetail({ profile, direction }: { profile: DesignProfile; direction: Direction }) {
  return <div className="demo-ship__inner-page demo-ship__detail"><Link className="demo-ship__back" href={href("/sites/ship-onwards/directions", profile)}>← All directions</Link><header className="demo-ship__page-header"><span>{direction.number} / Sample direction / {direction.pattern}</span><h1>{direction.title}</h1><p>{direction.brief}</p></header><DirectionVisual variant={direction.className} detailed /><ShipDirectionFlow variant={direction.className} /><div className="demo-ship__detail-body"><div><span>Why this shape</span><h2>A clear path from intent to action.</h2></div><div><p>{direction.detail}</p><ol>{direction.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="demo-ship__fineprint">Illustrative interface and copy. No production backend is connected.</p></div></div><div className="demo-ship__detail-next"><Link href={href("/experiments/design-profile?site=ship-onwards", profile)}>Tune this direction in the Lab ↗</Link><Link href="/#early-access">Join first-skill early access ↗</Link></div></div>;
}

export function ShipHowItWorks({ profile }: { profile: DesignProfile }) {
  return <div className="demo-ship__inner-page demo-ship__method-page"><header className="demo-ship__page-header"><span>The intended process / prototype</span><h1>One complete flow.<br />A system to grow from.</h1><p>The future paid Design Skill is planned as an installable workflow for a coding agent in a supported Next.js or React repository. It is being validated, not sold here.</p></header><div className="demo-ship__method-steps"><article><span>01 / Understand</span><h2>Read the product and the repository.</h2><p>Use a brief to understand the audience and task. In an existing app, audit the current design system and UI first.</p></article><article><span>02 / Propose</span><h2>Make the direction reviewable.</h2><p>Choose a product pattern, hierarchy, style profile, and key interaction states for the founder to approve.</p></article><article><span>03 / Build</span><h2>Finish one real journey.</h2><p>Set up design foundations and core components, then complete one polished flow with responsive and accessible states.</p></article><article><span>04 / Hand off</span><h2>Leave a coherent path forward.</h2><p>Document the system and how to extend it across the remaining product. Manual review and checks remain necessary.</p></article></div><div className="demo-ship__method-end"><h2>Explore what is working now.</h2><Link className="demo-ship__button" href={href("/sites/ship-onwards/directions", profile)}>Browse sample directions <span>↗</span></Link></div></div>;
}

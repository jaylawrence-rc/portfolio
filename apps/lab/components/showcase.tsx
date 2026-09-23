import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultDesignProfile, profileUrl, type DesignProfile } from "@/lib/design-profile";
import { journalBaselineCommit } from "@/lib/journal-retrofit";
import "./showcase.css";
import "./signal-case.css";

const entries = [
  {
    slug: "ship-onwards",
    index: "01",
    title: "Ship Onwards",
    summary: "A prototype product site for solo builders, with two inspectable sample flows and a tunable visual profile.",
    tags: ["New build", "Editorial commerce direction", "Next.js / React"],
    image: "/showcase/ship-onwards.png",
    alt: "Screenshot of the working Ship Onwards prototype homepage",
  },
  {
    slug: "journal-retrofit",
    index: "02",
    title: "Portfolio Journal retrofit",
    summary: "A controlled browse-to-article reconstruction, comparing the fixed committed baseline with a tunable refined direction.",
    tags: ["Retrofit", "Editorial reading flow", "Next.js / React"],
    image: "/showcase/journal-retrofit.png",
    alt: "Screenshot of the working refined Portfolio Journal archive prototype",
  },
] as const;

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return <div className="showcase__fact"><dt>{label}</dt><dd>{children}</dd></div>;
}

function CaseHeader({ number, type, title, intro, image, alt, tags }: { number: string; type: string; title: string; intro: string; image: string; alt: string; tags: readonly string[] }) {
  return <><div className="showcase__case-top"><Link href="/showcase">← All Showcase</Link><span>{number} / {type}</span></div><header className="showcase__case-header"><div><p className="showcase__kicker">Showcase / {type}</p><h1>{title}</h1></div><p>{intro}</p></header><div className="showcase__case-image"><Image src={image} alt={alt} fill sizes="100vw" priority /></div><p className="showcase__shot-caption">Screenshot captured from this working local prototype on September 23, 2026. Manual implementation; no private Design Skill output.</p><ul className="showcase__tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></>;
}

function CaseActions({ fullSite, tune }: { fullSite: string; tune: string }) {
  return <div className="showcase__case-actions"><Link href={fullSite} target="_blank" rel="noopener noreferrer" className="showcase__action-primary">Open full site ↗</Link><Link href={tune}>Tune and export profile ↗</Link></div>;
}

function LiveFrame({ src, title }: { src: string; title: string }) {
  return <div className="showcase__live-frame"><iframe title={title} src={src} loading="lazy" /></div>;
}

export function ShipOnwardsCase({ profile = defaultDesignProfile("ship-onwards") }: { profile?: DesignProfile }) {
  const demo = profileUrl("/sites/ship-onwards", profile);
  const tune = profileUrl("/experiments/design-profile?site=ship-onwards", profile);
  return <article className="showcase showcase--case"><CaseHeader number="01" type="New build" title="Ship Onwards" intro="A future product for solo founders, shown here as a working storefront prototype. Visitors can browse conceptual product directions, complete sample local flows, tune the visual system, and export a profile." image="/showcase/ship-onwards.png" alt="Screenshot of the working Ship Onwards prototype homepage" tags={entries[0].tags} />
    <section className="showcase__case-section showcase__case-section--live"><div><p className="showcase__kicker">01 / Inspect the result</p><h2>A site you can move through.</h2><p>The live preview and the full route use the same profile. Open the site to move through the sample directions and local interaction states.</p><CaseActions fullSite={demo} tune={tune} /></div><LiveFrame src={demo} title="Ship Onwards working site preview" /></section>
    <section className="showcase__case-section"><div><p className="showcase__kicker">02 / Product brief</p><h2>A clear starting point for a solo builder.</h2></div><div className="showcase__prose"><p>Ship Onwards is planned as a storefront and product for solo founders who use coding agents. The intended first-project deliverable is a design foundation, core components, one complete UI flow, and a guide for extending the system. This prototype demonstrates an editorial product direction and two fictional sample flows. It does not demonstrate that a buyer can reproduce the result unaided.</p><p>The current direction uses the confirmed Lab plan. Jay&apos;s fuller written Ship Onwards brief has not been supplied, so the fictional flows and copy still need his review. The home page, direction browser, direction details, local choose → review → confirmation flows, and Lab Configurator form a navigable proof of presentation and interaction.</p></div></section>
    <section className="showcase__case-section"><div><p className="showcase__kicker">03 / Design decisions</p><h2>A product page that earns its first click.</h2></div><ol className="showcase__decisions"><li><span>01</span><div><h3>Lead with the first flow.</h3><p>The hero names the product outcome and offers a direct route to inspect sample UI. Process details come after the working examples.</p></div></li><li><span>02</span><div><h3>Separate promise from proof.</h3><p>Fictional flows are labeled as examples. Future Design Skill outcomes and performance remain hypotheses until a private version and outside-user pilots exist.</p></div></li><li><span>03</span><div><h3>Make the profile visible.</h3><p>Color, type, radius, and density are explicit versioned choices. The Configurator applies the same profile to embedded and full-site routes.</p></div></li></ol></section>
    <section className="showcase__facts"><dl><Fact label="Skill version">None used. A working private v0 has not produced this demo.</Fact><Fact label="Design Profile">Public schema v{profile.schemaVersion}; selected: {profile.controls.colorSet}, {profile.controls.fontPair}, {profile.controls.radius}, {profile.controls.density}. <Link href={tune}>Inspect or export ↗</Link></Fact><Fact label="Manual edits">All layout, copy, components, sample concepts, local flow states, and responsive styling in this prototype were assembled and revised manually in the public Lab app.</Fact><Fact label="Quality checks">Approved color sets pass normal-text contrast checks; the public profile parser and export round-trip have automated tests. Responsive, keyboard, and reduced-motion review remains pending before publication.</Fact></dl></section>
    <section className="showcase__end"><p>Prototype / No checkout or production backend</p><h2>Try changing the rules.</h2><Link href={tune}>Open Design Profile Configurator ↗</Link></section>
  </article>;
}

export function JournalRetrofitCase({ profile = defaultDesignProfile("journal-retrofit") }: { profile?: DesignProfile }) {
  const baseline = profileUrl("/sites/journal-retrofit/baseline", profile);
  const refined = profileUrl("/sites/journal-retrofit", profile);
  const tune = profileUrl("/experiments/design-profile?site=journal-retrofit", profile);
  return <article className="showcase showcase--case"><CaseHeader number="02" type="Controlled retrofit" title="Portfolio Journal" intro="The existing Journal browse → article flow, rebuilt for comparison with a fixed committed baseline and a tunable editorial direction." image="/showcase/journal-retrofit.png" alt="Screenshot of the working refined Portfolio Journal archive prototype" tags={entries[1].tags} />
    <section className="showcase__case-section"><div><p className="showcase__kicker">01 / Starting point</p><h2>The baseline is pinned.</h2></div><div className="showcase__prose"><p>The target is Jay&apos;s own Next.js/React Portfolio Journal at commit <code>{journalBaselineCommit.slice(0, 7)}</code>. That commit contains four published post records. A fifth record exists only in unrelated, uncommitted edits in the original checkout; it was not copied into this worktree and was not removed from the original checkout.</p><p>This is a controlled reconstruction of the selected browse → article flow, not an archived deployment. The four committed archive titles, descriptions, topics, and dates are retained. The selected AI workflow article keeps its prose and key diagram content; diagrams are simplified for this comparison. Its three other archive links open the original live articles. The actual Portfolio Journal continues separately.</p></div></section>
    <section className="showcase__comparison"><div className="showcase__comparison-head"><div><p className="showcase__kicker">02 / Before and after</p><h2>Same reading task. Different hierarchy.</h2><p>Browse the selected article in either view. The baseline is fixed; only the refined view responds to the Configurator.</p></div><Link href={tune}>Tune the refined view ↗</Link></div><div className="showcase__comparison-grid"><div><div className="showcase__frame-label"><span>Before / fixed baseline</span><Link href={baseline} target="_blank" rel="noopener noreferrer">Open ↗</Link></div><LiveFrame src={baseline} title="Fixed Portfolio Journal baseline preview" /></div><div><div className="showcase__frame-label"><span>After / tunable refinement</span><Link href={refined} target="_blank" rel="noopener noreferrer">Open ↗</Link></div><LiveFrame src={refined} title="Tunable Portfolio Journal retrofit preview" /></div></div></section>
    <section className="showcase__case-section"><div><p className="showcase__kicker">03 / Design decisions</p><h2>Give each article a clearer invitation.</h2></div><ol className="showcase__decisions"><li><span>01</span><div><h3>Make the archive scannable.</h3><p>Topic, title, summary, date, and reading time remain, with a larger hierarchy and quieter decorative media.</p></div></li><li><span>02</span><div><h3>Protect the reading rail.</h3><p>The article headline gains room to breathe while body copy stays on a comfortable rail. The diagrams are reconstructed as text-first structures.</p></div></li><li><span>03</span><div><h3>Keep the comparison honest.</h3><p>The baseline does not change with profile controls. The refined view does, and its profile persists into the selected article route.</p></div></li></ol></section>
    <section className="showcase__facts"><dl><Fact label="Skill version">None used. A working private v0 has not produced this retrofit.</Fact><Fact label="Design Profile">Public schema v{profile.schemaVersion}; selected: {profile.controls.colorSet}, {profile.controls.fontPair}, {profile.controls.radius}, {profile.controls.density}. <Link href={tune}>Inspect or export ↗</Link></Fact><Fact label="Manual edits">Archive and selected article reconstructed from the committed source; diagrams simplified; visual hierarchy, layout, styling, and link handling manually edited.</Fact><Fact label="Quality checks">The baseline commit and metadata were inspected. The public profile parser and contrast checks have automated tests. Responsive, keyboard, and reduced-motion review remains pending before publication.</Fact></dl></section>
    <section className="showcase__end"><p>Original Portfolio Journal remains at jaylawrence.me/blog</p><h2>See the exact decisions.</h2><Link href={tune}>Open Design Profile Configurator ↗</Link></section>
  </article>;
}

export function SignalAtlasCase() {
  const site = "/sites/signal-atlas";

  return <article className="showcase showcase--case signalCase">
    <div className="showcase__case-top"><Link href="/showcase">← All Showcase</Link><span>03 / Motion-led prototype</span></div>

    <header className="signalCase__header">
      <div>
        <p className="showcase__kicker">Showcase / Original concept</p>
        <h1>Signal<br /><em>Atlas.</em></h1>
      </div>
      <div className="signalCase__headerAside">
        <p>A fictional city-operations intelligence site. An original network map moves from atmospheric introduction to inspectable sample decisions.</p>
        <Link href={site} target="_blank" rel="noopener noreferrer">Explore the working site <span aria-hidden="true">↗</span></Link>
      </div>
    </header>

    <figure className="signalCase__image">
      <Image src="/showcase/signal-atlas-port.png" alt="Generated illustration of a coastal port and connected city at dusk" fill sizes="(max-width: 750px) 100vw, 90vw" priority />
      <figcaption>Generated illustrative image · Fictional setting, not a customer site or measured city outcome</figcaption>
    </figure>
    <ul className="showcase__tags signalCase__tags" aria-label="Project attributes"><li>Original concept</li><li>Scroll narrative</li><li>Interactive map</li><li>Next.js / React</li></ul>

    <section className="showcase__case-section showcase__case-section--live signalCase__live" aria-labelledby="signal-result-title">
      <div>
        <p className="showcase__kicker">01 / Inspect the result</p>
        <h2 id="signal-result-title">From a signal to a decision.</h2>
        <p>Scroll from the opening map into the operational explanation, then select mobility, energy, or weather. Each scenario changes both the route visual and the written signal, assessment, and proposed action. All values are sample data.</p>
        <div className="showcase__case-actions"><Link href={site} target="_blank" rel="noopener noreferrer" className="showcase__action-primary">Open full site ↗</Link><a href="#signal-decisions">Read the design decisions ↓</a></div>
      </div>
      <LiveFrame src={site} title="Working Signal Atlas fictional prototype preview" />
    </section>

    <section className="signalCase__patternSection" id="signal-decisions" aria-labelledby="signal-pattern-title">
      <div className="signalCase__sectionIntro">
        <p className="showcase__kicker">02 / Design pattern study</p>
        <h2 id="signal-pattern-title">Make the metaphor earn its place.</h2>
        <p>The public <a href="https://www.sentientx.com/" target="_blank" rel="noopener noreferrer">SentientX experience ↗</a> informed the narrative structure: a reversible opening visual, a stable thesis beside changing evidence, and a shift from metaphor to proof to action. Signal Atlas uses its own subject, map, content, and graphic language.</p>
      </div>
      <ol className="signalCase__patterns">
        <li><span>01 / OPENING</span><h3>One visual thread.</h3><p>The angular network map connects the opening claim to a concrete model of routes and alerts. A bounded sticky desktop scene lets the map, dot field, and caption card move at different rates with native scroll, then rewind when the reader scrolls back.</p></li>
        <li><span>02 / EVIDENCE</span><h3>Context stays put.</h3><p>A separate bounded desktop split keeps the explanation in view while three evidence cards enter and their illustrations move within the frames. On narrow screens, those beats become a simple reading sequence.</p></li>
        <li><span>03 / CHOICE</span><h3>A working state.</h3><p>The scenario controls turn a cinematic idea into an inspectable interaction. Selected state, signal, assessment, and next action are available as text as well as color.</p></li>
      </ol>
    </section>

    <section className="showcase__case-section signalCase__visualSection" aria-labelledby="signal-visual-title">
      <div><p className="showcase__kicker">03 / Visual system</p><h2 id="signal-visual-title">Dark for the question. Light for the answer.</h2></div>
      <div className="signalCase__visualDetails">
        <div className="signalCase__swatches" aria-label="Signal Atlas color roles"><span className="signalCase__swatch signalCase__swatch--charcoal"><b>Charcoal</b><small>Atmosphere</small></span><span className="signalCase__swatch signalCase__swatch--ivory"><b>Ivory</b><small>Evidence</small></span><span className="signalCase__swatch signalCase__swatch--lime"><b>Lime</b><small>Action</small></span><span className="signalCase__swatch signalCase__swatch--cyan"><b>Cyan</b><small>Mobility</small></span><span className="signalCase__swatch signalCase__swatch--amber"><b>Amber</b><small>Energy</small></span><span className="signalCase__swatch signalCase__swatch--coral"><b>Coral</b><small>Weather</small></span></div>
        <p>Jay&apos;s Lab ivory, charcoal, Geist, and action lime anchor the page. Scenario colors are semantic accents. Rectilinear panels, hairline dividers, and angular paths make the system feel precise; large documentary imagery makes the abstract network easier to place in a city context.</p>
        <p>The opening gives the message and map distinct space. Two bounded sticky desktop chapters carry the map progression and the evidence explanation, followed by a wide image chapter with a moving backdrop and a direct scenario workspace. Mobile stacks headline, map, evidence, image, and controls in reading order without parallax.</p>
      </div>
    </section>

    <section className="signalCase__motion" aria-labelledby="signal-motion-title">
      <div className="signalCase__sectionIntro"><p className="showcase__kicker">04 / Motion score</p><h2 id="signal-motion-title">Scroll sets the pace.</h2><p>The reference&apos;s exact durations and easing curves were not verified. These values are choices for this prototype, made to keep movement measured and reversible.</p></div>
      <div className="signalCase__motionList">
        <div><span>01 / Entrance</span><h3>Settle into the scene</h3><p>The headline settles over about 680ms with <code>cubic-bezier(.22, 1, .36, 1)</code> and a small upward translation. The map caption joins the scroll sequence.</p></div>
        <div><span>02 / Progression</span><h3>Follow the scroll</h3><p>Within a bounded sticky scene, the map translates, rotates, and grows as the dot field drifts and the caption card rises away. Native scroll position is the linear clock; scrolling back restores the earlier composition.</p></div>
        <div><span>03 / Evidence</span><h3>Make the cut</h3><p>Cards enter the light evidence chapter while the figures inside move at a different rate. A stronger image drift creates depth in the photographic chapter; its text stays still. These effects are desktop only.</p></div>
        <div><span>04 / Selection</span><h3>Compare scenarios</h3><p>Route overlays fade in about 240ms; the written decision changes immediately and control colors respond in about 200ms. Controls stay interruptible, and reduced-motion mode keeps a complete static story.</p></div>
      </div>
    </section>

    <section className="showcase__facts signalCase__facts" aria-label="Implementation record"><dl><Fact label="Project status">Fictional public prototype. No city deployment, live feed, or validated operational result.</Fact><Fact label="Skill version">None used. This page and working site were manually assembled; no private Design Skill output was used.</Fact><Fact label="Manual edits">Original copy, network map, scenario content, layout, component styling, scroll progression, and responsive behavior.</Fact><Fact label="Quality and limits">Lab lint, TypeScript, production build, and browser checks cover the public route and desktop/mobile interaction. Keyboard selection and focus were checked. Reduced-motion behavior is implemented in CSS but was not browser-emulated in this review.</Fact></dl></section>

    <section className="showcase__end signalCase__end"><p>Sample data / Generated illustration / No production backend</p><h2>Inspect the decisions in motion.</h2><Link href={site} target="_blank" rel="noopener noreferrer">Open Signal Atlas ↗</Link></section>
  </article>;
}

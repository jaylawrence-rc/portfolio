import Image from "next/image";
import Link from "next/link";
import "./showcase-gallery.css";

const projects = [
  {
    number: "01",
    slug: "ship-onwards",
    kind: "New build",
    title: "Ship Onwards",
    summary: "An editorial product site for solo builders, with a working browse-to-decision flow and a visual profile you can tune.",
    image: "/showcase/ship-onwards.png",
    alt: "Ship Onwards working product-site homepage with a large editorial headline and coral illustration",
    route: "/sites/ship-onwards",
    steps: ["Explore", "Choose", "Review"],
    mediaKind: "screen",
  },
  {
    number: "02",
    slug: "journal-retrofit",
    kind: "Controlled retrofit",
    title: "Portfolio Journal",
    summary: "A reading experience rebuilt against a fixed baseline, so its changed hierarchy and article flow can be inspected side by side.",
    image: "/showcase/journal-retrofit.png",
    alt: "Refined Portfolio Journal archive with a large editorial heading and article list",
    route: "/sites/journal-retrofit",
    steps: ["Browse", "Read", "Compare"],
    mediaKind: "screen",
  },
  {
    number: "03",
    slug: "signal-atlas",
    kind: "Motion study",
    title: "Signal Atlas",
    summary: "A fictional city-operations concept that turns a scroll-led network story into three inspectable sample decisions.",
    image: "/showcase/signal-atlas-port.png",
    alt: "Generated illustrative coastal port image for the fictional Signal Atlas city-operations concept",
    route: "/sites/signal-atlas",
    steps: ["Observe", "Compare", "Decide"],
    mediaKind: "illustration",
  },
] as const;

const projectCount = String(projects.length).padStart(2, "0");

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="labShowcaseArrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function BrowserFrame({
  src,
  alt,
  name,
  priority = false,
}: {
  src: string;
  alt: string;
  name: string;
  priority?: boolean;
}) {
  return <div className="labShowcaseBrowser">
    <div className="labShowcaseBrowserBar" aria-hidden="true"><span><i /><i /><i /></span><span>{name}</span><span>↗</span></div>
    <div className="labShowcaseBrowserImage"><Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 820px) 100vw, 66vw" /></div>
  </div>;
}

function ProjectChapter({ project }: { project: typeof projects[number] }) {
  return <section id={project.slug} className={`labShowcaseChapter labShowcaseChapter--${project.slug}`} aria-labelledby={`${project.slug}-title`}>
    <div className="labShowcaseChapterInner">
      <div className="labShowcaseChapterCopy">
        <p className="labShowcaseEyebrow"><span>{project.number} / {projectCount}</span><span>{project.kind}</span></p>
        <div>
          <h2 id={`${project.slug}-title`}>{project.title}</h2>
          <p className="labShowcaseChapterSummary">{project.summary}</p>
          <div className="labShowcaseActions">
            <Link className="labShowcaseAction labShowcaseAction--primary" href={`/showcase/${project.slug}`}>Read the case study <Arrow diagonal /></Link>
            <Link className="labShowcaseAction labShowcaseAction--text" href={project.route}>Open the working site <Arrow diagonal /></Link>
          </div>
        </div>
        <p className="labShowcaseChapterFooter">Working prototype / manually assembled</p>
      </div>
      <div className="labShowcaseChapterMedia">
        <div className="labShowcaseChapterStage">
          <div className="labShowcaseChapterImage">{project.mediaKind === "screen"
            ? <BrowserFrame src={project.image} alt={project.alt} name={project.slug} />
            : <figure className="labShowcaseIllustration"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 820px) 100vw, 66vw" /><figcaption>Generated illustration / fictional city concept</figcaption></figure>}
          </div>
          <span className="labShowcaseStageIndex" aria-hidden="true">{project.number}</span>
        </div>
        <div className="labShowcaseMediaDetail">
          <p>Inside the working route</p>
          <ol>{project.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        </div>
      </div>
    </div>
  </section>;
}

export function ShowcaseGallery() {
  return <div className="labShowcase">
    <section className="labShowcaseHero" aria-labelledby="showcase-title">
      <div className="labShowcaseShell">
        <div className="labShowcaseHeroMeta"><p>Jay&apos;s Lab / Showcase</p><p>Three public prototypes · 2026</p></div>
        <div className="labShowcaseHeroHeadline">
          <h1 id="showcase-title">Made to be <em>opened.</em></h1>
          <div><p>Three working interfaces. Each has a route to explore and a case study that shows the decisions behind it.</p><a href="#ship-onwards" className="labShowcaseScrollLink">Explore the work <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
      <div className="labShowcaseHeroScene" role="group" aria-label="Preview of three showcased prototypes, including a generated illustrative image for Signal Atlas">
        <div className="labShowcaseSceneTop"><span>01 / Ship Onwards</span><span>02 / Portfolio Journal</span><span>03 / Signal Atlas</span></div>
        <div className="labShowcaseSceneGrid">
          <div className="labShowcaseScenePanel labShowcaseScenePanel--ship"><BrowserFrame src="/showcase/ship-onwards.png" alt="" name="ship-onwards" priority /></div>
          <div className="labShowcaseScenePanel labShowcaseScenePanel--journal"><BrowserFrame src="/showcase/journal-retrofit.png" alt="" name="journal-retrofit" priority /></div>
          <div className="labShowcaseScenePanel labShowcaseScenePanel--signal"><Image src="/showcase/signal-atlas-port.png" alt="" fill sizes="(max-width: 610px) 85vw, (max-width: 820px) 90vw, 34vw" /><span>Signal Atlas <small>Generated illustration</small></span></div>
          <span className="labShowcaseSceneSeal" aria-hidden="true">{projectCount}<br /><small>WORKING<br />ROUTES</small></span>
        </div>
        <div className="labShowcaseSceneBottom"><span>Working screens + illustrative concept art</span><span>Scroll to inspect ↓</span></div>
      </div>
    </section>

    <nav className="labShowcaseIndex" aria-label="Showcase sections"><div className="labShowcaseShell">
      <span>In this showcase</span>
      <a href="#ship-onwards"><b>01</b> New build <Arrow /></a>
      <a href="#method"><b>—</b> The method <Arrow /></a>
      <a href="#journal-retrofit"><b>02</b> Retrofit <Arrow /></a>
      <a href="#signal-atlas"><b>03</b> Motion study <Arrow /></a>
    </div></nav>

    <ProjectChapter project={projects[0]} />

    <section id="method" className="labShowcaseMethod" aria-labelledby="method-title">
      <div className="labShowcaseShell">
        <div className="labShowcaseMethodHead">
          <p className="labShowcaseEyebrow"><span>Between the screens</span><span>01 — {projectCount}</span></p>
          <div><h2 id="method-title">The work stays <em>inspectable.</em></h2><p>Each case connects the live result to its design choices, manual edits, and checks. The diagram traces the Design Profile workflow for the first two sites; Signal Atlas documents its motion choices in its own case study.</p></div>
        </div>
        <div className="labShowcaseDiagram"><Image src="/showcase/process-diagram.svg" alt="Illustrative Design Profile workflow for Ship Onwards and Portfolio Journal, connecting screens to color, type, radius, and density choices, then to working routes" fill sizes="1200px" /></div>
        <div className="labShowcaseDiagramMobile" aria-label="Screens, profile choices, and working routes">
          <div className="labShowcaseMobileBlock">
            <span>01 / Working screens</span>
            <div className="labShowcaseMobileScreens"><div><Image src="/showcase/ship-onwards.png" alt="Ship Onwards screen" fill sizes="150px" /></div><div><Image src="/showcase/journal-retrofit.png" alt="Portfolio Journal screen" fill sizes="150px" /></div></div>
          </div>
          <span className="labShowcaseMobileConnector" aria-hidden="true">↓</span>
          <div className="labShowcaseMobileBlock"><span>02 / Explicit profile</span><div className="labShowcaseMobileControls"><span><i className="labShowcaseControlColor" />Color</span><span><i className="labShowcaseControlType">Aa</i>Type</span><span><i className="labShowcaseControlRadius" />Radius</span><span><i className="labShowcaseControlDensity" />Density</span></div></div>
          <span className="labShowcaseMobileConnector" aria-hidden="true">↓</span>
          <div className="labShowcaseMobileBlock"><span>03 / Routes to inspect</span><div className="labShowcaseMobileRoutes"><Link href="/sites/ship-onwards">Ship Onwards <Arrow diagonal /></Link><Link href="/sites/journal-retrofit">Portfolio Journal <Arrow diagonal /></Link></div></div>
        </div>
        <div className="labShowcaseMethodFoot"><span>01 / Result</span><span>02 / Profile</span><span>03 / Route</span><Link href="/experiments/design-profile?site=ship-onwards">Inspect the Design Profile <Arrow diagonal /></Link></div>
      </div>
    </section>

    <ProjectChapter project={projects[1]} />
    <ProjectChapter project={projects[2]} />

    <section className="labShowcaseClosing" aria-labelledby="showcase-closing-title"><div className="labShowcaseShell">
      <div className="labShowcaseClosingHead"><p className="labShowcaseEyebrow">Case files / {projectCount}</p><h2 id="showcase-closing-title">Follow the evidence.</h2><p>Start with the live result, then see the design reasoning and its limits in the case study.</p></div>
      <div className="labShowcaseClosingList">{projects.map((project) => <Link href={`/showcase/${project.slug}`} className="labShowcaseClosingRow" key={project.slug}>
        <span className="labShowcaseClosingNumber">{project.number}</span>
        <span className="labShowcaseClosingThumb"><Image src={project.image} alt="" fill sizes="110px" /></span>
        <span className="labShowcaseClosingName"><strong>{project.title}</strong><small>{project.kind} / Case study{project.mediaKind === "illustration" ? " / Illustrative image" : ""}</small></span>
        <Arrow diagonal />
      </Link>)}</div>
      <p className="labShowcaseDisclosure">These Jay-built public prototypes were manually assembled. They are not outputs of the planned private Design Skill. Customer work joins the showcase only with explicit approval.</p>
    </div></section>
  </div>;
}

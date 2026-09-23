import Image from "next/image";
import Link from "next/link";
import { SignalMap } from "./signal-atlas-map";
import { SignalAtlasScenarios } from "./signal-atlas-scenarios";
import "./demo-signal-atlas.css";

function Wordmark() {
  return <span className="saWordmark"><span className="saWordmarkIcon" aria-hidden="true"><i /><i /><i /><i /></span>signal<span>atlas</span><b>®</b></span>;
}

function EvidenceSignal() {
  return <div className="saEvidenceFigure saEvidenceFigure--signal" aria-hidden="true"><div className="saFigureTop"><span>NETWORK INPUT / 004</span><span>● ACTIVE</span></div><svg viewBox="0 0 520 250" preserveAspectRatio="none"><path className="saChartGrid" d="M0 40H520M0 90H520M0 140H520M0 190H520M60 0V250M180 0V250M300 0V250M420 0V250" /><path className="saChartSecondary" d="M0 176 60 172 110 164 165 171 220 151 282 154 340 134 392 127 440 108 520 113" /><path className="saChartPrimary" d="M0 205 55 202 108 188 168 185 217 152 273 158 328 112 380 121 432 68 520 55" /><circle cx="432" cy="68" r="8" /></svg><div className="saFigureBottom"><span>Corridor occupancy</span><span>Sample signal ↑</span></div></div>;
}

function EvidenceCompare() {
  return <div className="saEvidenceFigure saEvidenceFigure--compare" aria-hidden="true"><div className="saFigureTop"><span>ROUTE COMPARISON</span><span>02 / 03</span></div><div className="saCompareDrawing"><svg viewBox="0 0 520 250" preserveAspectRatio="none"><path className="saCompareGrid" d="M20 35H500M20 105H500M20 175H500M70 15V235M190 15V235M310 15V235M430 15V235" /><path className="saCompareAlt" d="M62 205 170 172 238 202 345 160 455 134" /><path className="saCompareMain" d="M62 205 167 140 245 155 340 91 455 68" /><circle cx="62" cy="205" r="7" /><circle cx="455" cy="68" r="9" /></svg><span className="saCompareFlag">Review corridor B ↗</span></div><div className="saFigureBottom"><span>Two paths / one question</span><span>Human review</span></div></div>;
}

function EvidenceDecision() {
  return <div className="saEvidenceFigure saEvidenceFigure--decision" aria-hidden="true"><div className="saFigureTop"><span>RESPONSE BRIEF</span><span>DRAFT / 01</span></div><div className="saDecisionStack"><div><span>01</span><strong>Signal detected</strong><i /></div><div><span>02</span><strong>Alternatives compared</strong><i /></div><div><span>03</span><strong>Decision prepared</strong><i /></div></div><div className="saFigureBottom"><span>Awaiting operator judgment</span><span>● READY</span></div></div>;
}

const evidence = [
  {
    number: "01",
    title: "See the change.",
    body: "Bring the relevant signals into one picture before a small shift becomes a large surprise.",
    figure: <EvidenceSignal />,
  },
  {
    number: "02",
    title: "Compare the paths.",
    body: "Put possible responses next to the network they affect, with the tradeoff visible.",
    figure: <EvidenceCompare />,
  },
  {
    number: "03",
    title: "Prepare the call.",
    body: "Turn a signal into a clear next step that a person can review, change, or decline.",
    figure: <EvidenceDecision />,
  },
] as const;

export function SignalAtlasSite() {
  return <div className="saSite">
    <a className="saSkip" href="#signal-main">Skip to content</a>
    <header className="saHeader"><div className="saShell saHeaderInner"><a href="#top" aria-label="Signal Atlas, top of page"><Wordmark /></a><nav aria-label="Signal Atlas navigation"><a href="#system">System</a><a href="#scenarios">Scenarios</a><Link href="/showcase/signal-atlas">Case study ↗</Link></nav><a className="saHeaderAction" href="#scenarios">Explore the model <span aria-hidden="true">↗</span></a></div></header>

    <main id="signal-main">
      <section id="top" className="saHero" aria-labelledby="sa-hero-title"><div className="saShell saHeroInner">
        <div className="saHeroCopy"><p className="saKicker"><span className="saStatusDot" />A speculative city-operations interface</p><h1 id="sa-hero-title">See the city<br />before it <em>shifts.</em></h1><p className="saHeroDeck">Signals move across streets, energy, and weather. Signal Atlas brings them into one view so people can decide what happens next.</p><a className="saPrimaryLink" href="#system">Explore the system <span aria-hidden="true">↓</span></a></div>
        <div className="saHeroVisual" data-scenario="overview"><div className="saHeroVisualGrid" aria-hidden="true" /><SignalMap decorative idPrefix="sa-hero" /><div className="saHeroMapCard"><span>SAMPLE NETWORK / 03 SIGNALS</span><strong>One picture.<br />A clearer call.</strong><small>Illustrative system / no live city data</small></div><span className="saHeroCoord saHeroCoord--top" aria-hidden="true">37° 42&apos; / 122° 26&apos;</span><span className="saHeroCoord saHeroCoord--bottom" aria-hidden="true">OBSERVE → COMPARE → DECIDE</span></div>
        <div className="saHeroFooter"><span>01 / A city in motion</span><span>Scroll to inspect ↓</span></div>
      </div></section>

      <section id="system" className="saSystem" aria-labelledby="sa-system-title"><div className="saShell saSystemGrid">
        <div className="saSystemIntro"><p className="saSectionLabel">01 / The system</p><h2 id="sa-system-title">From scattered inputs to a usable decision.</h2><p>Not another map to stare at. A sequence that helps an operator understand what changed, compare paths, and keep the final call human.</p><a href="#scenarios" className="saTextLink">Try a sample scenario <span aria-hidden="true">↗</span></a><span className="saSystemFoot">Scroll the evidence ↓</span></div>
        <div className="saEvidenceList">{evidence.map(item => <article className="saEvidenceCard" key={item.number}><div className="saEvidenceCardTop"><span>{item.number} / 03</span><span>Signal Atlas / illustrative</span></div>{item.figure}<div className="saEvidenceCardCopy"><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div>
      </div></section>

      <section className="saField" aria-labelledby="sa-field-title"><div className="saFieldImage"><Image src="/showcase/signal-atlas-port.png" alt="AI-generated illustrative aerial view of a coastal logistics port at dusk" fill sizes="100vw" /></div><div className="saFieldShade" aria-hidden="true" /><div className="saShell saFieldContent"><p className="saSectionLabel">02 / Ground context</p><h2 id="sa-field-title">The context is physical. The decision stays human.</h2><div className="saFieldBottom"><p>A useful system keeps the place, its dependencies, and the people responsible in view.</p><span>Generated illustrative image / no real deployment</span></div></div></section>

      <section id="scenarios" className="saScenarios" aria-labelledby="sa-scenarios-title"><div className="saShell"><div className="saScenariosHead"><p className="saSectionLabel">03 / Explore the model</p><div><h2 id="sa-scenarios-title">One map. Three questions.</h2><p>Choose a fictional scenario. The route, signal, and next-step brief change together. All values here are examples.</p></div></div><SignalAtlasScenarios /></div></section>

      <section className="saClose" aria-labelledby="sa-close-title"><div className="saShell saCloseInner"><p className="saSectionLabel">Signal Atlas / Prototype</p><h2 id="sa-close-title">Keep the person<br /><em>in the loop.</em></h2><div><p>A motion study built by hand for Jay&apos;s Lab. The case study shows what was borrowed as a pattern, what was designed here, and what remains unproven.</p><Link href="/showcase/signal-atlas" className="saCloseLink">Read the case study <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>

    <footer className="saFooter"><div className="saShell"><Wordmark /><span>Fictional concept / Sample data / Illustrative media</span><Link href="/showcase">Back to Jay&apos;s Lab Showcase ↗</Link></div></footer>
  </div>;
}

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { EarlyAccess } from "@/components/early-access";
import { getPublishedEntries, type ContentKind } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Jay's Lab",
  description: "Technical learning, design and engineering standards, experiments, and inspectable product UI from Jay Lawrence Dimaano.",
  path: "/",
});

export default function LabHome() {
  const entries = getPublishedEntries();
  const collections: { kind: ContentKind; href: string; title: string; description: string }[] = [
    { kind: "note", href: "/notes", title: "Learning Notes", description: "Source-backed questions, worked examples, and open questions" },
    { kind: "standard", href: "/standards", title: "Standards", description: "Clear defaults with scope and exceptions" },
    { kind: "bundle", href: "/bundles", title: "Standard Bundles", description: "Curated handoffs for a product context" },
    { kind: "skill", href: "/skills", title: "Agent Skills", description: "Public listings for repeatable workflows" },
  ];
  const publishedCollections = collections.filter(collection => entries.some(entry => entry.kind === collection.kind));
  return <div className="lab-home">
    <section className="lab-hero lab-shell" aria-labelledby="home-title">
      <div className="lab-hero-top"><p className="eyebrow">An independent publication by Jay Lawrence Dimaano</p><span className="lab-hero-index">INDEX / 001—004</span></div>
      <h1 id="home-title">Thinking,<br /><em>made usable.</em></h1>
      <div className="lab-hero-deck"><p>A working library of the standards, experiments, and design decisions behind better software.</p><aside><span>FIELD NOTES / OPEN FOR INSPECTION</span><p>Jay&apos;s Lab keeps evolving technical learning separate from the Portfolio Journal. Published entries show their scope, evidence, open questions or exceptions, and review dates.</p></aside></div>
    </section>
    <div className="lab-intro-rule lab-shell"><span>Explore the work</span><i aria-hidden="true" /></div>
    <section className="lab-home-feature lab-shell" aria-labelledby="showcase-title">
      <div><p className="eyebrow">01 / Showcase</p><h2 id="showcase-title">See the result. Then inspect the choices.</h2><p>Navigate three Jay-built prototypes: a new product site, a controlled Journal retrofit, and a fictional city-operations motion study. Each case study explains the decisions and checks behind the working route.</p><Link className="lab-link" href="/showcase">Browse Showcase <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      <div className="lab-home-diagram" aria-hidden="true"><div className="diagram-window"><header><span>Lab / Showcase</span><span>01 — 03</span></header><main><strong>Product craft, in the open.</strong><span>Explore live sites <ArrowUpRight size={14} /></span></main><footer><span>New build</span><span>Retrofit</span><span>Motion study</span></footer></div></div>
    </section>
    <section className="lab-home-feature is-reversed lab-shell" aria-labelledby="experiment-title">
      <div><p className="eyebrow">02 / Experiment</p><h2 id="experiment-title">Tune a direction. Take it with you.</h2><p>The Design Profile Configurator adjusts a finished site across its pages. Export the same validated choices you can see in the preview.</p><Link className="lab-link" href="/experiments/design-profile">Open the Configurator <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      <div className="lab-home-process" aria-hidden="true"><p>A visible system of choices, not a mystery preset.</p><ol><li><span>01</span> Semantic color</li><li><span>02</span> Typography and space</li><li><span>03</span> Profile export</li></ol></div>
    </section>
    <section className="lab-home-index lab-shell" aria-labelledby="index-title"><p className="eyebrow">03 / Library</p><h2 id="index-title">A record of what I&apos;m learning and what I&apos;d do again.</h2>
      {publishedCollections.map((collection, index) => <Link className="lab-index-row" href={collection.href} key={collection.kind}><span>{String(index + 1).padStart(2, "0")}</span><strong>{collection.title}</strong><p>{collection.description}</p><ArrowUpRight size={19} aria-hidden="true" /></Link>)}
      {entries.length ? <Link className="lab-index-row" href="/library"><span>{String(publishedCollections.length + 1).padStart(2, "0")}</span><strong>All published entries</strong><p>Browse by kind, topic, or search</p><ArrowDownRight size={19} aria-hidden="true" /></Link> : <p className="lab-index-pending">The first Standards and Skill Listing will appear here after Jay&apos;s source material is reviewed for publication.</p>}
    </section>
    <EarlyAccess />
  </div>;
}

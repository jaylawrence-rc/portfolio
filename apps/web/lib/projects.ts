export type Project = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  outcome: string;
  role: string;
  period: string;
  status: string;
  featured: boolean;
  disciplines: string[];
  industry: string;
  accent: string;
  liveUrl?: string;
  allowsEmbedding?: boolean;
  proof?: { label: string; href: string; detail: string };
  challenge: string;
  contribution: string;
  result: string;
  context: string;
  constraints: string[];
  decisions: { title: string; body: string }[];
  learning: string;
};

export const projects: Project[] = [
  {
    slug: "music-stats", title: "Music Stats", company: "Chartmetric",
    summary: "Music intelligence made approachable through focused, free tools.",
    outcome: "A shared product surface for playlist analysis, discovery, charts, and ISRC lookup.",
    role: "Product Engineer", period: "Jun 2024 — Dec 2025", status: "Live", featured: true,
    disciplines: ["Product engineering", "Data products", "Design systems"], industry: "Music intelligence", accent: "#f3bb42", liveUrl: "https://musicstats.com/",
    proof: { label: "Product Hunt makers", href: "https://www.producthunt.com/products/music-stats/makers", detail: "Publicly credited as Product Engineer at Chartmetric on the Music Stats makers page." },
    challenge: "Powerful music datasets are difficult to approach without specialist knowledge.",
    contribution: "I developed Music Stats as a public product for Chartmetric, shaping focused workflows that turn complex music data into clear questions and useful answers.",
    result: "The shipped suite showcases key Chartmetric capabilities through four complementary tools and creates a path into the main platform.",
    context: "Music Stats packages playlist analysis, similar-song discovery, trending artists, and ISRC lookup into a coherent free product. This reconstruction shows the system and product reasoning without inventing private metrics.",
    constraints: ["Large, uneven music datasets", "Four tools with one coherent mental model", "Fast first use without onboarding friction"],
    decisions: [
      { title: "One model for four music tools", body: "A shared query → processing → result grammar keeps each tool familiar while allowing its data to stay specific." },
      { title: "Put the question before the dashboard", body: "Each experience begins with one understandable task instead of exposing the full dataset or a dense analytics shell." },
      { title: "Design the difficult states", body: "Loading, no-match, partial data, and invalid identifiers are treated as part of the product rather than afterthoughts." }
    ],
    learning: "I would validate cross-tool continuation earlier: a useful result should make the next question obvious without turning the product into a maze."
  },
  {
    slug: "xoots-ai", title: "Xoots.ai", company: "Xoots",
    summary: "A connected AI recruitment workflow with humans kept in control.",
    outcome: "Search, interview, assessment, and learning experiences designed as one suite.",
    role: "Full-Stack Engineer · Contract", period: "Nov 2023 — Sep 2026", status: "Live", featured: true,
    disciplines: ["AI workflows", "Product engineering", "Design systems"], industry: "Recruitment", accent: "#fa715f", liveUrl: "https://xoots.ai/", allowsEmbedding: false,
    challenge: "AI hiring tools can fragment the workflow and obscure how a recommendation was reached.",
    contribution: "I led end-to-end frontend development across Interview-X, Talent-X, Academy-X, and Search-X, shaping durable interaction patterns for AI output and review.",
    result: "Captivate Chat used the shipped platform to identify and successfully hire top talent, while clients gained a focused way to search for top-tier candidates.",
    context: "The suite supports recruiters and candidates across discovery, interviewing, assessment, and learning. The interface has to communicate progress and confidence without presenting AI output as unquestionable fact.",
    constraints: ["Long-running and failure-prone AI tasks", "Candidate trust and recruiter oversight", "Multiple products sharing language and state patterns"],
    decisions: [
      { title: "AI output is a draft, not a verdict", body: "Recommendations remain inspectable and reviewable, with source context and clear human actions nearby." },
      { title: "Long tasks need durable state", body: "Progress survives navigation and distinguishes queued, processing, partial, complete, and failed states." },
      { title: "One suite, different levels of trust", body: "Shared primitives preserve coherence while interview, search, and learning flows expose different evidence." }
    ],
    learning: "Trust is designed in the quiet details: uncertainty, recovery, provenance, and the moment a human can confidently intervene."
  },
  {
    slug: "evelan", title: "Evelan", company: "Evelan GmbH", summary: "A flexible digital foundation for a portfolio of distinct client brands.", outcome: "Reusable content and interface systems without flattening brand character.", role: "Full-Stack Engineer", period: "Jul 2023 — Jun 2024", status: "Live", featured: true, disciplines: ["Design systems", "Product engineering", "Marketing platforms"], industry: "Digital studio", accent: "#8abca7", liveUrl: "https://evelan.de/", challenge: "Client sites need to move quickly without becoming copies of one template.", contribution: "I built dynamic websites, blog features, and flexible page sections on a reusable Sanity CMS foundation.", result: "The shared content system improved publishing flexibility, content visibility, accessibility, and interaction across client experiences.", context: "Evelan designs and builds business websites and applications. The platform problem is balancing reuse with the specificity each client deserves.", constraints: ["Different brands and content volumes", "Sanity content flexibility", "Performance across media-heavy pages"], decisions: [{title:"Reuse structure, not personality",body:"Content contracts and accessible primitives are shared; composition and expressive details remain brand-specific."},{title:"Content is part of the component API",body:"Modules are constrained around real editorial needs so authors can move quickly without breaking hierarchy."}], learning: "The best design system is visible in consistency but invisible in the personality of the final product."
  },
  {
    slug: "dfk-group", title: "DFK Group", company: "DFK Group", summary: "A multi-business real-estate platform organized around confident decisions.", outcome: "Investment, construction, management, and financing made navigable in one system.", role: "Lead developer · scope to confirm", period: "Dates to confirm", status: "Live", featured: true, disciplines: ["Product engineering", "Marketing platforms", "Design systems"], industry: "Real estate", accent: "#7da3d7", liveUrl: "https://dfkgroup.de/", challenge: "Several connected businesses and deep project content can overwhelm prospective customers.", contribution: "I led frontend implementation and shaped responsive navigation, reusable page structures, and CMS-driven delivery.", result: "A single platform can explain the group while preserving direct routes into projects and services.", context: "DFK Group spans investment properties, construction, property management, and financing. The web experience has to orient visitors before asking them to choose a path.", constraints: ["Multiple business units", "Deep CMS content", "Lead generation across device sizes"], decisions: [{title:"Orient before branching",body:"The group story establishes how services connect, then clear routes let visitors enter at the level they understand."},{title:"Projects carry the proof",body:"Reusable project pages prioritize concrete property information and next actions over corporate claims."}], learning: "Complex organizations become clearer when navigation reflects customer decisions, not the internal org chart."
  },
  {
    slug: "danaher", title: "Danaher", company: "Danaher", summary: "A technical braking catalog made easier to explore across markets.", outcome: "Vehicle-focused discovery and distributor paths with a clearer information hierarchy.", role: "Frontend contribution · scope to confirm", period: "Dates to confirm", status: "Live", featured: false, disciplines: ["Product engineering", "Data products", "Marketing platforms"], industry: "Automotive", accent: "#d86b58", liveUrl: "https://danahercn.com/", challenge: "Technical products must be discoverable by people with different levels of domain knowledge.", contribution: "I contributed to a responsive catalog experience and clearer product and market journeys.", result: "The public site connects vehicle categories, products, and distributor discovery in one path.", context: "Danaher presents braking-system products across vehicle categories and markets.", constraints: ["Technical product taxonomy", "Localization", "Product media performance"], decisions: [{title:"Start with the vehicle context",body:"Discovery mirrors how customers identify compatibility instead of forcing knowledge of internal product families."}], learning: "Catalog navigation works best when every label matches the language customers already use."
  },
  {
    slug: "vita-core", title: "VITA CoRe", company: "VITA CoRe", summary: "Two focused recruitment journeys within one credible brand.", outcome: "Employer and candidate needs separated without fragmenting the experience.", role: "Frontend contribution · scope to confirm", period: "Dates to confirm", status: "Live", featured: false, disciplines: ["Marketing platforms", "Product engineering"], industry: "IT recruitment", accent: "#a786c7", liveUrl: "https://vita-core.de/", challenge: "Employers and candidates arrive with different questions, urgency, and language.", contribution: "I contributed responsive surfaces and content structures supporting both journeys and live job discovery.", result: "Visitors can quickly identify their route while still understanding the company behind both services.", context: "VITA CoRe supports IT employers and applicants across specialist disciplines.", constraints: ["Two primary audiences", "Live job data", "Accessible conversion paths"], decisions: [{title:"Split the journey, share the trust",body:"Audience-specific entry points lead to tailored content while evidence and brand credibility stay consistent."}], learning: "Audience clarity is more valuable than squeezing every service into the opening viewport."
  },
  {
    slug: "curatax", title: "CURATAX", company: "CURATAX", summary: "Institutional expertise translated into a restrained digital presence.", outcome: "Specialist services, people, and careers organized around credibility.", role: "Frontend contribution · scope to confirm", period: "Dates to confirm", status: "Live", featured: false, disciplines: ["Marketing platforms", "Design systems"], industry: "Professional services", accent: "#b59b72", liveUrl: "https://curatax.de/", challenge: "A long-established advisory firm needs modern clarity without losing seriousness or trust.", contribution: "I contributed to the responsive implementation and maintainable publishing system.", result: "The site foregrounds expertise and people while making services and career paths easier to inspect.", context: "CURATAX advises private wealth, real estate, and major property projects.", constraints: ["Dense specialist content", "Institutional tone", "Careers and team publishing"], decisions: [{title:"Let expertise create the visual weight",body:"Typography, pacing, and specific credentials carry authority instead of decorative luxury cues."}], learning: "Restraint only feels premium when the underlying hierarchy is exceptionally deliberate."
  }
];

export const filters = ["All", "Product engineering", "AI workflows", "Design systems", "Data products", "Marketing platforms"];
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

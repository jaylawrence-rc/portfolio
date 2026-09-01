# Jay Lawrence Dimaano — Portfolio Product Specification

Status: Implementation-ready v1  
Date: September 1, 2026  
Primary goal: Convert qualified visitors into interviews by proving product judgment, frontend craft, full-stack range, and shipped outcomes.

## 1. Product thesis

This is not a résumé rendered as cards. It is an editorial product journal about software Jay has helped shape and ship.

The experience should combine:

- Vercel's restraint, typographic precision, and evidence-led information hierarchy.
- Linear's density, dark-mode polish, responsive motion, and tactile interactions.
- A personal, authored voice that makes Jay's decisions and contributions unmistakable.

The visitor should understand the following within 60 seconds:

1. Jay builds software that solves real business problems.
2. He can turn ambiguous domain requirements into polished, maintainable products.
3. His strongest work sits at the intersection of product engineering, design systems, AI-enabled workflows, and frontend architecture.
4. He has shipped products across healthcare, music intelligence, AI recruitment, real estate, automotive, staffing, and professional services.
5. He is available for a conversation.

## 2. Success criteria

### Primary conversion

- A hiring manager opens a case study and then selects **Start a conversation** or **View résumé**.

### Supporting signals

- At least 60% of qualified visitors open one project.
- At least 25% open a second project or the About section.
- Project detail pages reach a 50% median scroll depth.
- The site achieves Lighthouse scores of 95+ in Performance, Accessibility, Best Practices, and SEO on representative pages.
- Motion never causes layout shift, blocks navigation, or delays access to content.

Analytics should be privacy-conscious and event-light. Track project opens, résumé opens, outbound product visits, contact actions, theme changes, and meaningful scroll depth. Do not record typed content or sensitive visitor data.

## 3. Audience and visitor jobs

| Audience | What they need to determine | Portfolio response |
| --- | --- | --- |
| Cofounder / CTO | Can Jay own ambiguous product work and ship reliably? | Lead with decisions, constraints, scope, and outcomes. |
| Engineering lead | Is the code and architecture thoughtful and maintainable? | Show system boundaries, component architecture, testing, performance, and tradeoffs. |
| Product or design lead | Does Jay know what quality looks like? | Show before/after reasoning, interaction details, edge cases, and visual judgment. |
| Recruiter | Is the experience relevant, credible, and easy to summarize? | Provide a concise role summary, timeline, recognizable stack, résumé, and contact route. |
| Fellow builder | What did Jay actually make? | Use screenshots, annotated flows, live links, and explicit ownership statements. |

## 4. Positioning and voice

### Recommended headline

> I build software that solves real business problems.

### Recommended supporting copy

> Product engineer and frontend-focused full-stack developer turning complex workflows into clear, scalable products—across AI, healthcare, music data, recruitment, and B2B software.

### Proof line

> Currently leading product and engineering work for an AI-powered skilled-nursing referral platform. Previously shipped Music Stats at Chartmetric and AI recruitment products at Xoots.

Only publish the proof line after confirming that the named companies and current-role language are approved for public use.

### Voice rules

- Use first person.
- Prefer concrete verbs: designed, built, led, simplified, migrated, measured, shipped.
- Separate team outcomes from personal contributions.
- State uncertainty and confidentiality plainly.
- Avoid empty seniority claims, inflated metrics, and adjectives such as “world-class,” “revolutionary,” or “cutting-edge.”
- Every case study should answer: What changed because Jay worked on it?

## 5. Information architecture

### Required routes

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage and primary work index. |
| `/work` | Filterable archive of all public case studies. |
| `/work/[slug]` | Long-form case study with media and technical evidence. |
| `/about` | Career narrative, operating style, capabilities, and compact experience timeline. |
| `/resume` | Web résumé with a prominent PDF download. |
| `/contact` | Short contact page with email and professional links. |
| `/og/[slug]` | Generated social image route for each case study. |

### Optional phase-two routes

| Route | Purpose |
| --- | --- |
| `/notes` | Short technical and product essays. |
| `/notes/[slug]` | Long-form note using the same editorial system. |
| `/lab` | Small interactive experiments, motion studies, and reusable UI explorations. |

The site must remain useful without Notes or Lab. Do not publish empty sections.

## 6. Global navigation

The navigation is a compact floating or sticky bar that feels like a native product surface, not a marketing mega-menu.

Desktop contents:

- Jay's monogram or wordmark.
- Work.
- About.
- Notes only when at least three notes exist.
- A résumé shortcut.
- Theme control.
- **Let's talk** primary action.

Mobile contents:

- Monogram.
- Current section label.
- Menu button opening a full-width sheet with the same destinations.

Behavior:

- Header condenses slightly after 48 px of scroll.
- Background gains blur and border only after content moves beneath it.
- Active section uses typography and a subtle indicator, not a filled navigation pill.
- Keyboard shortcut `⌘/Ctrl + K` opens a command menu for Work, About, Resume, Contact, and project search.

## 7. Homepage specification

### 7.1 Opening frame

The first viewport should read like the opening of an essay.

Content order:

1. Small availability/status line.
2. Headline.
3. Supporting copy.
4. Two actions: **Explore selected work** and **View résumé**.
5. A compact proof strip: current focus, location/time-zone, and primary disciplines.

Do not use a large portrait, decorative 3D object, animated gradient blob, or oversized dashboard mockup in the hero. The writing and typography are the hero.

### 7.2 Selected work

Use a vertical editorial index rather than a uniform three-column card grid.

Each entry contains:

- Sequence number.
- Product name.
- One-sentence product outcome.
- Jay's role.
- Year or range.
- Discipline tags, limited to three.
- One dominant screenshot or short muted loop.
- Case-study link and optional live-product link.

Desktop behavior:

- Alternate calm text-led rows with wider media moments.
- On hover or keyboard focus, reveal the project's accent, animate the arrow 3 px, and gently increase media contrast.
- Clicking a project uses a shared-element transition from its media/title into the detail page.

Mobile behavior:

- Stack text above media.
- Keep all metadata visible; do not hide critical information behind hover.

Recommended featured order:

1. Music Stats.
2. Xoots.ai.
3. Evelan.
4. DFK Group.

Place Danaher, VITA CoRe, and CURATAX under **Client systems and websites**, with full detail pages but a more compact index treatment.

### 7.3 Experience timeline

A compact chronological section should establish continuity without duplicating the résumé. Each role shows company, role, date range, and one defining contribution. Clicking expands two or three additional bullets in place.

### 7.4 Principles

Use three short statements, not icon cards:

- Product judgment before implementation.
- Systems that remain clear as they grow.
- Motion that explains state and rewards attention.

### 7.5 Closing frame

End with one direct invitation, current availability, email, LinkedIn, GitHub, and résumé. Avoid a generic “Have a project in mind?” template if the primary audience is employers.

Recommended copy:

> Building a product where engineering judgment matters? Let's talk.

## 8. Work index specification

The work index is both an archive and a fast comparison surface.

Filters:

- All.
- Product engineering.
- AI workflows.
- Design systems.
- Data products.
- Marketing platforms.

Rules:

- Filters update the URL query string.
- Results update without a full reload.
- The count and empty state are announced to assistive technology.
- Cards retain DOM order when filtered; do not create disorienting reordering animations.
- Search is optional for seven projects, but the command menu should still find projects by name, industry, or technology.

## 9. Case-study detail template

Every case study uses the same evidence contract but may use a different composition.

### Required sections

1. **Opening metadata** — product, one-line outcome, role, company, year, team, status, live link.
2. **Hero media** — a screenshot or 8–15 second muted product loop with a descriptive caption.
3. **Executive read** — three short blocks: challenge, contribution, result.
4. **Context** — what the product does, who it serves, and the business or user problem.
5. **Constraints** — legacy systems, timeline, data, compliance, localization, performance, or team boundaries.
6. **My role** — explicit ownership and collaboration boundaries.
7. **Key decisions** — two to four high-leverage product or engineering decisions.
8. **Experience walkthrough** — annotated screens, user flow, states, and edge cases.
9. **System underneath** — architecture or component model only when it clarifies a meaningful decision.
10. **Outcome** — verified metrics, shipped capabilities, adoption evidence, or a precise qualitative result.
11. **What I learned** — honest reflection, including what Jay would change.
12. **Next project** — an editorial continuation rather than a generic card carousel.

### Evidence labels

Use small labels to distinguish:

- Shipped.
- Personal contribution.
- Team contribution.
- Measured result.
- Qualitative result.
- Redacted / reconstructed.

Never imply sole authorship of team work. If a screenshot is reconstructed because the original is confidential, label it clearly.

### Media behavior

- Images open in an accessible lightbox with caption, alt text, next/previous controls, and Escape support.
- “GIFs” should be delivered as autoplaying muted WebM/MP4 loops with poster images, not large `.gif` files.
- Pause off-screen videos with Intersection Observer.
- Always expose playback controls on focus and honor reduced-motion preferences.
- Use browser-native aspect ratios to reserve space and prevent layout shift.

## 10. Initial project content inventory

The summaries below describe the public products. Ownership, dates, technologies, metrics, and unpublished decisions must be confirmed before publication.

### 10.1 Music Stats — featured

Public product: A free music-data product for playlist analysis, similar-song discovery, trending artists by country, and ISRC lookup. Product Hunt lists Jay as a Product Engineer at Chartmetric on the maker team.

Recommended case-study angle:

- Turning music intelligence into approachable tools for artists, teams, and curious listeners.
- Show how complex datasets become understandable workflows and visual summaries.
- Lead with the strongest interactive tool, then show the shared product system across tools.

Asset checklist:

- Homepage and navigation loop.
- Playlist Analyzer input, loading, result, and error states.
- Similar Song Finder flow.
- Trending Artists country/genre exploration.
- ISRC Finder flow.
- Responsive views.
- Any verified launch, traffic, engagement, or Product Hunt evidence.

### 10.2 Xoots.ai — featured

Public product: An AI recruitment suite spanning talent search, AI-powered candidate interviews and assessment, and adaptive learning. Public product language names Search-X, Interview-X, and Academy-X.

Recommended case-study angle:

- Designing and engineering a connected AI hiring workflow rather than isolated chatbot screens.
- Explain how AI output, recruiter review, candidate trust, and long-running states were handled.
- Separate the public marketing surface from authenticated product work.

Asset checklist:

- Product-suite map.
- Search-X query and candidate-results states.
- Interview-X setup, session, transcript, and assessment views.
- Academy-X learning/assessment states if Jay contributed to them.
- Empty, loading, error, confidence, and human-review states.
- Sanitized architecture or event-flow diagram.

### 10.3 Evelan — featured

Public product: A German digital product studio offering flexible business websites, custom B2B/B2C web applications, content management, and branding.

Recommended case-study angle:

- Building the platform and design foundations behind a portfolio of client sites.
- Explain component reuse, content modeling, localization, performance, and how the system scaled across distinct brands.

Asset checklist:

- Evelan homepage and service-detail transitions.
- CMS authoring examples, if publishable.
- Shared design-system or content-model diagram.
- Performance improvements and reusable component evidence.
- Before/after or iteration evidence.

### 10.4 DFK Group — featured

Public product: A German real-estate group presenting investment properties, construction, property management, and financing services.

Recommended case-study angle:

- Lead-developer work on a multi-business real-estate platform.
- Show navigation across investment, construction, property management, financing, project details, and news without overwhelming the visitor.
- Highlight responsive architecture, CMS integration, and performance work only where personally owned.

Asset checklist:

- Homepage, project discovery, project detail, and callback flow.
- Responsive navigation.
- Content/CMS model.
- Performance evidence and key technical tradeoffs.

### 10.5 Danaher

Public product: An automotive braking-system brand and catalog with more than 25 years of domain experience, including vehicle-specific products and distributor discovery.

Recommended case-study angle:

- Making a technical product catalog easy to explore across markets and vehicle categories.
- Emphasize information architecture, catalog discovery, localization, media performance, and product data if those were part of Jay's contribution.

Asset checklist:

- Product catalog and filters.
- Product detail and compatibility content.
- Distributor/contact journey.
- Responsive and localized variants.

### 10.6 VITA CoRe

Public product: A German IT recruitment and coaching company serving employers and applicants across infrastructure, software, SAP, and digital marketing.

Recommended case-study angle:

- Designing two clear journeys for employers and candidates while integrating live job listings.
- Show the role of content structure, conversion paths, accessibility, and maintainability.

Asset checklist:

- Employer and applicant landing paths.
- Job listing and job detail.
- Contact flow.
- CMS or applicant-tracking integration, if personally implemented.

### 10.7 CURATAX

Public product: A German tax advisory firm focused on private wealth, real estate, and major property projects, with more than 40 years of experience.

Recommended case-study angle:

- Translating institutional trust and specialist expertise into a modern, restrained digital presence.
- Focus on content hierarchy, careers, team credibility, performance, and maintainable publishing.

Asset checklist:

- Homepage and credibility metrics.
- Team and careers journeys.
- Job detail/application path.
- Mobile typography and navigation.

### 10.8 Optional private case study: Healthcare AI SaaS Platform for Skilled Nursing Facilities

This healthcare AI platform may be Jay's strongest evidence of current product ownership, AI workflow design, healthcare domain learning, design-system leadership, and full-stack coordination. Add it only with company approval and sanitized data.

If approved, present it as a private or redacted case study. Focus on the referral-to-PDPM workflow, translating clinical/founder requirements into product behavior, resilient AI processing states, and the scalable frontend system. Never expose PHI, real patient data, private prompts, credentials, customer names, or security-sensitive architecture.

## 11. Content schema

Case studies are local MDX documents validated at build time.

```ts
type CaseStudy = {
  slug: string
  title: string
  company: string
  summary: string
  outcome: string
  role: string
  collaborators?: string[]
  period: { start: string; end?: string }
  status: "live" | "archived" | "private"
  featured: boolean
  order: number
  disciplines: string[]
  industries: string[]
  technologies: string[]
  liveUrl?: string
  sourceUrl?: string
  hero: MediaAsset
  thumbnail: MediaAsset
  theme: { accent: string; surface: string }
  seo: { title: string; description: string; image: string }
  confidentiality?: "public" | "sanitized" | "nda"
}

type MediaAsset = {
  kind: "image" | "video"
  src: string
  poster?: string
  width: number
  height: number
  alt: string
  caption?: string
}
```

Build must fail when a published case study lacks a summary, role, period, hero alt text, SEO description, or ownership statement.

## 12. Visual layout system

Use three nested layout rails:

| Rail | Width | Use |
| --- | ---: | --- |
| Reading rail | `648px` | Long-form copy, headings, metadata, compact lists. |
| Media rail | `1120px` | Product screenshots, diagrams, comparison grids, wide evidence. |
| Shell rail | `1200px` | Header, footer, work index, and global composition. |

Responsive rules:

- Viewport padding: 20 px under 640 px, 24 px from 640 px, 32 px from 1024 px.
- Long-form measure should normally stay between 62 and 76 characters.
- Wide media may break out of the reading rail but must never touch the viewport edge.
- The mobile layout is designed independently; it is not a scaled desktop page.

Full visual rules are defined in `DESIGN.md`.

## 13. Motion and interaction specification

Motion should communicate continuity, hierarchy, and response.

### Motion tiers

| Tier | Duration | Examples |
| --- | ---: | --- |
| Immediate | 90–140 ms | Press, focus ring, icon response, tooltip entry. |
| Interface | 160–240 ms | Hover, filter, disclosure, command menu. |
| Spatial | 280–420 ms | Page transition, shared media, lightbox, mobile sheet. |

### Signature interactions

- Shared title/media transition from work index to case study.
- Project rows reveal a restrained accent wash on hover or focus.
- Case-study chapter indicator advances as the reader scrolls.
- Images lift by no more than 4 px; text never bounces or scales.
- Metadata and captions enter with short opacity/translate transitions only when they first become relevant.
- Command menu uses fast staggered results, capped at five visible items.
- Theme change crossfades tokens without flashing the page.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Remove parallax, shared-element movement, stagger, and autoplay.
- Preserve only immediate opacity/state changes under 100 ms.
- Do not rely on animation to communicate state.

## 14. Technical architecture

### Stack

- Next.js 16 App Router.
- React 19.2.
- TypeScript in strict mode.
- Tailwind CSS v4 with CSS-first theme tokens.
- shadcn/ui primitives installed into a shared UI package and adapted to the portfolio design system.
- Turborepo with pnpm workspaces, mirroring the organizational approach used in the healthcare AI platform.
- Motion for React for component and layout animation; use platform or React view transitions only where behavior is stable and progressively enhanced.
- MDX for authored case studies.
- Zod for frontmatter/content validation.
- Playwright for critical journeys and visual snapshots.
- Vitest and Testing Library for component behavior.
- Storybook for UI/motion states where it adds real review value.

### Recommended repository shape

```text
portfolio/
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── content/
│       │   ├── work/
│       │   └── notes/
│       ├── public/
│       │   └── media/
│       └── tests/
├── packages/
│   ├── ui/
│   ├── design-tokens/
│   ├── content/
│   ├── eslint-config/
│   └── typescript-config/
├── tooling/
│   ├── content-checks/
│   └── visual-evals/
├── DESIGN.md
├── AGENTS.md
├── turbo.json
└── pnpm-workspace.yaml
```

### Rendering strategy

- Pre-render all public pages at build time.
- Generate static params for case studies and notes.
- Keep content local in phase one; do not introduce a CMS until publishing frequency justifies it.
- Use Next Image with explicit dimensions and responsive sizes.
- Preload only the opening font and the single likely LCP media asset.
- Use Cache Components only where it simplifies future dynamic content; the initial static portfolio does not need caching complexity.

### Component boundaries

`packages/ui` owns low-level, reusable primitives and tokens. `apps/web/components` owns portfolio-specific compositions such as `ProjectIndex`, `CaseStudyHero`, and `EvidenceGallery`. Do not put business/content decisions inside generic UI primitives.

Initial components:

- `SiteHeader`
- `CommandMenu`
- `AvailabilityStatus`
- `ProjectIndex`
- `ProjectRow`
- `ProjectMedia`
- `CaseStudyHeader`
- `CaseStudyChapterNav`
- `EvidenceBlock`
- `MediaBreakout`
- `MediaLightbox`
- `TechStackList`
- `ExperienceTimeline`
- `ContactFooter`
- `ThemeControl`
- `MotionProvider`

## 15. Accessibility requirements

- Meet WCAG 2.2 AA.
- All interactive elements must be reachable and usable by keyboard.
- Focus indicators use one shared, high-contrast token.
- Do not nest interactive elements inside clickable project rows.
- Every visual demo requires useful alt text or a nearby textual explanation.
- Captions explain why media matters, not merely what it shows.
- Autoplay media is muted, pausable, and disabled for reduced motion.
- Contrast must remain compliant in both themes and every project accent.
- The command menu and lightbox must trap and restore focus correctly.
- Heading hierarchy must remain logical even when sections use visual breakouts.
- Filter state, route changes, and validation errors must be announced where needed.

## 16. Performance budgets

Representative mobile target on a mid-tier connection:

- LCP: under 2.0 seconds.
- INP: under 200 ms.
- CLS: under 0.05.
- Initial route JavaScript: target under 140 KB gzip, excluding framework runtime where reporting separates it.
- Homepage imagery above the fold: under 350 KB combined at the expected viewport.
- Video loops: generally under 2.5 MB each, lazy loaded, with compressed poster.
- Fonts: two families maximum; preferably Geist Sans and Geist Mono with only required weights.

Fancy motion is not allowed to compromise these budgets.

## 17. SEO and sharing

- Unique title, description, canonical URL, and Open Graph image for every case study.
- `Person`, `WebSite`, `BreadcrumbList`, and appropriate `CreativeWork` structured data.
- Generated sitemap and robots file.
- Descriptive URLs and human-readable slugs.
- Social images should include product name, one outcome statement, Jay's role, and one cropped product frame.
- Resume PDF should use a stable, indexable path.

## 18. Product-design governance

Adopt the Vercel-inspired three-layer model in a small, practical form:

1. **Judgment:** `DESIGN.md` defines reader goals, composition, interaction principles, copy rules, and named anti-patterns.
2. **Primitives:** `packages/design-tokens` and `packages/ui` constrain color, type, spacing, radius, shadow, and motion.
3. **Evaluation:** deterministic checks and screenshot review prevent recurring failures.

`AGENTS.md` should contain this trigger:

> When shaping, implementing, or reviewing user-facing UI in `apps/web`, read and follow `DESIGN.md` before editing.

Initial deterministic checks:

- No raw hex/rgb/oklch colors outside token files.
- No arbitrary transition durations outside motion tokens.
- No images without dimensions and alt text.
- No `.gif` assets over the agreed budget.
- No text rail wider than 648 px without an explicit breakout component.
- No clickable container with nested links or buttons.
- No missing reduced-motion branch for spatial animation.
- No unpublished case study with incomplete ownership metadata.

Create three fixed visual evaluation scenarios:

1. Homepage at 1440 × 1000 and 390 × 844.
2. A media-rich featured case study at both viewports.
3. Work filtering, command menu, lightbox, dark mode, and reduced motion.

Keep the same fixtures and viewports when reviewing design-system changes.

## 19. Delivery phases

### Phase 0 — content proof

- Confirm public role, dates, ownership, outcomes, and confidentiality for each project.
- Collect at least one strong desktop and mobile image per project.
- Choose two projects with enough evidence for full case studies.
- Prepare current résumé and contact links.

Exit condition: Music Stats and Xoots have complete narrative outlines and publishable assets.

### Phase 1 — foundation

- Scaffold Turborepo, Next.js 16, Tailwind v4, and shared shadcn/ui package.
- Implement tokens, fonts, rails, themes, header, footer, and motion provider.
- Add MDX schema and content validation.
- Set up tests, visual snapshots, analytics, SEO base, and deployment previews.

Exit condition: the shell and one sample case study pass responsive, accessibility, and performance review.

### Phase 2 — core portfolio

- Build homepage, work index, project detail, about, résumé, and contact.
- Publish full Music Stats and Xoots case studies.
- Publish compact detail pages for the remaining five projects.

Exit condition: all routes are complete, credible, and usable without animation.

### Phase 3 — signature polish

- Add shared-element transitions, chapter navigation, lightbox, command menu, and intentional media sequences.
- Tune reduced motion and touch behavior.
- Run blind screenshot comparisons against the design rubric.

Exit condition: motion improves continuity without reducing speed or clarity.

### Phase 4 — launch and iterate

- Verify metadata, social cards, sitemap, analytics, error pages, and résumé download.
- Test real devices and low-power mode.
- Ask three reviewers—a technical leader, product/design peer, and recruiter—to complete fixed review tasks.
- Convert repeated feedback into `DESIGN.md`, token, component, or automated-check updates.

## 20. Launch acceptance criteria

- A visitor can identify Jay's role and current focus without scrolling.
- All seven named products appear on the work index and have clickable detail pages.
- Music Stats and Xoots include complete, evidence-led case studies.
- Every project clearly distinguishes Jay's contribution from team output.
- Every case study contains at least one desktop visual, one mobile visual, and one meaningful process or system artifact when available.
- All links, keyboard paths, focus states, media controls, themes, and reduced-motion behavior pass manual QA.
- No page depends on client-side JavaScript for core reading.
- No known confidential information, personal data, or unverified metric is published.
- Performance and accessibility budgets are met on homepage and a representative case study.
- The final result passes the `DESIGN.md` quality rubric.

## 21. Content questions to resolve before implementation

These are content blockers, not reasons to delay the foundation:

1. What exact role, dates, and personal contributions are publishable for each project?
2. Which outcomes have credible metrics or third-party evidence?
3. Which screenshots, recordings, diagrams, and source excerpts can be made public?
4. Is the healthcare AI platform approved as a sanitized private case study?
5. What email, LinkedIn, GitHub, résumé, and preferred job title should appear at launch?
6. Should availability say remote Philippines, Singapore/Asia time zones, Australia-targeted roles, or a broader formulation?

Until confirmed, mark these fields as draft in content files and prevent production publication.

## 22. Sources used to ground this specification

- [How Vercel's agents build on-brand pages with design.md](https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md)
- [Teaching agents product design at Vercel](https://vercel.com/blog/teaching-agents-product-design-at-vercel)
- [Next.js 16 announcement](https://nextjs.org/blog/next-16)
- [shadcn/ui monorepo guidance](https://ui.shadcn.com/docs/monorepo)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Turborepo Next.js guidance](https://turborepo.com/docs/guides/frameworks/nextjs)
- [Music Stats](https://musicstats.com/) and [Product Hunt maker page](https://www.producthunt.com/products/music-stats/makers)
- [Xoots](https://xoots.ai/) and [public product overview](https://www.xoots.biz/)
- [DFK Group](https://dfkgroup.de/)
- [Danaher](https://danahercn.com/)
- [VITA CoRe](https://vita-core.de/)
- [Evelan](https://evelan.de/)
- [CURATAX](https://curatax.de/)

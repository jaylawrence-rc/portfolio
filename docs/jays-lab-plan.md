# Jay's Lab plan

Status: confirmed for implementation on September 23, 2026. The Lab app and manually assembled showcase prototypes are in progress in this checkout. The private Design Skill, approved launch articles, Kit form, reviewed legal copy, and production deployment remain release gates; the prototypes are not evidence of skill-generated results.

## Purpose and publication boundary

Jay's Lab is a separate editorial app at `apps/lab`, published at `lab.jaylawrence.me`. It serves practitioners and Jay's future self with technical learning, explicit engineering and design standards, and reusable guidance for coding agents. It shares the portfolio's visual system: Geist and Geist Mono, warm light and charcoal dark themes, restrained lime accents, generous editorial rails, readable type, and purposeful motion.

The existing Portfolio Journal remains active at `/blog` with its five current posts and URLs. It publishes work and career evidence. Jay's Lab publishes reusable research, judgments, and agent guidance. A piece with both elements gets one canonical home based on its main promise, with a summary and link from the other publication. Portfolio navigation gains **Lab** while retaining **Journal**; the Lab links back to the portfolio. [ADR 0001](./adr/0001-keep-two-distinct-publications.md) records the boundary.

## Content and first release

Content kind and topic are separate fields. A Learning Note may lead to a Standard; an Agent Skill may implement several Standards. Neither relationship is automatic.

| Kind | Editorial contract | First release |
| --- | --- | --- |
| Learning Note | A question, current understanding, evidence and sources, worked example, open questions, and review date. Distinguish an observed fact from Jay's current interpretation. | Four source-backed security learning notes are being implemented for this release; publication requires editorial and source review. |
| Standard | A clear default, applicability, rationale, example, exceptions, verification checks, sources, and version or revision date. State the judgment as Jay's standard. | Two: design foundations/tokens and component/interaction patterns. |
| Standard Bundle | A curated, versioned set of Standards for one product context, with the included Standards and their source links. | One: frontend product craft, built from the two launch Standards. |
| Skill Listing | The outcome, intended user and agent, prerequisites, compatibility, limitations, and an example input/output. The full skill files remain private. | One: a configurable Design Skill that proposes a product direction and completes a first UI flow in supported Next.js/React projects. |
| Experiment | An interactive question or technique with controls, method, constraints, and an inspectable result. | One: the Design Profile Configurator. |
| Showcase Entry | A finished navigable UI, product brief, skill version, profile, decisions, manual edits, quality checks, and routes to a live preview and full site. | Two: Ship Onwards and one existing-site retrofit. |

Topics can span system design, backend, AI, AI agents, compliance, security, frontend engineering, UI design, animation, and UX. The first release exposes only populated collections. Its design proof consists of a navigable new Showcase Site, an existing-site retrofit case study, and a public Configurator.

The first release keeps the two Standards, one Bundle, and one Skill Listing, and adds the two Showcase Entries described below. The confirmed security learning path is also in active implementation for this release. The publication bar is a structured template with examples, sources, and revision dates. Evolving claims, especially in compliance, security, and AI, need an explicit review date and scope. Published examples must not contain client secrets, private work material, or PHI.

### Security learning path

Four Learning Notes teach security-minded system design for an agentic vertical app through distinct SOC 2 Type II, GDPR, and HIPAA lenses:

1. Scope, roles, purposes, data flows, and trust boundaries.
2. Browser and backend controls across the full request and data lifecycle.
3. Agent runtime, retrieval, model-provider, and tool-authorization boundaries.
4. Operational evidence, access review, incident response, retention, and recovery.

The reference workflow is AI-assisted clinical document intake followed by human review, illustrated only with synthetic data. One fictional SaaS vendor serves two separate example clients: a U.S. covered provider, for which the vendor acts as a HIPAA business associate, and an EEA clinic, for which the vendor acts as a GDPR processor. The shared service system provides the SOC 2 Type II lens; each data lane retains its own legal roles and obligations. In the example, the agent may read authorized documents and prepare a proposed intake summary with source references and uncertainty. A clinician edits or approves that summary, and a separate backend operation writes the approved result to the clinical record. The agent cannot directly change the record or send an external message.

The first note embeds an Architecture Explorer. Readers follow a guided data trace and inspect each boundary's threat, control, and evidence. Its full data-lifecycle view includes the source record, uploaded document store, agent job state, retrieval index, model call, and sanitized audit and telemetry paths, with retention and deletion links. In its attack exercise, a malicious uploaded document instructs the agent to retrieve another tenant's patient record and include it in the summary; the retrieval policy blocks the attempted call. The series links to the existing Portfolio Journal articles on HIPAA browser and AI data boundaries, then extends them with a source-backed view across frontend, backend, agent tools, vendors, and operating evidence. The Explorer is part of the Learning Note, not a separate Experiment. The [security source map](./jays-lab-security-source-map.md) records the primary-source research; the [learning design](./jays-lab-security-learning-design.md) specifies the architecture and interaction.

The fictional production architecture sends only minimized patient excerpts to a reviewed model provider. The model boundary shows the applicable BAA or processor/subprocessor terms, permitted uses, retention terms, and international-transfer assessment. The public Explorer uses built-in synthetic cases and local interaction state; it accepts no visitor uploads or app details and requires no account. At each boundary it presents the frameworks' applicability and sources separately, followed by any shared technical controls and operating evidence. It does not calculate a single compliance score.

The four-note path ends with a reusable [Markdown security review worksheet](./jays-lab-security-review-worksheet.md) for a reader's own app. It prompts for regulatory roles, data flows, trust boundaries, threats, controls, verification steps, and operating evidence. It is a learning aid and makes no compliance or certification claim.

## Design Skill showcase: decisions so far

The first buyer to validate with is a solo builder using a coding agent to ship their own product. The first paid product is an installable Design Skill with configuration and examples, initially supported deeply on Next.js and React. Its first-project deliverable is a design foundation, core components, one complete and polished user flow, and a guide for rolling the system across the remaining app. Product copy must state that scope plainly. The skill reads a product brief and uses curated Product Patterns to propose page and flow structure, content hierarchy, and interaction states for the founder's review. It guides a customer's coding agent inside the customer's own repository, including an existing app. In an existing repository, the workflow audits the current design system and UI before the direction proposal, then edits after review. The skill can derive a Design Profile from the repository; a profile exported from the Lab is an optional override. It works with the repository's current styling method and lists only tested setups as supported. Jay's Lab does not need to receive customer source code for this workflow. [ADR 0003](./adr/0003-run-design-skill-in-customer-repository.md) records this product boundary.

The Lab's first Experiment is the Design Profile Configurator. It lets visitors tune a finished Showcase Site through an embedded preview and open the full-site route. The first release includes a new **Ship Onwards** product site based on Jay's written brief, plus one controlled retrofit of an existing Jay-owned Next.js/React site with its baseline preserved. Ship Onwards is a separate future product and storefront for solo founders; its site doubles as the Lab's first Showcase Site. At Lab launch, its working prototype lets visitors explore a curated product UI direction, tune and export its Design Profile, and join the first-skill early-access list. It presents itself as a prototype with working examples. Both demos provide navigable pages and realistic UI states without requiring production backends. The retrofit preserves its existing content and behavior while improving the design foundation and one user flow.

The Configurator starts in the Lab with semantic colors, approved font pairs, radius, and spacing density, with contrast and readability checks. It tunes the new site and the improved retrofit; the retrofit baseline remains fixed for comparison. It demonstrates curated results and exports a versioned Design Profile for the eventual paid skill. Ship Onwards uses that Lab Configurator for its launch prototype; the product can reuse the tool when its storefront opens. The preview and full-site route must render the same profile across the site's pages, and the exported profile must match the visible choices. The profile needs a documented schema version, defaults, validation, and a round-trip test proving the private skill can import and apply it to a supported repository.

Each demo shows its live result, before-and-after views where applicable, design decisions, skill version, profile, manual edits, and quality checks. Both demos must be produced using an actual private skill version before the Lab attributes the results to it. The first paid skill contains a small tested set of Product Patterns covering the demo flows and pilot projects. The showcase and Configurator move into the first Lab release; sales follow validation with users beyond Jay's own demos. Customer designs may join the gallery later only as opt-in case studies with customer approval and disclosed edits.

The Lab shell inherits the portfolio's editorial design system. The two proof sites take different visual directions to show that the same skill process can serve different products; they do not need to look like the Lab shell.

The Lab's **Showcase** is an image-led gallery inspired by [Awwwards' site browsing](https://www.awwwards.com/websites/art/). At launch it contains only Jay-built results produced with the skill: Ship Onwards and the retrofit. Cards use screenshots captured from those working versions and show product context and useful tags such as new build or retrofit, design direction, and tested stack. A card opens the case study first; the case study offers the live preview, full-site route, profile, process, and checks. The gallery has browsing and tags but no voting, awards, or open submissions. Add approved customer cases later rather than filling it with unverified screenshots.

### Feasibility and claim boundary

This is technically feasible as a curated Lab experience: [Next.js nested routes and layouts](https://nextjs.org/docs/app/getting-started/layouts-and-pages) can host navigable demo sites, and a bounded Design Profile can drive live style changes. The [Agent Skills format](https://agentskills.io/specification) can package the workflow, examples, references, assets, and optional scripts that a buyer installs for use with a coding agent.

The business case is still a hypothesis. A visually strong demo proves that Jay can produce that result; it does not prove that another builder can reproduce it with the skill. Before selling, have 5–10 solo builders run the package unaided in their real Next.js/React repositories, and assess accepted-result quality, time, regressions, and purchase intent. For the speed comparison, time each builder on two comparable, fixed-scope flow briefs in their repository: one using their usual agent workflow and one using the Design Skill, with the same acceptance rubric and task order varied across testers where practical. Treat this small pilot as directional evidence. Offer the skill for sale only if most finish unaided, no critical regressions remain, the accepted-flow time is faster, and some buyers express willingness to purchase at a stated pilot price. The intended public promise leads with fast design-system setup for supported Next.js/React projects and specifies the curated direction and complete first flow. Until outside-user trials measure the setup time, the listing should present speed as a goal, not an established result. The visual examples can demonstrate Jay's distinctive results without a broad style claim.

Free alternatives already cover adjacent work: [Impeccable](https://github.com/pbakaus/impeccable) documents full design iteration and existing-system work, while [Taste Skill](https://www.tasteskill.dev/docs) documents brief-based design direction, redesigns, and configurable controls. A paid advantage cannot be inferred from the Lab demos alone. The proposed distinction is a concrete solo-founder deliverable, a versioned visual profile that works in a real repo, and transparent proof on both new and existing products. Test that value against these free alternatives on comparable briefs and repositories before asserting superiority.

Sell and deliver the digital skill through a separate website channel when validated. The current [OpenAI plugin guidelines](https://developers.openai.com/plugins/app-guidelines) do not allow digital-product sales through plugin commerce flows. A downloaded skill package is inspectable, so its lasting value is the workflow, examples, tested checks, versioned updates, and support.

## Agent handoff and paid boundary

Each Standard has one plain Markdown source. Its page, Copy action, downloadable `.md` file, and raw Markdown URL derive from that source so an agent receives the rule and examples without site navigation. A Standard Bundle combines selected Standards into one Markdown handoff with scope, versions, and source links. Readers can use these free exports in their own personal or commercial projects; the content may not be republished. Exact public reuse terms need review before launch.

Individual paid Agent Skills are a separate product: repeatable workflows with instructions, templates, and checks. Their core content should be portable Markdown, with a Codex adapter first. The first Design Skill is an installable package with configuration and examples for Next.js/React. A buyer runs it with their coding agent in their own repository, including on an existing app. The first release shows the Skill Listing and collects interest; sales follow validation. This keeps the full paid payload outside the public site repository and deployment. The demo-site source may live in this public repository, with its process disclosed; the paid workflow files stay private.

## App and content architecture

- Add a separate Next.js app at `apps/lab` and deploy it to `lab.jaylawrence.me`. The portfolio and Lab have independent builds, metadata, sitemaps, social images, and canonical URLs. Cross-site navigation uses ordinary links.
- Host the Ship Onwards prototype and its full-site routes inside the Lab app for the first release. A separately deployed Ship Onwards storefront is a later product step after validation.
- Add `packages/*` to the pnpm workspace. Inventory the live portfolio CSS, then share only stable tokens, themes, typography, and layout rails through `packages/design-system`. Keep each app's layout, navigation, article composition, and app-specific CSS local; extract React primitives only when both apps actually use them. `.impeccable.md` remains the brand reference.
- Author published content in Git. Use plain `.md` for Standards and Bundles so their public pages and agent exports share one source. Learning Notes and Skill Listings may use `.mdx` when an interactive figure requires it. A validated content loader checks required metadata, unique slugs, dates, topic references, related entries, and publication status at build time.
- Keep private Drafts in a separate private Git repository. Promote approved public entries through a reviewable change in this repository. A hidden page is insufficient because this GitHub repository is public. Paid skill packages also remain private. [ADR 0002](./adr/0002-keep-drafts-out-of-public-repository.md) records the reason.
- Give the Lab a landing page and archives with detail routes for each populated collection. The first release exposes Standards, Bundles, Skill Listings, `/experiments` with the Configurator, and `/showcase` with two case-study routes; Learning Notes appear when published. The Lab navigation labels the gallery **Showcase**. Readers can filter editorial content by kind and topic and use lightweight search over published content. Showcase cards expose useful tags; add richer gallery filters when enough documented entries exist. Make related content visible without duplicating whole articles.
- Give each demo its own isolated styles and internal routes. Embed the navigable improved site in its Lab case-study page, offer an open-full-site route, and preserve the retrofit's original view as an unchanged comparison. Keep the Lab's editorial styles out of the demo surfaces.
- Provide the Lab's own page metadata, Open Graph images, sitemap, robots policy, and RSS feed. Keep the portfolio's existing `/blog` URLs and search entries intact, and add a Lab destination to its navigation and search.

## Early-access list

Use Kit for a dedicated **first Agent Skill early access** form. Its signup copy permits email about that launch only; it is not a general Lab newsletter. Use confirmation email, a clear success state, and a way to export subscribers. Do not place subscriber email addresses in redirect URLs. Configure the form to fit the Lab design and disable unrelated network promotion settings. Kit offers embedded forms and a free tier for this small launch; provider features and pricing should be rechecked when configuring the account. [Kit pricing](https://kit.com/pricing), [form settings](https://help.kit.com/en/articles/2502640-the-kit-form-builder).

Keep checkout as a separate later decision. Kit's current [Commerce seller-country list](https://help.kit.com/en/articles/4199324-sell-digital-products-with-kit-overview-and-faqs) does not include the Philippines, so the email-list choice must not imply Kit can sell the paid Skill for a Philippines-based seller.

## Delivery sequence

1. **Foundation:** add the Lab app and shared design package; wire workspace scripts and the subdomain deployment; connect reciprocal navigation.
2. **Publishing:** add validated Markdown content, templates, editorial pages, topic browsing and search, canonical metadata, sitemap, RSS, and social previews.
3. **Showcase and agent use:** build a private v0 of the Design Skill, use it on a new site and a fixed-baseline existing site, document the results and manual edits, then add their navigable public demos. Add the Configurator and verify its profile can be imported by the private skill. Add individual Standard and Bundle Markdown exports from canonical sources.
4. **Launch content and interest:** review the initial content and proof, connect the dedicated Kit form, verify permissions and privacy copy, and publish the Lab.
5. **Later:** test the Design Skill unaided with 5–10 target builders in real repositories, evaluate quality, time, and purchase intent, and compare against free alternatives on matched briefs. Then research an eligible checkout and delivery provider before selling it through Ship Onwards. Reuse the Configurator there and add approved customer case studies and further Experiments as the library grows.

## First-release acceptance criteria

- Both apps build and lint independently; the Lab renders correctly on mobile and desktop in light and dark themes, with keyboard access and reduced-motion behavior.
- The public-content minimum is two Standards, one Bundle, one Skill Listing, one Configurator Experiment, and two Showcase Entries: a new Ship Onwards site and a controlled retrofit. Every visible collection has content, sources and dates render accurately, and broken references fail validation. The navigation opens the `/showcase` gallery and its two image-led cards with useful tags; each opens a case study containing its live preview and full-site route. The `/experiments` route opens the Configurator. Ship Onwards has a working browse, tune, export, and early-access flow labeled as a prototype. Both demo views preserve the selected profile across navigation, and the Configurator exports that same versioned Design Profile for the private skill to validate and apply in a supported repository.
- The improved retrofit remains tunable while its preserved baseline stays fixed. Each demo discloses skill version, profile, manual edits, decisions, and quality checks; content and behavior stay stable in the retrofit comparison.
- Topic filters and lightweight search return only published entries. Unknown slugs return 404. No Draft or paid skill payload appears in the public repository, build output, search index, or sitemap.
- Standard and Bundle Copy and Download actions return clean Markdown with applicability, version, and source links; they match the published canonical content.
- `lab.jaylawrence.me` has correct canonical URLs, social previews, sitemap, robots, and RSS. Portfolio Journal posts retain their URLs, and navigation in both directions works.
- A reader can join the dedicated Kit list, confirm the subscription, and receive only first-skill launch messages. No subscriber email is added to a redirect URL. Public reuse and privacy terms are visible and reviewed before launch.

## Implementation dependencies

- Access to the `jaylawrence.me` DNS and hosting account for the Lab subdomain and independent deployment.
- A private Git repository for Drafts and paid skill material, and a Kit account with the dedicated form configured.
- Jay's reviewed theses, examples, and sources for launch content and Showcase Sites. The topic choices in this plan are briefs, not finished articles.
- Jay's written brief for Ship Onwards. Before building the retrofit, select a Jay-owned Next.js/React site with a preserved baseline commit and a real user flow worth improving; its exact identity is intentionally chosen during the build.
- Final public reuse and privacy wording reviewed before launch.

## Repository state at planning time

The pnpm workspace has only `apps/web` and currently no shared design package or Markdown publishing pipeline. The portfolio journal is hand-authored in TSX and integrated into its navigation, search, and SEO. Unrelated working-tree edits in the portfolio blog and `output/` must be preserved during implementation. The older `Portfolio Product Spec.md` describes an optional `/lab` route for experiments; this plan places future Experiments in the separate Jay's Lab app.

# Signal Atlas Showcase Site and case study

Status: implementation spec, September 23, 2026. Prepared from the [SentientX design study](../design-studies/sentientx-motion-ux-study.md), the current Jay's Lab Showcase, and the project glossary and ADRs. Publication to an issue tracker is pending tracker setup.

## Problem Statement

The current Showcase demonstrates two inspectable interfaces but does not show how Jay approaches a cinematic, motion-led marketing experience. A reader cannot yet see an original example that links a scroll narrative, animated visual representation, and a useful interactive state to a case study explaining the design choices. The gallery also has no third entry for this direction.

## Solution

Add **Signal Atlas**, a fictional city-operations intelligence Showcase Site, and a case study in Jay's Lab. Its original network map reacts to native scrolling and to three selectable sample scenarios: mobility, energy, and weather. The site uses a bounded sticky dark opening, light operational evidence with a separate sticky explanation, and documentary imagery to capture the reference's narrative rhythm without copying its brand or assets. The gallery and Lab homepage present it as a third Jay-built public prototype. The case study shows the working site, original design patterns, motion choices, responsive behavior, manual edits, checks, and limits. Sample values and generated imagery are disclosed.

## User Stories

1. As a Showcase visitor, I want to see Signal Atlas among the current entries, so that I can discover the new motion-led example.
2. As a Showcase visitor, I want an image-led preview and concise tags, so that I can judge whether the entry is relevant before opening it.
3. As a Showcase visitor, I want the entry to open a case study first, so that I can understand its context before treating it as a product claim.
4. As a case-study reader, I want a direct route to the working site, so that I can inspect the result myself.
5. As a case-study reader, I want to know that Signal Atlas is fictional and manually assembled, so that I do not mistake it for a customer deployment or Design Skill output.
6. As a case-study reader, I want to see what was adapted from the reference and what was authored for Signal Atlas, so that I can assess the design judgment.
7. As a case-study reader, I want to understand the visual metaphor, color roles, typography, layout, and interactions, so that the appearance has a clear rationale.
8. As a case-study reader, I want the observed reference behavior separated from proposed motion values, so that unverified timing is not presented as fact.
9. As a case-study reader, I want to see the motion and reduced-motion decisions, so that I can evaluate accessibility and restraint.
10. As a case-study reader, I want an honest list of checks and remaining limits, so that I know how far the prototype has been validated.
11. As a new Showcase Site visitor, I want the opening message visible immediately, so that I understand the concept without waiting for animation.
12. As a new Showcase Site visitor, I want the network map to explain signals and routes, so that the animated visual communicates a real idea.
13. As a visitor scrolling the site, I want the visual to respond to my scroll direction, so that I can inspect the relationship between the opening and the system view at my own pace.
14. As a visitor scrolling back, I want the visual to rewind naturally, so that the sequence remains understandable.
15. As a visitor, I want clear changes between dark, light, and photographic chapters, so that I can follow the story without every section animating.
16. As a visitor, I want the evidence panels to show signal, assessment, and proposed action, so that the concept moves beyond a dramatic hero.
17. As a visitor, I want to select the mobility scenario, so that I can see one sample route and its decision detail.
18. As a visitor, I want to select the energy scenario, so that I can compare how the same visual system handles a different question.
19. As a visitor, I want to select the weather scenario, so that I can compare risk and response states.
20. As a visitor, I want the selected scenario named in text as well as color, so that the state is unambiguous.
21. As a visitor, I want example data labeled as sample data, so that I do not confuse it with live city information or measured outcomes.
22. As a visitor, I want the documentary image labeled as illustrative, so that I do not infer a real city or customer deployment.
23. As a keyboard user, I want to reach and operate every scenario control and link, so that the experience is usable without a pointer.
24. As a screen-reader user, I want the map's current meaning and scenario decision available in text, so that the visual is not the only source of information.
25. As a visitor who prefers reduced motion, I want a complete static page with immediate state changes, so that I can use the site without scroll-linked movement.
26. As a mobile visitor, I want the headline, map, proof, scenarios, and CTA stacked in reading order, so that the site remains legible on a small viewport.
27. As a mobile visitor, I want the same scenario choices with touch-friendly controls, so that the smaller layout does not remove the demo's main interaction.
28. As a visitor on a browser without CSS scroll timelines, I want the map and evidence to remain visible, so that the story still works.
29. As a visitor, I want to move from the site back to its case study and the wider Showcase, so that I can inspect the decisions or explore another entry.
30. As a Lab maintainer, I want the third entry reflected in gallery counts, metadata, the home feature, and the sitemap, so that navigation and discovery stay accurate.
31. As a Lab maintainer, I want Signal Atlas isolated from other prototype styles, so that its distinct visual direction does not change Ship Onwards, Portfolio Journal, or editorial pages.
32. As a Lab maintainer, I want the example to stay within the current public Lab architecture, so that it adds no customer-source ingestion or private Design Skill material.

## Implementation Decisions

- **Product role:** Signal Atlas is a public, navigable, fictional Showcase Site and a documented Showcase Entry. It is manually assembled and makes no claim that a private Design Skill produced it. It is not a customer case or a live operations product.
- **Reference treatment:** Adapt the reversible opening, metaphor-to-evidence sequence, split narrative, and restrained dark/light chapter cuts observed on SentientX. Use original name, copy, map artwork, scenario model, generated documentary media, and layout details. Do not reuse source assets or code.
- **Story:** The opening says what the concept does before motion. A network-map visual introduces city signals. Light evidence panels explain signal → assessment → proposed action. A photographic interlude grounds the abstract system. A three-scenario interaction makes the concept inspectable. A closing section links back to the case study.
- **Scenarios:** Mobility, energy, and weather are local sample states. Selecting one changes the highlighted map layer, written signal, decision rationale, and suggested action. All sample values remain clearly labeled. No network request, account, form submission, or backend is added.
- **Architecture:** Keep the page mostly server-rendered. Use one small client boundary for scenario selection; keep scroll behavior in progressive CSS. The site has its own style scope and does not alter global publication components.
- **Visual representation:** Use an original angular SVG network map with separate route overlays that can crossfade. The map conveys corridor selection and state through both shape and text. The generated coastal-port photograph is an illustrative backdrop, not evidence of a real deployment.
- **Color and type:** Use Jay's Lab warm ivory, charcoal, Geist, Geist Mono, and action lime. Use cyan, amber, and coral only as semantic scenario accents. Keep body text high contrast and route labels legible. Most surfaces are rectilinear; compact status markers may be rounded.
- **Desktop composition:** Give the opening a short left thesis and a large map stage that stays in view during a bounded scroll interval. Follow it with a sticky explanatory split and changing visual evidence on the right. Use a full-width photographic chapter and a balanced scenario workspace afterward.
- **Mobile composition:** Reorder into headline → map → evidence → image → scenarios → close. Do not pin the explanatory column or animate depth on mobile. Keep scenario controls at least 44px high and wrap without horizontal overflow.
- **Scroll motion:** Keep native scrolling and native cursor. On supported desktop viewports, pin the hero within a roughly 1.85-viewport chapter while the map translates, rotates, and scales, the dotted grid drifts, and the map card rises and fades. Keep the evidence thesis relatively stable while cards enter and their internal figures move at a different rate; move the photographic backdrop independently of its static text. Each decorative progression rewinds with scroll, uses a linear CSS view timeline rather than a timed spring, and has a visible static fallback. Do not delay essential copy.
- **Timed motion:** The headline uses a measured ease-out around 680ms. Scenario route overlays fade over about 240ms, control colors change over about 200ms, and the written decision updates immediately. These are implementation choices, not verified values from the reference. Animate transform and opacity for scroll-linked motion.
- **Reduced motion:** Disable decorative scroll motion and parallax. Keep content and map state visible; scenario selections change immediately or with a very short opacity fade. Do not rely on video playback for meaning.
- **Case study:** Lead with the result and working route. Explain the three adapted design patterns, original visual system, motion map, layout choices, manual implementation, checks, and prototype limits. Include the live site in a preview where practical.
- **Showcase integration:** Expand the curated gallery to three entries, update index counts and preview composition, add the case-study and Showcase Site destinations to discovery, and revise any publication copy that still says there are exactly two entries.
- **Data and contracts:** No database, API, schema, authentication, customer data, or Design Profile contract changes are required. Existing Lab publication boundaries remain in force.

## Testing Decisions

- **Primary seam:** Verify the rendered journey from the Showcase gallery to Signal Atlas's case study and then to the working Showcase Site. This single high-level seam checks the real contract readers experience: discovery, disclosure, navigation, visuals, and interaction. It follows the current Lab practice of checking public routes and working prototypes rather than testing CSS implementation details.
- **Behavior checks:** On the site, select each sample scenario and confirm the map, textual status, and suggested action agree. Confirm that reversing scroll rewinds the decorative hero, evidence figures, and photographic depth while the core message remains available.
- **Responsive and access checks:** Inspect desktop and phone layouts for clipping and reading order; use keyboard to reach links and scenario controls; inspect visible focus, selected state, image alternatives, and reduced-motion behavior. Confirm a browser without scroll-timeline support sees a complete static composition.
- **Build checks:** Run Lab lint, TypeScript, and production build. Existing Node tests for public content and Design Profile behavior remain prior art; do not add a test that only mirrors a hard-coded project array or CSS class.
- **Truth checks:** Confirm all displayed data is marked sample, the image is marked illustrative, and the case study discloses manual assembly and no private Design Skill output.

## Out of Scope

- An exact reproduction of SentientX branding, copy, media, geometry, source code, or motion curves.
- A live city-data feed, operational decision engine, customer deployment, or validated performance outcome.
- Selling or publishing the private Design Skill, accepting customer source uploads, or changing the Configurator schema.
- A custom scrolling engine, wheel interception, autoplay-dependent content, or a site-wide animation framework.
- A new generalized end-to-end test framework for one prototype.

## Further Notes

The [design study](../design-studies/sentientx-motion-ux-study.md) records observed reference patterns and explicitly separates them from implementation recommendations. The selected acceptance seam is the public reader journey, rather than a low-level animation unit test. The requested `ready-for-agent` issue cannot be published until this project has a configured issue tracker and valid authentication; the `to-spec` skill directs the user to run `/setup-matt-pocock-skills` for that setup.

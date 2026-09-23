# SentientX motion and UX study

Observed on September 23, 2026 at [sentientx.com](https://www.sentientx.com/) in desktop and 390px mobile viewports. This is a study of the public experience, not a reconstruction of its source code. Some embedded videos reported that media could not play in the inspection browser, so visual behavior and timing are described only where they could be observed. Color values below are visual approximations, not extracted design tokens.

## Experience sequence

| Chapter | Composition and visual representation | Motion and scroll behavior | UX role |
| --- | --- | --- | --- |
| Opening | Near-black full-screen canvas, centered white title, faint ASCII-like field, large outlined dimensional disc. Small navigation and contact action float above it. | The title fades as the disc rotates, grows, and shifts under scroll. Scrolling back reverses the state. A second message occupies the left as the disc moves right. | Establishes a single memorable metaphor before presenting the operating model. |
| First light cut | Abrupt change to warm off-white, a small black/lime pixel-block reveal, wide documentary city imagery, then three pale operational panels. | The color cut carries most of the transition. The pixel motif acts as a short punctuation mark; panels appear as distinct evidence, not one continuous parallax layer. | Converts abstract promise into a diagram, agent examples, and an outcome metric. |
| Outcome field | Dark section with a compact thesis at left and an orbital line illustration with floating status chips at right. | The circular art and chips move with measured, low-bounce pacing. Exact timing and implementation could not be verified. | Makes a system outcome feel active without turning every paragraph into an animation. |
| Work stories | Light desktop split with a relatively stable left thesis/CTA and a right column of stacked visual stories: aerial logistics media, dot-matrix portrait, finance labels, and people/robot photo. Each story has an outcome strip. | The right evidence rail changes as the reader continues scrolling. The left column maintains context. | Lets a reader skim evidence or stay with the narrative. |
| Technical chapter | Desaturated sage/gray field, fine isometric tile drawing, three numbered hairline rows for Data, Design, and AI-Native. | Selecting a row changes its emphasis and the associated visual. | Turns an abstract framework into a compact, inspectable index. |
| Risks and close | Ivory risk grid of small illustrations and short labels, then a wide black CTA with another pixel/lime accent. | Motion is comparatively quiet; the strong black/white switch closes the story. | Provides a scan-friendly summary and a clear next action. |

On mobile the split stories stack, the hero art remains large and cropped, and the navigation collapses. The reference's cookie panel covers much of the small viewport; this is a usability cost to avoid in the adaptation.

## Pattern case studies

### 1. A reversible opening scene

**Observation.** The opening disc and headline change together as scroll progresses. Reversing scroll restores the prior composition. The dark backdrop and low-contrast raster make the outlined object the focal point.

**Why it works.** A single visual object links the first two messages. The reader can control the pace and revisit the transition.

**Failure mode.** If the core message becomes invisible too early, a reader who scrolls quickly gets a beautiful object without an explanation. The fixed navigation and cookie panel can also compete with the scene on mobile.

**Signal Atlas adaptation.** Use an original angular city-network map with route overlays rather than a torus. The headline and a one-sentence product description lead the scene. On supported desktop viewports, a bounded sticky hero keeps the map visible while its scale, rotation, and position respond to native scroll; a dot grid and map card move on separate tracks. Important labels have static equivalents, and reduced-motion content is complete without this progression.

### 2. Stable thesis beside changing evidence

**Observation.** The work-story section uses a relatively stable left column and changing right media rail. Its media includes documentary photographs, dot-matrix art, and concise outcome strips.

**Why it works.** The reader keeps the same question in mind while seeing different answers. Media changes carry meaning rather than acting as repeated decoration.

**Failure mode.** A long sticky column can feel like trapped scrolling. Small desktop copy can become dense when both columns compete. On mobile, preserving the sticky behavior would fragment the story.

**Signal Atlas adaptation.** Keep a relatively stable desktop thesis alongside three large evidence steps. Their cards enter with scroll and their illustrations move at a different rate from the card frames. Bound the sticky explanation and let the reader scroll past normally. Recompose into a direct vertical sequence on mobile, with no pinning.

### 3. Metaphor, proof, action

**Observation.** The site alternates a cinematic dark metaphor with light, utilitarian diagrams and metrics, then returns to dark for its conclusion. Color and layout cuts do much of the narrative work.

**Why it works.** The abstract scene creates interest; the light modules answer what the system does; the closing action arrives after evidence.

**Failure mode.** Numbers without provenance can be read as real performance claims. Repeated animated ornaments and generic “metrics” actions can obscure what can actually be inspected.

**Signal Atlas adaptation.** All scenario values are visibly labeled sample data. Its map, scenario controls, and decision panel demonstrate a concrete inspectable flow. The case study identifies what was manually built and which claims remain hypothetical.

## Design analysis and adaptation values

| Decision | Reference observation | Signal Atlas implementation choice |
| --- | --- | --- |
| Palette | Approximate charcoal `#1b1d1b`, warm ivory `#fcfbf8`, pale gray `#f4f4f2`, pale lime `#dfffca`, muted sage `#728076`, occasional coral alert. | Keep Jay's Lab charcoal/ivory and action lime `#cfff04`. Add restrained cyan for mobility, amber for energy, and coral for weather as semantic scenario colors. Do not reuse the reference's exact brand treatment. |
| Typography | Large, light-weight modern grotesk headlines against small explanatory copy. | Use the Lab's Geist and Geist Mono. Maintain readable body size, high contrast, and short line lengths. |
| Geometry | Large rectilinear sections; mostly hard-edged media and panels; rounding primarily on small pills. | Use squared panels, hairline dividers, data nodes, and angular map paths. Limit pills to compact status labels. |
| Desktop layout | Full-screen opening; centered object; later asymmetric split with narrative left and media right. | Give the hero a wide map stage and short left thesis held within a bounded sticky chapter. Follow it with a separate sticky evidence split and an image-led documentary cut. |
| Mobile layout | Hero art remains dominant; later columns stack. | Put the headline first, then a legible cropped map. Stack evidence in reading order; no sticky scene or parallax on phone screens. |
| Interaction | Visual row selection changes the technical illustration. | Three keyboard-usable scenario controls change map overlays and decision details. The state is explicit in both color and text. |

## Motion specification

The exact easing curves and durations of SentientX are **not verified**. The following are Signal Atlas implementation choices made to preserve native scroll and give the visual sequence a readable pace.

| Moment | Trigger and behavior | Proposed timing/easing | Reduced-motion version |
| --- | --- | --- | --- |
| Hero entrance | Headline settles once on load while remaining visible from first paint; the map card is part of the later scroll progression. | About `680ms cubic-bezier(.22, 1, .36, 1)` on headline opacity and a 12px translation. | Immediate content. |
| Hero map progression | A roughly `185svh` desktop chapter keeps the map stage visible. Map, dot grid, and caption card move at different rates as scroll advances; scrolling back reverses them. | CSS view-timeline progress is linear: no duration or spring. Map translation, rotation, and scale; grid translation and opacity; card lift and fade. | Static map, grid, and card; all essential labels remain available. |
| Evidence progression | The sticky thesis stays relatively stable as three cards enter; their internal illustrations drift independently of the card frames. | Linear view-timeline progress on transform and opacity. The card enters from 56px lower and slightly smaller; decorative figure art travels about 96px across its range. | Visible cards and static figures. |
| Scenario change | Route overlays fade when the selected control changes; text and the selected label update immediately. | About `240ms ease` for route opacity and `200ms ease` for control colors; no bounce. | Immediate state change. |
| Documentary image | A desktop-only wide image moves under static text for clearer depth. | Linear scroll-linked transform from roughly +5% to -5% vertical translation at constant `1.14` scale. | Static image; disabled on mobile. |

The scroll story has three visual chapters: hero, evidence rail, and photographic interlude. Use CSS scroll timelines when supported, and visible static fallbacks otherwise. Never intercept wheel or touch scrolling; never render a blank section while waiting for JavaScript. Animate transform and opacity for scroll-linked effects. Keep both sticky chapters bounded and allow ordinary scrolling past them.

## UX and accessibility checks

- The first viewport must state what the prototype does without waiting for a scroll, video, or loader.
- The map is a visual explanation; its scenario names, status, and next action must also be text.
- Scenario controls need a visible selected state, keyboard focus, 44px touch targets, and no hover-only information.
- Generated documentary media is labeled as illustrative. No sample number is presented as live city data or a real customer outcome.
- Mobile preserves the same scenarios and evidence in a vertical order. The map can simplify rather than shrink its tiny annotations.
- Reduced-motion mode keeps every state and link available, removes scrubbed visual motion, and avoids a blank hero.
- Test the rendered journey from Showcase Entry through case study to Showcase Site. Check the viewports and motion preference at that seam rather than asserting CSS properties.

**Source:** [SentientX public website](https://www.sentientx.com/). No reference copy, imagery, video, or code is used in Signal Atlas.

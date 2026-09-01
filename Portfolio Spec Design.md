# Portfolio Design System and Product-Design Contract

Version: 1.0  
Owner: Jay Lawrence Dimaano  
Scope: Every user-facing surface in `apps/web`

## 1. Purpose

This file gives designers, developers, and coding agents the same product-design context. Read it before shaping, implementing, or reviewing visible UI.

The portfolio must feel authored, technically precise, calm, and alive. It draws inspiration from Vercel and Linear but must not reproduce either product's page structure, components, copy, or brand assets.

Working code is not enough. The result must help a time-constrained employer understand Jay's judgment, ownership, and shipped work.

## 2. Reader and task

The primary reader is a hiring decision-maker scanning between meetings.

Their sequence is usually:

1. Decide whether Jay's profile is relevant.
2. Verify that the work is real and that his contribution is clear.
3. inspect one or two projects for product and engineering depth.
4. Decide whether to open the résumé or start a conversation.

Design every page for both a 30-second scan and a detailed audit. Put the conclusion before the supporting evidence, then let interested readers go deeper.

## 3. Brand character

The visual character is:

- Quiet precision.
- Technical depth without developer theater.
- Editorial clarity.
- Human warmth in copy and small interaction details.
- Confident restraint rather than minimalism as decoration.

The portfolio is not:

- A generic black SaaS landing page.
- A tiled résumé dashboard.
- A collection of glowing cards.
- A motion demo reel that makes reading difficult.
- A clone of Vercel, Linear, or any featured client.

## 4. Product principles

### 4.1 Proof before decoration

Use hierarchy to surface role, decision, and outcome. A screenshot without a claim is decoration; a claim without evidence is marketing.

### 4.2 Editorial core, product behavior

Reading should feel like a high-quality technical blog. Navigation, filtering, media, and state changes should feel like a polished application.

### 4.3 Calm by default, delight on intent

The resting page is stable. Rich motion appears when the reader hovers, focuses, opens, filters, changes theme, or navigates.

### 4.4 Progressive disclosure

Show the executive summary first. Reveal implementation depth, annotations, and alternate states when the reader asks for them.

### 4.5 Performance is visual quality

Late fonts, jumping media, delayed interactions, and janky animation are design failures.

### 4.6 Mobile is an authored layout

Do not shrink desktop. Recompose type, metadata, media order, navigation, and touch targets for narrow screens.

## 5. Layout

### Rails

```css
:root {
  --rail-reading: 40.5rem; /* 648px */
  --rail-media: 70rem;     /* 1120px */
  --rail-shell: 75rem;     /* 1200px */
}
```

- Reading rail: prose, metadata, small diagrams, and calls to action.
- Media rail: screenshots, comparisons, architecture visuals, and project galleries.
- Shell rail: site chrome, work archive, and footer.

Use 648 px instead of 647 px because it resolves cleanly to the 8 px base grid.

### Viewport padding

```css
--page-pad: 1.25rem; /* mobile */
/* 1.5rem at 640px; 2rem at 1024px */
```

### Spacing scale

Use a compact 4 px base with preferred 8 px steps:

`4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144`

Page sections normally use 80–144 px of vertical separation on desktop and 56–96 px on mobile. Within a content group, prefer 8–32 px.

### Composition rules

- Align related text to one shared left edge.
- Break out media only when size materially improves comprehension.
- Do not center body copy or multi-line descriptions.
- Use asymmetry for emphasis, not as a default template.
- Keep no more than two strong alignment axes in one viewport.
- Let empty space separate ideas; do not wrap every section in a surface.

## 6. Color

Use semantic tokens and OKLCH. Project accents are restrained and must pass contrast requirements.

### Dark theme

```css
--background: oklch(0.145 0.006 260);
--surface-1: oklch(0.175 0.007 260);
--surface-2: oklch(0.205 0.008 260);
--foreground: oklch(0.965 0.004 260);
--muted: oklch(0.70 0.010 260);
--subtle: oklch(0.52 0.010 260);
--border: oklch(0.28 0.010 260);
--border-strong: oklch(0.38 0.012 260);
--accent: #cfff04;
--accent-bright: #cfff04;
--accent-ink: oklch(0.16 0.008 260);
--accent-soft: color-mix(in oklch, var(--accent-bright) 12%, var(--surface-1));
--danger: oklch(0.68 0.19 25);
```

### Light theme

```css
--background: oklch(0.985 0.002 260);
--surface-1: oklch(1 0 0);
--surface-2: oklch(0.965 0.004 260);
--foreground: oklch(0.16 0.008 260);
--muted: oklch(0.43 0.010 260);
--subtle: oklch(0.58 0.010 260);
--border: oklch(0.90 0.006 260);
--border-strong: oklch(0.80 0.008 260);
--accent: oklch(0.47 0.15 128);
--accent-bright: #cfff04;
--accent-ink: oklch(0.16 0.008 260);
--accent-soft: color-mix(in oklch, var(--accent-bright) 18%, var(--surface-1));
--danger: oklch(0.56 0.20 25);
```

### Color rules

- Default surfaces are neutral.
- Use `#CFFF04` for primary actions, proof highlights, and active details with dark ink; use the darker light-theme accent for accessible text and focus treatment.
- A project may define one accent and one soft surface. Apply them to small identifiers, media backdrops, diagrams, and transition moments.
- Do not let project themes recolor global navigation.
- Gradients are allowed only when they represent lighting, depth, or media framing. Never use a cyan-purple-pink gradient as generic excitement.

## 7. Typography

### Families

- Sans: Geist Sans.
- Mono: Geist Mono.
- Do not add a third family in version one.

### Scale

| Token | Desktop | Mobile | Leading | Use |
| --- | ---: | ---: | ---: | --- |
| `display` | 64 px | 42 px | 0.98 | Homepage statement only. |
| `h1` | 52 px | 38 px | 1.02 | Case-study and page titles. |
| `h2` | 34 px | 29 px | 1.12 | Major sections. |
| `h3` | 23 px | 21 px | 1.25 | Evidence groups. |
| `lead` | 21 px | 19 px | 1.55 | Opening summaries. |
| `body` | 17 px | 16 px | 1.70 | Long-form reading. |
| `small` | 14 px | 14 px | 1.50 | Metadata and captions. |
| `label` | 12 px | 12 px | 1.30 | Short uppercase or mono labels. |

### Typography rules

- Use slight negative tracking only above 29 px.
- Body copy uses normal tracking.
- Use mono for years, sequence numbers, keyboard shortcuts, technical labels, and code—not whole paragraphs.
- Avoid all caps longer than three words.
- Headings should state the conclusion when possible: “One model for four music tools” is better than “Architecture.”
- Use `text-wrap: balance` on short headings and `text-wrap: pretty` on lead paragraphs where supported.

## 8. Surfaces, borders, radius, and shadow

### Radius

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;
```

- Buttons and inputs: 8 px.
- Menus and compact dialogs: 12 px.
- Media frames and sheets: 16 px.
- Pills are reserved for status, filters, and compact tags.

### Borders

- Default border is 1 px.
- Use borders to reveal structure at close range, not outline every region.
- Prefer one divider over multiple nested card borders.

### Shadows

- No shadow on static article content.
- Menus, dialogs, and lifted media may use one neutral ambient shadow plus a border.
- Never use colored glow as the only separation mechanism.

## 9. Core components

### Buttons

- Primary: solid high-contrast foreground/background pair.
- Secondary: neutral border or quiet surface.
- Ghost: navigation and tertiary actions.
- Text link: default inside prose.

Buttons should use verb-led labels. Do not use “Learn more” when “Read the Music Stats case study” is available.

### Project row

- Treat the row as a navigational composition, not a card.
- Title and summary hold visual priority.
- Metadata is one quiet line.
- Media framing reflects the product, but the row remains recognizable as part of one portfolio system.
- The entire row may be a single link only if it contains no nested action. Put live-product links outside that target.

### Evidence block

An evidence block contains one claim, one supporting artifact, and one caption. Optional technical detail follows after the evidence.

### Tags

- Maximum three visible in an index row.
- Use readable nouns: Design system, AI workflow, Data visualization.
- Do not turn every technology into a chip. Full stack belongs in the detail page.

### Dialog, lightbox, and command menu

- Use shadcn/Radix primitives for focus and dismissal behavior.
- The command menu is for navigation, not a decorative search demo.
- The lightbox preserves captions and current-project context.
- Never open a dialog from another dialog.

## 10. Imagery and product media

- Product screenshots are evidence; preserve legibility.
- Use a neutral or project-tinted stage around screenshots rather than fake browser chrome everywhere.
- Browser chrome is allowed only when URL or web context matters.
- Do not place screenshots in tilted 3D perspective when the interface needs to be inspected.
- Crop intentionally around the decision being discussed.
- Pair every media item with an explanatory caption.
- Prefer WebM/MP4 loops over GIF.
- Do not autoplay audio.
- Provide a still poster for every video.
- Dark screenshots should not disappear into the dark theme; add a subtle border or contrasting stage.

## 11. Motion grammar

Motion must answer one of four questions:

1. What changed?
2. Where did this come from or go?
3. What is interactive?
4. What deserves attention now?

If it answers none, remove it.

### Tokens

```ts
export const motion = {
  duration: {
    instant: 0.10,
    fast: 0.16,
    base: 0.22,
    spatial: 0.34,
    slow: 0.42,
  },
  ease: {
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
  },
  spring: {
    responsive: { type: "spring", stiffness: 420, damping: 34, mass: 0.8 },
    spatial: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
  },
} as const
```

### Allowed patterns

- Opacity plus 6–12 px translation for first reveal.
- Shared layout transition for project title or media.
- 2–4 px movement for arrows, buttons, and image lift.
- Subtle background/border interpolation for focus and selection.
- Height/opacity transition for disclosures with measured content.
- Short stagger of 25–40 ms for directly related items, capped at five.

### Prohibited patterns

- Continuous floating cards.
- Large scroll-linked parallax.
- Text that animates word by word on ordinary page load.
- Scale-on-hover above 1.015 for large surfaces.
- Elastic overshoot on navigation or reading surfaces.
- Route transitions that leave the user waiting on a blank frame.
- Custom cursor, magnetic buttons, or smooth-scroll hijacking.
- Multiple competing entrance animations in one viewport.

### Reduced motion

Reduced motion is a first-class mode. Replace movement with immediate state changes or short fades. Stop autoplay, preserve controls, and test the complete journey with the OS preference enabled.

## 12. Interaction states

Every component review must cover:

- Rest.
- Hover where applicable.
- Keyboard focus.
- Pressed/active.
- Loading.
- Empty.
- Error.
- Disabled only when truly unavailable.
- Reduced motion.
- Dark and light theme.
- Narrow and wide viewport.

Do not use skeletons for content that is statically available. For media loading, preserve the aspect ratio and use a quiet dominant-color placeholder.

## 13. Copy system

### Structure

- Headline: conclusion.
- Lead: context and relevance.
- Section heading: decision or question.
- Body: evidence and tradeoff.
- Caption: why this artifact matters.
- CTA: the next explicit action.

### Style

- Short sentences are welcome, but avoid artificial one-line fragments throughout a page.
- Use technical language only when it demonstrates a real decision.
- State role and scope precisely.
- Prefer “I built X with Y” over “Leveraged Y to build X.”
- Use em dashes sparingly.
- Do not write copy that could belong to any engineer's portfolio.

## 14. Named anti-patterns

Naming repeated failures makes them easier to recognize and automate.

### The Glowing Bento

Every idea is placed in a rounded card with a gradient border or glow. Fix by restoring page hierarchy, removing unnecessary containers, and letting content share a common canvas.

### The Résumé Dashboard

Skills, years, tools, and metrics are arranged like admin widgets. Fix by telling a career story and using metrics only as evidence inside relevant work.

### The Motion Tax

The reader waits for the interface to finish presenting itself. Fix by making content immediately available and keeping motion interruptible and intent-driven.

### The Screenshot Graveyard

Large galleries appear without claims, captions, or ownership. Fix by pairing each artifact with the decision or result it proves.

### The Tech Confetti

Dozens of chips substitute for explanation. Fix by naming the few technologies relevant to a tradeoff and moving the complete list to project metadata.

### The Vague Case Study

The page describes the company and team but not Jay's contribution. Fix by adding explicit ownership, constraints, decisions, and verified outcomes.

### The Clone

The page copies another company's typography, navbar, grid, or visual motif so closely that Jay disappears. Fix by keeping the underlying principles while authoring a distinct composition and voice.

### The Desktop Shrink

The mobile design is a cramped desktop page with hidden metadata. Fix by changing order, media framing, spacing, and controls for touch and narrow reading.

## 15. Accessibility contract

- WCAG 2.2 AA is the floor.
- Maintain visible focus in every theme and project accent.
- Touch targets should be at least 44 × 44 px where practical.
- Motion cannot be the sole explanation of a change.
- Do not encode taxonomy using color alone.
- Use semantic HTML before adding ARIA.
- Preserve document order when using visual breakouts.
- Restore focus after menus, lightboxes, and sheets close.
- Avoid hover-only content.
- Captions and alt text must be useful to someone evaluating the work.

## 16. Agent implementation rules

When an agent changes visible UI, it must:

1. Identify the reader's job and the primary action.
2. Load this file and the relevant component APIs.
3. Reuse tokens and existing primitives.
4. Implement content and interaction states, including reduced motion.
5. Render at 390 × 844 and 1440 × 1000.
6. Check hierarchy, overflow, contrast, focus, motion, and layout shift.
7. Compare the result against the named anti-patterns.
8. Report any missing product decision rather than silently inventing a new pattern.

Judgment belongs here. Repeatable mechanics belong in tokens and components. Reliably testable rules belong in linting or visual checks.

## 17. Review rubric

Score each category from 0 to 2. A shipping candidate needs at least 18/20 and no zero.

| Category | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Reader task | Unclear | Discoverable | Immediately obvious |
| Ownership | Ambiguous | Partially stated | Precise and credible |
| Evidence | Decorative or absent | Some support | Claims and artifacts reinforce each other |
| Hierarchy | Competing emphasis | Mostly clear | Effortless scan and deep read |
| Typography | Inconsistent or cramped | Usable | Deliberate and highly readable |
| Composition | Template-like | Competent | Distinct and content-shaped |
| Interaction | Hidden or fragile | Functional | Clear, resilient, and tactile |
| Motion | Distracting or missing state | Mostly appropriate | Explains continuity and honors preferences |
| Accessibility | Blocking issues | Minor issues | Keyboard, contrast, semantics, and media pass |
| Performance | Noticeably delayed or shifting | Acceptable | Fast, stable, and responsive |

## 18. Governance and evolution

- Capture repeated review feedback with a screenshot, route, viewport, theme, and reduced-motion setting.
- Put a correction in this file only when it generalizes.
- Put visual constants in tokens, not prose.
- Add deterministic checks for failures that can be detected without subjective judgment.
- Keep fixed screenshot fixtures to compare system changes over time.
- Human review remains required for hierarchy, credibility, and taste.

This file should become more specific as the portfolio ships. It should not become a diary of one-off preferences.

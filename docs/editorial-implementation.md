# Editorial redesign implementation

Implemented September 14, 2026, following the chosen flowing editorial direction in `editorial-design-review.md`.

The homepage now moves from positioning to two featured product stories, a compact introduction to systems work, working principles, optional experience detail, and contact. The archive and every case study share the typography, spacing, navigation, and media treatment.

## Interaction rules

- Native scrolling with one header offset for chapter anchors; the header does not change height while scrolling.
- Reading content remains visible. Only the opening heading and two featured media blocks receive short entrance animations.
- Media entrances run once per mount with IntersectionObserver and never hide content before JavaScript initializes.
- Shared project media transitions use matching React ViewTransition names between the homepage/archive and case study. Images preserve their original aspect ratios.
- Project hover reveals use a 460ms entrance and 220ms exit, with 140–180ms opacity feedback and a 280ms rolling arrow. Touch users retain direct navigation and 44px controls.
- Reduced motion disables spatial entrances, preview travel, pointer tracking, arrow travel, and shared-element transition duration. Verified in source; browser media emulation was not available in the testing surface.
- The decision selector changes content immediately and keeps its controls in place. Interaction sound is on by default and applies to intentional decision changes and each fine-pointer entry into a project item. Visitors can mute it; their saved preference takes precedence over the default.
- Native dialog navigation and search contain focus, support Escape/backdrop dismissal, restore focus, and close on route changes. Search supports arrow keys and Enter without intercepting IME composition.
- Experience uses a native disclosure. Work filters preserve their state in the URL and announce the result count.

## Verification

- Production build, full-app ESLint, TypeScript, and whitespace checks pass.
- Browser inspected at 1440, 781, 390, and 320px widths, including light and dark themes. No horizontal overflow found.
- Checked selected-work and case chapter anchors, search navigation, mobile menu dismissal/focus restoration, decision selection, archive filtering, experience disclosure, and next-project navigation.
- Case hero media loads eagerly; homepage/archive media loads lazily. Project previews use local images or decision text, including a static Playlist Analyzer screenshot for Music Stats. The native cursor remains available. A bounded in-image action marker follows the native mouse pointer during project hover.
- Browser console recorded no warnings or errors during the integrated verification. The production build retains the existing Edge Runtime deprecation warning for dynamic routes.

## Content boundaries

Music Stats uses its official public preview as the cover and a browser screenshot of its public Playlist Analyzer as the detail image, each with an explicit caption. Evelan now shows its published website showcase on the homepage, archive, and case study. DFK Group, Danaher, VITA CoRe, and CURATAX use actual interface previews from Evelan’s official case-study galleries, with publisher captions; these are published project visuals, not captures of the current live sites. Xoots retains its labeled editorial overview until interface screenshots are available. Source details are in `project-media-sources.md`.

Existing project scope/date notes remain where contribution details need confirmation. Approved interface screenshots and more specific project outcomes can replace the labeled overviews later without changing the page structure.


## Interactive project previews

Added in response to the requested MONOLOG-inspired hover treatment. The image cover remains fixed; an inset second surface rises from below with a 12-degree perspective tilt and settles flat over a dimmed cover. CSS transitions let quick exits and re-entry reverse naturally. The shared route transition still identifies only the original cover.

Evelan reveals its published web-application showcase. DFK Group, Danaher, VITA CoRe, and CURATAX reveal different interfaces from the official agency galleries. These secondary images also appear as static, labeled case-study figures. Xoots reveals a real decision from its case study. Music Stats reveals a static screenshot of its public Playlist Analyzer page; no replacement product UI was invented.

The action marker follows fine mouse pointers within the image bounds, using one scheduled frame and DOM transforms rather than React renders per pointer event. Keyboard focus reveals the same evidence immediately and also exits immediately. Reduced motion uses an opacity dissolve; touch input navigates directly. Narrow decision previews keep the title and action while omitting duplicate body text, which remains available in the case study.

Verified hover entrance, pointer travel, interrupted exit/re-entry, keyboard entry/exit, loaded preview images, route navigation, and the secondary case-study figure. Inspected desktop at 1280px, keyboard layouts at 390px and 320px, and both themes. No horizontal overflow or clipped narrow preview content found. Production build and ESLint pass. The browser console has no runtime errors; Next logged lazy-image LCP advice after reloading into scrolled project sections. Reduced-motion and coarse-pointer rules were reviewed in source; this browser surface does not provide media or touch emulation.

Project hover audio reuses the existing quiet tick and saved sound preference. It plays once on pointer entry, never on pointer movement; rapid re-entry restarts the same audio element without layering sounds. Touch entry stays silent. The sound-enabled preview was exercised through entry, movement, exit, and re-entry with no runtime console errors; audio output was not captured by the browser tools. Build and ESLint pass.


Music Stats uses a local 1280×720 Playlist Analyzer screenshot captured September 15, 2026. The homepage and archive use the existing static detail-image hover/focus reveal, and the case study displays the screenshot with alt text and a caption. Its separate `previewLink` retains the direct Playlist Analyzer link for all input methods. The iframe component, loading state, viewport observers, embed styles, and unused embedding flags have been removed. Viewing the preview no longer loads the external Music Stats page.

Verified September 15: production build (including TypeScript), ESLint, and whitespace checks pass. Browser checks confirmed zero iframes and loaded local Music Stats images on the homepage, archive, and case study; the homepage keyboard reveal works. The case-study screenshot, caption, and direct tool link render at 390px without horizontal overflow. No browser warnings or errors were recorded during these checks.

The web résumé omits LangChain from its shared skills data. Product & frontend includes a small “Hover me!” cue (“Tap me!” for coarse pointers), revealing the Codex joke without replacing the skills list. The tooltip supports keyboard focus, click/tap toggling, pointer travel into its content, outside dismissal, and Escape from anywhere on the page. Keyboard transitions are instant; reduced motion keeps only opacity. Verified mouse entry/exit, actual Tab focus, Escape with focus elsewhere, and placement at390px; touch/reduced-motion media rules were reviewed in source. Build and lint pass. The downloadable PDF was not edited for that skills and interaction update.


Removed the mobile number and telephone links from shared profile data and the résumé and contact pages. The downloadable résumé also has the number permanently removed from its embedded image and searchable text. Verified the live résumé/contact pages, clean source and production-output searches, PDF text/object scans, and before/after PDF renders. Build and lint pass.


Corrected T.E.A.M DAO to Aug–Nov 2023 and added Reclaim Healthcare Administrative Services (Software Engineer, Nov 2022–Jul 2023), including the two project launches, PDPM Calculator implementation, and CMS.gov Excel update workflow. The new role omits a location because none was provided. Verified the live résumé layout and generated production content; build and lint pass. The downloadable PDF carries the same experience updates, with a matching continuation page for Reclaim to preserve readable type.


Updated the résumé download and About contact actions to share an editorial treatment: a fine rule, a quiet circular marker, and a lime arrow reveal. Added official company links for Chartmetric, Captivate Chat, and Evelan across résumé headings, About prose, and homepage employer references. Arrows reserve their space, pointer entry reuses the saved sound preference, keyboard entry/exit are immediate, touch shows the arrows with direct navigation, and reduced motion uses opacity. Verified both themes, 320px/390px layouts, pointer reveals, keyboard focus/blur, contact navigation, download attributes, and company destinations. Reduced-motion and coarse-pointer variants were reviewed in source. Build and lint pass; no browser runtime errors.

## Company hover cards

Company links now share a Radix Hover Card with a local, company-published UI preview: Chartmetric audience analytics, Captivate's sales-call assistant, and Evelan's web-application showcase. The image mounts on demand and uses Next image optimization. Source records are in `company-preview-chartmetric.md`, `company-preview-captivate.md`, and the Evelan section of `project-media-sources.md`. The caption identifies these as company previews rather than a claim that Jay built each depicted screen.

Pointer entry waits 180ms, then reveals the card over 200ms with a 4px lift. A 120ms close delay allows travel into the clickable card. Keyboard focus and blur are immediate, including when a pointer enters a keyboard-opened card. Escape and outside interaction dismiss the preview; only one company preview stays open at a time. Radix handles viewport collision. Reduced motion uses opacity only, and touch retains native single-tap link navigation. The original company link remains the accessible action; the redundant visual card stays outside the tab order.

Verified all three images, pointer entrance/exit, keyboard switching, mixed pointer/keyboard behavior, Escape persistence, and card click-through to Evelan. Inspected light/dark themes and a 390px keyboard layout with 16px viewport margins and no horizontal overflow. Build, TypeScript, ESLint, and whitespace checks pass. Reduced-motion and touch behavior were reviewed in source because this browser surface does not expose input/media emulation. Verification uses port 3023 because port 3000 is serving another project.

## Away tab title

The root-level `AttentionTitle` client component sets the tab title to exactly `pay attention..` while the document is hidden or its window loses focus. It restores the current route title when both visible and focused. A head observer preserves metadata updates during client navigation, including updates while away; listeners and the observer are cleaned up on unmount. No timers or additional dependencies are used.

Build, TypeScript, and ESLint pass. Browser navigation through résumé, About, and home retains the proper page titles. The automation browser reports both test tabs as visible, so actual tab-away and window-blur transitions were reviewed in source rather than claimed as browser-verified.

The Music Stats homepage contribution now highlights Chartmetric with the portfolio's neon background and dark text. Its internal link points to `/resume#chartmetric`, with a focusable anchor on the matching experience section. Existing section scroll margins position the destination below the sticky header. Verified link and keyboard navigation, neon contrast in dark mode, and destination clearance at desktop and 390px widths (104px and 88px respectively). Build and ESLint pass.

## Automatic experience duration

About and Résumé now use a shared count of completed years since June 1, 2022. The calculation uses UTC calendar anniversaries and clamps dates before the start to zero. A client component receives the server-rendered count for consistent hydration, then reads the current date so a static deployment does not freeze the visible count. It also refreshes at UTC midnight and when the visitor returns to the page, with timer/listener cleanup on unmount. Singular and plural labels are handled automatically.

Both pages currently render “4 years of professional experience.” The next increase is June 1, 2027; no annual copy change or redeployment is needed for the browser display.

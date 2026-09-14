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
- The decision selector changes content immediately and keeps its controls in place. Optional sound is off by default and applies to intentional decision changes and each fine-pointer entry into a project item.
- Native dialog navigation and search contain focus, support Escape/backdrop dismissal, restore focus, and close on route changes. Search supports arrow keys and Enter without intercepting IME composition.
- Experience uses a native disclosure. Work filters preserve their state in the URL and announce the result count.

## Verification

- Production build, full-app ESLint, TypeScript, and whitespace checks pass.
- Browser inspected at 1440, 781, 390, and 320px widths, including light and dark themes. No horizontal overflow found.
- Checked selected-work and case chapter anchors, search navigation, mobile menu dismissal/focus restoration, decision selection, archive filtering, experience disclosure, and next-project navigation.
- Case hero media loads eagerly; homepage/archive media loads lazily. Music Stats uses one noninteractive iframe for its live tool preview; other projects use images or decision text. The native cursor remains available. A bounded in-image action marker follows the native mouse pointer during project hover.
- Browser console recorded no warnings or errors during the integrated verification. The production build retains the existing Edge Runtime deprecation warning for dynamic routes.

## Content boundaries

Music Stats uses its official public preview with an explicit caption. Evelan now shows its published website showcase on the homepage, archive, and case study. DFK Group, Danaher, VITA CoRe, and CURATAX use actual interface previews from Evelan’s official case-study galleries, with publisher captions; these are published project visuals, not captures of the current live sites. Xoots retains its labeled editorial overview until interface screenshots are available. Source details are in `project-media-sources.md`.

Existing project scope/date notes remain where contribution details need confirmation. Approved interface screenshots and more specific project outcomes can replace the labeled overviews later without changing the page structure.


## Interactive project previews

Added in response to the requested MONOLOG-inspired hover treatment. The image cover remains fixed; an inset second surface rises from below with a 12-degree perspective tilt and settles flat over a dimmed cover. CSS transitions let quick exits and re-entry reverse naturally. The shared route transition still identifies only the original cover.

Evelan reveals its published web-application showcase. DFK Group, Danaher, VITA CoRe, and CURATAX reveal different interfaces from the official agency galleries. These secondary images also appear as static, labeled case-study figures. Xoots reveals a real decision from its case study. Music Stats now reveals its live Playlist Analyzer page; no replacement product UI was invented.

The action marker follows fine mouse pointers within the image bounds, using one scheduled frame and DOM transforms rather than React renders per pointer event. Keyboard focus reveals the same evidence immediately and also exits immediately. Reduced motion uses an opacity dissolve; touch input navigates directly. Narrow decision previews keep the title and action while omitting duplicate body text, which remains available in the case study.

Verified hover entrance, pointer travel, interrupted exit/re-entry, keyboard entry/exit, loaded preview images, route navigation, and the secondary case-study figure. Inspected desktop at 1280px, keyboard layouts at 390px and 320px, and both themes. No horizontal overflow or clipped narrow preview content found. Production build and ESLint pass. The browser console has no runtime errors; Next logged lazy-image LCP advice after reloading into scrolled project sections. Reduced-motion and coarse-pointer rules were reviewed in source; this browser surface does not provide media or touch emulation.

Project hover audio reuses the existing quiet tick and saved sound preference. It plays once on pointer entry, never on pointer movement; rapid re-entry restarts the same audio element without layering sounds. Touch entry stays silent. The sound-enabled preview was exercised through entry, movement, exit, and re-entry with no runtime console errors; audio output was not captured by the browser tools. Build and ESLint pass.


Music Stats now has a `hoverPage` pointing to its public Playlist Analyzer. The preview warms when its cover approaches the viewport on a fine pointer, or on pointer entry/keyboard focus, and preserves a 1280×720 desktop layout as its container resizes. The sandboxed, inert frame cannot take focus, scroll, or intercept project clicks. Touch users can follow a direct Playlist Analyzer link in the case study. No extra navigation or automatic cycling was added.

Verified the real public interface rendering on the homepage and archive, click-through to the case study, keyboard focus, and a 390px layout with no overflow. Browser runtime has no errors; build and ESLint pass. The live frame depends on Music Stats availability. Its load event cannot establish downstream API success; an upstream failure could affect preview content.

The web résumé omits LangChain from its shared skills data. Product & frontend includes a small “Hover me!” cue (“Tap me!” for coarse pointers), revealing the Codex joke without replacing the skills list. The tooltip supports keyboard focus, click/tap toggling, pointer travel into its content, outside dismissal, and Escape from anywhere on the page. Keyboard transitions are instant; reduced motion keeps only opacity. Verified mouse entry/exit, actual Tab focus, Escape with focus elsewhere, and placement at390px; touch/reduced-motion media rules were reviewed in source. Build and lint pass. The downloadable PDF was not edited for that skills and interaction update.


Removed the mobile number and telephone links from shared profile data and the résumé and contact pages. The downloadable résumé also has the number permanently removed from its embedded image and searchable text. Verified the live résumé/contact pages, clean source and production-output searches, PDF text/object scans, and before/after PDF renders. Build and lint pass.


Corrected T.E.A.M DAO to Aug–Nov 2023 and added Reclaim Healthcare Administrative Services (Software Engineer, Nov 2022–Jul 2023), including the two project launches, PDPM Calculator implementation, and CMS.gov Excel update workflow. The new role omits a location because none was provided. Verified the live résumé layout and generated production content; build and lint pass. The downloadable PDF carries the same experience updates, with a matching continuation page for Reclaim to preserve readable type.

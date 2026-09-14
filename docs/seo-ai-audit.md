# SEO and AI-agent audit

Audited on September 14, 2026. Production website: [jaylawrence.me](https://jaylawrence.me/).

**Implementation follow-up — September 14, 2026:** The repository now contains the sitemap-domain correction, server-rendered archive and filter links, canonical/social metadata for all 14 pages, 14 generated social images, identity/article/breadcrumb JSON-LD, robots.txt, and a generated llms.txt linked from the document head. The global title-changing behavior is unmounted, primary footer links provide navigation without JavaScript, and an app-level www-to-apex redirect preserves paths and queries. Sitemap modification dates are omitted until actual content-update dates are tracked.

Validation passed: `pnpm build`, `pnpm lint`, `git diff --check`, production HTTP checks for all 14 pages and images, sitemap/robots/llms links, direct filtered requests (including invalid and repeated filter parameters), and 404/noindex behavior. Browser filtering, Back/Forward navigation, and the desktop footer layout were checked. Home, project, and article social images were visually inspected. The requested mobile viewport override did not take effect in the audit browser, so no new mobile visual-verification claim is made.

These changes have **not been deployed**. The www TLS certificate still requires the owning Vercel account: the current CLI exposes only `jaydimaanos-projects` (display name `jaydimaano's projects`) and cannot resolve the live alias; the user identified `Jay's projects`, which is not listed for that credential. The browser hosting session opens at login. An application redirect cannot repair a failed TLS handshake. The four client-project dates and contribution boundaries remain explicitly unconfirmed pending verified facts; Evelan employment dates were not substituted. After deployment, submit the corrected sitemap in Search Console and verify production indexing and host redirects. The audit findings below describe the original production state.

**Verdict:** The portfolio is readable and usable by JavaScript-capable browser agents, with good text content and semantic structure. SEO and non-JavaScript discovery need improvement. Fix the wrong sitemap domain and server-render the work archive first.

This assessment combines the repository, a fresh production build, public HTTP responses, extracted HTML from all 14 main pages, and browser accessibility-tree navigation on the live site. It is not a Lighthouse score or a measurement of actual search rankings.

| Check | Observed result |
|---|---|
| Main HTML routes | All 14 returned HTTP 200 |
| Page titles and descriptions | Present on all 14; About and Contact inherit the homepage description |
| H1 | One in each main page's initial HTML |
| Canonical tags | Missing on all 14 pages and the tested filtered archive URL |
| Open Graph / Twitter metadata | Missing on all 14 pages |
| JSON-LD | Missing on all 14 pages |
| Main-page indexing restrictions | No meta noindex or X-Robots-Tag observed |
| Work archive without JavaScript | No project links or cards in the initial HTML |
| Case studies and article | Main text available in initial HTML |
| Sitemap | HTTP 200; all 14 locations incorrectly use jaylawrence.dev |
| robots.txt | HTTP 404 |
| llms.txt | HTTP 404; optional, not a Google Search requirement |
| Invalid project/article URLs | HTTP 404 with noindex |
| HTTP apex redirect | 308 to HTTPS apex, then 200 |
| HTTPS www hostname | TLS certificate hostname mismatch |
| Browser-agent task | Successfully filtered to AI workflows and opened the Xoots case study |
| Production build | Passed compilation, TypeScript, and static generation |

**Priority findings**

1. **High — The live sitemap points to the wrong domain.**

   [The live sitemap](https://jaylawrence.me/sitemap.xml) advertises `https://jaylawrence.dev` for every one of its 14 URLs. The source is [sitemap.ts](/Users/jaylawrence/Developer/personal-portfolio/apps/web/app/sitemap.ts:4). The `.dev` hostname did not resolve in the audit environment. This sitemap does not advertise the intended `.me` pages and gives crawlers incorrect preferred URLs.

   Set one shared site origin to `https://jaylawrence.me` and use it consistently in the sitemap and page metadata. After deployment, submit the corrected sitemap in Search Console. Google requests sitemap URLs as listed and recommends including the preferred canonical URLs. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

2. **High — The work archive's project list requires JavaScript.**

   Both the local production build and the live `/work` response contain zero project links and a `BAILOUT_TO_CLIENT_SIDE_RENDERING` marker. The tested `/work?filter=AI%20workflows` response behaves the same way. The seven cards appear after JavaScript runs.

   [work/page.tsx](/Users/jaylawrence/Developer/personal-portfolio/apps/web/app/work/page.tsx:5) wraps the complete archive in a Suspense boundary without a fallback. [work-filter.tsx](/Users/jaylawrence/Developer/personal-portfolio/apps/web/components/work-filter.tsx:8) reads `useSearchParams` and owns the entire list.

   Render the initial project list on the server, while retaining interactive filtering. Each project should have a real link and descriptive text in the initial response. The case-study pages themselves already render their content on the server, and homepage links plus next-project links provide other discovery paths. This is a discovery weakness, not proof that Google cannot index the projects.

3. **Medium — The www hostname fails certificate validation.**

   `https://www.jaylawrence.me/` failed with a certificate hostname mismatch. `http://www.jaylawrence.me/` redirects to that failing HTTPS address. The apex HTTPS site works.

   Configure `www.jaylawrence.me` in the hosting provider with a valid certificate and a permanent redirect to `https://jaylawrence.me`, preserving paths and queries. This prevents visitors and crawlers following www links from encountering a connection failure. Certificate validation was not bypassed during the audit.

4. **Medium — Canonical and social metadata are missing.**

   [layout.tsx](/Users/jaylawrence/Developer/personal-portfolio/apps/web/app/layout.tsx:11) defines only titles and a description. None of the 14 live pages supplies canonical, Open Graph, or Twitter metadata. The existing [OG image endpoint](/Users/jaylawrence/Developer/personal-portfolio/apps/web/app/og/[slug]/route.tsx:4) is not referenced by metadata.

   Add a metadata base for the correct domain, page-specific absolute canonical URLs, social titles/descriptions, and appropriate preview images. Decide whether filter variants should consolidate to `/work`; do not give every detail page the homepage canonical. The OG endpoint is available in source, but its image response was not validated in this audit. Social tags improve share previews; they are not themselves a guaranteed ranking improvement. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

5. **Medium — Four case studies still have incomplete facts.**

   DFK Group, Danaher, VITA CoRe, and CURATAX expose “scope to confirm” and “Dates to confirm” in [projects.ts](/Users/jaylawrence/Developer/personal-portfolio/apps/web/lib/projects.ts:81), also at lines 87, 93, and 99. These appear on the live site.

   Confirm the dates and contribution boundaries, and add supporting evidence where available. The existing uncertainty notes are honest and should remain until the facts are verified. Completing the information would make work-history extraction more useful to recruiters and AI agents; no specific ranking penalty is established by this audit.

6. **Lower priority — Sitemap freshness is generated rather than editorial.**

   [sitemap.ts](/Users/jaylawrence/Developer/personal-portfolio/apps/web/app/sitemap.ts:4) sets `lastModified: new Date()` for every URL. All live entries had the same timestamp, `2026-09-14T13:35:34.889Z`.

   Use actual significant content-update dates, or omit the field until reliable dates are available. A build time does not establish that every page changed. [Google lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

**Useful enhancements**

- Add truthful `Person` and, where appropriate, `ProfilePage` JSON-LD to clarify Jay's identity, role, and profile links. Add `BlogPosting` data with the article's author and actual publication/modification dates. Reuse visible facts from [profile.ts](/Users/jaylawrence/Developer/personal-portfolio/apps/web/lib/profile.ts:1) and [posts.ts](/Users/jaylawrence/Developer/personal-portfolio/apps/web/lib/posts.ts:10). Structured data may support relevant search features; it is not required for indexing or AI inclusion. [ProfilePage documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- Add robots.txt with the correct sitemap URL and an intentional crawler policy. Its current 404 is not itself a crawl block. Search access and training preferences should be separate: OpenAI identifies `OAI-SearchBot` as its search crawler and `GPTBot` as its training crawler. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).
- Give About and Contact descriptions tailored to their actual content. Mark the blog's visible date with a machine-readable `<time dateTime>` value.
- Review [attention-title.tsx](/Users/jaylawrence/Developer/personal-portfolio/apps/web/components/attention-title.tsx:15), which replaces the document title with “pay attention..” when hidden or unfocused. This is a source-level risk for background agents reading titles. The audit browser retained descriptive titles, so no live search-rendering failure was established.
- Mobile navigation relies on JavaScript to open its menu. A native disclosure or additional footer navigation would improve resilience; this was identified from source rather than a mobile browser test.
- An `llms.txt` summary could be an optional convenience for consumers that use it. Prioritize correct URLs and accessible HTML first. Google explicitly says it does not use llms.txt to improve search or generative search visibility. [Google AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

**What already works**

The main text of the homepage, résumé, about page, article, and case studies is available without JavaScript. Project pages explicitly label role, employer, period, contribution, results, context, decisions, and reflection. The article identifies its author and date. Images in the inspected initial HTML all had alt attributes; relevant project imagery includes descriptions and attribution. Music Stats links to public contribution evidence.

Navigation uses real anchors, and interactive controls expose names and selected states. The site has a main landmark, headings, lists, a skip link, and direct email/résumé links. The live browser task successfully filtered the work archive and followed the remaining case-study link. These traits support browser agents through the same structure that assists human navigation. [Agent-friendly website guidance](https://web.dev/articles/ai-agent-site-ux).

Homepage probes using Googlebot, OAI-SearchBot, and ChatGPT-User user-agent headers each returned HTTP 200 with portfolio content. These were requests from the audit environment, not from those services' verified IP addresses. They establish no obvious user-agent-string blocking on that path, not universal crawler access.

**Limits and follow-through**

Actual index coverage, selected canonicals, impressions, AI citations, Core Web Vitals, and crawler-IP firewall behavior were not measured. Search Console and hosting logs are needed for those checks. Browser interaction coverage was desktop filtering and case navigation; this was not a complete accessibility or mobile audit.

After the fixes, confirm that all sitemap URLs and canonicals use `.me`, www redirects cleanly, and all seven projects appear in the initial `/work` HTML. Then validate structured data and inspect the live pages in Search Console. Application code and deployment configuration were not changed as part of this audit.

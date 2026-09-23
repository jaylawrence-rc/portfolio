# Jay's Lab release operations

This runbook implements the release boundary in [Jay's Lab plan](./jays-lab-plan.md) and [ADR 0002](./adr/0002-keep-drafts-out-of-public-repository.md). The Lab is an independent app at `apps/lab` with the intended public origin `https://lab.jaylawrence.me`. The existing Portfolio Journal stays live at `https://jaylawrence.me/blog`.

## Current configuration and deployment

The repository has a pnpm workspace with `apps/web`, `apps/lab`, and `packages/design-system`; the Lab imports that shared package. The Lab's canonical base URL is set in `apps/lab/lib/site.ts`. The repository does not contain a tracked Vercel project configuration or credentials, so the actual hosting project, domain, and DNS state must be checked in the hosting account. Do not infer that the Lab is deployed from a local build.

If the portfolio is hosted on Vercel, create a **separate project** from this same Git repository for the Lab, leaving the portfolio's project and domain assignment intact. Set the Lab project's Root Directory to `apps/lab`, Framework Preset to Next.js, Node.js to 22.x (the repository's `.nvmrc` is `22.22.3`), and build command to `pnpm build` or the detected Next.js default if it resolves to the same command. Keep pnpm installation automatically detected from the root lockfile and `packageManager` field. In the project's Root Directory settings, enable **Include source files outside of the Root Directory in the Build Step** so `packages/design-system` and the workspace files are available. Vercel describes this [separate-project monorepo setup](https://vercel.com/docs/monorepos) and the [outside-root option](https://vercel.com/docs/monorepos/monorepo-faq).

Assign `lab.jaylawrence.me` to the Lab project only. Read the exact DNS record Vercel requests for this project, add it at the current DNS provider, and verify the domain and TLS certificate in the hosting dashboard. Do not guess a fixed CNAME value: Vercel says to inspect the domain for the required record, which may be project-specific. If the portfolio uses another host, use equivalent independent app/root/build and subdomain settings there. [Vercel custom-domain setup](https://vercel.com/docs/domains/set-up-custom-domain).

After deployment, check `https://lab.jaylawrence.me` and each public detail route. Verify canonical tags, the social preview image, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, the Portfolio Journal links in Lab, and the Lab links in the portfolio. Confirm every published portfolio `/blog` URL still resolves; the fixed retrofit baseline uses the four posts at commit `abb2f05`. Check the four security Learning Notes, the embedded Architecture Explorer, and `/resources/security-review-worksheet.md`. Run a mobile and desktop pass in light and dark themes, including keyboard navigation and reduced-motion settings.

## Dedicated Kit form

Create one **inline** Kit form for **first Agent Skill early access**. Its promise and any follow-up messages cover that launch only. Do not attach it to a general Lab newsletter, unrelated automation, or sales checkout. Use Kit's form builder to style it for the Lab and set a visible success message that tells a visitor to check their inbox for confirmation. In the form's **Confirmation email** settings, enable the confirmation email for double opt-in and verify the confirmation link with a test address. Kit documents [the form settings, success message, confirmation email, JavaScript embed, and subscriber export](https://help.kit.com/en/articles/2502640-the-kit-form-builder).

Use **Embed > JavaScript** in Kit. Copy the generated script's `data-uid` into `NEXT_PUBLIC_KIT_EMBED_UID` and its `src` into `NEXT_PUBLIC_KIT_EMBED_SRC` for the Lab deployment. Use the exact HTTPS URL issued for this form. The app renders a pending message when either value is absent. See [`apps/lab/.env.example`](../apps/lab/.env.example); local values belong in ignored `apps/lab/.env.local`. These public embed values are the only Kit configuration the current app reads; a Kit API key is not needed for this embed.

In **Settings > Advanced**, leave **Send subscriber data to thank you page** off. That option can append the subscriber's email, name, and ID to a redirect URL. Prefer the inline success message; if a redirect is later used, test that its URL contains no subscriber data. [Kit's Advanced setting](https://help.kit.com/en/articles/2502640-the-kit-form-builder).

If the Kit account participates in Creator Network, open **Recommendations > Settings > Recommendations**. Exclude this form under **Recommending on** and disable Recommendations by default for new forms if appropriate; Kit says recommendations can otherwise appear by default on forms. Check the actual post-submit flow for any promotion of unrelated creators or lists. [Kit's Recommendations locations](https://help.kit.com/en/articles/7240474-how-to-join-the-creator-network).

Test a new address through submit, success message, confirmation email, confirmed status, and the first-skill-only audience or segment. Check the browser URL throughout. Confirm that Kit can export the confirmed subscribers for this dedicated audience; its [export guide](https://help.kit.com/en/articles/2502489-how-to-export-subscribers-in-kit) documents segment exports. Store any resulting CSV outside this public repository.

## Public-content boundary and release gates

1. Keep Drafts and the paid Design Skill files in separate private Git repositories. A hidden route, unlinked file, or `status: draft` does not make material private in this public repository. Promote only approved public writing in a reviewable change. Review newly added files and staged diffs before push, including generated assets and metadata. Keep Kit credentials, subscriber exports, private client material, and PHI out of Git and build artifacts. The published-content loader in `apps/lab/lib/content.ts` is an integrity check, not a privacy control.
2. Jay reviews and supplies the original theses, examples, and sources for two Standards, one Bundle, and the Skill Listing. Confirm versions, dates, applicability, exceptions, and sources in the rendered pages and raw Markdown exports. Editorially review the four security Learning Notes against current primary sources, keeping legal duties, SOC 2 examination criteria, and proposed engineering controls distinct. Exercise the Architecture Explorer with both synthetic lanes, the denied cross-tenant retrieval, keyboard navigation, and the worksheet download; confirm it accepts no visitor data. Review final public reuse terms for free Standards and Bundles and the Lab's privacy wording before publication; the plan's intended permission is personal and commercial project use without republication, but exact wording remains subject to review.
3. Confirm Ship Onwards' written brief and the Jay-owned Next.js/React retrofit target with its preserved baseline commit. The retrofit's content and behavior must stay stable in the before-and-after comparison. Both Showcase entries need real screenshots, navigable routes, a profile, decisions, manual edits, and recorded quality checks.
4. Attribute a demo to a Design Skill only after a working private version actually produced it. Record the version and any manual edits. Independently verify that the exported Design Profile imports into and applies to a supported private test repository; a local JSON round-trip alone does not establish that integration.
5. Publish after owner approval of the content, terms, privacy copy, form behavior, DNS, and end-to-end smoke checks. The first release collects interest; skill sales and checkout are a later decision.

## Local validation

From the repository root with Node 22 and pnpm 10.15.1:

```sh
pnpm install --frozen-lockfile
pnpm --filter web lint
pnpm --filter lab lint
pnpm --filter lab typecheck
node --test apps/lab/lib/content.test.mjs apps/lab/lib/design-profile.test.mjs
pnpm --filter web build
pnpm --filter lab build
```

The build validates the public Markdown metadata and references. Inspect `git status --short` and `git diff --cached --name-only` before release, then review every added public file; the generated `.next` directory and local `.env.local` are ignored, but an ignore rule is not a content review. With the Kit values configured, run `pnpm dev:lab` and repeat the form and route checks in a browser. The live Kit, DNS, TLS, and private-skill checks require the respective accounts or private repository and cannot be completed from this checkout alone.

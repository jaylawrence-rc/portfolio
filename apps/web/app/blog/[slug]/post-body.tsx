type PostBodyProps = {
  slug: string;
};

function FrontendHipaaReadinessPost() {
  return (
    <>
      <p className="article-opening">My latest HIPAA learning focused on the frontend—the place where protected health information becomes visible, interactive, and surprisingly easy to copy into systems that were never meant to receive it. Reviewing a real healthcare application changed my mental model: the browser is not only a presentation layer. It is a temporary data environment with its own storage, telemetry, caching, navigation, and third-party boundaries.</p>

      <section>
        <p className="eyebrow">The shift in perspective</p>
        <h2>A secure API does not automatically create a safe frontend.</h2>
        <p>Authorization and encryption are essential, but sensitive information can still escape after an approved response reaches the browser. A resident name rendered in the DOM can enter session replay. A token in a query string can enter analytics. Clinical working state can survive logout in local storage. A preview deployment can expose the right application to the wrong audience.</p>
        <p>This made frontend HIPAA readiness less about a list of components and more about tracing information across every browser-adjacent system.</p>
        <blockquote>If the browser can see sensitive information, every system attached to the browser deserves a threat model.</blockquote>
      </section>

      <section>
        <p className="eyebrow">The review loop</p>
        <h2>We followed data from render to residue.</h2>
        <p>The review traced representative resident and clinical workflows through Server Components, Client Components, Server Actions, the API client, authentication, uploads and downloads, browser state, analytics, security headers, and deployment configuration. Candidate scanning helped find likely risks, but source-to-sink inspection determined whether information could actually reach an unsafe destination.</p>
        <div className="workflow-strip" aria-label="Frontend privacy review workflow">
          {["Render", "Observe", "Persist", "Clear", "Verify"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>

        <h3>1. Render: what reaches the page?</h3>
        <p>We started with the sensitive fields the interface displays and the user actions that reveal them. This included clinical assessments, referral details, documents, insurance information, validation feedback, notifications, and audit views. React escaping helps with injection risk, but it does not stop legitimate page text from being collected by an analytics or replay SDK.</p>

        <h3>2. Observe: what watches the page?</h3>
        <p>Session replay, heatmaps, autocapture, exception tracking, performance monitoring, and user identification all create secondary data flows. A proxy path does not change the destination or make a third party part of our infrastructure. We have to understand the final recipient, the exact payload, the enabled product, and the agreement covering it.</p>

        <h3>3. Persist: what survives the current screen?</h3>
        <p>We inventoried local storage, session storage, client caches, object URLs, browser history, and any state restored after navigation. A value does not become harmless because it is stored by a state library rather than written to a database.</p>

        <h3>4. Clear: what happens at a trust-boundary change?</h3>
        <p>Logout was only one boundary. Account changes, tenant changes, facility changes, idle expiry, browser back-forward caching, and multi-tab behavior can all carry data or identity into the wrong context. Cleanup has to be centralized and tested across every path.</p>

        <h3>5. Verify: what does the deployed browser actually do?</h3>
        <p>Configuration in a repository is evidence of intent, not proof of production behavior. The real checks are outbound network payloads, browser storage after sensitive journeys, live response headers, preview protection, deployed cache behavior, and negative authorization tests against the owning backend.</p>
      </section>

      <section>
        <p className="eyebrow">Telemetry</p>
        <h2>Analytics should fail closed around PHI.</h2>
        <p>The most serious baseline risk was session replay. Masking inputs was not enough because clinical information appeared throughout ordinary page text. Relying on developers to remember a masking attribute for every new field created an allow-by-accident system.</p>
        <p>The local remediation reversed that default. Analytics now has a global kill switch; replay, heatmaps, DOM autocapture, exception capture, performance capture, and user identification are disabled. Pageviews are limited to approved, low-cardinality route templates. Resident-detail, token-bearing, validation, audit, error, and unknown routes are denied, and query strings are never appended.</p>
        <p>The lesson is broader than one analytics vendor: privacy controls should describe the small set of data allowed to leave the application. Trying to enumerate every future sensitive value is fragile because the product will keep changing.</p>
      </section>

      <section>
        <p className="eyebrow">URLs and identity</p>
        <h2>A URL is both navigation and a data distribution channel.</h2>
        <p>Query parameters can flow into browser history, referrer headers, screenshots, support tools, web server logs, and analytics events. In the reviewed baseline, manual pageview tracking included full query strings, while invitation routes accepted a token in the URL. Redacting only resident path segments left the more dangerous query data untouched.</p>
        <p>The safer pattern is to send analytics a route template rather than the real URL, remove one-time tokens from browser history immediately after use, and strictly validate redirect targets. Protocols, queries, fragments, and control characters do not belong in an untrusted return path.</p>
        <p>Pseudonymous identifiers also need care. Hashing an identifier does not automatically de-identify it when events can still be linked to a known user, facility, resident workflow, or timestamp. The approved event schema has to be evaluated as a combined dataset.</p>
      </section>

      <section>
        <p className="eyebrow">Browser state</p>
        <h2>Convenient persistence can quietly become a clinical record.</h2>
        <p>The application previously persisted resident-linked validation state—including clinical sections and free-text feedback—to local storage. That state could survive logout and a browser restart. On a shared workstation, the convenience of restoring work became an unnecessary disclosure path.</p>
        <p>Resident-linked working state is now memory-only. Session-boundary cleanup purges sensitive stores and client caches and resets analytics identity during logout and tenant or facility switches. If anything must persist, it should be a narrowly justified opaque workflow marker with a short lifetime and explicit binding to the current context.</p>
        <p>This is where frontend architecture and privacy architecture become the same conversation. State location, query-key design, cache lifetime, and reset behavior are security decisions.</p>
      </section>

      <section>
        <p className="eyebrow">The browser perimeter</p>
        <h2>Security headers and dependencies define what the page can trust.</h2>
        <p>A permissive Content Security Policy can leave a large exfiltration path even when application code avoids obvious unsafe rendering. The remediation moved production scripts to a per-request nonce, narrowed runtime dependencies, bundled the PDF worker locally, removed an unnecessary runtime badge script, and kept developer tooling out of production.</p>
        <p>The frontend also requests private, no-store responses so resident content is not intentionally shared through browser or intermediary caches. But the effective production headers and CDN behavior still need to be tested against the deployed application. Source configuration cannot verify what an edge platform ultimately serves.</p>
        <p>The same rule applies to uploads and downloads. An authenticated frontend flow is useful, but content validation, malware scanning, object authorization, signed-link lifetime, response headers, and download auditing belong to the backend and storage boundary. A button hidden by the UI is not authorization.</p>
      </section>

      <section>
        <p className="eyebrow">Verification</p>
        <h2>Privacy tests should use synthetic secrets and try to make them leak.</h2>
        <p>The local remediation was supported by a dedicated privacy suite, the broader frontend unit suite, TypeScript checks, a production build, and public-route browser smoke tests. That gives us evidence that the intended code paths work. It does not prove that external project settings or the deployed environment match the repository.</p>
        <p>The next level of verification uses deliberately recognizable synthetic values. We can place a fake resident name, token, identifier, and clinical phrase into a controlled journey, then inspect:</p>
        <ul>
          <li>analytics, replay, error, and performance network payloads;</li>
          <li>local storage, session storage, IndexedDB, Cache API, history, and client caches;</li>
          <li>state after logout, idle expiry, account changes, facility changes, multiple tabs, and back-forward navigation;</li>
          <li>production and preview headers, caching, deployment protection, logs, and source-map behavior; and</li>
          <li>backend responses to unauthorized cross-tenant, cross-facility, and cross-object requests.</li>
        </ul>
        <p>A passing test means the synthetic marker did not reach an unapproved destination. It does not mean that every future feature is safe, which is why these checks belong in recurring regression and deployment workflows.</p>
      </section>

      <section>
        <p className="eyebrow">Readiness versus remediation</p>
        <h2>Fixed locally is not the same as ready for real PHI.</h2>
        <p>This distinction became one of the most valuable parts of the review. The confirmed frontend code paths have local controls and regression tests, but release readiness remains blocked until the external and operational evidence is complete.</p>
        <p>That evidence includes deleting historical replay data and confirming project-level analytics settings, removing real PHI from staging or approving a tightly controlled exception, assessing possibly exposed invitation tokens, verifying the exact products and projects covered by business associate agreements, protecting preview deployments, validating production payloads and headers, and confirming backend authorization and audit behavior.</p>
        <p>Vendors may publish HIPAA programs or offer business associate agreements, but neither a trust-center badge nor a signed agreement proves that our chosen products, account, region, settings, retention, access controls, and actual data flows are appropriate. Shared responsibility has to be demonstrated in the deployed system.</p>
      </section>

      <section>
        <p className="eyebrow">What I am carrying forward</p>
        <h2>Frontend privacy is the discipline of leaving less residue.</h2>
        <ul>
          <li><strong>Allowlist observability.</strong> Send approved route templates and categorical events, not raw URLs, DOM text, identifiers, free text, or request data.</li>
          <li><strong>Treat storage as a deliberate choice.</strong> Keep sensitive working state in memory unless persistence has a documented need, lifetime, and cleanup path.</li>
          <li><strong>Model every session boundary.</strong> Logout, expiry, identity changes, organizational context changes, and browser restoration all need the same rigor.</li>
          <li><strong>Verify the deployed perimeter.</strong> Headers, caches, previews, vendor settings, and network payloads matter more than what a configuration file appears to promise.</li>
          <li><strong>Keep authorization on the server.</strong> The frontend can guide a user, but the backend must enforce tenant, facility, role, and object access.</li>
        </ul>
        <p>The browser will always need enough information to help a clinician do the work. My job is to make that information useful for the moment, inaccessible outside its intended context, and absent from the places where it never needed to be.</p>
        <p>This is a technical learning record, not a HIPAA certification or legal opinion. Readiness depends on the organization’s complete safeguards, risk analysis, agreements, operating procedures, and qualified legal and security review.</p>
      </section>

      <section>
        <p className="eyebrow">References</p>
        <h2>The review and vendor guidance behind this entry.</h2>
        <ul>
          <li><a href="https://trust.posthog.com/"><strong>PostHog:</strong> Trust Center</a></li>
          <li><a href="https://vercel.com/kb/guide/is-vercel-hipaa-compliant"><strong>Vercel:</strong> HIPAA support</a></li>
          <li><a href="https://vercel.com/kb/guide/hipaa-compliance-guide-vercel"><strong>Vercel:</strong> HIPAA deployment guidance</a></li>
          <li><a href="https://vercel.com/legal/baa"><strong>Vercel:</strong> Business Associate Agreement</a></li>
          <li><a href="https://vercel.com/docs/deployment-protection"><strong>Vercel:</strong> Deployment protection</a></li>
        </ul>
      </section>
    </>
  );
}

function AiAgentDataArchitecturePost() {
  return (
    <>
      <p className="article-opening">Building an agentic workflow for skilled nursing referrals made the database question more specific for us. We did not need one large data store that both the product and every agent could access. We needed clear ownership for product facts, document processing, job execution, corrections, and the information allowed to cross each boundary.</p>

      <section>
        <p className="eyebrow">The core decision</p>
        <h2>We separate business authority from AI execution.</h2>
        <p>The product backend owns the business truth: tenancy, users, residents, product workflows, nurse edits, and the durable audit of those edits. The AI engine owns a narrower responsibility: process a referral job, retain its execution state and structured result, and return evidence for review.</p>
        <p>That distinction determines the write direction. When a nurse corrects an AI result, the correction is saved to the product database first. The backend can then mirror the edited clinical row into the engine’s PostgreSQL store so the job result reflects the latest reviewed state. The mirror supports the AI workflow; it does not replace the product record.</p>
        <blockquote>The database that helps an agent finish a job is not necessarily the database that owns the business fact.</blockquote>
      </section>

      <section>
        <p className="eyebrow">The data path</p>
        <h2>The workflow moves references and reviewed facts, not the whole product model.</h2>
        <p>The backend uploads a referral packet to controlled object storage, creates a job identifier, and gives the engine a claim-check reference plus the small amount of facility context needed for the workflow. The engine does not need the product’s complete tenant, user, or resident model to run the job.</p>
        <div className="workflow-strip" aria-label="Referral processing data path">
          {["Product DB", "Blob claim", "AI job", "Nurse review", "Sync back"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>

        <h3>1. Product database: identity, tenancy, and reviewed truth</h3>
        <p>The backend database owns relationships the AI engine should not have to reconstruct: which organization a user belongs to, which resident a workflow concerns, who made a correction, and why. Product authorization remains at this boundary.</p>

        <h3>2. Object storage: documents move by claim check</h3>
        <p>Referral PDFs remain in blob storage rather than being copied through a large API body or placed directly in the product database. The engine receives a validated folder reference, lists the supported documents in that batch, and downloads them for OCR and extraction. The request contract rejects unexpected fields and malformed or traversal-style paths.</p>

        <h3>3. Engine PostgreSQL: execution state, not a second product</h3>
        <p>The engine can persist job status, workflow steps, structured results, source references, and event history in PostgreSQL. It also stores flattened clinical rows used to merge AI output with reviewed edits. Those editable rows are deliberately reduced and masked before persistence, while the job result is treated as sensitive workflow data.</p>
        <p>The shared schema is owned outside the AI service. The engine reads and writes through repository interfaces but does not run its own production migrations. That keeps schema authority aligned with the application responsible for the broader data model.</p>

        <h3>4. Nurse review: a recommendation becomes a product decision</h3>
        <p>The engine returns extraction, PDPM assessment, and facility-screening results for review. An AI recommendation is not silently promoted into the authoritative product record. A nurse can correct, delete, or explain a clinical row through the product workflow, where the edit is associated with the responsible user and its reason.</p>

        <h3>5. Sync back: mirror the reviewed state into the job</h3>
        <p>After the product save succeeds, the backend sends the relevant edited row to the engine. The engine upserts it by stable row identity and merges it over the original AI result. This gives the job endpoint a current, review-aware representation without changing which database owns the correction.</p>
      </section>

      <section>
        <p className="eyebrow">Five data zones</p>
        <h2>We classify the stores by purpose, not only by technology.</h2>
        <p>Some boundaries are separate services; others are schemas, payload contracts, or retention policies. The important part is being able to name the owner and allowed path for each kind of information.</p>
        <ul>
          <li><strong>Product data:</strong> tenants, users, residents, nurse-reviewed clinical state, and the authoritative edit history.</li>
          <li><strong>Document data:</strong> referral files, OCR inputs, extracted artifacts, and job-scoped traces in controlled blob storage.</li>
          <li><strong>Execution data:</strong> job snapshots, workflow events, structured AI results, and reduced editable rows in the engine runtime.</li>
          <li><strong>Learning data:</strong> reviewed corrections and their embeddings, stored deliberately for bounded retrieval rather than mixed into conversational memory.</li>
          <li><strong>Integration data:</strong> narrow API contracts and allowlisted progress events that connect the backend, engine, and user interface.</li>
        </ul>
        <p>This prevents a common mistake: calling every derived artifact “metadata” and assuming it is harmless. A result payload, embedding source, trace, or correction can still contain or reveal protected information. Its sensitivity follows the content, not the database label.</p>
      </section>

      <section>
        <p className="eyebrow">Model context</p>
        <h2>Different agent stages need different levels of information.</h2>
        <p>File extraction begins with the referral itself. OCR and extraction cannot be described honestly as a de-identified workflow; the approved document and AI services process the clinical packet needed for the task. That makes vendor agreements, identity controls, storage configuration, and risk analysis part of the design—not paperwork added later.</p>
        <p>Downstream assessment agents receive a narrower structured view. Direct identifiers and contact fields are masked, dates of birth are converted to age where the clinical context needs it, and common identifier patterns are removed from narrative text. Deployed environments force those protective settings on rather than trusting an operator to remember a flag.</p>
        <p>Generated narratives are scanned again for identifier patterns, and text sent for correction-memory embeddings is masked before it reaches the embedding model. These controls reduce exposure, but we do not present them as formal de-identification or as a replacement for the larger HIPAA program.</p>
      </section>

      <section>
        <p className="eyebrow">Memory and learning</p>
        <h2>We distinguish job memory from reusable correction memory.</h2>
        <p>The orchestrator runs a fixed workflow—file extraction, PDPM assessment, and facility evaluation—with retries, guardrails, observation, and escalation. Its goal, plan, attempts, and decisions are scoped to the current job. There is no open-ended AI chat session carrying resident history from one workflow to the next.</p>
        <p>Reusable learning is a separate, deliberate path. Nurse-reviewed corrections can enter a correction-memory store, receive masked embeddings, and support similarity search for specific clinical components. Because this data can influence later recommendations, it needs its own rules for provenance, scope, promotion, retention, and review.</p>
        <p>A vector column does not make correction data anonymous. We treat the source correction, its identifiers, and the derived embedding as one governed lifecycle.</p>
      </section>

      <section>
        <p className="eyebrow">Audit without replication</p>
        <h2>Operational visibility should not become another clinical database.</h2>
        <p>Job-related API access emits a separate audit record with the method, route, caller signal, and result status. Agent traces are job-scoped and scrubbed for common identifier patterns before they are uploaded. Client-facing failures are reduced to safe messages rather than returning raw exceptions.</p>
        <p>Real-time progress is even narrower. Queue messages contain an allowlisted status, workflow step, sub-step, bounded counters, and timestamp. They intentionally exclude resident names, filenames, document text, raw errors, user-facing messages, and debug payloads.</p>
        <p>This gives the backend and interface enough information to show progress without turning the progress channel or observability system into a copy of the referral packet.</p>
      </section>

      <section>
        <p className="eyebrow">Decisions before implementation</p>
        <h2>The questions we use to review each boundary.</h2>
        <ol>
          <li>Which system owns this fact: the product, document store, engine job, or learning store?</li>
          <li>Can we pass a validated claim-check reference instead of copying the document into another request or table?</li>
          <li>Does the engine need identity and tenancy data, or can the backend retain that responsibility?</li>
          <li>Which stage genuinely needs raw clinical text, and which can use a masked structured projection?</li>
          <li>Is this output a suggestion, a reviewed decision, or an authoritative write?</li>
          <li>When a nurse corrects a result, which direction does the synchronization travel and which database remains authoritative?</li>
          <li>What job state, trace, prompt, result, correction, or embedding persists—and what deletes it?</li>
          <li>Can progress and audit events explain what happened without carrying the underlying clinical content?</li>
          <li>Which storage, OCR, model, search, monitoring, and queue services receive ePHI, and are the required agreements and safeguards in place?</li>
        </ol>
      </section>

      <section>
        <p className="eyebrow">What separation does not solve</p>
        <h2>A clean diagram is not the same as a compliant system.</h2>
        <p>Separate databases and services can reduce blast radius and clarify ownership, but they do not create compliance on their own. Encryption does not replace authorization. Masking does not automatically produce de-identified data. A business associate agreement does not replace risk analysis. A “HIPAA-ready” vendor does not make our configuration and use automatically appropriate.</p>
        <p>The architecture must operate alongside policies, training, incident response, vendor management, continuity planning, and regular risk review. HHS requires reasonable and appropriate administrative, physical, and technical safeguards; engineering owns an important part of that system, not the whole of it.</p>
      </section>

      <section>
        <p className="eyebrow">The principle I keep</p>
        <h2>Keep authority in the product and capability in the engine.</h2>
        <p>The product knows the organization, the resident, the reviewer, and the final decision. The AI engine knows the referral job, the tools required to process it, the evidence behind its output, and the limited state needed to make that work reliable.</p>
        <p>This separation lets the agent be capable without quietly becoming authoritative. It also gives product, engineering, security, and compliance teams a shared language for every boundary: owner, purpose, payload, persistence, and audit.</p>
        <p>This is an engineering perspective, not legal advice. The final design for any healthcare product should be validated against its specific role, data flows, risk analysis, contracts, and applicable legal guidance.</p>
      </section>

      <section>
        <p className="eyebrow">References</p>
        <h2>Primary guidance behind the framework.</h2>
        <ul>
          <li><a href="https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html"><strong>HHS:</strong> Summary of the HIPAA Security Rule</a></li>
          <li><a href="https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html"><strong>HHS:</strong> Minimum Necessary Requirement</a></li>
          <li><a href="https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html"><strong>HHS:</strong> Guidance on HIPAA and Cloud Computing</a></li>
          <li><a href="https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html"><strong>HHS:</strong> Guidance on De-identification of Protected Health Information</a></li>
        </ul>
      </section>
    </>
  );
}

function HipaaCompliancePost() {
  return (
    <>
      <p className="article-opening">Learning HIPAA has changed the way I think about building healthcare software. What began as an effort to understand a compliance requirement became a broader lesson in trust, restraint, and engineering responsibility.</p>

      <section>
        <p className="eyebrow">Why I started</p>
        <h2>I needed to understand the responsibility behind the requirement.</h2>
        <p>When software handles health information, privacy cannot be a final review item. The choices made in a database schema, an API response, a support tool, or an interface can all affect whether sensitive information is appropriately protected.</p>
        <p>I started learning HIPAA so I could participate in those decisions with more context. I wanted to understand not only what the rules say, but how they should influence the way a product is planned, built, tested, and operated.</p>
        <blockquote>Compliance is not a badge added after launch. It is a set of responsibilities expressed through everyday product and engineering decisions.</blockquote>
      </section>

      <section>
        <p className="eyebrow">The learning loop</p>
        <h2>I am turning policy language into engineering questions.</h2>
        <p>HIPAA is broad, and the right implementation depends on the organization, its role, its risks, and the data it handles. My learning process is therefore less about memorizing a checklist and more about building a repeatable way to investigate each system.</p>
        <div className="workflow-strip" aria-label="HIPAA compliance learning loop">
          {["Learn", "Map", "Question", "Apply", "Review"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>

        <h3>1. Learn the language and the boundaries</h3>
        <p>I began with the core ideas: protected health information, covered entities, business associates, the Privacy Rule, the Security Rule, and the Breach Notification Rule. Learning the vocabulary helped me ask better questions, but it also made one thing clear: knowing the terms is not the same as knowing how they apply to a real product.</p>

        <h3>2. Map how information actually moves</h3>
        <p>A field is not sensitive only because of its label. Its meaning depends on who it describes, how it can identify someone, where it came from, and who can access it. I now think more deliberately about the full data journey: collection, transmission, storage, display, logging, export, support, retention, and deletion.</p>

        <h3>3. Turn principles into concrete questions</h3>
        <p>For each workflow, I ask: Is this information necessary? Who should be able to see it? How will access be authenticated and authorized? What should be recorded in an audit trail? Could the same goal be reached with less data? What happens when something goes wrong?</p>

        <h3>4. Apply safeguards across the system</h3>
        <p>Technical safeguards matter, including access controls, encryption, secure transmission, session handling, and auditability. But HIPAA also involves administrative and physical safeguards. That means a secure code path is only one part of a larger system that includes policies, training, vendor relationships, risk analysis, and incident response.</p>

        <h3>5. Review as the product changes</h3>
        <p>A product does not stay still, so its risk profile does not stay still either. New integrations, analytics, support workflows, and AI features can create new data paths. I am learning to treat compliance as an ongoing review practice rather than a one-time gate.</p>
      </section>

      <section>
        <p className="eyebrow">What has changed</p>
        <h2>The biggest lessons are shaping how I build.</h2>
        <ul>
          <li><strong>Collecting less is a product decision.</strong> Data that is never collected cannot be exposed, misused, or retained longer than intended.</li>
          <li><strong>Access should be specific.</strong> Authentication answers who someone is; authorization must still answer what that person needs to do and see.</li>
          <li><strong>Auditability is part of the experience.</strong> Important actions need enough context to be understood later without turning logs into another source of unnecessary sensitive data.</li>
          <li><strong>Safe defaults reduce reliance on memory.</strong> Privacy-preserving behavior should be the easy path for engineers, operators, and users.</li>
          <li><strong>Compliance is collaborative.</strong> Engineering contributes safeguards, but legal, security, operations, leadership, and the people using the system all hold part of the picture.</li>
        </ul>
      </section>

      <section>
        <p className="eyebrow">In practice</p>
        <h2>Small implementation details carry real weight.</h2>
        <p>My attention now goes beyond the obvious database and API boundaries. I look for sensitive values in URLs, analytics events, error trackers, application logs, test fixtures, screenshots, notifications, browser storage, exports, and support tools. These secondary paths are easy to overlook precisely because they are not the main product workflow.</p>
        <p>I also think more carefully about interfaces. A well-designed healthcare product should reveal only what a person needs for the task, communicate permissions clearly, make consequential actions deliberate, and provide recovery paths that do not expose more information.</p>
        <p>When AI tools are involved, the boundary becomes even more important. I do not treat convenience as permission to share patient information. The approved environment, agreements, data handling rules, and intended use must all be understood before sensitive context enters a tool.</p>
      </section>

      <section>
        <p className="eyebrow">Still learning</p>
        <h2>This is a practice I expect to keep deepening.</h2>
        <p>I am not treating this learning journey as a claim that I can make a product compliant by myself. HIPAA compliance depends on the organization and requires qualified legal, privacy, and security guidance alongside sound engineering.</p>
        <p>My goal is to become a more useful partner in that work: to recognize risk earlier, ask sharper questions, design safer defaults, and understand when a decision needs expertise beyond the engineering team.</p>
        <p>The deeper lesson is simple. In healthcare software, trust is not created by a privacy statement alone. It is earned through hundreds of careful decisions, including the ones a user may never see.</p>
      </section>
    </>
  );
}

function AiDevelopmentWorkflowPost() {
  return (
    <>
      <p className="article-opening">AI is most useful to me when it makes the engineering process clearer. I do not use it to avoid understanding a problem. I use it to reach understanding faster, test more options, and spend more attention on decisions that require product and engineering judgment.</p>

      <section>
        <p className="eyebrow">The operating principle</p>
        <h2>AI works inside my process, not above it.</h2>
        <p>Shipping software still means being accountable for the outcome. The model does not attend the stakeholder conversation, own the production incident, or explain a tradeoff to the team. I do.</p>
        <p>That changes how I use tools such as Codex, Claude Code, and OpenCode. I treat them as fast collaborators that can inspect, compare, draft, and challenge. I do not treat their output as inherently correct.</p>
        <blockquote>My goal is not to generate more code. It is to reduce the distance between an unclear problem and a verified solution.</blockquote>
      </section>

      <section>
        <p className="eyebrow">My workflow</p>
        <h2>Five loops from context to confidence.</h2>
        <p>The exact tool changes, but the sequence is consistent. Each loop has a clear output and a reason to stop before moving forward.</p>
        <div className="workflow-strip" aria-label="AI-assisted development workflow">
          {["Context", "Plan", "Build", "Verify", "Learn"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>

        <h3>1. Build context before asking for code</h3>
        <p>I start with the user or business decision, then identify the relevant constraints: existing architecture, design patterns, data boundaries, performance expectations, and failure states. I ask AI to inspect the repository and explain what already exists before proposing anything new.</p>
        <p>Good context includes the files that define the system, not an enormous dump of everything. Product specifications, design tokens, component APIs, nearby tests, and repository instructions are usually more valuable than thousands of unrelated lines.</p>

        <h3>2. Turn ambiguity into a bounded plan</h3>
        <p>For ambiguous work, I ask the model to separate facts, assumptions, risks, and decisions. This is especially helpful when translating domain-heavy requirements into product behavior. On a healthcare AI SaaS platform for skilled nursing facilities, for example, clinical workflows require more than a technically valid interface; terminology, correction paths, long-running AI states, and compliance boundaries all shape the implementation.</p>
        <p>The plan should be small enough to verify. If it contains multiple unrelated changes, I split it. A narrow loop makes both the AI output and my review more reliable.</p>

        <h3>3. Delegate mechanics, keep judgment</h3>
        <p>I use AI heavily for repository exploration, scaffolding, repetitive refactors, test cases, documentation, and comparing implementation options. These tasks benefit from speed and breadth.</p>
        <p>I stay directly involved in product behavior, architecture boundaries, security and privacy decisions, accessibility, performance tradeoffs, and any domain assumption that could change the result. Those decisions need context that is larger than a prompt.</p>

        <h3>4. Verify through the product, not the chat</h3>
        <p>A confident answer is not evidence. I run type checks, tests, production builds, and targeted browser journeys. I inspect the changed diff and check responsive layouts, keyboard paths, reduced motion, empty states, and failure behavior.</p>
        <p>When something breaks, I bring the concrete signal back into the loop: the error, the relevant code path, and the behavior I expected. This turns debugging into a testable investigation instead of repeated guessing.</p>

        <h3>5. Preserve what the team learned</h3>
        <p>If a correction is likely to matter again, I move it out of the conversation and into the system. It may become a test, a component primitive, a lint rule, a design token, an architecture note, or a repository instruction.</p>
        <p>This is where AI-assisted work compounds. The next task begins with better context because the previous task left behind more than code.</p>
      </section>

      <section>
        <p className="eyebrow">Where it helps</p>
        <h2>I use AI differently across the development lifecycle.</h2>
        <ul>
          <li><strong>Discovery:</strong> map an unfamiliar codebase, trace data flow, find existing patterns, and surface questions before implementation.</li>
          <li><strong>Product shaping:</strong> turn conversations into explicit requirements, edge cases, states, and acceptance criteria.</li>
          <li><strong>Implementation:</strong> draft components, migrations, tests, scripts, and documentation within known system boundaries.</li>
          <li><strong>Debugging:</strong> compare observed behavior against the expected path and generate focused hypotheses.</li>
          <li><strong>Review:</strong> challenge assumptions, inspect accessibility and performance risks, and look for changes outside the intended scope.</li>
        </ul>
      </section>

      <section>
        <p className="eyebrow">The boundaries</p>
        <h2>Some work should never be delegated blindly.</h2>
        <p>I never paste credentials, private customer information, patient data, or confidential business material into a tool without an approved environment and policy. Sanitizing context is part of the engineering task.</p>
        <p>I also avoid letting generated code establish a new architectural pattern by accident. A solution can work locally and still create inconsistency, unnecessary dependencies, or a maintenance problem. Existing system boundaries win unless there is a deliberate reason to change them.</p>
        <p>Finally, I read what ships. AI can draft quickly, but responsibility cannot be delegated.</p>
      </section>

      <section>
        <p className="eyebrow">A practical example</p>
        <h2>From an ambiguous workflow to a production feature.</h2>
        <ol>
          <li>I write the outcome in user language and list known constraints.</li>
          <li>I ask AI to inspect adjacent features, shared primitives, state management, and tests.</li>
          <li>We produce a short implementation plan with explicit assumptions and edge cases.</li>
          <li>AI drafts the mechanical parts while I shape behavior, naming, composition, and system boundaries.</li>
          <li>I run the real journey, review the diff, and test responsive, accessible, loading, empty, and error states.</li>
          <li>I capture any reusable correction in the codebase so the next feature starts smarter.</li>
        </ol>
      </section>

      <section>
        <p className="eyebrow">The result</p>
        <h2>AI gives me leverage when the feedback loop stays honest.</h2>
        <p>The value is not that AI can type faster than I can. The value is that it can help me inspect more context, compare more options, and verify more thoroughly—provided I keep the work bounded and remain accountable for every decision.</p>
        <p>Used this way, AI does not replace the software engineering workflow. It makes the workflow more deliberate.</p>
      </section>
    </>
  );
}

export function PostBody({ slug }: PostBodyProps) {
  switch (slug) {
    case "frontend-hipaa-readiness-protecting-phi-in-the-browser":
      return <FrontendHipaaReadinessPost />;
    case "structuring-product-data-for-ai-agents-with-hipaa-in-mind":
      return <AiAgentDataArchitecturePost />;
    case "learning-hipaa-compliance-as-a-software-engineer":
      return <HipaaCompliancePost />;
    case "how-i-use-ai-in-my-development-workflow":
      return <AiDevelopmentWorkflowPost />;
    default:
      return null;
  }
}

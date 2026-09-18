import {
  AllowlistGateDiagram,
  AuthorityContractDiagram,
  BoundaryMap,
  ComparisonDiagram,
  DecisionMatrix,
  LayerStack,
  MemoryLifecycleDiagram,
  PostArtwork,
  ProcessFlow,
  SessionBoundaryDiagram,
} from "@/components/journal-visuals";

type PostBodyProps = {
  slug: string;
};

function FrontendHipaaReadinessPost() {
  return (
    <>
      <p className="article-opening">My latest HIPAA learning focused on the frontend: the place where protected health information becomes visible, interactive, and easy to copy into systems that were never meant to receive it. I now think of the browser as a temporary data environment, not only a presentation layer.</p>

      <PostArtwork
        variant="browser"
        eyebrow="The browser boundary"
        title="A clinical page is surrounded by systems that can retain what it sees."
        caption="The useful screen is only the center. Telemetry, URLs, storage, caches, network calls, and deployment infrastructure all create adjacent data paths."
      />

      <section>
        <p className="eyebrow">The shift in perspective</p>
        <h2>A secure API does not automatically create a safe frontend.</h2>
        <p>Authorization and encryption are essential, but sensitive information can still escape after an approved response reaches the browser. A resident name in the DOM can enter session replay. A token in a query string can enter analytics. Clinical working state can survive logout. A preview deployment can expose the right application to the wrong audience.</p>
        <blockquote>If the browser can see sensitive information, every system attached to the browser deserves a threat model.</blockquote>
      </section>

      <section>
        <p className="eyebrow">The review loop</p>
        <h2>We followed data from render to residue.</h2>
        <p>Candidate scanning helped locate likely risks, but source-to-sink inspection showed whether information could actually reach an unsafe destination.</p>
        <ProcessFlow
          title="Five questions expose most frontend privacy paths."
          caption="The sequence runs once as an explanation; every stage remains fully readable when motion is reduced or JavaScript is unavailable."
          animate
          steps={[
            { kicker: "Page", label: "Render", description: "What reaches the DOM?" },
            { kicker: "Observers", label: "Observe", description: "What watches the page?" },
            { kicker: "Browser", label: "Persist", description: "What survives navigation?" },
            { kicker: "Boundary", label: "Clear", description: "What changes on logout or context switch?" },
            { kicker: "Evidence", label: "Verify", description: "What does production actually do?", emphasis: true },
          ]}
        />
      </section>

      <section className="journal-spread">
        <div className="journal-spread__copy">
          <p className="eyebrow">Telemetry</p>
          <h2>Analytics should fail closed around PHI.</h2>
          <p>Masking a few inputs was not enough when clinical information appeared throughout ordinary page text. The safer model is a global kill switch, disabled replay and autocapture, and an explicit allowlist of low-cardinality route templates.</p>
          <p>Privacy controls should describe the small set of data allowed to leave the application. Trying to enumerate every future sensitive value is fragile because the product will keep changing.</p>
        </div>
        <AllowlistGateDiagram
          width="reading"
          title="Only approved telemetry crosses the analytics boundary."
          caption="The approved path emits a route category—not the DOM, a raw URL, an identity, or free text."
          animate
          blockedSignals={["DOM text", "Raw URL + query", "User identity", "Free text"]}
          approved={{
            source: "Route template",
            note: "Known category",
            event: "page_category",
            value: "clinical-work",
          }}
          controls={["Kill switch", "Route templates", "Categorical events", "Schema tests"]}
          diagramLabel="Capture-first analytics copies raw browser context. The safer default blocks DOM text, raw URLs with queries, user identity, and free text at an explicit allowlist, then emits only the clinical-work page category."
        />
      </section>

      <section className="journal-spread journal-spread--reverse">
        <div className="journal-spread__copy">
          <p className="eyebrow">Browser state</p>
          <h2>Convenient persistence can quietly become a clinical record.</h2>
          <p>Resident-linked validation state previously survived logout and browser restart in local storage. It is now memory-only, while a central cleanup path clears sensitive stores, client caches, and analytics identity at every trust-boundary change.</p>
          <p>State location, query-key design, cache lifetime, and reset behavior are privacy architecture decisions.</p>
        </div>
        <SessionBoundaryDiagram
          width="reading"
          title="Sensitive state should end when authority ends."
          caption="Logout is one path. Idle expiry, account changes, tenant changes, facility changes, and browser restoration need the same guarantee."
          animate
          residue={[
            { source: "Validation state", destination: "Local storage" },
            { source: "Resident queries", destination: "Warm client cache" },
            { source: "User context", destination: "Carried identity" },
          ]}
          cleanup={[
            { target: "Browser stores", result: "Empty" },
            { target: "Client caches", result: "Cleared" },
            { target: "Analytics identity", result: "Reset" },
          ]}
          triggers={["Logout", "Idle expiry", "Account switch", "Tenant switch", "Facility switch", "Browser restore"]}
          diagramLabel="Before, validation state persists in local storage, the client cache remains warm, and analytics identity carries beyond logout. Now, sensitive working state remains in memory only. Logout, idle expiry, or a context switch invokes one purge path, which clears browser stores and client caches and resets analytics identity, leaving no sensitive residue."
        />
      </section>

      <section>
        <p className="eyebrow">The browser perimeter</p>
        <h2>Security controls form layers, not a single frontend switch.</h2>
        <p>A nonce-based Content Security Policy, local dependencies, and private responses narrow the browser boundary. They do not replace server authorization, object validation, malware scanning, audit events, or live deployment verification.</p>
        <LayerStack
          title="Each layer answers a different failure mode."
          caption="A hidden button is not authorization, and source configuration is not proof of effective CDN or production behavior."
          layers={[
            { label: "Page", title: "Render deliberately", description: "Show only the information required for the current task." },
            { label: "Browser", title: "Constrain execution", description: "Nonce scripts, local workers, memory-first state, and no-store intent." },
            { label: "Backend", title: "Enforce authority", description: "Tenant, facility, role, and object checks remain server responsibilities.", emphasis: true },
            { label: "Storage", title: "Validate and audit", description: "Downloads, uploads, content checks, link lifetime, and access events." },
            { label: "Deploy", title: "Prove the perimeter", description: "Live headers, caches, previews, logs, regions, and access controls." },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Verification</p>
        <h2>Privacy tests should use synthetic secrets and try to make them leak.</h2>
        <p>A deliberately recognizable fake resident, token, identifier, and clinical phrase make the absence of a leak testable.</p>
        <DecisionMatrix
          title="The marker should disappear—or be rejected—at every unapproved destination."
          caption="Passing these checks validates a specific deployed journey. It does not certify every future feature."
          animate
          columns={["Synthetic test", "Expected evidence"]}
          rows={[
            { decision: "Telemetry", values: ["Inspect replay, analytics, errors, and performance payloads", "No marker observed"] },
            { decision: "Browser residue", values: ["Inspect storage, history, DOM, object URLs, and caches", "No marker retained"] },
            { decision: "Session changes", values: ["Logout, expire, switch account, tenant, facility, and tab", "State fully cleared"] },
            { decision: "Deployment", values: ["Inspect previews, headers, CDN cache, logs, and source maps", "Protected and private"] },
            { decision: "Authorization", values: ["Attempt cross-tenant, cross-facility, and cross-object access", "Request rejected"] },
          ]}
        />
      </section>

      <section className="journal-spread">
        <div className="journal-spread__copy">
          <p className="eyebrow">Readiness versus remediation</p>
          <h2>Fixed locally is not the same as ready for real PHI.</h2>
          <p>Local controls and regression tests are important evidence. Release readiness still depends on the real vendor settings, historical data deletion, staging policy, preview protection, business associate agreements, deployed behavior, backend controls, and an accountable owner accepting residual risk.</p>
          <p>A vendor badge or signed agreement does not prove that our chosen products, region, retention, access controls, and actual data flows are appropriate.</p>
        </div>
        <ComparisonDiagram
          width="reading"
          title="Code closure and release evidence are separate gates."
          caption="The product stays blocked for real PHI until both sides are complete."
          relation="plus"
          sides={[
            {
              label: "Repository",
              title: "Confirmed locally",
              description: "Controls, tests, types, build, and synthetic public-route checks.",
              items: ["Privacy suite", "Unit suite", "CSP implementation", "Session cleanup"],
              emphasis: true,
            },
            {
              label: "Operations",
              title: "Still requires evidence",
              description: "Live projects, vendor scope, deletion, protection, authorization, and audit.",
              items: ["BAA coverage", "Project settings", "Deployed payloads", "Risk acceptance"],
            },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">What I am carrying forward</p>
        <h2>Frontend privacy is the discipline of leaving less residue.</h2>
        <p>The browser will always need enough information to help a clinician do the work. My job is to make that information useful for the moment, inaccessible outside its intended context, and absent from the places where it never needed to be.</p>
        <p>This is a technical learning record, not a HIPAA certification or legal opinion. Readiness depends on the organization’s complete safeguards, risk analysis, agreements, operating procedures, and qualified legal and security review.</p>
      </section>

      <section>
        <p className="eyebrow">References</p>
        <h2>Public vendor guidance behind this entry.</h2>
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
      <p className="article-opening">Building an agentic workflow for skilled nursing referrals made the database question more specific. We did not need one large store that the product and every agent could access. We needed clear ownership for business facts, documents, job execution, corrections, and every payload crossing those boundaries.</p>

      <PostArtwork
        variant="data"
        eyebrow="The architectural thesis"
        title="Keep business authority in the product and processing capability in the engine."
        caption="The workflow can cross systems without turning the AI engine into a second product database."
      />

      <section className="journal-spread">
        <div className="journal-spread__copy">
          <p className="eyebrow">The core decision</p>
          <h2>Business authority and AI execution stay separate.</h2>
          <p>The product backend owns tenancy, users, residents, nurse edits, and the durable audit of those edits. The engine owns a narrower job: process the referral, retain execution state and structured evidence, and return a result for review.</p>
          <p>A nurse correction is written to the product first, then mirrored into the engine so the job reflects the reviewed state.</p>
          <blockquote>The database that helps an agent finish a job is not necessarily the database that owns the business fact.</blockquote>
        </div>
        <AuthorityContractDiagram
          width="reading"
          title="The engine proposes. The product commits."
          caption="The order is the contract: request out, candidate back, product save first, reviewed mirror second."
          animate
          product={{
            title: "Product backend",
            owns: ["Identity + tenancy", "Residents + reviewed truth", "Reviewer + edit audit"],
          }}
          engine={{
            title: "AI engine",
            owns: ["Workflow + job status", "Candidate result + evidence", "Reviewed-row mirror"],
          }}
          exchanges={[
            { label: "Start job", direction: "to-engine", product: "Job ID + claim-check reference", engine: "Create bounded workflow" },
            { label: "Return candidate", direction: "to-product", product: "Queue for nurse review", engine: "Structured result + evidence" },
            { label: "Product only", direction: "product-local", product: "Commit value + reviewer + reason", engine: "Does not cross yet" },
            { label: "After commit", direction: "to-engine", product: "Saved reviewed row", engine: "Update this job’s mirror", emphasis: true },
          ]}
          writeOrder={["Product commit", "Engine mirror"]}
          guardrail="The engine never writes product truth directly."
          diagramLabel="The product backend owns identity, tenancy, residents, reviewed truth, and the edit audit. It starts a bounded AI job, receives a candidate and evidence for nurse review, commits the reviewed correction locally, and only then mirrors the reviewed row to the AI engine. The engine cannot write product truth directly."
        />
      </section>

      <section>
        <p className="eyebrow">The data path</p>
        <h2>The workflow moves references and reviewed facts—not the whole product model.</h2>
        <p>The backend uploads a referral packet, creates a job identifier, and gives the engine a claim-check reference with the small amount of facility context required for processing.</p>
        <ProcessFlow
          title="One referral crosses five controlled boundaries."
          caption="Documents stay in object storage. The engine receives a validated reference, while the final correction returns through the product’s authorized workflow."
          animate
          steps={[
            { kicker: "Authority", label: "Product DB", description: "Identity, tenancy, resident, and reviewed truth.", emphasis: true },
            { kicker: "Claim check", label: "Blob storage", description: "Referral documents and job-scoped artifacts." },
            { kicker: "Capability", label: "AI job", description: "Extraction, assessment, evaluation, and evidence." },
            { kicker: "Decision", label: "Nurse review", description: "Correct, explain, accept, or remove a result." },
            { kicker: "Authority", label: "Save + mirror", description: "Product first; reviewed row mirrors back to the job.", emphasis: true },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Five data zones</p>
        <h2>We classify stores by purpose, not only by technology.</h2>
        <BoundaryMap
          title="Every zone has an owner, a purpose, and a narrow crossing."
          caption="A result, trace, correction, or embedding can still reveal protected information. Sensitivity follows the content, not the database label."
          zones={[
            { title: "Product", description: "Authoritative product and clinical state.", owner: "Backend", payload: "Tenants, residents, reviewed edits", emphasis: true },
            { title: "Document", description: "Referral packets and extraction inputs.", owner: "Blob boundary", payload: "Validated job references" },
            { title: "Execution", description: "Job progress, evidence, and structured results.", owner: "AI engine", payload: "Bounded job data" },
            { title: "Learning", description: "Reviewed corrections used for retrieval.", owner: "Governed memory", payload: "Provenance + masked embedding" },
            { title: "Integration", description: "Contracts connecting product, engine, and UI.", owner: "API boundary", payload: "Allowlisted fields only" },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Model context</p>
        <h2>Different agent stages need different levels of information.</h2>
        <p>OCR and extraction must process the referral itself. Downstream assessment stages receive a narrower structured view, with direct identifiers masked and date of birth converted to age where the clinical task permits it.</p>
        <ProcessFlow
          title="Context narrows as the workflow becomes more specific."
          caption="Masking reduces exposure; it is not formal de-identification and does not replace vendor agreements, access controls, or risk analysis."
          steps={[
            { kicker: "Sensitive", label: "Raw referral", description: "Approved document and OCR services process the packet." },
            { kicker: "Extraction", label: "Clinical facts", description: "Structured values are separated from document layout." },
            { kicker: "Reduction", label: "Masked context", description: "Identifiers and contact patterns are removed; DOB can become age." },
            { kicker: "Need to know", label: "Agent stage", description: "Assessment receives only the context required for its task.", emphasis: true },
            { kicker: "Guardrail", label: "Output scan", description: "Narratives and embedding text are checked again." },
          ]}
        />
      </section>

      <section className="journal-spread journal-spread--reverse">
        <div className="journal-spread__copy">
          <p className="eyebrow">Memory and learning</p>
          <h2>Job memory and reusable correction memory follow different lifecycles.</h2>
          <p>The orchestrator’s goal, plan, attempts, and decisions end with the current job. Reviewed corrections may enter a deliberate retrieval path with provenance, masking, embeddings, retention, and review.</p>
          <p>A vector column does not make correction data anonymous.</p>
        </div>
        <MemoryLifecycleDiagram
          width="reading"
          title="Only reviewed corrections may cross the job boundary."
          caption="Execution context ends with the referral. Later jobs retrieve only a reviewed, provenance-linked correction; there is no open-ended cross-job chat."
          animate
          executionSteps={["Goal", "Plan", "Attempts", "Evidence", "Decisions"]}
          correctionSource="Product-reviewed correction"
          correctionControls={["Provenance", "Mask identifiers", "Create embedding", "Retention + review"]}
          correctionOutcome="Bounded retrieval"
          diagramLabel="Execution memory contains the goal, plan, attempts, evidence, and decisions for one referral, then terminates at the job boundary with no state carried into the next job. There is no automatic promotion into reusable memory. Only a product-reviewed correction can pass provenance, masking, embedding, and retention controls before becoming eligible for bounded retrieval."
        />
      </section>

      <section>
        <p className="eyebrow">Audit without replication</p>
        <h2>Operational visibility should not become another clinical database.</h2>
        <BoundaryMap
          title="One internal event is shaped into three narrow channels."
          caption="Resident names, filenames, document text, raw errors, and debug payloads stay out of the progress channel."
          animate
          zones={[
            { title: "Audit record", description: "Who called which job route and what status returned.", owner: "Security log", payload: "Method, path, caller signal, status" },
            { title: "Scrubbed trace", description: "Job-scoped reasoning evidence with common identifiers removed.", owner: "Engine trace", payload: "Bounded diagnostic context" },
            { title: "Progress event", description: "Enough state for the interface to explain movement.", owner: "Queue", payload: "Status, step, counters, timestamp", emphasis: true },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Architecture review</p>
        <h2>Seven questions keep each boundary honest.</h2>
        <DecisionMatrix
          title="The review starts with ownership and ends with evidence."
          caption="These questions turn a database diagram into a lifecycle that product, engineering, security, and compliance can inspect together."
          columns={["Question", "Evidence"]}
          rows={[
            { decision: "Owner", values: ["Which system owns the fact?", "Named source of truth"] },
            { decision: "Transfer", values: ["Can a validated reference replace a copied document?", "Narrow request contract"] },
            { decision: "Context", values: ["Which stage genuinely needs raw clinical text?", "Stage-specific projection"] },
            { decision: "Authority", values: ["Is this a suggestion, review, or authoritative write?", "Explicit write direction"] },
            { decision: "Lifecycle", values: ["What persists, for how long, and who deletes it?", "Retention and deletion rule"] },
            { decision: "Observability", values: ["Can the event explain without copying clinical content?", "Allowlisted schema"] },
            { decision: "Vendors", values: ["Which services receive ePHI?", "Agreement + configured safeguard"] },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">What separation does not solve</p>
        <h2>A clean diagram is not the same as a compliant system.</h2>
        <LayerStack
          title="Database separation sits inside a larger safeguard program."
          caption="Engineering owns an important part of the system—not the whole of HIPAA compliance."
          layers={[
            { label: "Design", title: "Clear data ownership", description: "Product authority, engine capability, and bounded contracts.", emphasis: true },
            { label: "Technical", title: "Access and evidence", description: "Authorization, encryption, audit, integrity, and recovery." },
            { label: "Administrative", title: "Operating discipline", description: "Risk analysis, policy, training, vendor management, and incident response." },
            { label: "Physical", title: "Real-world safeguards", description: "Devices, workstations, facilities, continuity, and access procedures." },
          ]}
        />
        <p>Encryption does not replace authorization. Masking does not automatically create de-identified data. A business associate agreement does not replace risk analysis. The final design must be validated against the organization’s role, data flows, contracts, and applicable legal guidance.</p>
      </section>

      <section>
        <p className="eyebrow">The principle I keep</p>
        <h2>Keep authority in the product and capability in the engine.</h2>
        <p>The product knows the organization, the resident, the reviewer, and the final decision. The engine knows the referral job, its tools, its evidence, and the limited state required to process it reliably. That separation lets an agent be capable without quietly becoming authoritative.</p>
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
      <p className="article-opening">Learning HIPAA has changed the way I think about healthcare software. What began as a compliance requirement became a broader lesson in trust, restraint, and engineering responsibility.</p>

      <PostArtwork
        variant="compliance"
        eyebrow="The larger system"
        title="Trust is supported by overlapping safeguards—not one secure code path."
        caption="Technical controls matter, but administrative and physical safeguards determine how the system is operated in the real world."
      />

      <section>
        <p className="eyebrow">Why I started</p>
        <h2>I needed to understand the responsibility behind the requirement.</h2>
        <p>A database field, API response, support tool, or interface decision can all affect whether sensitive information is appropriately protected. I wanted enough context to recognize those consequences earlier and involve the right people before implementation made them expensive.</p>
        <blockquote>Compliance is not a badge added after launch. It is a set of responsibilities expressed through everyday product and engineering decisions.</blockquote>
      </section>

      <section>
        <p className="eyebrow">The learning loop</p>
        <h2>I turn policy language into engineering questions.</h2>
        <p>HIPAA is context-dependent, so my process is less about memorizing a universal checklist and more about repeatedly inspecting a specific system.</p>
        <ProcessFlow
          title="Five moves take a rule from language to practice."
          caption="The loop repeats whenever the product, vendor set, workflow, or risk profile changes."
          animate
          steps={[
            { kicker: "Vocabulary", label: "Learn", description: "Understand roles, rules, and boundaries." },
            { kicker: "Journey", label: "Map", description: "Follow collection, use, sharing, retention, and deletion." },
            { kicker: "Decisions", label: "Question", description: "Ask who needs what, why, and for how long." },
            { kicker: "Safeguards", label: "Apply", description: "Turn the answers into product and operating controls.", emphasis: true },
            { kicker: "Change", label: "Review", description: "Reassess as the system evolves." },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">What has changed</p>
        <h2>The defaults I choose are more deliberate now.</h2>
        <DecisionMatrix
          title="Convenient defaults become governed decisions."
          caption="The shift is from assuming more data and access are helpful to proving what the task actually requires."
          columns={["Easy default", "Deliberate practice"]}
          rows={[
            { decision: "Collection", values: ["Keep it in case it helps", "Collect the minimum needed"] },
            { decision: "Access", values: ["Authenticated means allowed", "Authorize the specific task and object"] },
            { decision: "Logs", values: ["Record everything for debugging", "Keep bounded evidence without copying PHI"] },
            { decision: "Behavior", values: ["Rely on people to remember", "Make the safe path the default"] },
            { decision: "Ownership", values: ["Engineering will handle it", "Share responsibility across the organization"] },
          ]}
        />
      </section>

      <section className="journal-spread">
        <div className="journal-spread__copy">
          <p className="eyebrow">In practice</p>
          <h2>The secondary paths deserve the same attention as the main workflow.</h2>
          <p>I now look for sensitive values in URLs, analytics, errors, fixtures, screenshots, notifications, browser storage, exports, and support tools. These paths are easy to miss precisely because they are not the product’s main feature.</p>
          <p>An interface should reveal only what the task requires, communicate permissions clearly, and make consequential actions deliberate. Convenience is never permission to send patient information into an unapproved AI tool.</p>
        </div>
        <BoundaryMap
          width="reading"
          title="Sensitive data has more exits than the API diagram shows."
          caption="Every adjacent system needs an owner, a purpose, an allowed payload, and a retention rule."
          zones={[
            { title: "URLs", description: "History, referrers, and copied links." },
            { title: "Observability", description: "Analytics, replay, errors, and logs." },
            { title: "Browser", description: "Storage, cache, DOM, and screenshots." },
            { title: "Operations", description: "Exports, notifications, support, and test data." },
            { title: "AI tools", description: "Approved environment, agreement, and intended use.", emphasis: true },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Still learning</p>
        <h2>Engineering is one contributor to a larger trust system.</h2>
        <BoundaryMap
          title="No single discipline can certify the whole picture."
          caption="Engineering can recognize risk earlier and build safer defaults, while legal, privacy, security, operations, leadership, and users contribute evidence and accountability."
          zones={[
            { title: "Engineering", description: "Data flow, product behavior, technical safeguards, and verification.", emphasis: true },
            { title: "Privacy + legal", description: "Role, use, disclosure, agreements, and applicable guidance." },
            { title: "Security", description: "Risk, identity, monitoring, incident response, and assurance." },
            { title: "Operations", description: "Training, access reviews, devices, continuity, and procedures." },
            { title: "Users + leadership", description: "Real workflow, governance, resources, and accepted risk." },
          ]}
        />
        <p>I am not treating this learning journey as a claim that I can make a product compliant by myself. My goal is to become a more useful partner: to recognize risk earlier, ask sharper questions, and understand when a decision needs expertise beyond engineering.</p>
        <p>In healthcare software, trust is earned through hundreds of careful decisions—including the ones a user may never see.</p>
      </section>
    </>
  );
}

function AiDevelopmentWorkflowPost() {
  return (
    <>
      <p className="article-opening">AI is most useful to me when it makes the engineering process clearer. I use it to inspect more context, compare more options, and shorten the distance between an ambiguous problem and a verified solution—not to outsource judgment.</p>

      <PostArtwork
        variant="workflow"
        eyebrow="The operating loop"
        title="AI accelerates the work; verification determines what survives."
        caption="The useful output of each task is not only code. It is also better context for the next decision."
      />

      <section className="journal-spread">
        <div className="journal-spread__copy">
          <p className="eyebrow">The operating principle</p>
          <h2>AI works inside my process, not above it.</h2>
          <p>The model does not attend the stakeholder conversation, own the production incident, or explain a tradeoff to the team. I do. That changes which work I accelerate and which decisions stay firmly human.</p>
          <blockquote>My goal is not to generate more code. It is to reduce the distance between an unclear problem and a verified solution.</blockquote>
        </div>
        <ComparisonDiagram
          width="reading"
          title="Speed and accountability belong in different columns."
          caption="AI can widen the search space; the engineer remains responsible for narrowing it correctly."
          relation="supports"
          sides={[
            {
              label: "AI leverage",
              title: "Inspect and draft",
              description: "Move quickly through repository context and mechanical work.",
              items: ["Search", "Compare", "Scaffold", "Refactor", "Challenge"],
            },
            {
              label: "Human responsibility",
              title: "Decide and own",
              description: "Make product, architecture, security, and shipping decisions.",
              items: ["Understand", "Choose", "Review", "Explain", "Own outcomes"],
              emphasis: true,
            },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">My workflow</p>
        <h2>Five loops move the work from context to confidence.</h2>
        <ProcessFlow
          title="Every stage has a human gate and a concrete exit artifact."
          caption="Domain-heavy work—especially healthcare—stays bounded by product behavior, privacy, architecture, and evidence rather than model confidence."
          animate
          steps={[
            { kicker: "Input", label: "Context", description: "User outcome, constraints, nearby code, and existing patterns." },
            { kicker: "Decision", label: "Plan", description: "Facts, assumptions, risks, scope, and acceptance criteria." },
            { kicker: "Draft", label: "Build", description: "Mechanical implementation within known boundaries." },
            { kicker: "Evidence", label: "Verify", description: "Types, tests, build, browser journey, and diff review.", emphasis: true },
            { kicker: "System", label: "Learn", description: "Turn corrections into tests, tokens, docs, or rules." },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">Where it helps</p>
        <h2>The tool changes role across the development lifecycle.</h2>
        <DecisionMatrix
          title="Leverage is useful only when its corresponding check is explicit."
          caption="The pattern is consistent: let AI increase breadth, then use product and engineering evidence to narrow the answer."
          columns={["AI contribution", "Human check"]}
          rows={[
            { decision: "Discovery", values: ["Map code, data flow, and nearby patterns", "Is the context complete and relevant?"] },
            { decision: "Product shaping", values: ["List states, edge cases, and acceptance criteria", "Does this match the real user decision?"] },
            { decision: "Implementation", values: ["Draft components, tests, migrations, and docs", "Does it respect system boundaries and craft?"] },
            { decision: "Debugging", values: ["Generate focused hypotheses from concrete signals", "Which hypothesis survives reproduction?"] },
            { decision: "Review", values: ["Challenge accessibility, performance, and scope", "What does the actual diff and product prove?"] },
          ]}
        />
      </section>

      <section className="journal-spread journal-spread--reverse">
        <div className="journal-spread__copy">
          <p className="eyebrow">The boundaries</p>
          <h2>Some work should never be delegated blindly.</h2>
          <p>Credentials, private customer information, patient data, and confidential business material stop at an approval boundary. Generated code also does not get to establish an architectural pattern by accident.</p>
          <blockquote>I read what ships. AI can draft quickly, but responsibility cannot be delegated.</blockquote>
        </div>
        <LayerStack
          width="reading"
          title="Three gates remain non-delegable."
          caption="The boundary is not anti-AI. It is what makes AI useful without turning convenience into authority."
          layers={[
            { label: "Input", title: "Approved context", description: "Sanitize and confirm the environment before sensitive material enters a tool." },
            { label: "Design", title: "Deliberate architecture", description: "New patterns require a reason, not merely generated precedent." },
            { label: "Release", title: "Verified ownership", description: "A responsible engineer understands, tests, reviews, and owns what ships.", emphasis: true },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">A practical example</p>
        <h2>A feature should leave behind evidence, not only a diff.</h2>
        <ProcessFlow
          title="Six artifacts turn an ambiguous workflow into reusable product knowledge."
          caption="The final correction moves out of the chat and into the codebase, so the next task begins with stronger context."
          steps={[
            { kicker: "Outcome", label: "User statement", description: "Describe the result in the user’s language." },
            { kicker: "Context", label: "Repository map", description: "Find adjacent behavior, primitives, state, and tests." },
            { kicker: "Scope", label: "Bounded plan", description: "Expose assumptions, edge cases, and stop conditions." },
            { kicker: "Change", label: "Draft diff", description: "Delegate mechanics while shaping behavior directly." },
            { kicker: "Proof", label: "Verified journey", description: "Exercise responsive, accessible, loading, empty, and error states.", emphasis: true },
            { kicker: "Memory", label: "Reusable rule", description: "Preserve the lesson as a test, token, component, or note." },
          ]}
        />
      </section>

      <section>
        <p className="eyebrow">The result</p>
        <h2>AI gives me leverage when the feedback loop stays honest.</h2>
        <p>The value is not that AI can type faster. It is that I can inspect more context, compare more options, and verify more thoroughly—while remaining accountable for every decision. Used this way, AI does not replace the engineering workflow. It makes the workflow more deliberate.</p>
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

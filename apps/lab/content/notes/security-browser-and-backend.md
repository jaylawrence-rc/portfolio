---
kind: note
slug: security-browser-and-backend
status: published
title: "Keep the browser useful and the backend authoritative"
description: "Trace sessions, rendering, uploads, object authorization, telemetry, and rights requests through a clinical intake workflow."
publishedAt: "2026-09-23"
revisedAt: "2026-09-23"
reviewAt: "2026-12-23"
version: 1.0.0
topics:
  - frontend-engineering
  - backend
  - security
  - compliance
related:
  - note:security-scope-and-data-flow
  - note:security-agent-runtime
sources:
  - title: HHS HIPAA Security Rule summary
    url: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
  - title: HHS online tracking guidance
    url: https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html
  - title: EDPB individual rights guide
    url: https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en
  - title: OWASP API object authorization risk
    url: https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/
---

## Question

Where should a clinical intake app place authority when the browser displays sensitive documents and an AI job can retrieve data? The browser needs enough context for the clinician to work, but a changed URL, hidden field, client cache, or model suggestion must not decide which patient record the service may read or write.

Continue the [synthetic two-lane workflow](/notes/security-scope-and-data-flow): one U.S. covered provider and one EEA controller clinic use the same fictional SaaS. The public example has no live patient data. Sources were reviewed on September 23, 2026.

## Current understanding

**Legal scope.** In the U.S. lane, the HIPAA Security Rule requires regulated entities to protect ePHI with administrative, physical, and technical safeguards. Its technical safeguards include access control, audit controls, integrity, authentication, and transmission security. The Privacy Rule also limits PHI uses and disclosures; minimum necessary applies where specified, with exceptions. These duties do not prescribe a particular React component, cookie setting, or API framework. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) · [HHS minimum necessary guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html)

In the EEA lane, the clinic must inform people about processing and facilitate applicable access, correction, erasure, restriction, portability, objection, and automated-decision rights. Those rights have conditions and exceptions, and the processor helps the controller carry out requests. A deletion button without a route through every data copy would be an incomplete implementation. [EDPB individual-rights guide](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en)

**Published security guidance.** OWASP identifies cross-site scripting and session handling as browser risks. It also describes broken object-level authorization: an API that trusts a supplied object ID can expose another user's record even when the caller is authenticated. These guides are threat and engineering guidance, not HIPAA or GDPR text. [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) · [OWASP session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) · [OWASP API object authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/)

My **engineering interpretation** is to make the browser an intentionally short-lived workspace and the API the policy authority:

- Render uploaded text as data, with safe output encoding and no HTML execution. Avoid placing clinical text in URLs, analytics events, error reports, and long-lived browser storage.
- Bind the session to an authenticated user and a selected organization; expire and revoke it deliberately. Show the active patient and purpose to reduce operator mistakes, but treat those labels as display context.
- On every read and write, the API derives the current principal from the session and checks the requested tenant, patient, object, action, and purpose. A random object ID alone is not authorization.
- Validate upload type, size, and structure before storage; keep the source file and derived index entries labeled with the same tenant and patient scope. Recheck permissions when the job later retrieves them.
- Route access, export, correction, retention, and deletion requests through an owned workflow so the clinic or provider can assess the applicable right or rule and direct downstream processors.

The HIPAA tracking guidance warrants special care on authenticated patient pages: tracking vendors may receive PHI from those pages. Its discussion of certain unauthenticated public-page visits was partially vacated by a 2024 court order, which the HHS page itself notes. Review the current guidance and the actual data sent before enabling analytics; do not infer that every visit to a public health page is PHI. [HHS online tracking guidance and court-order notice](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)

## Evidence and sources

For this proposed design, I would ask for evidence at the boundary instead of a screenshot of a dashboard:

- A negative authorization test swaps a patient or tenant ID on each document, job, index, summary, and record endpoint. The expected result is a denial **before** loading or mutating the object. [OWASP API object authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/)
- An upload test sends malformed, oversized, and mislabeled files; the service rejects them without indexing or logging document text. A rendering test confirms malicious markup appears as text. [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- A browser network and telemetry review inspects actual payloads from authenticated pages, including analytics, session replay, crash reporting, and support widgets. Record each vendor, permitted use, and agreement decision in the relevant lane. [HHS online tracking guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)
- A rights-request drill traces a synthetic patient through file, job, index, model-provider request, audit, backup, and clinical-record copies. Record which actions the clinic or provider directs and any retention exception. [EDPB individual-rights guide](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en)

SOC 2 would ask whether relevant controls operate in the **defined shared service** and selected examination scope over its reporting period. A successful test here is useful operating evidence, but this demo has no SOC 2 examination or report. [AICPA SOC 2 guide](https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy)

## Worked example

The U.S. clinician opens synthetic job **JOB-104** for **US-P100**. The browser shows the uploaded document and a proposed summary. A user changes the document URL to the ID of **EU-P900**, a patient in the separate EEA clinic. The API resolves the session to **US-CLINIC**, checks the target object's tenant and patient scope, and returns a denial without reading the document. The same gate runs when the agent retrieves evidence in the background; hiding a link in the UI is not the control. [OWASP API object authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/)

Meanwhile, the clinician's authenticated page sends no document body to routine analytics. The service records a sanitized decision event with actor, action, object class, tenant-scoped reference, decision, and correlation ID. The provider and vendor would still have to verify their actual agreements, uses, controls, and operating procedures under the HIPAA rules. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)

Use the [Markdown review worksheet](/resources/security-review-worksheet.md) to test these boundaries. For a deeper browser-specific account, read my Portfolio Journal article on [protecting PHI in the frontend](https://jaylawrence.me/blog/frontend-hipaa-readiness-protecting-phi-in-the-browser).

## Open questions

- Which fields must appear in the clinician UI, and which must never enter ordinary telemetry?
- How are tenant and patient permissions recalculated when a long-running job resumes after access changes?
- Who receives, verifies, and executes a rights request or record correction in each lane?
- Which upload formats and downstream converters add new parsing, storage, or vendor boundaries?

Continue with the [agent runtime and retrieval boundary](/notes/security-agent-runtime).

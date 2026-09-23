---
kind: note
slug: security-operations-and-evidence
status: published
title: "Prove controls operate when the demo ends"
description: "Turn risk decisions into dated access reviews, incident drills, restore tests, retention work, and scoped evidence."
publishedAt: "2026-09-23"
revisedAt: "2026-09-23"
reviewAt: "2026-12-23"
version: 1.0.0
topics:
  - security
  - compliance
  - system-design
  - ai-agents
related:
  - note:security-scope-and-data-flow
  - note:security-agent-runtime
sources:
  - title: HHS HIPAA Security Rule summary
    url: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html
  - title: HHS Breach Notification Rule
    url: https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html
  - title: EDPB data breaches guide
    url: https://www.edpb.europa.eu/sme/assess-the-risks/data-breaches_en
  - title: AICPA SOC 2 guide
    url: https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy
---

## Question

The [Architecture Explorer](/notes/security-scope-and-data-flow) can show a denied cross-tenant read once. What evidence would show that authorization, human approval, recovery, and deletion keep working as staff, vendors, code, and data change?

This final note remains a learning exercise for the same fictional U.S. provider and EEA clinic. Its service, cases, and evidence are synthetic. It does not describe a real SOC 2 report, HIPAA compliance assessment, GDPR opinion, or certified system. Sources were reviewed on September 23, 2026.

## Current understanding

**HIPAA legal duty, U.S. lane.** The Security Rule requires a risk analysis, risk management, assigned responsibility, workforce and information access management, incident procedures, contingency planning, periodic evaluation, and documentation for regulated ePHI. HHS says the rule currently in effect is distinct from its proposed modifications. NIST SP 800-66 Rev. 2 provides practical resources for implementing the rule; the NIST guide is guidance, not a replacement regulation. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) · [NIST HIPAA Security Rule resource guide](https://csrc.nist.gov/pubs/sp/800/66/r2/final)

**GDPR legal duty, EEA lane.** The controller must account for applicable processing, security, rights, retention, and breach obligations; a processor assists under its instructions and contract. The controller documents personal-data breaches and notifies the authority without undue delay and, where feasible, within 72 hours after awareness unless the breach is unlikely to result in risk to people. A processor notifies its controller without undue delay. Notification to affected people has a separate high-risk threshold. These are conditional duties, not a universal countdown triggered by every security alert. [EDPB breach guide](https://www.edpb.europa.eu/sme/assess-the-risks/data-breaches_en) · [EDPB rights guide](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en)

**HIPAA breach duty, U.S. lane.** HHS describes notification after a breach of unsecured PHI, with required individual and business-associate-to-covered-entity notices made without unreasonable delay and no later than 60 days after discovery. Notice to HHS varies with breach size. A suspected incident needs classification before anyone assumes that a given notice applies. [HHS Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html)

**SOC 2 audit criterion, shared service.** A Type II examination concerns a defined service-organization system and the design and operating effectiveness of controls against selected Trust Services Criteria over a period. Dated records of a control actually operating may support an examination, but possessing these records does not itself create a SOC 2 report or satisfy either lane's law. [AICPA SOC 2 guide](https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy) · [AICPA Trust Services Criteria](https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022)

My **engineering interpretation** is an evidence loop: define a control and owner; run it on a schedule or event; keep a dated, scoped, minimally sensitive record; inspect failures; and track the correction to closure. The exact cadence and evidence store belong to the actual risk and examination scope. NIST's Secure Software Development Framework recommends secure development practices, while OWASP describes safe event logging; neither sets a universal medical-app checklist. [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) · [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

## Evidence and sources

For the fictional service I would keep six connected trails:

- **Risk and scope:** a current diagram, tenant and vendor inventory, ePHI and personal-data locations, risk decisions, control owner, and selected SOC 2 system boundary. Record why a new model, queue, region, or support tool is in or out of scope. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) · [AICPA description criteria](https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report)
- **Access and change:** dated grants, revocations, privilege and tool-policy reviews, code review, deployment approval, and tests proving an agent cannot read another tenant or write a clinical record. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) · [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final)
- **Incident and response:** first observation, affected tenant and stores, containment, evidence preserved, vendor and client escalation, legal notification assessment, decision owner, and timestamps. Keep the U.S. and EEA analyses separate. [EDPB breach guide](https://www.edpb.europa.eu/sme/assess-the-risks/data-breaches_en) · [HHS Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html)
- **Recovery:** dated backup and restore tests that verify the clinical intake service can resume with correct tenant boundaries and records. A backup job's green status is not the same as a successful restore. [HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)
- **Lifecycle:** retention and deletion decisions for uploaded files, job state, database, retrieval index, model-provider copies, traces, logs, backups, and support tools, with documented exceptions and confirmation from responsible parties. [EDPB compliance guide](https://www.edpb.europa.eu/sme/be-compliant/be-compliant_en) · [EDPB rights guide](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en)
- **Evidence hygiene:** a sanitized audit trail of actor, action, policy decision, time, and correlation ID, with access to evidence itself controlled. Keep document text and PHI out of routine exports unless specifically required and protected. [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

## Worked example

At 09:10, synthetic job **JOB-104** proposes reading EEA tenant record **EU-P900** while operating under **US-CLINIC / US-P100**. The retrieval gate denies the call before loading the record. At 09:11, an event with `retrieval_denied`, `tenant_mismatch`, a job reference, and a correlation ID reaches a restricted audit stream. The event contains no document paragraph or patient name. At 09:20, an on-call reviewer checks whether there was any earlier successful read, model transmission, log leak, or clinical-record write. That investigation, not the denied event alone, determines whether an incident or legally reportable breach occurred. [OWASP API object authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/) · [HHS Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html) · [EDPB breach guide](https://www.edpb.europa.eu/sme/assess-the-risks/data-breaches_en)

The next review checks a sampled access grant, the current tool allowlist, a restore result, and whether the index and model-provider copies follow the recorded retention decision. Failures receive an owner and retest date. A SOC 2 examiner, if one were engaged, would assess controls in an agreed system and period; the clinic and provider would still need their separate legal reviews. [AICPA SOC 2 guide](https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy)

Copy the [Markdown security review worksheet](/resources/security-review-worksheet.md) to map your own actors, data copies, denials, owners, tests, and unanswered legal questions. For a broader engineering perspective on the U.S. lane, read my Portfolio Journal account of [learning HIPAA as a software engineer](https://jaylawrence.me/blog/learning-hipaa-compliance-as-a-software-engineer).

## Open questions

- Which controls and Trust Services Criteria would actually be selected for a future examination, and who owns each one?
- How will the service prove deletion or justified retention across files, index, prompts, traces, backups, and vendors?
- Which incident facts trigger client escalation, formal legal assessment, or notification in each lane?
- How will a reviewer discover and correct a tool-policy drift before the next clinical job?

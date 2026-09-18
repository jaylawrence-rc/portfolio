import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./reveal";
import "./journal-visuals.css";

export type JournalFigureWidth = "reading" | "wide" | "shell";

export type JournalFigureProps = {
  eyebrow?: string;
  title: string;
  caption: ReactNode;
  children: ReactNode;
  width?: JournalFigureWidth;
  animate?: boolean;
  ariaLabel?: string;
  className?: string;
  headingLevel?: 2 | 3;
};

export type ProcessStep = {
  label: string;
  description?: string;
  kicker?: string;
  emphasis?: boolean;
};

export type ProcessFlowProps = Omit<JournalFigureProps, "children"> & {
  steps: readonly ProcessStep[];
  flowLabel?: string;
};

export type BoundaryZone = {
  title: string;
  description: string;
  owner?: string;
  payload?: string;
  emphasis?: boolean;
};

export type BoundaryMapProps = Omit<JournalFigureProps, "children"> & {
  zones: readonly BoundaryZone[];
  mapLabel?: string;
};

export type ComparisonSide = {
  label: string;
  title: string;
  description: string;
  items?: readonly string[];
  emphasis?: boolean;
};

export type ComparisonDiagramProps = Omit<JournalFigureProps, "children"> & {
  sides: readonly [ComparisonSide, ComparisonSide];
  relation?: string;
  comparisonLabel?: string;
};

export type AllowlistGateDiagramProps = Omit<JournalFigureProps, "children"> & {
  blockedSignals: readonly string[];
  controls: readonly string[];
  approved: {
    source: string;
    note: string;
    event: string;
    value: string;
  };
  diagramLabel?: string;
};

export type SessionBoundaryDiagramProps = Omit<JournalFigureProps, "children"> & {
  residue: readonly {
    source: string;
    destination: string;
  }[];
  cleanup: readonly {
    target: string;
    result: string;
  }[];
  triggers: readonly string[];
  diagramLabel?: string;
};

export type AuthorityContractDiagramProps = Omit<JournalFigureProps, "children"> & {
  product: {
    title: string;
    owns: readonly string[];
  };
  engine: {
    title: string;
    owns: readonly string[];
  };
  exchanges: readonly {
    label: string;
    direction: "to-engine" | "to-product" | "product-local";
    product: string;
    engine: string;
    emphasis?: boolean;
  }[];
  writeOrder: readonly [string, string];
  guardrail: string;
  diagramLabel?: string;
};

export type MemoryLifecycleDiagramProps = Omit<JournalFigureProps, "children"> & {
  executionSteps: readonly string[];
  correctionControls: readonly string[];
  correctionSource: string;
  correctionOutcome: string;
  diagramLabel?: string;
};

export type StackLayer = {
  label: string;
  title: string;
  description: string;
  emphasis?: boolean;
};

export type LayerStackProps = Omit<JournalFigureProps, "children"> & {
  layers: readonly StackLayer[];
  stackLabel?: string;
};

export type DecisionMatrixRow = {
  decision: string;
  values: readonly ReactNode[];
};

export type DecisionMatrixProps = Omit<JournalFigureProps, "children"> & {
  columns: readonly string[];
  rows: readonly DecisionMatrixRow[];
  matrixLabel?: string;
};

export type PostArtworkVariant = "browser" | "data" | "compliance" | "workflow";

export type PostArtworkProps = {
  variant: PostArtworkVariant;
  caption: ReactNode;
  eyebrow?: string;
  title?: string;
  width?: JournalFigureWidth;
  animate?: boolean;
  ariaLabel?: string;
};

export type PostArtworkPreviewProps = {
  variant: PostArtworkVariant;
  animate?: boolean;
  ariaLabel?: string;
};

const artworkCopy: Record<PostArtworkVariant, { title: string; ariaLabel: string }> = {
  browser: {
    title: "The browser is a temporary data environment.",
    ariaLabel: "A browser boundary containing a clinical page, with controlled paths to telemetry, storage, and network systems.",
  },
  data: {
    title: "Authority and capability move through different systems.",
    ariaLabel: "A healthcare data path moving from the product source of truth through document storage and AI processing to human review.",
  },
  compliance: {
    title: "Trust is built through overlapping safeguards.",
    ariaLabel: "Administrative, physical, and technical safeguards surrounding protected health information.",
  },
  workflow: {
    title: "The work improves through a verified feedback loop.",
    ariaLabel: "An engineering workflow that moves from context to planning, building, verification, and retained learning.",
  },
};

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function indexedStyle(index: number) {
  return { "--journal-index": index } as CSSProperties;
}

export function JournalFigure({
  eyebrow,
  title,
  caption,
  children,
  width = "wide",
  animate = false,
  ariaLabel,
  className,
  headingLevel = 3,
}: JournalFigureProps) {
  const FigureHeading = headingLevel === 2 ? "h2" : "h3";
  const figure = (
    <figure
      className={classNames("journal-figure", `journal-figure--${width}`, animate && "journal-figure--animated", className)}
      aria-label={ariaLabel ?? title}
    >
      <header className={classNames("journal-figure__header", !eyebrow && "is-solo")}>
        {eyebrow ? <p className="journal-figure__eyebrow">{eyebrow}</p> : null}
        <FigureHeading className="journal-figure__title">{title}</FigureHeading>
      </header>
      <div className="journal-figure__canvas">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );

  return animate ? <Reveal className="journal-figure-reveal">{figure}</Reveal> : figure;
}

export function ProcessFlow({ steps, flowLabel, ...figureProps }: ProcessFlowProps) {
  return (
    <JournalFigure {...figureProps}>
      <ol className="journal-flow" aria-label={flowLabel ?? figureProps.title}>
        {steps.map((step, index) => (
          <li
            className={classNames("journal-flow__step", "journal-animate-item", step.emphasis && "is-emphasized")}
            key={`${step.label}-${index}`}
            style={indexedStyle(index)}
          >
            <span className="journal-flow__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              {step.kicker ? <span className="journal-flow__kicker">{step.kicker}</span> : null}
              <strong>{step.label}</strong>
              {step.description ? <p>{step.description}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </JournalFigure>
  );
}

export function BoundaryMap({ zones, mapLabel, ...figureProps }: BoundaryMapProps) {
  return (
    <JournalFigure {...figureProps}>
      <ol className="journal-boundaries" aria-label={mapLabel ?? figureProps.title}>
        {zones.map((zone, index) => (
          <li
            className={classNames("journal-boundary", "journal-animate-item", zone.emphasis && "is-emphasized")}
            key={`${zone.title}-${index}`}
            style={indexedStyle(index)}
          >
            <span className="journal-boundary__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <strong>{zone.title}</strong>
            <p>{zone.description}</p>
            {zone.owner || zone.payload ? (
              <dl>
                {zone.owner ? <><dt>Owner</dt><dd>{zone.owner}</dd></> : null}
                {zone.payload ? <><dt>Allowed</dt><dd>{zone.payload}</dd></> : null}
              </dl>
            ) : null}
          </li>
        ))}
      </ol>
    </JournalFigure>
  );
}

export function ComparisonDiagram({ sides, relation = "instead of", comparisonLabel, ...figureProps }: ComparisonDiagramProps) {
  return (
    <JournalFigure {...figureProps}>
      <div className="journal-comparison" role="group" aria-label={comparisonLabel ?? figureProps.title}>
        {sides.map((side, index) => (
          <section
            className={classNames("journal-comparison__side", "journal-animate-item", side.emphasis && "is-emphasized")}
            key={`${side.title}-${index}`}
            style={indexedStyle(index)}
          >
            <span>{side.label}</span>
            <h4>{side.title}</h4>
            <p>{side.description}</p>
            {side.items?.length ? <ul>{side.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
          </section>
        ))}
        <div className="journal-comparison__relation" aria-label={relation}>
          <span>{relation}</span>
          <i aria-hidden="true">→</i>
        </div>
      </div>
    </JournalFigure>
  );
}

export function AllowlistGateDiagram({
  blockedSignals,
  controls,
  approved,
  diagramLabel,
  className,
  ...figureProps
}: AllowlistGateDiagramProps) {
  const accessibleLabel = diagramLabel ?? "Capture-first analytics copies raw browser context. An allowlist-first boundary blocks sensitive browser signals and emits only an approved route category.";

  return (
    <JournalFigure
      {...figureProps}
      ariaLabel={accessibleLabel}
      className={classNames("journal-figure--allowlist", className)}
    >
      <div className="journal-allowlist" aria-hidden="true">
        <div className="journal-allowlist__baseline journal-animate-item" style={indexedStyle(0)}>
          <div className="journal-allowlist__baseline-copy">
            <span>01 · Baseline</span>
            <strong>Capture first</strong>
            <small>{blockedSignals.join(" · ")}</small>
          </div>
          <div className="journal-allowlist__open-gate">
            <span>Open</span>
            <i>→</i>
          </div>
          <div className="journal-allowlist__baseline-result">
            <span>Analytics receives</span>
            <strong>Secondary copies</strong>
            <small>Raw context leaves the app</small>
          </div>
        </div>

        <div className="journal-allowlist__transition journal-animate-item" style={indexedStyle(1)}>
          <span>Becomes</span>
          <i>↓</i>
        </div>

        <div className="journal-allowlist__safe">
          <header className="journal-allowlist__safe-header journal-animate-item" style={indexedStyle(2)}>
            <div>
              <span>02 · Safer default</span>
              <strong>Allowlist first</strong>
            </div>
            <small>Default deny</small>
          </header>

          <div className="journal-allowlist__axis">
            <span>Browser surface</span>
            <span>Policy boundary</span>
            <span>Approved telemetry</span>
          </div>

          <ol className="journal-allowlist__streams">
            {blockedSignals.map((signal, index) => (
              <li className="journal-allowlist__stream journal-animate-item is-blocked" key={signal} style={indexedStyle(index + 3)}>
                <div className="journal-allowlist__source"><strong>{signal}</strong></div>
                <div className="journal-allowlist__decision"><i>×</i><span>Blocked</span></div>
                <div className="journal-allowlist__output"><span>No event</span></div>
              </li>
            ))}
            <li className="journal-allowlist__stream journal-animate-item is-approved" style={indexedStyle(blockedSignals.length + 3)}>
              <div className="journal-allowlist__source"><strong>{approved.source}</strong><small>{approved.note}</small></div>
              <div className="journal-allowlist__decision"><i>→</i><span>Pass</span></div>
              <div className="journal-allowlist__output"><strong>{approved.event}</strong><code>{approved.value}</code></div>
            </li>
          </ol>
        </div>

        <ol className="journal-allowlist__controls">
          {controls.map((control, index) => (
            <li className="journal-animate-item" key={control} style={indexedStyle(blockedSignals.length + index + 4)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{control}</strong>
            </li>
          ))}
        </ol>
      </div>
    </JournalFigure>
  );
}

export function SessionBoundaryDiagram({
  residue,
  cleanup,
  triggers,
  diagramLabel,
  className,
  ...figureProps
}: SessionBoundaryDiagramProps) {
  const accessibleLabel = diagramLabel ?? "Previously, sensitive working state survived the session in browser storage, caches, and analytics identity. Now it remains in memory for the active session, and one purge path clears every copy when the trust boundary changes.";

  return (
    <JournalFigure
      {...figureProps}
      ariaLabel={accessibleLabel}
      className={classNames("journal-figure--session-boundary", className)}
    >
      <div className="journal-session-boundary" aria-hidden="true">
        <div className="journal-session-boundary__before">
          <header className="journal-animate-item" style={indexedStyle(0)}>
            <div><span>01 · Before</span><strong>State crosses the boundary</strong></div>
            <small>Authority ends here</small>
          </header>
          <ol>
            {residue.map((path, index) => (
              <li className="journal-animate-item" key={path.source} style={indexedStyle(index + 1)}>
                <strong>{path.source}</strong>
                <i>→</i>
                <span>{path.destination}</span>
                <small>Persists</small>
              </li>
            ))}
          </ol>
        </div>

        <div className="journal-session-boundary__transition journal-animate-item" style={indexedStyle(residue.length + 1)}>
          <span>Replaced by</span>
          <i>↓</i>
        </div>

        <div className="journal-session-boundary__now">
          <header className="journal-animate-item" style={indexedStyle(residue.length + 2)}>
            <span>02 · Now</span>
            <strong>Sensitive state ends when authority ends</strong>
          </header>

          <div className="journal-session-boundary__system">
            <div className="journal-session-boundary__active journal-animate-item" style={indexedStyle(residue.length + 3)}>
              <span>Active + authorized</span>
              <strong>Memory only</strong>
              <small>Sensitive working state</small>
            </div>
            <div className="journal-session-boundary__purge journal-animate-item" style={indexedStyle(residue.length + 4)}>
              <span>One path</span>
              <strong>Purge</strong>
              <i>→</i>
            </div>
            <div className="journal-session-boundary__cleared journal-animate-item" style={indexedStyle(residue.length + 5)}>
              <div><span>After boundary</span><strong><b>0</b> sensitive state</strong></div>
              <ol>
                {cleanup.map((action) => (
                  <li key={action.target}><span>{action.target}</span><strong>{action.result}</strong></li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="journal-session-boundary__triggers journal-animate-item" style={indexedStyle(residue.length + 6)}>
          <span>Invokes the same purge</span>
          <ul>{triggers.map((trigger) => <li key={trigger}>{trigger}</li>)}</ul>
        </div>
      </div>
    </JournalFigure>
  );
}

export function AuthorityContractDiagram({
  product,
  engine,
  exchanges,
  writeOrder,
  guardrail,
  diagramLabel,
  className,
  ...figureProps
}: AuthorityContractDiagramProps) {
  const accessibleLabel = diagramLabel ?? "The product backend owns business truth while the AI engine owns bounded processing. A narrow integration contract carries job requests to the engine, returns results for product review, and mirrors reviewed corrections only after the authoritative product save.";

  return (
    <JournalFigure
      {...figureProps}
      ariaLabel={accessibleLabel}
      className={classNames("journal-figure--authority-contract", className)}
    >
      <div className="journal-authority-contract" aria-hidden="true">
        <div className="journal-authority-contract__owners">
          <div className="journal-authority-contract__owner is-product journal-animate-item" style={indexedStyle(0)}>
            <span>Business authority</span>
            <strong>{product.title}</strong>
            <ul>{product.owns.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>

          <div className="journal-authority-contract__boundary journal-animate-item" style={indexedStyle(1)}>
            <span>Integration contract</span>
            <strong>Allowlisted fields</strong>
          </div>

          <div className="journal-authority-contract__owner is-engine journal-animate-item" style={indexedStyle(2)}>
            <span>Processing capability</span>
            <strong>{engine.title}</strong>
            <ul>{engine.owns.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <ol className="journal-authority-contract__lanes">
          {exchanges.map((exchange, index) => (
            <li
              className={classNames("journal-authority-contract__lane", "journal-animate-item", exchange.emphasis && "is-emphasized")}
              data-direction={exchange.direction}
              key={exchange.label}
              style={indexedStyle(index + 3)}
            >
              <div className="journal-authority-contract__endpoint is-product">
                <span>Product</span>
                <strong>{exchange.product}</strong>
              </div>
              <div className="journal-authority-contract__transfer">
                <span>{exchange.label}</span>
                <i className="is-wide">{exchange.direction === "to-engine" ? "→" : exchange.direction === "to-product" ? "←" : "×"}</i>
                <i className="is-narrow">{exchange.direction === "product-local" ? "×" : "↓"}</i>
              </div>
              <div className="journal-authority-contract__endpoint is-engine">
                <span>Engine</span>
                <strong>{exchange.engine}</strong>
              </div>
            </li>
          ))}
        </ol>

        <div className="journal-authority-contract__rule journal-animate-item" style={indexedStyle(exchanges.length + 3)}>
          <span>Correction write order</span>
          <div><strong>{writeOrder[0]}</strong><i>→</i><strong>{writeOrder[1]}</strong></div>
        </div>

        <div className="journal-authority-contract__guardrail journal-animate-item" style={indexedStyle(exchanges.length + 4)}>
          <span>Not allowed</span>
          <strong>{guardrail}</strong>
        </div>
      </div>
    </JournalFigure>
  );
}

export function MemoryLifecycleDiagram({
  executionSteps,
  correctionControls,
  correctionSource,
  correctionOutcome,
  diagramLabel,
  className,
  ...figureProps
}: MemoryLifecycleDiagramProps) {
  const accessibleLabel = diagramLabel ?? "Execution memory exists only inside one job and is not carried into the next. Correction memory begins only with a product-reviewed correction, then passes through provenance, masking, embedding, and retention controls before bounded retrieval.";

  return (
    <JournalFigure
      {...figureProps}
      ariaLabel={accessibleLabel}
      className={classNames("journal-figure--memory-lifecycle", className)}
    >
      <div className="journal-memory-lifecycle" aria-hidden="true">
        <div className="journal-memory-lifecycle__lane is-execution">
          <header className="journal-animate-item" style={indexedStyle(0)}>
            <div><span>01 · Per job</span><strong>Execution memory</strong></div>
            <small>One job, one lifetime</small>
          </header>
          <div className="journal-memory-lifecycle__track is-execution">
            <ol style={{ "--memory-step-count": executionSteps.length } as CSSProperties}>
              {executionSteps.map((step, index) => (
                <li className="journal-animate-item" key={step} style={indexedStyle(index + 1)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <div className="journal-memory-lifecycle__stop journal-animate-item" style={indexedStyle(executionSteps.length + 1)}>
              <span>Job boundary</span>
              <strong>Terminate</strong>
              <i>→</i>
            </div>
            <div className="journal-memory-lifecycle__outcome journal-animate-item" style={indexedStyle(executionSteps.length + 2)}>
              <span>Next job</span>
              <strong><b>0</b> state carried</strong>
            </div>
          </div>
        </div>

        <div className="journal-memory-lifecycle__guard journal-animate-item" style={indexedStyle(executionSteps.length + 3)}>
          <span>No automatic promotion</span>
          <i>↓</i>
          <small>Only a reviewed correction can enter reuse</small>
        </div>

        <div className="journal-memory-lifecycle__lane is-correction">
          <header className="journal-animate-item" style={indexedStyle(executionSteps.length + 4)}>
            <div><span>02 · Governed reuse</span><strong>Correction memory</strong></div>
            <small>Review creates eligibility</small>
          </header>
          <div className="journal-memory-lifecycle__track is-correction">
            <div className="journal-memory-lifecycle__review journal-animate-item" style={indexedStyle(executionSteps.length + 5)}>
              <span>Required source</span>
              <strong>{correctionSource}</strong>
            </div>
            <ol>
              {correctionControls.map((control, index) => (
                <li className="journal-animate-item" key={control} style={indexedStyle(executionSteps.length + index + 6)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{control}</strong>
                </li>
              ))}
            </ol>
            <div className="journal-memory-lifecycle__reuse journal-animate-item" style={indexedStyle(executionSteps.length + correctionControls.length + 6)}>
              <span>Eligible outcome</span>
              <strong>{correctionOutcome}</strong>
            </div>
          </div>
        </div>
      </div>
    </JournalFigure>
  );
}

export function LayerStack({ layers, stackLabel, ...figureProps }: LayerStackProps) {
  return (
    <JournalFigure {...figureProps}>
      <ol className="journal-stack" aria-label={stackLabel ?? figureProps.title}>
        {layers.map((layer, index) => (
          <li
            className={classNames("journal-stack__layer", "journal-animate-item", layer.emphasis && "is-emphasized")}
            key={`${layer.title}-${index}`}
            style={indexedStyle(index)}
          >
            <span>{layer.label}</span>
            <strong>{layer.title}</strong>
            <p>{layer.description}</p>
          </li>
        ))}
      </ol>
    </JournalFigure>
  );
}

export function DecisionMatrix({ columns, rows, matrixLabel, ...figureProps }: DecisionMatrixProps) {
  return (
    <JournalFigure {...figureProps}>
      <div className="journal-matrix-wrap">
        <table className="journal-matrix" aria-label={matrixLabel ?? figureProps.title}>
          <thead>
            <tr>
              <th scope="col">Decision</th>
              {columns.map((column) => <th scope="col" key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr className="journal-animate-item" key={`${row.decision}-${rowIndex}`} style={indexedStyle(rowIndex)}>
                <th scope="row">{row.decision}</th>
                {row.values.map((value, cellIndex) => (
                  <td data-label={columns[cellIndex] ?? `Option ${cellIndex + 1}`} key={cellIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </JournalFigure>
  );
}

export function PostArtwork({
  variant,
  caption,
  eyebrow = "Visual summary",
  title,
  width = "wide",
  animate = true,
  ariaLabel,
}: PostArtworkProps) {
  const copy = artworkCopy[variant];

  return (
    <JournalFigure
      eyebrow={eyebrow}
      title={title ?? copy.title}
      caption={caption}
      width={width}
      animate={animate}
      ariaLabel={ariaLabel ?? copy.ariaLabel}
      className="journal-figure--artwork"
      headingLevel={2}
    >
      <div className={classNames("journal-artwork", `journal-artwork--${variant}`)} aria-hidden="true">
        {variant === "browser" ? <BrowserArtwork /> : null}
        {variant === "data" ? <DataArtwork /> : null}
        {variant === "compliance" ? <ComplianceArtwork /> : null}
        {variant === "workflow" ? <WorkflowArtwork /> : null}
      </div>
    </JournalFigure>
  );
}

export function PostArtworkPreview({ variant, animate = true, ariaLabel }: PostArtworkPreviewProps) {
  const label = ariaLabel ?? artworkCopy[variant].ariaLabel;
  const artwork = (
    <div className="post-artwork-preview article-prose" role="img" aria-label={label}>
      <div className={classNames("journal-artwork", `journal-artwork--${variant}`)}>
        {variant === "browser" ? <BrowserArtwork /> : null}
        {variant === "data" ? <DataArtwork /> : null}
        {variant === "compliance" ? <ComplianceArtwork /> : null}
        {variant === "workflow" ? <WorkflowArtwork /> : null}
      </div>
    </div>
  );

  return animate ? <Reveal className="post-artwork-preview-reveal">{artwork}</Reveal> : artwork;
}

function BrowserArtwork() {
  return (
    <div className="journal-browser" aria-hidden="true">
      <div className="journal-browser__bar journal-animate-item" style={indexedStyle(0)}>
        <span /><span /><span /><b>approved.route / clinical-work</b>
      </div>
      <div className="journal-browser__body">
        <div className="journal-browser__page journal-animate-item" style={indexedStyle(1)}>
          <small>Visible for the task</small>
          <strong>Clinical workspace</strong>
          <i /><i /><i />
          <mark>Minimum necessary</mark>
        </div>
        <div className="journal-browser__perimeter">
          {[
            ["Telemetry", "Allowlist"],
            ["Storage", "Memory first"],
            ["Network", "Authorized"],
          ].map(([label, state], index) => (
            <div className="journal-browser__sink journal-animate-item" key={label} style={indexedStyle(index + 2)}>
              <span>{label}</span><strong>{state}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataArtwork() {
  const stages = [
    ["Product", "Authority"],
    ["Documents", "Claim check"],
    ["AI engine", "Capability"],
    ["Review", "Human decision"],
    ["Product", "Reviewed truth"],
  ];

  return (
    <ol className="journal-data-path" aria-hidden="true">
      {stages.map(([label, role], index) => (
        <li className={classNames("journal-data-path__stage", "journal-animate-item", index === 0 || index === stages.length - 1 ? "is-authority" : "")} key={`${label}-${role}`} style={indexedStyle(index)}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{label}</strong>
          <small>{role}</small>
        </li>
      ))}
    </ol>
  );
}

function ComplianceArtwork() {
  const safeguards = [
    ["Administrative", "Policy · training · risk review"],
    ["Physical", "Devices · facilities · access"],
    ["Technical", "Identity · encryption · audit"],
  ];

  return (
    <div className="journal-compliance" aria-hidden="true">
      <div className="journal-compliance__core journal-animate-item" style={indexedStyle(0)}><small>Protected</small><strong>Health information</strong></div>
      <ol>
        {safeguards.map(([title, detail], index) => (
          <li className="journal-animate-item" key={title} style={indexedStyle(index + 1)}><span>0{index + 1}</span><strong>{title}</strong><small>{detail}</small></li>
        ))}
      </ol>
    </div>
  );
}

function WorkflowArtwork() {
  const steps = ["Context", "Plan", "Build", "Verify", "Learn"];

  return (
    <div className="journal-workflow-art" aria-hidden="true">
      <ol>
        {steps.map((step, index) => (
          <li className={classNames("journal-animate-item", step === "Verify" && "is-emphasized")} key={step} style={indexedStyle(index)}><span>0{index + 1}</span><strong>{step}</strong></li>
        ))}
      </ol>
      <p className="journal-workflow-art__return journal-animate-item" style={indexedStyle(steps.length)}>Verified learning improves the next cycle <span>↵</span></p>
    </div>
  );
}

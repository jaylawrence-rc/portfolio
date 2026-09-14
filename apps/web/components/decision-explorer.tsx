"use client";

import { useId, useState } from "react";
import { playInteractionTick } from "./interaction-sound";

export function DecisionExplorer({ decisions }: { decisions: { title: string; body: string }[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const decision = decisions[selected];
  if (!decision) return null;

  function selectDecision(index: number) {
    if (index === selected) return;
    setSelected(index);
    playInteractionTick();
  }

  return (
    <div className="decision-explorer">
      <div className="decision-explorer-controls" role="group" aria-label="Explore a product decision">
        <span className="editorial-label">A few decisions behind it</span>
        <div>{decisions.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index} aria-controls={id} aria-label={`Decision ${index + 1}: ${item.title}`} onClick={() => selectDecision(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
      </div>
      <div id={id} className="decision-explorer-content" aria-live="polite" aria-atomic="true"><h4>{decision.title}</h4><p>{decision.body}</p></div>
    </div>
  );
}

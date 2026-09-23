"use client";

import { useState } from "react";
import { SignalMap } from "./signal-atlas-map";

const scenarios = [
  {
    id: "mobility",
    number: "01",
    label: "Mobility",
    state: "Corridor watch",
    signal: "A route through the south corridor is slowing in this sample scenario.",
    context: "Compare the highlighted corridor with the surrounding network before choosing a response.",
    action: "Review an alternate dispatch route",
    mapLabel: "Sample city network with the mobility corridor highlighted in cyan",
  },
  {
    id: "energy",
    number: "02",
    label: "Energy",
    state: "Capacity watch",
    signal: "A sample reserve threshold has changed near the east distribution path.",
    context: "See which connected areas may need a human capacity review.",
    action: "Stage a load assessment",
    mapLabel: "Sample city network with the energy distribution path highlighted in amber",
  },
  {
    id: "weather",
    number: "03",
    label: "Weather",
    state: "Coastal watch",
    signal: "An illustrative rain band overlaps the planned service window.",
    context: "Put affected routes and crews in one view before the next shift begins.",
    action: "Prepare a crew coordination check",
    mapLabel: "Sample city network with a coastal weather path highlighted in coral",
  },
] as const;

type ScenarioId = typeof scenarios[number]["id"];

export function SignalAtlasScenarios() {
  const [selected, setSelected] = useState<ScenarioId>("mobility");
  const current = scenarios.find(scenario => scenario.id === selected) ?? scenarios[0];

  return <div className="saScenario" data-scenario={current.id}>
    <div className="saScenarioControls" aria-label="Sample scenarios">
      {scenarios.map(scenario => <button key={scenario.id} type="button" aria-pressed={selected === scenario.id} aria-controls="sa-scenario-detail" onClick={() => setSelected(scenario.id)}><span>{scenario.number}</span>{scenario.label}<span aria-hidden="true">↗</span></button>)}
    </div>
    <div className="saScenarioGrid" id="sa-scenario-detail">
      <div className="saScenarioMap">
        <div className="saScenarioMapTop"><span>Signal Atlas / Sample network</span><span>Illustrative, not live data</span></div>
        <SignalMap label={current.mapLabel} />
        <div className="saScenarioMapBottom"><span>WEST FIELD / HARBOR EDGE</span><span>SELECTED: {current.label.toUpperCase()}</span></div>
      </div>
      <div className="saScenarioDetail" aria-live="polite" aria-atomic="true">
        <div className="saScenarioDetailTop"><span>Sample state / {current.number}</span><span className="saScenarioState"><i />{current.state}</span></div>
        <div><p className="saScenarioDetailLabel">What changed</p><h3>{current.signal}</h3><p>{current.context}</p></div>
        <div className="saScenarioDecision"><span>Proposed next step</span><strong>{current.action}</strong><small>A human makes the operational decision.</small></div>
      </div>
    </div>
  </div>;
}

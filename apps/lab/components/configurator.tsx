"use client";

import { useEffect, useMemo, useState } from "react";
import {
  checkProfileReadability,
  COLOR_SETS,
  createDesignProfile,
  DENSITIES,
  FONT_PAIRS,
  defaultDesignProfile,
  profileUrl,
  RADII,
  type ColorSetId,
  type DensityId,
  type DesignControls,
  type DesignProfile,
  type DesignTarget,
  type FontPairId,
  type RadiusId,
} from "@/lib/design-profile";
import "./configurator.css";

const TARGET_LABELS: Record<DesignTarget, string> = {
  "ship-onwards": "Ship Onwards",
  "journal-retrofit": "Portfolio Journal retrofit",
};

const TARGET_PATHS: Record<DesignTarget, string> = {
  "ship-onwards": "/sites/ship-onwards",
  "journal-retrofit": "/sites/journal-retrofit",
};

function downloadProfile(profile: DesignProfile) {
  const blob = new Blob([`${JSON.stringify(profile, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${profile.target}-design-profile-v${profile.schemaVersion}.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Configurator({ initialProfile }: { initialProfile: DesignProfile }) {
  const [target, setTarget] = useState<DesignTarget>(initialProfile.target);
  const [controlsByTarget, setControlsByTarget] = useState<Record<DesignTarget, DesignControls>>({
    "ship-onwards": initialProfile.target === "ship-onwards" ? initialProfile.controls : defaultDesignProfile("ship-onwards").controls,
    "journal-retrofit": initialProfile.target === "journal-retrofit" ? initialProfile.controls : defaultDesignProfile("journal-retrofit").controls,
  });
  const controls = controlsByTarget[target];
  const [viewport, setViewport] = useState<"wide" | "phone">("wide");
  const [copied, setCopied] = useState(false);
  const profile = useMemo(() => createDesignProfile(target, controls), [target, controls]);
  const readability = useMemo(() => checkProfileReadability(profile), [profile]);
  const fullSiteUrl = profileUrl(TARGET_PATHS[target], profile);

  useEffect(() => {
    const current = new URL(window.location.href);
    current.searchParams.set("site", target);
    current.searchParams.set("profile", JSON.stringify(profile));
    window.history.replaceState(null, "", current.pathname + current.search + current.hash);
  }, [target, profile]);

  const update = <K extends keyof DesignControls>(key: K, value: DesignControls[K]) => {
    setControlsByTarget((previous) => ({ ...previous, [target]: { ...previous[target], [key]: value } }));
    setCopied(false);
  };

  async function copyProfile() {
    try {
      await navigator.clipboard.writeText(`${JSON.stringify(profile, null, 2)}\n`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="configurator">
      <div className="configurator__intro">
        <p className="configurator__kicker">Experiment 01 / Design Profile</p>
        <h1>Make a direction your own.</h1>
        <p>Adjust a bounded set of visual decisions, inspect them on a working prototype, then take the exact profile with you. These are curated options, not a generator of arbitrary combinations.</p>
      </div>

      <div className="configurator__workbench">
        <form className="configurator__controls" onSubmit={(event) => event.preventDefault()}>
          <div className="configurator__controls-head">
            <span>01 / Controls</span>
            <p>Changes update the preview and the exported JSON.</p>
          </div>

          <fieldset className="configurator__field">
            <legend>Showcase site</legend>
            <div className="configurator__segmented">
              {(["ship-onwards", "journal-retrofit"] as const).map((option) => (
                <label key={option} className={target === option ? "is-selected" : ""}>
                  <input type="radio" name="target" value={option} checked={target === option} onChange={() => setTarget(option)} />
                  {TARGET_LABELS[option]}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="configurator__field">
            <legend>Semantic colors</legend>
            <p className="configurator__hint">Each set defines background, surface, text, links, and action colors together.</p>
            <div className="configurator__palettes">
              {(Object.keys(COLOR_SETS) as ColorSetId[]).map((id) => {
                const option = COLOR_SETS[id];
                return (
                  <label key={id} className={controls.colorSet === id ? "is-selected" : ""}>
                    <input type="radio" name="colorSet" value={id} checked={controls.colorSet === id} onChange={() => update("colorSet", id)} />
                    <span className="configurator__swatches" aria-hidden="true">
                      <i style={{ background: option.background }} />
                      <i style={{ background: option.text }} />
                      <i style={{ background: option.action }} />
                    </span>
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="configurator__select-row">
            <label className="configurator__select">Font pair
              <select value={controls.fontPair} onChange={(event) => update("fontPair", event.target.value as FontPairId)}>
                {(Object.keys(FONT_PAIRS) as FontPairId[]).map((id) => <option key={id} value={id}>{FONT_PAIRS[id].label}</option>)}
              </select>
            </label>
            <label className="configurator__select">Corners
              <select value={controls.radius} onChange={(event) => update("radius", event.target.value as RadiusId)}>
                {(Object.keys(RADII) as RadiusId[]).map((id) => <option key={id} value={id}>{RADII[id].label}</option>)}
              </select>
            </label>
            <label className="configurator__select">Spacing density
              <select value={controls.density} onChange={(event) => update("density", event.target.value as DensityId)}>
                {(Object.keys(DENSITIES) as DensityId[]).map((id) => <option key={id} value={id}>{DENSITIES[id].label}</option>)}
              </select>
            </label>
          </div>

          <div className="configurator__checks" aria-live="polite">
            <div className="configurator__checks-title"><span>Readability check</span><strong>{readability.passes ? "Passes AA" : "Needs attention"}</strong></div>
            <ul>{readability.checks.map((check) => <li key={check.label}><span>{check.label}</span><span>{check.ratio.toFixed(1)}:1</span></li>)}</ul>
            <p>Normal text needs at least 4.5:1 contrast. Readability also depends on type size, line length, and context; inspect those in the full site.</p>
          </div>

          <div className="configurator__actions">
            <button type="button" className="configurator__primary" onClick={() => downloadProfile(profile)}>Download profile <span aria-hidden="true">↘</span></button>
            <button type="button" className="configurator__secondary" onClick={copyProfile}>{copied ? "Copied JSON" : "Copy JSON"}</button>
          </div>
          <p className="configurator__export-note">Schema v{profile.schemaVersion}. Validated, explicit tokens. Import support in the private Design Skill remains to be verified before a compatibility claim is made.</p>
        </form>

        <section className="configurator__preview" aria-label="Live site preview">
          <div className="configurator__preview-bar">
            <div><span className="configurator__live-dot" /> <strong>02 / Live preview</strong><small>{TARGET_LABELS[target]}</small></div>
            <div className="configurator__preview-actions">
              <div className="configurator__view-toggle" aria-label="Preview width">
                <button type="button" aria-pressed={viewport === "wide"} onClick={() => setViewport("wide")}>Wide</button>
                <button type="button" aria-pressed={viewport === "phone"} onClick={() => setViewport("phone")}>Phone</button>
              </div>
              <a href={fullSiteUrl} target="_blank" rel="noopener noreferrer">Open full site ↗</a>
            </div>
          </div>
          <div className={`configurator__frame-stage configurator__frame-stage--${viewport}`}>
            <iframe key={fullSiteUrl} title={`${TARGET_LABELS[target]} live preview`} src={fullSiteUrl} loading="lazy" />
          </div>
          <p className="configurator__preview-foot">The full route keeps this same profile as you browse. The Journal baseline is fixed for comparison.</p>
        </section>
      </div>
    </div>
  );
}

"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { isInteractionSoundMuted, playInteractionTick, setInteractionSoundMuted, SOUND_CHANGE_EVENT } from "./interaction-sound";

function subscribe(onChange: () => void) {
  window.addEventListener(SOUND_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(SOUND_CHANGE_EVENT, onChange);
}

export function SoundToggle() {
  const muted = useSyncExternalStore(subscribe, isInteractionSoundMuted, () => true);
  const label = muted ? "Turn interaction sounds on" : "Turn interaction sounds off";

  function toggleSound() {
    setInteractionSoundMuted(!muted);
    if (muted) playInteractionTick();
  }

  return <button type="button" className="folio-nav-control" onClick={toggleSound} aria-label={label} aria-pressed={!muted} title={label}>
    {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
  </button>;
}

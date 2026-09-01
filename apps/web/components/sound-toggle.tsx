"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { isInteractionSoundMuted, setInteractionSoundMuted, SOUND_CHANGE_EVENT } from "./interaction-sound";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isInteractionSoundMuted());
    const syncSoundPreference = (event: Event) => setMuted((event as CustomEvent<boolean>).detail);
    window.addEventListener(SOUND_CHANGE_EVENT, syncSoundPreference);
    return () => window.removeEventListener(SOUND_CHANGE_EVENT, syncSoundPreference);
  }, []);

  function toggleSound() {
    setInteractionSoundMuted(!muted);
  }

  const label = muted ? "Unmute interaction sounds" : "Mute interaction sounds";

  return <button className="icon-button sound-toggle" onClick={toggleSound} aria-label={label} aria-pressed={muted} title={label}>
    {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
  </button>;
}

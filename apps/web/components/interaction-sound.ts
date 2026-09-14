const SOUND_STORAGE_KEY = "portfolio-interaction-sound-muted";
export const SOUND_CHANGE_EVENT = "portfolio:sound-change";

let tickAudio: HTMLAudioElement | null = null;
let mutedPreference: boolean | undefined;

export function isInteractionSoundMuted() {
  if (typeof window === "undefined") return true;
  if (mutedPreference !== undefined) return mutedPreference;
  try {
    // Sound is an explicit opt-in for a new visitor.
    mutedPreference = window.localStorage.getItem(SOUND_STORAGE_KEY) !== "false";
  } catch {
    mutedPreference = true;
  }
  return mutedPreference;
}

export function preloadInteractionTick() {
  if (typeof window === "undefined" || isInteractionSoundMuted() || tickAudio) return;
  tickAudio = new Audio("/Tick%20Sound%20Effect%20HD.mp3");
  tickAudio.preload = "auto";
  tickAudio.volume = 0.28;
  tickAudio.load();
}

export function setInteractionSoundMuted(muted: boolean) {
  mutedPreference = muted;
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(muted));
  } catch {
    // The in-memory preference remains effective when storage is unavailable.
  }
  if (muted && tickAudio) {
    tickAudio.pause();
    tickAudio.currentTime = 0;
  }
  window.dispatchEvent(new CustomEvent<boolean>(SOUND_CHANGE_EVENT, { detail: muted }));
}

export function playInteractionTick() {
  if (isInteractionSoundMuted()) return;
  preloadInteractionTick();
  if (!tickAudio) return;
  tickAudio.currentTime = 0;
  void tickAudio.play().catch(() => {
    // Playback is optional; the interface always supplies visual feedback.
  });
}

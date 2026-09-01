const SOUND_STORAGE_KEY = "portfolio-interaction-sound-muted";
export const SOUND_CHANGE_EVENT = "portfolio:sound-change";

let tickAudio: HTMLAudioElement | null = null;

export function preloadInteractionTick() {
  if (tickAudio) return;
  tickAudio = new Audio("/Tick%20Sound%20Effect%20HD.mp3");
  tickAudio.preload = "auto";
  tickAudio.volume = 0.28;
  tickAudio.load();
}

export function isInteractionSoundMuted() {
  try {
    return window.localStorage.getItem(SOUND_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setInteractionSoundMuted(muted: boolean) {
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(muted));
  } catch {
    // The control still works for the current page when storage is unavailable.
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
    // Browsers may decline playback when the click is no longer considered a user gesture.
  });
}

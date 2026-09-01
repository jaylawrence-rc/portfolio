"use client";

import { startTransition, useEffect, useState } from "react";

const HEARTBEAT_MS = 25_000;
const SESSION_LIFETIME_MS = 4 * 60 * 60 * 1_000;
const STORAGE_KEY = "portfolio-presence-v1";

type StoredSession = { id: string; expiresAt: number };
type PresenceResponse = { count: number | null; configured: boolean };

function getSessionId() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as StoredSession | null;
    if (stored?.id && stored.expiresAt > Date.now()) return stored.id;

    const session = { id: crypto.randomUUID(), expiresAt: Date.now() + SESSION_LIFETIME_MS };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session.id;
  } catch {
    return crypto.randomUUID();
  }
}

export function usePresenceCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();
    const controller = new AbortController();

    async function heartbeat() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/presence", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId }),
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as PresenceResponse;
        if (data.configured && typeof data.count === "number") {
          startTransition(() => setCount(data.count));
        }
      } catch {
        // Presence is ambient; it must never interrupt navigation or reading.
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") void heartbeat();
    }

    void heartbeat();
    const interval = window.setInterval(() => void heartbeat(), HEARTBEAT_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return count;
}

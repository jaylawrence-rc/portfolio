import { NextResponse } from "next/server";

const PRESENCE_KEY = "portfolio:active-sessions";
const ACTIVE_WINDOW_MS = 65_000;
const SESSION_ID_PATTERN = /^[a-f0-9-]{20,64}$/i;

type PresenceBody = { sessionId?: unknown };
type PipelineResult = { result?: number | string; error?: string };

const localPresence = new Map<string, number>();

function localCount(sessionId: string, now: number) {
  localPresence.set(sessionId, now);
  const cutoff = now - ACTIVE_WINDOW_MS;
  for (const [id, lastSeen] of localPresence) {
    if (lastSeen < cutoff) localPresence.delete(id);
  }
  return localPresence.size;
}

export async function POST(request: Request) {
  let body: PresenceBody;
  try {
    body = (await request.json()) as PresenceBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.sessionId !== "string" || !SESSION_ID_PATTERN.test(body.sessionId)) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const now = Date.now();
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { count: localCount(body.sessionId, now), configured: true },
        { headers: { "cache-control": "no-store" } },
      );
    }
    return NextResponse.json(
      { count: null, configured: false },
      { headers: { "cache-control": "no-store" } },
    );
  }

  try {
    const response = await fetch(`${redisUrl}/pipeline`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${redisToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify([
        ["ZADD", PRESENCE_KEY, now, body.sessionId],
        ["ZREMRANGEBYSCORE", PRESENCE_KEY, 0, now - ACTIVE_WINDOW_MS],
        ["ZCARD", PRESENCE_KEY],
        ["EXPIRE", PRESENCE_KEY, 180],
      ]),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Presence store unavailable");
    const results = (await response.json()) as PipelineResult[];
    const count = Number(results[2]?.result);
    if (!Number.isFinite(count)) throw new Error("Invalid presence response");

    return NextResponse.json(
      { count, configured: true },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { count: null, configured: false },
      { headers: { "cache-control": "no-store" } },
    );
  }
}

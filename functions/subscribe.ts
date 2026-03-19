/**
 * Cloudflare Pages Function — /subscribe
 *
 * Handles email list signups for claudetoceo.com.
 * Stores submissions in a D1 (SQLite) database.
 *
 * Bind the D1 database in Cloudflare Pages settings:
 *   Settings → Functions → D1 database bindings → variable name: DB
 */

interface Env {
  DB: D1Database;
}

const MAX_LEN    = 42;
const STRIP_RE   = /[^a-zA-Z0-9._%+\-@]/g;
const EMAIL_RE   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const RATE_LIMIT = 3;   // max submissions per IP per window
const RATE_WIN   = 60;  // seconds

const ALLOWED_ORIGINS = new Set([
  "https://claudetoceo.com",
  "https://www.claudetoceo.com",
]);

// ── Helpers ───────────────────────────────────────────────────────────────────

function json(body: object, status = 200, origin?: string): Response {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

// ── CORS preflight ────────────────────────────────────────────────────────────

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age":       "86400",
    },
  });
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function onRequestPost(
  context: EventContext<Env, string, unknown>
): Promise<Response> {
  const { request, env } = context;
  const origin = request.headers.get("Origin") ?? "";

  // Server-side origin check — CORS headers alone are browser-enforced only
  if (!ALLOWED_ORIGINS.has(origin)) {
    return json({ error: "Forbidden." }, 403);
  }

  // Parse body — accept JSON or form-encoded
  let emailRaw = "";
  const ct = request.headers.get("Content-Type") ?? "";
  try {
    if (ct.includes("application/json")) {
      const body = await request.json<{ email?: unknown }>();
      emailRaw = typeof body.email === "string" ? body.email : "";
    } else {
      const form = await request.formData();
      emailRaw = form.get("email")?.toString() ?? "";
    }
  } catch {
    return json({ error: "Invalid request body." }, 400, origin);
  }

  // Sanitize — strip every character that has no place in an email address
  const email = emailRaw.replace(STRIP_RE, "").slice(0, MAX_LEN);

  if (!email) {
    return json({ error: "Email address is required." }, 400, origin);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "Invalid email address." }, 400, origin);
  }

  // Rate limit — check recent submissions from this IP
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const { results: recent } = await env.DB.prepare(`
    SELECT COUNT(*) AS count FROM subscribers
    WHERE ip = ? AND subscribed_at > datetime('now', '-${RATE_WIN} seconds')
  `).bind(ip).all<{ count: number }>();

  if ((recent[0]?.count ?? 0) >= RATE_LIMIT) {
    return json({ error: "Too many requests. Please try again later." }, 429, origin);
  }

  // Insert — parameterized, no SQLi possible
  try {
    await env.DB.prepare(`
      INSERT INTO subscribers (email, ip, subscribed_at)
      VALUES (?, ?, datetime('now'))
    `).bind(email, ip).run();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("UNIQUE")) {
      // Already subscribed — return success to prevent email enumeration
      return json({ message: "You're in. Welcome to the list." }, 200, origin);
    }
    console.error("DB insert error:", msg);
    return json({ error: "Something went wrong. Please try again." }, 500, origin);
  }

  return json({ message: "You're in. Welcome to the list." }, 200, origin);
}

const BRAND = "Cedar & Signal";
const DEFAULT_REPLY_TO = "KyleDChristopher@gmail.com";

function getQueryValue(req, key) {
  if (req?.query && typeof req.query[key] === "string") {
    return req.query[key];
  }

  const url = new URL(req.url, "http://localhost");
  return url.searchParams.get(key) || "";
}

function isTruthy(value) {
  return value === "1" || value === "true" || value === "yes";
}

function hasRedisConfig() {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
      (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

function getRedisConfig() {
  return {
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "",
    token:
      process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "",
  };
}

function getResendFromEmail() {
  return (
    process.env.CEDAR_RUNTIME_DIAGNOSTIC_FROM_EMAIL ||
    process.env.CEDAR_CONSULTATION_FROM_EMAIL ||
    process.env.CEDAR_ONBOARDING_FROM_EMAIL ||
    ""
  );
}

function getReplyToEmail() {
  return (
    process.env.CEDAR_RUNTIME_DIAGNOSTIC_REPLY_TO ||
    process.env.CEDAR_ONBOARDING_REPLY_TO ||
    DEFAULT_REPLY_TO
  );
}

async function runResendDiagnostic(req) {
  const resendApiKey = process.env.RESEND_API_KEY || "";
  const fromEmail = getResendFromEmail();
  const toEmail =
    process.env.CEDAR_RUNTIME_DIAGNOSTIC_TO_EMAIL ||
    process.env.CEDAR_CONSULTATION_ALERT_EMAIL ||
    DEFAULT_REPLY_TO;

  if (!resendApiKey || !fromEmail || !toEmail) {
    return {
      attempted: false,
      ok: false,
      reason: "Missing RESEND_API_KEY, diagnostic from email, or diagnostic to email.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Cedar & Signal Diagnostic <${fromEmail}>`,
      to: [toEmail],
      reply_to: getReplyToEmail(),
      subject: `Cedar runtime diagnostic ${new Date().toISOString()}`,
      html: `<p>Cedar &amp; Signal root Vercel function diagnostic succeeded.</p><p>Path: ${req.url}</p>`,
    }),
  });

  const payload = await response.json().catch(() => null);

  return {
    attempted: true,
    ok: response.ok,
    status: response.status,
    messageId: payload?.id ?? null,
    error:
      response.ok
        ? null
        : payload?.message || payload?.error?.message || "Resend request failed.",
  };
}

async function runRedisDiagnostic() {
  const { url, token } = getRedisConfig();

  if (!url || !token) {
    return {
      attempted: false,
      ok: false,
      reason: "Missing Upstash/Redis REST env vars.",
    };
  }

  const key = `runtime-diagnostic:cedar:${Date.now()}`;
  const response = await fetch(`${url}/set/${encodeURIComponent(key)}/${encodeURIComponent("ok")}?EX=300`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json().catch(() => null);

  return {
    attempted: true,
    ok: response.ok && payload?.result === "OK",
    status: response.status,
    key,
    result: payload?.result ?? null,
    error:
      response.ok && payload?.result === "OK"
        ? null
        : payload?.error || "Redis write failed.",
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method Not Allowed" });
  }

  const wantsEmailTest = isTruthy(getQueryValue(req, "email"));
  const wantsRedisTest = isTruthy(getQueryValue(req, "redis"));
  const providedSecret =
    req.headers["x-runtime-diagnostic-secret"] ||
    getQueryValue(req, "secret");
  const configuredSecret = process.env.RUNTIME_DIAGNOSTIC_SECRET || "";

  const basic = {
    brand: BRAND,
    startup: true,
    timestamp: new Date().toISOString(),
    env: {
      hasRuntimeDiagnosticSecret: Boolean(configuredSecret),
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasResendFromEmail: Boolean(getResendFromEmail()),
      hasRedisConfig: hasRedisConfig(),
    },
  };

  if (!wantsEmailTest && !wantsRedisTest) {
    return res.status(200).json({
      ok: true,
      mode: "basic",
      ...basic,
      instructions:
        "Add ?email=1 and/or ?redis=1 plus x-runtime-diagnostic-secret or ?secret=... to run optional provider tests.",
    });
  }

  if (!configuredSecret || providedSecret !== configuredSecret) {
    return res.status(401).json({
      ok: false,
      ...basic,
      message: "Unauthorized for provider diagnostics.",
    });
  }

  const email = wantsEmailTest
    ? await runResendDiagnostic(req)
    : { attempted: false, ok: false, reason: "Skipped." };
  const redis = wantsRedisTest
    ? await runRedisDiagnostic()
    : { attempted: false, ok: false, reason: "Skipped." };
  const hasFailure =
    (email.attempted && !email.ok) || (redis.attempted && !redis.ok);

  return res.status(hasFailure ? 500 : 200).json({
    ok: (!email.attempted || email.ok) && (!redis.attempted || redis.ok),
    mode: "provider-test",
    ...basic,
    tests: {
      email,
      redis,
    },
  });
}

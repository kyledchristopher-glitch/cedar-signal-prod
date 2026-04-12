import { Redis } from "@upstash/redis";

type SequenceStepKey =
  | "welcome"
  | "best_practices"
  | "check_in"
  | "trial_ending"
  | "final_day";

type SequenceStep = {
  key: SequenceStepKey;
  dayOffset: number;
  subject: string;
  preview: string;
  ctaLabel: string;
  body: string[];
};

export type CedarOnboardingLead = {
  email: string;
  firstName: string;
  brand: "cedar";
  signupDate: string;
  onboardingStatus: "active" | "complete";
  trialEndDate: string;
  replyTo: string;
  companyName: string;
  phone: string;
  website: string;
  sendHistory: Array<{
    stepKey: SequenceStepKey;
    sentAt: string;
    messageId: string | null;
  }>;
};

type RegisterLeadInput = {
  email: string;
  firstName: string;
  companyName?: string;
  phone?: string;
  website?: string;
  replyTo?: string;
};

type ProcessDueOptions = {
  forcedDateKey?: string;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const BRAND = "cedar";
const BRAND_NAME = "Cedar & Signal";
const DEFAULT_REPLY_TO = "KyleDChristopher@gmail.com";
const CHECKOUT_URL =
  process.env.CEDAR_ONBOARDING_CHECKOUT_URL ||
  "https://calendly.com/kyledchristopher/demo";
const FROM_EMAIL =
  process.env.CEDAR_ONBOARDING_FROM_EMAIL ||
  process.env.CEDAR_CONSULTATION_FROM_EMAIL ||
  "";
const REPLY_TO = process.env.CEDAR_ONBOARDING_REPLY_TO || DEFAULT_REPLY_TO;
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const redis = createRedisClient();

const SEQUENCE: SequenceStep[] = [
  {
    key: "welcome",
    dayOffset: 0,
    subject: "Thanks for reaching out to Cedar & Signal",
    preview: "Here’s what happens next after your consultation request.",
    ctaLabel: "Schedule A Call",
    body: [
      "Thanks for reaching out. Your consultation request is in and we’ll review your business, website, and goals before following up.",
      "If you want to move faster, you can use the booking link below to schedule time directly with Kyle.",
      "In the meantime, gather any example sites, service pages, or conversion goals you want to discuss so the first conversation is productive right away.",
    ],
  },
  {
    key: "best_practices",
    dayOffset: 1,
    subject: "Day 1: How to make the most of your Cedar consultation",
    preview: "A short prep list to make the conversation more useful.",
    ctaLabel: "Book Your Consultation",
    body: [
      "The strongest consultation calls usually cover three things: what your business sells best today, where your current site is underperforming, and what kind of client you want more of.",
      "If you already have photos, testimonials, or a clear list of services, bring those with you. That context makes it easier to shape the right site direction quickly.",
      "Reply if you want to share anything before the call.",
    ],
  },
  {
    key: "check_in",
    dayOffset: 5,
    subject: "Day 5: Still want to explore a Cedar build?",
    preview: "A quick check-in before this lead goes cold.",
    ctaLabel: "Schedule A Call",
    body: [
      "Just checking in while your consultation request is still fresh.",
      "If you are still thinking about a new site, brand refresh, or premium positioning upgrade, this is a good time to get the call on the calendar.",
      "Use the link below or reply directly if you want to keep the conversation moving.",
    ],
  },
  {
    key: "trial_ending",
    dayOffset: 11,
    subject: "Day 11: Ready to move your project forward?",
    preview: "A reminder if your website rebuild is still on the table.",
    ctaLabel: "Review Next Steps",
    body: [
      "If your website still needs work, this is a good time to decide whether you want to move from interest into execution.",
      "Cedar projects are designed to help premium service businesses look credible, feel refined, and convert better with the right prospects.",
      "If you want to keep going, use the next-step link below or reply directly.",
    ],
  },
  {
    key: "final_day",
    dayOffset: 14,
    subject: "Final follow-up: keep your project moving",
    preview: "Your direct link for continuing with Cedar & Signal.",
    ctaLabel: "Continue With Cedar",
    body: [
      "This is the final automated follow-up from your current Cedar & Signal consultation request.",
      "If you want to keep the project moving, use the link below to take the next step.",
      "If now is not the right time, no pressure. You can always reply later when the timing is better.",
    ],
  },
];

function createRedisClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

function hasOnboardingInfrastructure() {
  return Boolean(redis && RESEND_API_KEY && FROM_EMAIL);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function leadKey(email: string) {
  return `onboarding:${BRAND}:lead:${normalizeEmail(email)}`;
}

function queueKey(dateKey: string) {
  return `onboarding:${BRAND}:queue:${dateKey}`;
}

function queueMember(email: string, stepKey: SequenceStepKey) {
  return `${normalizeEmail(email)}|${stepKey}`;
}

function parseQueueMember(member: string) {
  const [email, stepKey] = member.split("|") as [string, SequenceStepKey];
  return { email, stepKey };
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_IN_MS);
}

function getStep(stepKey: SequenceStepKey) {
  return SEQUENCE.find((step) => step.key === stepKey);
}

function buildEmailHtml(lead: CedarOnboardingLead, step: SequenceStep) {
  const greetingName = lead.firstName || "there";

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <p style="margin: 0 0 16px;">Hi ${greetingName},</p>
      ${step.body
        .map((paragraph) => `<p style="margin: 0 0 16px;">${paragraph}</p>`)
        .join("")}
      <p style="margin: 24px 0;">
        <a
          href="${CHECKOUT_URL}"
          style="display: inline-block; background: #8b6b2e; color: #ffffff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-weight: 600;"
        >
          ${step.ctaLabel}
        </a>
      </p>
      <p style="margin: 24px 0 0; color: #4b5563;">Kyle</p>
      <p style="margin: 4px 0 0; color: #6b7280;">${BRAND_NAME}</p>
    </div>
  `;
}

async function sendSequenceEmail(lead: CedarOnboardingLead, step: SequenceStep) {
  if (!RESEND_API_KEY || !FROM_EMAIL) {
    return { configured: false, messageId: null };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Kyle <${FROM_EMAIL}>`,
      to: [lead.email],
      reply_to: lead.replyTo || REPLY_TO,
      subject: step.subject,
      html: buildEmailHtml(lead, step),
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload?.message ||
        payload?.error?.message ||
        `Resend request failed with status ${response.status}.`
    );
  }

  return { configured: true, messageId: payload?.id ?? null };
}

function buildFreshLead(input: RegisterLeadInput): CedarOnboardingLead {
  const now = new Date();

  return {
    email: normalizeEmail(input.email),
    firstName: input.firstName,
    brand: "cedar",
    signupDate: now.toISOString(),
    onboardingStatus: "active",
    trialEndDate: addDays(now, 14).toISOString(),
    replyTo: input.replyTo || REPLY_TO,
    companyName: input.companyName || "",
    phone: input.phone || "",
    website: input.website || "",
    sendHistory: [],
  };
}

async function saveLead(lead: CedarOnboardingLead) {
  if (!redis) {
    return;
  }

  await redis.set(leadKey(lead.email), lead);
}

async function enqueueFutureSteps(lead: CedarOnboardingLead) {
  if (!redis) {
    return;
  }

  const sent = new Set(lead.sendHistory.map((entry) => entry.stepKey));
  const signupDate = new Date(lead.signupDate);

  for (const step of SEQUENCE) {
    if (step.dayOffset === 0 || sent.has(step.key)) {
      continue;
    }

    await redis.sadd(
      queueKey(toDateKey(addDays(signupDate, step.dayOffset))),
      queueMember(lead.email, step.key)
    );
  }
}

async function markStepSent(
  lead: CedarOnboardingLead,
  stepKey: SequenceStepKey,
  messageId: string | null
) {
  const nextHistory = lead.sendHistory.some((entry) => entry.stepKey === stepKey)
    ? lead.sendHistory
    : [
        ...lead.sendHistory,
        {
          stepKey,
          sentAt: new Date().toISOString(),
          messageId,
        },
      ];

  const nextLead: CedarOnboardingLead = {
    ...lead,
    sendHistory: nextHistory,
    onboardingStatus: stepKey === "final_day" ? "complete" : lead.onboardingStatus,
  };

  await saveLead(nextLead);
  return nextLead;
}

export async function registerOnboardingLead(input: RegisterLeadInput) {
  if (!hasOnboardingInfrastructure()) {
    console.warn("Cedar onboarding skipped: missing Redis or Resend configuration.");
    return { configured: false };
  }

  const existing = await redis!.get<CedarOnboardingLead>(leadKey(input.email));
  const lead =
    !existing || existing.onboardingStatus === "complete"
      ? buildFreshLead(input)
      : {
          ...existing,
          firstName: input.firstName || existing.firstName,
          replyTo: input.replyTo || existing.replyTo,
          companyName: input.companyName || existing.companyName,
          phone: input.phone || existing.phone,
          website: input.website || existing.website,
        };

  const hasWelcome = lead.sendHistory.some((entry) => entry.stepKey === "welcome");

  if (!hasWelcome) {
    const welcomeStep = getStep("welcome");
    if (welcomeStep) {
      const result = await sendSequenceEmail(lead, welcomeStep);
      if (result.configured) {
        await markStepSent(lead, "welcome", result.messageId);
      }
    }
  } else {
    await saveLead(lead);
  }

  const latestLead =
    (await redis!.get<CedarOnboardingLead>(leadKey(input.email))) || lead;
  await enqueueFutureSteps(latestLead);

  return { configured: true };
}

export async function processDueOnboardingEmails(options: ProcessDueOptions = {}) {
  if (!hasOnboardingInfrastructure()) {
    return {
      configured: false,
      processed: 0,
      sent: 0,
    };
  }

  const todayKey = options.forcedDateKey || toDateKey(new Date());
  const members = await redis!.smembers<string[]>(queueKey(todayKey));
  let sent = 0;

  for (const member of members || []) {
    const { email, stepKey } = parseQueueMember(member);
    const step = getStep(stepKey);
    const lead = await redis!.get<CedarOnboardingLead>(leadKey(email));

    if (!step || !lead || lead.onboardingStatus === "complete") {
      await redis!.srem(queueKey(todayKey), member);
      continue;
    }

    if (lead.sendHistory.some((entry) => entry.stepKey === stepKey)) {
      await redis!.srem(queueKey(todayKey), member);
      continue;
    }

    const result = await sendSequenceEmail(lead, step);
    if (result.configured) {
      await markStepSent(lead, stepKey, result.messageId);
      sent += 1;
    }

    await redis!.srem(queueKey(todayKey), member);
  }

  return {
    configured: true,
    processed: members?.length || 0,
    sent,
    dateKey: todayKey,
  };
}

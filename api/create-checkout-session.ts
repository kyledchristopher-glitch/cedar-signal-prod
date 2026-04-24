const packageFallbacks: Record<string, string> = {
  "Signal Launch": "VITE_STRIPE_SIGNAL_LAUNCH_PRICE_ID",
  "Authority Build": "VITE_STRIPE_AUTHORITY_BUILD_PRICE_ID",
  "Private Studio": "VITE_STRIPE_PRIVATE_STUDIO_PRICE_ID",
};

type ApiRequest = {
  method?: string;
  body?: {
    packageName?: string;
    priceEnv?: string;
    customer?: Record<string, string>;
  };
};

type ApiResponse = {
  status: (code: number) => {
    json: (body: Record<string, unknown>) => void;
  };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body =
    typeof req.body === "string"
      ? JSON.parse(req.body || "{}")
      : req.body ?? {};
  const { packageName, priceEnv, customer } = body;
  const resolvedPriceEnv = priceEnv || packageFallbacks[packageName as string];
  const priceId = resolvedPriceEnv ? process.env[resolvedPriceEnv] : undefined;
  const siteUrl = process.env.VITE_SITE_URL || "https://www.cedarandsignal.com";

  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return res.status(200).json({
      mode: "scaffold",
      packageName,
      customer,
      missing: ["STRIPE_SECRET_KEY", "VITE_SITE_URL", resolvedPriceEnv].filter(Boolean),
      onboardingUrl: `/onboarding?package=${encodeURIComponent(packageName || "Signal Launch")}`,
    });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      line_items: [{ price: priceId, quantity: 1 }],
      return_url: `${siteUrl}/onboarding?package=${encodeURIComponent(packageName || "Signal Launch")}&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        packageName: packageName || "Signal Launch",
      },
    });

    if (!session.client_secret) {
      return res.status(500).json({ error: "Stripe did not return a client secret." });
    }

    return res.status(200).json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Stripe checkout session.";
    return res.status(500).json({ error: message });
  }
}

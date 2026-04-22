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

  const { packageName, priceEnv, customer } = req.body ?? {};
  const resolvedPriceEnv = priceEnv || packageFallbacks[packageName as string];
  const priceId = resolvedPriceEnv ? process.env[resolvedPriceEnv] : undefined;

  // Stripe integration point:
  // 1. Add STRIPE_SECRET_KEY and package price IDs in your deployment env.
  // 2. Install/use stripe and create a hosted Checkout Session here.
  // 3. Return { url: session.url } so the frontend redirects to Stripe.
  if (!process.env.STRIPE_SECRET_KEY || !priceId) {
    return res.status(200).json({
      mode: "scaffold",
      packageName,
      customer,
      missing: ["STRIPE_SECRET_KEY", resolvedPriceEnv].filter(Boolean),
      onboardingUrl: `/onboarding?package=${encodeURIComponent(packageName || "Signal Launch")}`,
    });
  }

  return res.status(501).json({
    error: "Stripe session creation is scaffolded. Install stripe and create the Checkout Session in this handler.",
  });
}

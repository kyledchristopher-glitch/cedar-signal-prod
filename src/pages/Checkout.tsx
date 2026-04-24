import { useEffect, useMemo, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useSearchParams } from "react-router-dom";
import { Check, LoaderCircle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPackageByName, packageOptions, type PackageName } from "@/lib/packages";

const packages: Record<PackageName, { label?: string; line: string; description: string; features: string[] }> = {
  "Signal Launch": {
    label: "Most businesses choose this",
    line: "Best starting point for most serious businesses",
    description: "A premium, conversion-ready website that makes your business easier to trust and contact.",
    features: ["Premium homepage", "Core service sections", "Mobile-first build", "Conversion copy blocks", "Lead capture path", "SEO metadata"],
  },
  "Authority Build": {
    line: "For firms that need more service depth",
    description: "A stronger site structure for multiple services, stronger proof, and a sharper market position.",
    features: ["Everything in Signal Launch", "Expanded service pages", "Proof sections", "More refined page flow", "Priority launch pacing"],
  },
  "Private Studio": {
    line: "For premium brands that want more polish",
    description: "A deeper premium presence for firms that want to feel clearly above the local market.",
    features: ["Everything in Authority Build", "Custom direction", "Advanced page sections", "Launch refinement", "Post-launch polish pass"],
  },
};

const trustRows = ["One-time payment", "Secure checkout", "No subscriptions required"];

const Checkout = () => {
  const [params] = useSearchParams();
  const [selected, setSelected] = useState<PackageName>(getPackageByName(params.get("package")).name);
  const selectedPackage = packageOptions[selected];
  const selectedDetails = packages[selected];
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = useMemo(() => (publishableKey ? loadStripe(publishableKey) : null), [publishableKey]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(true);

  useEffect(() => {
    let isCurrent = true;

    const createSession = async () => {
      if (!publishableKey) {
        setCheckoutError("Stripe publishable key missing.");
        setClientSecret(null);
        setIsLoadingCheckout(false);
        return;
      }

      setIsLoadingCheckout(true);
      setCheckoutError(null);
      setClientSecret(null);

      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageName: selectedPackage.name,
            priceEnv: selectedPackage.stripePriceEnv,
          }),
        });

        const raw = await response.text();
        let data: { clientSecret?: string; error?: string } = {};

        if (raw) {
          try {
            data = JSON.parse(raw) as { clientSecret?: string; error?: string };
          } catch {
            throw new Error("Checkout API returned an invalid response.");
          }
        }

        if (!response.ok || !data.clientSecret) {
          throw new Error(data.error || "Unable to load secure checkout.");
        }

        if (isCurrent) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        if (isCurrent) {
          setCheckoutError(error instanceof Error ? error.message : "Unable to load secure checkout.");
        }
      } finally {
        if (isCurrent) {
          setIsLoadingCheckout(false);
        }
      }
    };

    void createSession();

    return () => {
      isCurrent = false;
    };
  }, [publishableKey, selectedPackage.name, selectedPackage.stripePriceEnv]);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <main className="px-6 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="mx-auto grid max-w-[96rem] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section>
            <p className="eyebrow mb-4 text-primary">Checkout</p>
            <h1 className="heading-balance max-w-2xl text-4xl leading-[0.96] md:text-6xl">Secure Your Site</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              Choose the package that fits your business. Stripe will mount on this page when payment is connected.
            </p>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[0_22px_60px_hsl(222_32%_4%/0.15)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-primary">Selected package</p>
                  <h2 className="mt-3 text-4xl leading-none">{selectedPackage.name}</h2>
                  <p className="mt-2 font-semibold text-primary">{selectedDetails.line}</p>
                </div>
                <p className="text-5xl font-extrabold">{selectedPackage.price}</p>
              </div>
              <p className="mt-5 max-w-2xl leading-7 text-white/70">{selectedDetails.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selectedDetails.features.map((feature) => (
                  <div key={feature} className="flex gap-3 text-sm text-white/82">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {Object.values(packageOptions).map((plan) => {
                const active = selected === plan.name;
                return (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setSelected(plan.name)}
                    className={`rounded-lg border p-5 text-left transition duration-300 ${active ? "border-primary/90 bg-white text-[#0B0F14] shadow-[0_16px_40px_hsl(222_28%_10%/0.08)]" : "border-white/10 bg-white/[0.045] text-white hover:border-primary/45 hover:bg-white/[0.06]"}`}
                  >
                    {packages[plan.name].label ? <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">{packages[plan.name].label}</span> : null}
                    <p className="text-2xl font-serif leading-none">{plan.name}</p>
                    <p className="mt-2 text-3xl font-extrabold">{plan.price}</p>
                    <p className={`mt-3 text-sm leading-6 ${active ? "text-muted-foreground" : "text-white/65"}`}>{packages[plan.name].line}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-lg border border-white/10 bg-[#F7F5F2] p-6 text-[#0B0F14] shadow-[0_26px_76px_hsl(0_0%_0%/0.22)] md:p-8">
              <p className="eyebrow text-bronze">Secure checkout</p>
              <div className="mt-5 flex items-end justify-between gap-5 border-b border-border pb-5">
                <div>
                  <h2 className="text-3xl">{selectedPackage.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">One-time website package</p>
                </div>
                <p className="text-4xl font-extrabold">{selectedPackage.price}</p>
              </div>

              <div className="mt-6 overflow-hidden rounded-md border border-border/90 bg-white shadow-[inset_0_1px_0_hsl(0_0%_100%/0.6)]">
                {isLoadingCheckout ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center">
                    <LoaderCircle className="h-6 w-6 animate-spin text-bronze" />
                    <div>
                      <p className="font-semibold text-[#0B0F14]">Loading secure checkout</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">Preparing Stripe for {selectedPackage.name}.</p>
                    </div>
                  </div>
                ) : checkoutError || !clientSecret || !stripePromise ? (
                  <div className="min-h-[420px] p-6 md:p-7">
                    {/* TODO connect embedded Stripe checkout here */}
                    <p className="font-semibold text-[#0B0F14]">Secure checkout unavailable</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {checkoutError || "Stripe configuration is incomplete for this package."}
                    </p>
                    <Button variant="hero" size="lg" className="mt-6 w-full" asChild>
                      <Link to={`/onboarding?package=${encodeURIComponent(selectedPackage.name)}`}>Continue to onboarding</Link>
                    </Button>
                  </div>
                ) : (
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }} key={`${selectedPackage.name}-${clientSecret}`}>
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {trustRows.map((row) => (
                  <p key={row} className="flex items-center gap-3 text-sm text-[#0B0F14]/82">
                    <ShieldCheck className="h-4 w-4 text-bronze" />
                    {row}
                  </p>
                ))}
              </div>

              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                Payment completes here, then we send you straight into onboarding with your selected package attached.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

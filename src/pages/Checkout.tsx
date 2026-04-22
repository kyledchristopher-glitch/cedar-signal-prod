import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Lock, ShieldCheck } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <main className="px-6 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <section>
            <p className="eyebrow mb-4 text-primary">Checkout</p>
            <h1 className="max-w-2xl text-4xl leading-tight md:text-6xl">Secure Your Site</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70 md:text-lg">
              Choose the package that fits your business. Stripe will mount on this page when payment is connected.
            </p>

            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow text-primary">Selected package</p>
                  <h2 className="mt-3 text-4xl">{selectedPackage.name}</h2>
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
                    className={`rounded-lg border p-5 text-left transition ${active ? "border-primary bg-white text-[#0B0F14]" : "border-white/10 bg-white/[0.06] text-white hover:border-primary/60"}`}
                  >
                    {packages[plan.name].label ? <span className="mb-3 inline-block rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-foreground">{packages[plan.name].label}</span> : null}
                    <p className="text-2xl font-serif">{plan.name}</p>
                    <p className="mt-2 text-3xl font-extrabold">{plan.price}</p>
                    <p className={`mt-3 text-sm leading-6 ${active ? "text-muted-foreground" : "text-white/65"}`}>{packages[plan.name].line}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-lg border border-white/10 bg-[#F7F5F2] p-6 text-[#0B0F14] shadow-[0_28px_90px_hsl(0_0%_0%/0.26)] md:p-8">
              <p className="eyebrow text-bronze">Secure checkout</p>
              <div className="mt-5 flex items-end justify-between gap-5 border-b border-border pb-5">
                <div>
                  <h2 className="text-3xl">{selectedPackage.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">One-time website package</p>
                </div>
                <p className="text-4xl font-extrabold">{selectedPackage.price}</p>
              </div>

              <div className="mt-6 rounded-md border border-border bg-white p-5">
                {/* TODO connect embedded Stripe checkout here */}
                <p className="flex items-center gap-2 font-semibold"><Lock className="h-4 w-4 text-bronze" /> Stripe will load here</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This placeholder preserves the checkout layout until Stripe keys and embedded checkout are connected.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {trustRows.map((row) => (
                  <p key={row} className="flex items-center gap-3 text-sm">
                    <ShieldCheck className="h-4 w-4 text-bronze" />
                    {row}
                  </p>
                ))}
              </div>

              <Button variant="hero" size="lg" className="mt-7 w-full" asChild>
                <Link to={`/onboarding?package=${encodeURIComponent(selectedPackage.name)}`}>Continue to onboarding</Link>
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    label: "Starter",
    price: "$500 – $1,000",
    description: "A polished launch-ready presence tailored to your brand and service area.",
    features: [
      "Refined template customization",
      "Mobile-optimized",
      "Contact form + click-to-call",
      "Live in 3–5 days",
    ],
  },
  {
    label: "Premium",
    price: "$1,500 – $2,500",
    description: "Custom visuals, messaging, and positioning for brands that need a stronger market presence.",
    features: [
      "Custom design direction",
      "Conversion-focused copy",
      "SEO foundations",
      "Live in 5–10 days",
    ],
    featured: true,
  },
  {
    label: "Ongoing",
    price: "$50 – $150/mo",
    description: "Hosting, refinements, and peace of mind so your site stays sharp and current.",
    features: ["Managed hosting", "Content refinements", "Performance monitoring", "Priority support"],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-36 relative texture-grain">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Investment
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Premium Presentation with a{" "}
            <span className="italic text-gradient-gold">Clear, Straightforward Investment</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose the level of support that fits where your brand is right now. Every option is
            designed to elevate how your business is perceived online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-[28px] border p-8 transition-colors duration-300 md:p-10 ${
                tier.featured
                  ? "border-brass/40 bg-cedar/20 shadow-[0_28px_80px_hsl(var(--background)/0.22)]"
                  : "border-bark/25 bg-bark/10 hover:border-bark/50"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground">
                  Studio Favorite
                </span>
              )}
              <p className="mb-2 text-xs font-sans uppercase tracking-[0.24em] text-muted-foreground">
                {tier.label}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-foreground mb-3">{tier.price}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-10">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/70">
                    <span className="mt-1 text-xs text-primary">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.featured ? "hero" : "heroOutline"}
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#cta">Get Started</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

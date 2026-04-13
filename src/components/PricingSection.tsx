import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    label: "Signature Website",
    price: "Starting at $3,500",
    description:
      "A custom, premium website for established local businesses that need a more refined digital presence.",
    features: [
      "Custom premium website design",
      "Mobile responsive development",
      "Copy guidance",
      "Contact forms / lead capture",
      "Basic SEO setup",
      "Launch support",
    ],
  },
  {
    label: "Authority Website",
    price: "Starting at $6,000",
    description:
      "A more expansive website engagement for premium contractors, builders, and outdoor brands that need stronger authority and conversion support.",
    features: [
      "Everything in Signature",
      "Expanded page count",
      "Advanced animations/interactions",
      "Custom sales/conversion sections",
      "CMS/blog/services backend",
      "Strategic messaging support",
    ],
    featured: true,
  },
  {
    label: "Ongoing Care Plan",
    price: "$197/mo",
    description:
      "Ongoing care for firms that want their site maintained professionally after launch.",
    features: [
      "Hosting / maintenance",
      "Minor updates",
      "Performance monitoring",
      "Priority support",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-blend relative py-24 md:py-32 texture-grain">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Services & Investment
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-[4rem]">
            Website Packages Designed for{" "}
            <span className="italic text-gradient-gold">Premium Local Brands</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Clear offers for home service, outdoor living, and craftsmanship-driven businesses
            that need a website equal to the quality of their work.
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
              className={`card-glow relative flex h-full flex-col rounded-[28px] border p-8 transition-colors duration-300 md:p-10 ${
                tier.featured
                  ? "border-brass/40 bg-cedar/20 shadow-[0_28px_80px_hsl(var(--background)/0.22)]"
                  : "border-bark/25 bg-bark/10 hover:border-bark/50"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground">
                  Signature Offer
                </span>
              )}
              <p className="mb-2 text-xs font-sans uppercase tracking-[0.24em] text-muted-foreground">
                {tier.label}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-foreground mb-3">{tier.price}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {tier.description}
              </p>
              <ul className="mb-10 flex-1 space-y-3">
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
                <a href="#cta">Request a Consultation</a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, margin: "-80px" }}
          className="card-glow mx-auto mt-14 max-w-3xl rounded-[28px] border border-brass/14 bg-bark/10 px-8 py-10 text-center shadow-[0_22px_60px_hsl(var(--background)/0.16)]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Consultation
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Not sure which package fits your business? We can recommend the right scope for your
            brand, market, and lead goals.
          </p>
          <Button variant="hero" size="lg" className="mt-7" asChild>
            <a href="#cta">Request a Consultation</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    label: "Starter",
    price: "$500 – $1,000",
    description: "Template-based setup tailored to your brand. Fast, clean, professional.",
    features: ["Premium template customization", "Mobile-optimized", "Contact form + click-to-call", "Live in 3–5 days"],
  },
  {
    label: "Premium",
    price: "$1,500 – $2,500",
    description: "Custom visuals, messaging, and positioning. Built to dominate your market.",
    features: ["Custom design & photography direction", "Conversion-focused copy", "SEO foundations", "Live in 5–10 days"],
    featured: true,
  },
  {
    label: "Ongoing",
    price: "$50 – $150/mo",
    description: "Hosting, updates, and peace of mind. Your site stays fast and current.",
    features: ["Managed hosting", "Monthly content updates", "Performance monitoring", "Priority support"],
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
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
            Investment
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Straightforward{" "}
            <span className="italic text-gradient-gold">Pricing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 md:p-10 rounded-sm border transition-colors duration-300 ${
                tier.featured
                  ? "border-amber/40 bg-cedar/20"
                  : "border-bark/25 bg-bark/10 hover:border-bark/50"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm font-sans font-semibold">
                  Most Popular
                </span>
              )}
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">
                {tier.label}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-foreground mb-3">{tier.price}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-10">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/70">
                    <span className="text-amber mt-1 text-xs">✦</span>
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

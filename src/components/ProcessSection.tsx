import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn about your business, your market, and what your website needs to accomplish.",
  },
  {
    number: "02",
    title: "Design & Build",
    description:
      "We create a custom website that reflects the quality of your work and makes your business look established, credible, and premium.",
  },
  {
    number: "03",
    title: "Launch & Support",
    description:
      "We refine, launch, and make sure everything is ready for a smooth handoff, with ongoing support available if needed.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-36 relative bg-cabin-gradient texture-grain">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Process
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            A Clear, Thoughtful Process
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We keep every project focused, organized, and tailored to the businesses we serve, so
            your new website feels polished, strategic, and ready to perform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="rounded-[26px] border border-bark/20 bg-bark/15 p-6 text-center md:text-left"
            >
              <span className="text-gradient-gold font-serif text-5xl md:text-6xl font-light">
                {step.number}
              </span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

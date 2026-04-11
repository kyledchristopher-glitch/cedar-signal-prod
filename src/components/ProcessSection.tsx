import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Send Your Details",
    description: "Share your logo, phone number, and a few photos. That's it.",
  },
  {
    number: "02",
    title: "We Build Your Site",
    description: "We design and customize a premium site around your brand and market.",
  },
  {
    number: "03",
    title: "Go Live in Days",
    description: "Your new website is live and ready to start winning you better jobs.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-36 relative bg-forest-gradient">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
            How It Works
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Simple Setup.{" "}
            <span className="italic text-gradient-gold">Fast Launch.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
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

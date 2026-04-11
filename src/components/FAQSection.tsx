import { motion } from "framer-motion";

const faqs = [
  [
    "What types of businesses do you work with?",
    "We primarily work with premium service businesses, operators, and brands that value strong digital presentation.",
  ],
  [
    "How long does a website project take?",
    "Most projects are completed within 1 to 3 weeks depending on scope.",
  ],
  [
    "Do you write the website copy?",
    "Yes. We can handle strategy, copywriting, and messaging refinement.",
  ],
  [
    "Can you redesign my existing site?",
    "Absolutely. We frequently rebuild outdated sites into premium modern experiences.",
  ],
  [
    "What do projects typically cost?",
    "Pricing depends on scope, but every engagement begins with a strategy conversation and tailored proposal.",
  ],
  [
    "Do you offer revisions?",
    "Yes. Revisions are built into the process.",
  ],
  [
    "Do you provide hosting or maintenance?",
    "We can assist with hosting, deployment, and ongoing updates if needed.",
  ],
  [
    "What happens after I inquire?",
    "We schedule a discovery call, review your goals, and provide a recommended path forward.",
  ],
];

const FAQSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Frequently Asked Questions
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-5xl">
            Common questions, answered clearly.
          </h2>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map(([question, answer], index) => (
            <motion.div
              key={question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-[28px] border border-bark/20 bg-bark/10 p-6 shadow-[0_18px_50px_hsl(var(--background)/0.12)] md:p-8"
            >
              <h3 className="font-serif text-2xl text-foreground">
                {question}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

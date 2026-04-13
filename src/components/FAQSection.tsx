import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="section-blend py-24 md:py-28">
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
          <h2 className="font-serif text-3xl text-foreground md:text-[3.8rem]">
            Common questions, answered clearly.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 max-w-4xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map(([question, answer]) => (
              <AccordionItem
                key={question}
                value={question}
                className="card-glow overflow-hidden rounded-[28px] border border-bark/20 bg-bark/10 px-6 shadow-[0_18px_50px_hsl(var(--background)/0.12)] md:px-8"
              >
                <AccordionTrigger className="py-6 text-left font-serif text-[1.65rem] text-foreground hover:no-underline md:text-[1.9rem]">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-1 text-base leading-relaxed text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "Premium design that positions you above competitors",
  "Mobile-first — looks flawless on every device",
  "Fast loading — no one waits for a slow site",
  "Built for calls, texts, and real leads",
  "Tailored for landscaping and outdoor service businesses",
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-36 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
              The Solution
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
              We Make You Look Like the{" "}
              <span className="italic text-gradient-gold">Best Option</span> in Your Area
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We don't just build websites. We build the perception that you're the premium choice —
              the company worth paying more for.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-5"
          >
            {solutions.map((s, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="text-foreground/80 font-sans">{s}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

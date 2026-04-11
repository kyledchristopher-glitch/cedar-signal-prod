import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const problems = [
  "Look outdated and unprofessional",
  "Fail to build trust with premium clients",
  "Undersell the quality of your work",
  "Push your best leads toward competitors",
];

const ProblemSection = () => {
  return (
    <section className="py-24 md:py-36 relative bg-forest-gradient">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
            The Problem
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 leading-tight">
            Most Local Service Websites Are{" "}
            <span className="italic text-gradient-gold">Costing You Money</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            Your website is your first impression. If it doesn't look premium, you're losing the
            jobs you actually want.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {problems.map((problem, i) => (
            <motion.div
              key={problem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-6 rounded-sm bg-muted/30 border border-border/30"
            >
              <XCircle className="text-destructive/70 shrink-0 mt-0.5" size={20} />
              <p className="text-foreground/80 font-sans">{problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

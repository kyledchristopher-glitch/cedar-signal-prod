import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "Luxury-forward brand presentation",
  "Editorial messaging with clear positioning",
  "Modern, mobile-first performance",
  "Conversion paths built for qualified inquiries",
  "Tailored for outdoor service and property brands",
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-36 relative texture-grain">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              The Solution
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-6">
              We Shape a Digital Presence That{" "}
              <span className="italic text-gradient-gold">Feels Worth the Premium</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cedar &amp; Signal Design Studio builds websites that signal taste, reliability, and
              care so better-fit clients feel confident choosing you.
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
              <div
                key={i}
                className="flex items-start gap-4 rounded-[22px] border border-brass/15 bg-cedar/15 p-5"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={20} />
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

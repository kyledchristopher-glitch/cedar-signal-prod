import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const problems = [
  "Blend in with lower-end competitors",
  "Undersell the quality of your craftsmanship",
  "Lose trust before the first call happens",
  "Miss out on premium, better-fit clients",
];

const ProblemSection = () => {
  return (
    <section className="py-24 md:py-36 relative bg-warmglow-gradient texture-grain">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            The Problem
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 leading-tight">
            Most Outdoor Service Websites Quietly{" "}
            <span className="italic text-gradient-gold">Cap What Clients Expect to Pay</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            If the site feels generic, the brand feels generic. Premium clients decide what they
            expect from you long before they ever reach out.
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
              className="flex items-start gap-4 rounded-[24px] border border-walnut/30 bg-walnut/20 p-6"
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

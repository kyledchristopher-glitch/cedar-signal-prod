import { motion } from "framer-motion";

const supportPoints = [
  "Strategy and presentation aligned",
  "Premium positioning for serious businesses",
  "Clean, modern execution with lasting value",
];

const FounderSection = () => {
  return (
    <section className="section-blend py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, margin: "-100px" }}
            className="card-glow rounded-[30px] border border-brass/14 bg-bark/10 p-8 shadow-[0_18px_50px_hsl(var(--background)/0.12)]"
          >
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-primary">
              Founder Perspective
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Built for businesses that need stronger digital presence, not more
              noise
            </h2>

            <div className="mt-8 space-y-3">
              {supportPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[22px] border border-brass/12 bg-background/60 px-4 py-3 text-sm text-muted-foreground"
                >
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center"
          >
            <div className="max-w-3xl">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-primary/85">
                Standards over noise
              </p>
              <p className="mt-6 text-lg leading-relaxed text-foreground/88 md:text-xl">
                Cedar &amp; Signal was built on the belief that many businesses
                do not need louder marketing, they need better presentation.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                We focus on premium websites and digital positioning for
                businesses that want to look sharper, communicate more clearly,
                and create stronger trust from the first impression.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Our standard is thoughtful strategy, refined design, and work
                that feels credible, elevated, and built to last, not trendy,
                rushed, or disposable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

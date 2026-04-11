import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const philosophySections = [
  {
    title: "Why We Exist",
    paragraphs: [
      { text: "Cedar & Signal was built on a simple belief:" },
      { text: "Exceptional businesses deserve exceptional presentation.", tone: "emphasis" },
      {
        text: "We help established brands elevate how they are perceived online through premium web design, refined branding, and strategic digital positioning.",
      },
      {
        text: "Our work is designed to communicate trust, craftsmanship, and quality before a single conversation ever takes place.",
      },
    ],
  },
  {
    title: "Our Approach",
    paragraphs: [
      { text: "We do not build generic template websites." },
      { text: "We do not chase trends." },
      { text: "We do not create good enough." },
      { text: "Every project is approached with the same philosophy:" },
      { text: "Thoughtful design. Clear strategy. Elevated execution.", tone: "emphasis" },
      {
        text: "The result is digital presence that reflects the caliber of the business behind it.",
      },
    ],
  },
  {
    title: "Built for Businesses Ready to Be Taken Seriously",
    paragraphs: [
      { text: "Our clients are often at an inflection point." },
      { text: "They have grown beyond DIY branding." },
      { text: "They have outperformed their current image." },
      { text: "They are ready for a brand presence that matches the quality of their work." },
      { text: "We help bridge that gap." },
    ],
  },
];

const foundersNote = [
  "Cedar & Signal was created to bring premium-caliber digital branding to businesses that have earned the right to stand apart.",
  "Too often, exceptional companies are held back by weak presentation, not weak performance.",
  "We believe design should not merely look good.",
  "It should shape perception, communicate value, and position a business to compete at a higher level.",
  "That belief informs every project we take on.",
];

const bodyCopyClassName =
  "max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed";

const OurPhilosophy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-brass/10 py-32 md:py-44">
          <div className="absolute inset-0 bg-cabin-gradient opacity-80" />
          <div className="absolute inset-0 bg-warm-vignette" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-primary/85">
                Our Philosophy
              </p>
              <h1 className="mx-auto max-w-5xl font-serif text-4xl leading-[1.02] text-foreground md:text-6xl lg:text-7xl">
                Elevated Digital Presence for Businesses Built on Craft
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto mt-14 max-w-3xl space-y-6 text-center"
            >
              <p className={bodyCopyClassName}>Most local businesses do not have a quality problem.</p>
              <p className="font-serif text-3xl italic leading-none text-gradient-gold md:text-5xl">
                They have a perception problem.
              </p>
              <p className={bodyCopyClassName}>
                They deliver exceptional work, care deeply about their craft, and have earned
                strong reputations in their communities.
              </p>
              <p className={bodyCopyClassName}>
                But online, they often look interchangeable. Outdated websites, generic branding,
                and forgettable digital experiences can make even outstanding businesses appear
                average.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <div className="space-y-16 md:space-y-20">
              {philosophySections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid gap-8 border-t border-brass/10 pt-12 md:grid-cols-[0.78fr_1.22fr] md:gap-14 md:pt-16"
                >
                  <div>
                    <h2 className="font-serif text-3xl text-foreground md:text-5xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.text}
                        className={
                          paragraph.tone === "emphasis"
                            ? "font-serif text-3xl italic leading-[1.06] text-gradient-gold md:text-5xl"
                            : bodyCopyClassName
                        }
                      >
                        {paragraph.text}
                      </p>
                    ))}
                  </div>
                </motion.section>
              ))}

              <motion.section
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="rounded-[32px] border border-brass/12 bg-bark/12 p-8 shadow-[0_28px_80px_hsl(var(--background)/0.22)] backdrop-blur-sm md:p-12"
              >
                <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:gap-14">
                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary/85">
                      Founder&apos;s Note
                    </p>
                    <h2 className="font-serif text-3xl text-foreground md:text-5xl">
                      Founder&apos;s Note
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {foundersNote.map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={
                          index === 2
                            ? "font-serif text-3xl italic leading-[1.08] text-gradient-gold md:text-5xl"
                            : bodyCopyClassName
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </section>

        <section className="relative border-y border-brass/10 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--brass)/0.08),transparent_42%)]" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-12"
          >
            <h2 className="font-serif text-3xl text-foreground md:text-5xl">
              Ready to Elevate Your Brand?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              If your business has outgrown its current digital presence, we should talk.
            </p>
            <Button variant="hero" size="lg" className="mt-10" asChild>
              <a href="#cta">Schedule a Consultation</a>
            </Button>
          </motion.div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default OurPhilosophy;

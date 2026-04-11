import { motion } from "framer-motion";
import portfolioLandscaping from "@/assets/portfolio-landscaping.jpg";
import portfolioTree from "@/assets/portfolio-tree.jpg";
import portfolioEstate from "@/assets/portfolio-estate.jpg";

const projects = [
  {
    title: "Private Estate Landscape Studio",
    subtitle: "Editorial web presence for premium grounds care and garden architecture",
    image: portfolioLandscaping,
  },
  {
    title: "Premier Arbor & Tree Care Brand",
    subtitle: "High-trust presentation for established operators serving discerning properties",
    image: portfolioTree,
  },
  {
    title: "Outdoor Property Management Firm",
    subtitle: "Luxury-forward positioning for recurring estate maintenance and outdoor living work",
    image: portfolioEstate,
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Selected Work
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Refined Concepts for Outdoor Brands That Need to{" "}
            <span className="italic text-gradient-gold">Look Expensive Online</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Each direction is shaped to feel rooted, editorial, and quietly authoritative so the
            brand carries more weight before the first call.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 md:gap-16 items-center`}
            >
              <div className="w-full md:w-3/5 group">
                <div className="relative overflow-hidden rounded-[28px] border border-brass/10 bg-bark/10 p-3 shadow-[0_28px_80px_hsl(var(--background)/0.28)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-[18px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1024}
                    height={1024}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="w-full md:w-2/5 space-y-4">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
                  {`0${i + 1}`}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{project.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

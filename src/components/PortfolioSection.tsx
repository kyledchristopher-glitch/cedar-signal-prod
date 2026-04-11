import { motion } from "framer-motion";
import portfolioLandscaping from "@/assets/portfolio-landscaping.jpg";
import portfolioTree from "@/assets/portfolio-tree.jpg";
import portfolioEstate from "@/assets/portfolio-estate.jpg";

const projects = [
  {
    title: "Luxury Landscaping",
    subtitle: "Premium presence for a high-end landscape design firm",
    image: portfolioLandscaping,
  },
  {
    title: "Tree Service",
    subtitle: "Credibility and trust for a professional arborist company",
    image: portfolioTree,
  },
  {
    title: "Outdoor Estate Services",
    subtitle: "Refined elegance for a full-service estate property team",
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
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium">
            Selected Work
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Sites That Win <span className="italic text-gradient-gold">Better Clients</span>
          </h2>
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
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1024}
                    height={1024}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="w-full md:w-2/5 space-y-4">
                <p className="text-primary text-xs tracking-[0.2em] uppercase font-sans font-medium">
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

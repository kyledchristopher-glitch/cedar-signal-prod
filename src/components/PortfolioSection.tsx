import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import evergreenAndStonePreview from "@/assets/portfolio-previews/evergreen-and-stone.webp";
import eveningLightPreview from "@/assets/portfolio-previews/evening-light-landscapes.webp";
import stoneAndTimberHomesPreview from "@/assets/portfolio-previews/stone-and-timber-homes.webp";

const projects = [
  {
    title: "Evergreen & Stone",
    description:
      "Premium website concept for a tree and landscape services brand, built to feel refined, trustworthy, and high-converting.",
    tag: "Tree Service / Landscaping / Premium Local Brand",
    href: "https://emerald-sunset-estates-fvpc.vercel.app/",
    preview: evergreenAndStonePreview,
    previewAlt: "Homepage preview of the Evergreen & Stone website project.",
    siteLabel: "emerald-sunset-estates-fvpc.vercel.app",
  },
  {
    title: "Evening Light Landscapes",
    description:
      "Elegant service business website concept designed to showcase craftsmanship, outdoor beauty, and premium property care.",
    tag: "Landscaping / Outdoor Services / Luxury Local Brand",
    href: "https://evening-light-landscapes.vercel.app/",
    preview: eveningLightPreview,
    previewAlt: "Homepage preview of the Evening Light Landscapes website project.",
    siteLabel: "evening-light-landscapes.vercel.app",
  },
  {
    title: "Stone & Timber Homes",
    description:
      "Luxury website concept for a boutique custom home builder focused on craftsmanship, prestige, and premium lead generation.",
    tag: "Custom Homes / Remodeling / Luxury Builder",
    href: "https://stone-timber-prestige.vercel.app/",
    preview: stoneAndTimberHomesPreview,
    previewAlt: "Homepage preview of the Stone & Timber Homes website project.",
    siteLabel: "stone-timber-prestige.vercel.app",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:mb-20"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Selected Work
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-5xl">
            Featured Website Concepts Presented as{" "}
            <span className="italic text-gradient-gold">Polished Portfolio Work</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Real homepage previews from live projects, framed to feel refined, editorial, and
            presentation-ready.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-brass/14 bg-gradient-to-b from-bark/18 via-background/90 to-background shadow-[0_28px_80px_hsl(var(--background)/0.26)]"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title}`}
                className="block p-4 md:p-5"
              >
                <div className="overflow-hidden rounded-[24px] border border-brass/10 bg-background/80 shadow-[inset_0_1px_0_hsl(var(--parchment)/0.05)]">
                  <div className="flex items-center justify-between border-b border-brass/10 bg-background/75 px-4 py-3">
                    <div className="flex items-center gap-2" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary/90" />
                      <span className="h-2.5 w-2.5 rounded-full bg-bronze/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
                    </div>
                    <span className="truncate px-4 text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {project.siteLabel}
                    </span>
                    <span className="text-[0.58rem] uppercase tracking-[0.24em] text-primary/85">
                      Live
                    </span>
                  </div>

                  <div className="relative bg-background">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/10 via-transparent to-parchment/5" />
                    <img
                      src={project.preview}
                      alt={project.previewAlt}
                      className="aspect-[16/12] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                      width={1005}
                      height={768}
                    />
                  </div>
                </div>
              </a>

              <div className="flex flex-1 flex-col px-6 pb-7 pt-1 md:px-7">
                <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-primary/85">
                  {project.tag}
                </p>
                <h3 className="font-serif text-[2rem] leading-none text-foreground md:text-[2.35rem]">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-6 pt-1">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-primary transition-colors duration-300 hover:text-foreground"
                  >
                    View Project
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;

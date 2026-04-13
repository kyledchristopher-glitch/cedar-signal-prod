import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], prefersReducedMotion ? [0, 0] : [0, 120]);
  const contentY = useTransform(scrollY, [0, 800], prefersReducedMotion ? [0, 0] : [0, 42]);

  return (
    <section className="section-blend relative flex min-h-screen items-end overflow-hidden md:items-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <img
          src={heroBg}
          alt="Refined outdoor estate grounds at sunset"
          className="w-full h-full object-cover animate-slow-drift"
          width={1920}
          height={1080}
        />
      </motion.div>

      <div className="absolute inset-0 z-[1] overlay-cinematic" />
      <div className="absolute inset-0 z-[1] bg-warm-vignette opacity-95" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--parchment)/0.08),transparent_24%),linear-gradient(180deg,hsl(var(--background)/0.08)_0%,transparent_22%,hsl(var(--background)/0.42)_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-0 pt-32 w-full">
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary/85">
            Cedar &amp; Signal Design Studio
          </p>
          <h1 className="font-serif text-[2.9rem] leading-[1.02] text-foreground md:text-[4.6rem] lg:text-[5.8rem]">
            Premium Websites for{" "}
            <span className="text-gradient-gold italic">Outdoor Service Brands</span>
          </h1>

          <p className="mb-10 mt-6 max-w-2xl text-lg leading-[1.55] tracking-[-0.01em] text-parchment md:text-[1.4rem]">
            Crafted to Help Premium Businesses Win More High-Value Clients
          </p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: prefersReducedMotion
                  ? undefined
                  : { staggerChildren: 0.12, delayChildren: 0.08 },
              },
            }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#cta">Request a Consultation</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#portfolio">View Studio Work</a>
            </Button>
          </motion.div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-[0.01em] text-parchment/88">
            Free strategy consultation · No obligation proposal · Transparent pricing · Built for serious businesses
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};

export default HeroSection;

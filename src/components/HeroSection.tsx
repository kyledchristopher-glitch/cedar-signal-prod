import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const scrollY = window.scrollY;
        imgRef.current.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end md:items-center overflow-hidden">
      <div className="absolute inset-0 z-0" ref={imgRef}>
        <img
          src={heroBg}
          alt="Refined outdoor estate grounds at sunset"
          className="w-full h-full object-cover animate-slow-drift"
          width={1920}
          height={1080}
        />
      </div>

      <div className="absolute inset-0 z-[1] overlay-cinematic" />
      <div className="absolute inset-0 z-[1] bg-warm-vignette" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-0 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary/85">
            Cedar &amp; Signal Design Studio
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-foreground">
            Premium Websites for{" "}
            <span className="text-gradient-gold italic">Outdoor Service Brands</span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-parchment md:text-2xl">
            Crafted to Help Premium Businesses Win More High-Value Clients
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#cta">Request a Consultation</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#portfolio">View Studio Work</a>
            </Button>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-parchment/88">
            Free strategy consultation · No obligation proposal · Transparent pricing · Built for serious businesses
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};

export default HeroSection;

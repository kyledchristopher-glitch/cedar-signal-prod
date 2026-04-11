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
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0" ref={imgRef}>
        <img
          src={heroBg}
          alt="Luxury woodland estate at golden hour"
          className="w-full h-full object-cover animate-slow-drift"
          width={1920}
          height={1080}
        />
      </div>

      {/* Warm overlays */}
      <div className="absolute inset-0 z-[1] overlay-cinematic" />
      <div className="absolute inset-0 z-[1] bg-warm-vignette" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-0 pt-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 text-foreground">
            Your Website Should Win You{" "}
            <span className="text-gradient-gold italic">Better Jobs</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Most landscaping and tree service companies look cheap online. We build premium websites
            that help you look like the best option in your market.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#cta">Get Your Site Live This Week</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#portfolio">See Example Sites</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2]" />
    </section>
  );
};

export default HeroSection;

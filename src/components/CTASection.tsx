import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const offset = (rect.top / window.innerHeight) * 80;
        imgRef.current.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="cta" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 z-0" ref={imgRef}>
        <img
          src={ctaBg}
          alt="Warm forest landscape at sunset"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </div>
      <div className="absolute inset-0 z-[1] overlay-golden" />
      <div className="absolute inset-0 z-[1] bg-warm-vignette" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-primary/85">
            Cedar &amp; Signal Design Studio
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Build a Website That Helps Premium Clients{" "}
            <span className="italic text-gradient-gold">Choose You Faster</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Refined web design for outdoor service brands that need to look established, expensive,
            and easy to trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="#pricing">Review the Investment</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#process">See the Process</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

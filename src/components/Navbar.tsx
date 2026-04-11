import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/cedar-signal-logo-light-tight.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-brass/15 bg-background/90 py-4 backdrop-blur-xl shadow-[0_12px_40px_hsl(var(--forest)/0.28)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex flex-col items-start gap-3 pr-8">
          <img
            src={logoLight}
            alt="Cedar & Signal"
            className="h-12 w-auto rounded-[18px] border border-brass/20 bg-parchment/95 p-2 shadow-[0_18px_40px_hsl(var(--background)/0.18)] md:h-14"
            width={1116}
            height={320}
            loading="eager"
          />
          <span className="pl-2 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-primary/85">
            Design Studio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="sm" asChild>
            <a href="#cta">Request a Consultation</a>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-6 border-t border-brass/15 bg-background/95 px-6 py-8 backdrop-blur-xl animate-fade-in md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="w-full" asChild>
            <a href="#cta">Request a Consultation</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { label: "Our Philosophy", href: "/our-philosophy", isRoute: true },
    { label: "Work", href: isHomePage ? "#portfolio" : "/#portfolio" },
    { label: "Process", href: isHomePage ? "#process" : "/#process" },
    { label: "Pricing", href: isHomePage ? "#pricing" : "/#pricing" },
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
        <Link to="/" className="flex flex-col items-start gap-2 pr-8">
          <span className="text-[0.86rem] font-semibold uppercase tracking-[0.26em] text-foreground md:text-[0.95rem]">
            Cedar &amp; Signal
          </span>
          <span className="text-[0.57rem] font-medium uppercase tracking-[0.36em] text-primary/85 md:text-[0.62rem]">
            Design Studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className={`premium-link text-sm uppercase tracking-[0.24em] transition-colors duration-300 hover:text-foreground ${
                  location.pathname === l.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="premium-link text-sm uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            )
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
            l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm uppercase tracking-[0.24em] hover:text-foreground ${
                  location.pathname === l.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            )
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

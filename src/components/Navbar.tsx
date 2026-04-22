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
    { label: "Work", href: isHomePage ? "#portfolio" : "/#portfolio" },
    { label: "Process", href: isHomePage ? "#process" : "/#process" },
    { label: "Pricing", href: isHomePage ? "#pricing" : "/#pricing" },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/92 py-4 text-foreground backdrop-blur-xl shadow-[0_12px_40px_hsl(222_28%_10%/0.08)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16">
        <Link to="/" className="flex flex-col items-start gap-2 pr-8">
          <span className={`text-[0.86rem] font-semibold uppercase tracking-[0.26em] md:text-[0.95rem] ${scrolled ? "text-foreground" : "text-white"}`}>
            Cedar &amp; Signal
          </span>
          <span className="text-[0.57rem] font-medium uppercase tracking-[0.36em] text-primary/85 md:text-[0.62rem]">
            Luxury Tech Studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const linkClassName = `premium-link text-sm uppercase tracking-[0.24em] transition-colors duration-300 ${scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"}`;

            return l.isRoute ? (
              <Link
                key={l.href}
                to={l.href}
                className={linkClassName}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className={linkClassName}
              >
                {l.label}
              </a>
            );
          })}
          <Button variant="hero" size="sm" asChild>
            <Link to="/checkout?package=Signal%20Launch">Start now</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
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
                className="block text-sm uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
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
            <Link to="/checkout?package=Signal%20Launch">Start now</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/70 bg-background py-12 md:py-14">
      <div className="page-shell flex flex-col items-center justify-between gap-8 md:flex-row">
        <Link to="/" className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-[0.86rem] font-semibold uppercase tracking-[0.26em] text-foreground md:text-[0.95rem]">
            Cedar &amp; Signal
          </span>
          <span className="text-[0.57rem] font-medium uppercase tracking-[0.36em] text-primary/85 md:text-[0.62rem]">
            Luxury Tech Studio
          </span>
        </Link>
        <p className="text-center text-xs uppercase tracking-[0.26em] text-muted-foreground">
          Premium websites for serious service businesses
        </p>
        <p className="text-muted-foreground/50 text-xs">
          © {new Date().getFullYear()} Cedar &amp; Signal Design Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

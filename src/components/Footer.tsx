import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-bark/20 bg-bark/10 py-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row md:px-12">
        <Link to="/" className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-[0.86rem] font-semibold uppercase tracking-[0.26em] text-foreground md:text-[0.95rem]">
            Cedar &amp; Signal
          </span>
          <span className="text-[0.57rem] font-medium uppercase tracking-[0.36em] text-primary/85 md:text-[0.62rem]">
            Design Studio
          </span>
        </Link>
        <p className="text-center text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Premium websites for outdoor service brands
        </p>
        <p className="text-muted-foreground/50 text-xs">
          © {new Date().getFullYear()} Cedar &amp; Signal Design Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto flex max-w-[96rem] flex-col items-center justify-between gap-8 px-10 md:flex-row md:px-28 lg:px-48 xl:px-64">
        <Link to="/" className="flex flex-col items-center gap-2 md:items-start">
          <span className="text-[0.86rem] font-semibold uppercase tracking-[0.26em] text-foreground md:text-[0.95rem]">
            Cedar &amp; Signal
          </span>
          <span className="text-[0.57rem] font-medium uppercase tracking-[0.36em] text-primary/85 md:text-[0.62rem]">
            Luxury Tech Studio
          </span>
        </Link>
        <p className="text-center text-xs uppercase tracking-[0.28em] text-muted-foreground">
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

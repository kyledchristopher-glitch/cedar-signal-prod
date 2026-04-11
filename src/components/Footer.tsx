import logoLight from "@/assets/cedar-signal-logo-light-tight.png";

const Footer = () => {
  return (
    <footer className="border-t border-bark/20 bg-bark/10 py-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 px-6 md:flex-row md:px-12">
        <a href="#" className="flex flex-col items-center gap-3 md:items-start">
          <img
            src={logoLight}
            alt="Cedar & Signal"
            className="h-14 w-auto rounded-[18px] border border-brass/20 bg-parchment/95 p-2 shadow-[0_18px_40px_hsl(var(--background)/0.18)]"
            width={1116}
            height={320}
            loading="lazy"
          />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-primary/85">
            Design Studio
          </span>
        </a>
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

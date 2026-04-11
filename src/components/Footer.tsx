const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-serif text-lg tracking-wider text-foreground">
          <span className="text-gradient-gold">GOLDEN HOUR</span>{" "}
          <span className="font-light">SITES</span>
        </a>
        <p className="text-muted-foreground text-xs tracking-widest uppercase">
          Premium websites for outdoor service companies
        </p>
        <p className="text-muted-foreground/50 text-xs">
          © {new Date().getFullYear()} Golden Hour Sites
        </p>
      </div>
    </footer>
  );
};

export default Footer;

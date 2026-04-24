import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { packageOptions } from "@/lib/packages";
import ParallaxLayer from "@/components/ParallaxLayer";

const plans = [
  {
    ...packageOptions["Signal Launch"],
    label: "Most choose this",
    desc: "A complete, conversion-ready website that makes your business easier to trust and contact.",
    features: ["Premium homepage", "Core service sections", "Mobile-first build", "Conversion copy", "Lead capture flow"],
    featured: true,
  },
  {
    ...packageOptions["Authority Build"],
    desc: "More depth, more credibility, stronger positioning.",
    features: ["Everything in Launch", "Expanded service pages", "Proof and authority sections", "Refined structure and flow"],
  },
  {
    ...packageOptions["Private Studio"],
    desc: "For brands that need to stand clearly above the market.",
    features: ["Everything in Authority", "Custom design direction", "Advanced layouts", "Post-launch polish"],
  },
];

const examples = [
  ["Law firms", "Build trust before the first call"],
  ["Med spas", "Make premium treatments easier to choose"],
  ["Advisory firms", "Create confidence immediately"],
];

const faqs = [
  ["Why is this priced this way?", "Because it focuses only on what drives decisions. No bloated process, no wasted time."],
  ["Do I need to write content?", "No. You provide direction. We turn it into clear, effective copy."],
  ["How fast can it launch?", "Fast. Timeline depends on your responsiveness and scope."],
  ["Is this custom?", "Yes. Structured packages, tailored execution."],
  ["Will this convert better?", "Yes. It’s built around trust, clarity, and action."],
];

const Parallax = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

const Header = ({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body?: string; dark?: boolean }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
    <p className={`eyebrow mb-3 ${dark ? "text-primary" : "text-bronze"}`}>{eyebrow}</p>
    <h2 className={`heading-balance text-3xl leading-[0.98] md:text-5xl ${dark ? "text-white" : "text-[#0B0F14]"}`}>{title}</h2>
    {body ? <p className={`mx-auto mt-4 max-w-xl text-base leading-7 md:text-[1.05rem] ${dark ? "text-white/70" : "text-muted-foreground"}`}>{body}</p> : null}
  </div>
);

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    <section className="bg-[#0B0F14] text-white">
      <div className="page-shell flex min-h-[78vh] items-center justify-center py-24 text-center md:min-h-[82vh]">
        <Parallax>
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-4 text-primary">Cedar &amp; Signal Design Studio</p>
          <h1 className="heading-balance max-w-2xl text-4xl leading-[0.96] md:text-6xl">
            Websites That Make You the Obvious Choice.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/72 md:text-lg">
            If your site feels average, serious clients hesitate. We make sure they don’t.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/72 md:text-lg">
            Built for law firms, med spas, clinics, consultants, and high-trust businesses where first impressions decide everything.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="lg" asChild><a href="#pricing">Start Your Site <ArrowRight /></a></Button>
            <Button variant="heroOutline" size="lg" asChild><a href="#work">View Examples</a></Button>
          </div>
          <p className="mt-5 text-sm text-white/58">Clear pricing. Fast launch. Built to convert.</p>
        </div>
        </Parallax>
      </div>
    </section>

    <section className="bg-[#F7F5F2] py-7 text-[#0B0F14]">
      <div className="page-shell flex flex-wrap justify-center gap-x-8 gap-y-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-stone">
        {["Law firms", "Med spas", "Aesthetic clinics", "Private practices", "Consultants", "Advisory firms", "Premium local services"].map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>

    <section className="section-space bg-[#0B0F14] text-white">
      <Parallax>
      <div className="page-shell">
        <Header dark eyebrow="Problem" title="Your website is deciding for your clients." body="Before they call. Before they book. Before they trust you. If it looks generic, unclear, or outdated, they move on." />
        <div className="grid gap-4 md:grid-cols-4">
          {["You look less established than you are", "Your value isn’t obvious", "There’s no clear next step", "You blend in with competitors"].map((item) => (
            <div key={item} className="dark-card rounded-lg p-5 text-lg leading-7">{item}</div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section className="section-space bg-[#F7F5F2] text-[#0B0F14]">
      <Parallax>
      <div className="page-shell">
        <Header eyebrow="Outcome" title="Look established. Get chosen." body="We position your business so the right clients keep moving forward." />
        <div className="grid gap-5 md:grid-cols-4">
          {["Stronger first impression", "More consultation-ready inquiries", "Clear, confident positioning", "Supports higher pricing"].map((item) => (
            <div key={item} className="card-line rounded-lg p-7 text-xl leading-8">{item}</div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section className="section-space bg-[#0B0F14] text-white">
      <Parallax>
      <div className="page-shell grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-3 text-primary">Why Cedar &amp; Signal</p>
          <h2 className="heading-balance text-3xl leading-[0.98] md:text-5xl">Built to convert, not just exist.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Clear messaging that makes sense instantly", "Trust signals where they matter", "Clean, premium mobile experience", "Simple, direct path to contact"].map((item) => (
            <div key={item} className="dark-card rounded-lg p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]">
              <Check className="mb-4 h-5 w-5 text-primary" />
              <p className="text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section id="work" className="section-space bg-[#F7F5F2] text-[#0B0F14]">
      <Parallax>
      <div className="page-shell">
        <Header eyebrow="Examples" title="Designed for high-trust decisions." />
        <div className="grid gap-5 md:grid-cols-3">
          {examples.map(([title, body], i) => (
            <ParallaxLayer key={title} strength={12 + i * 3}>
              <article className="card-line overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_hsl(222_28%_10%/0.07)]">
                <div className="luxury-mockup aspect-[4/3] p-5">
                  <div className="luxury-grid h-full rounded-md border border-border/80 bg-white/80 p-4 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.75)]">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-20 rounded-full bg-bronze/70" />
                      <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0B0F14]/20" />
                        <div className="h-2 w-2 rounded-full bg-[#0B0F14]/10" />
                      </div>
                    </div>
                    <div className="mt-7 rounded-md border border-white/70 bg-[#FEFDFC]/80 p-4 backdrop-blur-sm">
                      <div className="h-7 w-4/5 rounded bg-[#0B0F14]" />
                      <div className="mt-3 h-3 w-2/3 rounded bg-stone/25" />
                      <div className="mt-8 grid grid-cols-3 gap-3">{[1, 2, 3].map((n) => <div key={n} className="h-16 rounded-md bg-white/90 shadow-[0_10px_20px_hsl(222_28%_10%/0.04)]" />)}</div>
                      <div className="mt-4 h-14 rounded-md bg-[#0B0F14]/7 blur-[1px]" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-3xl leading-none">{title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{body}</p>
                </div>
              </article>
            </ParallaxLayer>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section className="section-space bg-[#0B0F14] text-white">
      <Parallax>
      <div className="page-shell">
        <Header dark eyebrow="What you get" title="Everything needed. Nothing unnecessary." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Premium, responsive design", "Conversion-focused copy", "Clear lead capture flow", "SEO-ready structure", "Service and trust sections", "Intake and onboarding system"].map((item) => (
            <div key={item} className="dark-card rounded-lg p-5 text-sm font-semibold transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.058]"><Check className="mb-4 h-5 w-5 text-primary" />{item}</div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section id="pricing" className="section-space bg-[#F7F5F2] text-[#0B0F14]">
      <Parallax>
      <div className="page-shell">
        <Header eyebrow="Pricing" title="Start where you need. Scale when ready." />
        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`flex h-full flex-col rounded-lg border p-7 transition-all duration-300 hover:-translate-y-0.5 ${plan.featured ? "border-bronze/80 bg-white shadow-[0_18px_44px_hsl(222_28%_10%/0.08)]" : "border-border/85 bg-white/82 shadow-[0_12px_28px_hsl(222_28%_10%/0.03)] hover:shadow-[0_18px_36px_hsl(222_28%_10%/0.05)]"}`}>
              {plan.featured ? <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">{plan.label}</span> : null}
              <h3 className="text-4xl leading-none">{plan.name}</h3>
              <p className="mt-3 text-5xl font-extrabold">{plan.price}</p>
              <p className="mt-3 min-h-16 text-sm leading-6 text-muted-foreground">{plan.desc}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />{feature}</li>)}
              </ul>
              <Button variant="hero" size="lg" className="mt-7 w-full" asChild><a href={`/checkout?package=${encodeURIComponent(plan.name)}`}>Start Your Site</a></Button>
            </div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section id="process" className="bg-[#0B0F14] py-20 text-white md:py-24">
      <Parallax>
      <div className="page-shell">
        <Header dark eyebrow="Process" title="Simple. Clear. Done." />
        <div className="grid gap-5 md:grid-cols-3">
          {["Choose your package", "Complete intake", "Launch a site that earns trust"].map((step, index) => (
            <div key={step} className="dark-card rounded-lg p-7">
              <span className="text-sm font-bold text-primary">0{index + 1}</span>
              <p className="mt-8 text-2xl font-serif">{step}</p>
            </div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section className="section-space bg-[#F7F5F2] text-[#0B0F14]">
      <Parallax>
      <div className="mx-auto max-w-4xl px-8 md:px-16">
        <Header eyebrow="FAQ" title="Questions before you start." />
        <div className="divide-y divide-border">
          {faqs.map(([q, a]) => (
            <div key={q} className="py-6">
              <h3 className="heading-balance text-2xl leading-tight">{q}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
      </Parallax>
    </section>

    <section className="bg-[#0B0F14] px-6 py-20 text-center text-white md:px-12 md:py-24">
      <p className="eyebrow mb-4 text-primary">Get started</p>
      <h2 className="heading-balance mx-auto max-w-3xl text-4xl leading-[0.97] md:text-6xl">Your website is already shaping decisions. Make sure it’s working for you.</h2>
      <Button variant="hero" size="lg" className="mt-8" asChild><a href="/checkout?package=Signal%20Launch">Start Your Site — $1,500</a></Button>
    </section>

    <Footer />
  </div>
);

export default Index;

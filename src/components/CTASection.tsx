import { type FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ctaBg from "@/assets/cta-bg.jpg";

const consultationEmail = "kyle@cedarandsignal.com";
const consultationSubmitEndpoint = "/api/consultation";
const bookingUrl = "https://calendly.com/kyledchristopher/demo";
const fieldClassName =
  "h-12 rounded-[16px] border-brass/20 bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-foreground/85 shadow-[inset_0_1px_0_hsl(var(--parchment)/0.04)] backdrop-blur-sm focus-visible:ring-brass/60 focus-visible:ring-offset-0";

const labelClassName = "mb-3 block text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-primary/85";
type SubmissionState = "idle" | "submitting" | "success" | "error";

const CTASection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString().trim() ?? "";
    setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch(consultationSubmitEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name")?.toString().trim() ?? "",
          email,
          phone: formData.get("phone")?.toString().trim() ?? "",
          company: formData.get("company")?.toString().trim() ?? "",
          website: formData.get("website")?.toString().trim() ?? "",
          projectType: formData.get("projectType")?.toString().trim() ?? "",
          details: formData.get("details")?.toString().trim() ?? "",
          honey: formData.get("_honey")?.toString().trim() ?? "",
        }),
      });

      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseBody?.message || "Unable to submit form.");
      }

      form.reset();
      setSubmissionState("success");
      setSubmissionMessage(
        "Consultation request received. We’ll review it and reach out with next steps.",
      );
    } catch (error) {
      console.error("Consultation form submission failed", error);
      setSubmissionState("error");
      setSubmissionMessage(
        `We couldn’t send your request just now. Please try again or email ${consultationEmail}.`,
      );
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 z-0" ref={imgRef}>
        <img
          src={ctaBg}
          alt="Warm forest landscape at sunset"
          className="h-full w-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </div>
      <div className="absolute inset-0 z-[1] overlay-golden" />
      <div className="absolute inset-0 z-[1] bg-warm-vignette" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl pt-2"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-primary/85">
              Consultation
            </p>
            <h2 className="mb-6 font-serif text-3xl leading-tight text-foreground md:text-5xl lg:text-6xl">
              Let&apos;s Build a Website That Matches the{" "}
              <span className="italic text-gradient-gold">Quality of Your Work</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-parchment md:text-lg">
              Cedar &amp; Signal creates refined websites for premium home service, outdoor living,
              and craftsmanship-driven local businesses that need stronger credibility, deeper
              trust, and better lead conversion.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              If your business delivers high-quality work, your website should look equally
              considered. Share a few details and we&apos;ll review the opportunity with you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-[30px] border border-brass/16 bg-background/68 p-6 shadow-[0_28px_80px_hsl(var(--background)/0.28)] backdrop-blur-xl md:p-8 lg:p-10"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="Cedar & Signal Consultation Request" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="consultation-name">
                    Name
                  </label>
                  <Input
                    id="consultation-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="consultation-email">
                    Email
                  </label>
                  <Input
                    id="consultation-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="consultation-phone">
                    Phone Number
                  </label>
                  <Input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 555-5555"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="consultation-company">
                    Company Name
                  </label>
                  <Input
                    id="consultation-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Your company"
                    className={fieldClassName}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="consultation-website">
                    Website URL
                  </label>
                  <Input
                    id="consultation-website"
                    name="website"
                    type="text"
                    autoComplete="url"
                    placeholder="cedarandsignal.com"
                    className={fieldClassName}
                    required
                  />
                </div>

                <div>
                  <label className={labelClassName} htmlFor="consultation-project-type">
                    Project Type
                  </label>
                  <select
                    id="consultation-project-type"
                    name="projectType"
                    defaultValue=""
                    className={`${fieldClassName} w-full appearance-none pr-10`}
                    required
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    <option value="Signature Website">Signature Website</option>
                    <option value="Authority Website">Authority Website</option>
                    <option value="Ongoing Care Plan">Ongoing Care Plan</option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClassName} htmlFor="consultation-details">
                  Brief Project Details
                </label>
                <Textarea
                  id="consultation-details"
                  name="details"
                  placeholder="Tell us about your business, what you do, and what you want your new website to accomplish."
                  className="min-h-[150px] rounded-[18px] border-brass/20 bg-background/70 px-4 py-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/85 shadow-[inset_0_1px_0_hsl(var(--parchment)/0.04)] backdrop-blur-sm focus-visible:ring-brass/60 focus-visible:ring-offset-0"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting" ? "Sending..." : "Request a Consultation"}
                </Button>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary transition-colors duration-300 hover:text-foreground"
                  >
                    Prefer to book directly? Schedule a call
                  </a>
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Free strategy consultation · No obligation proposal · Transparent pricing · Built for serious businesses
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Tell us a bit about your business and project. We&apos;ll review it and reach
                  out with next steps. You can also contact us at{" "}
                  <a
                    href={`mailto:${consultationEmail}`}
                    className="text-primary transition-colors duration-300 hover:text-foreground"
                  >
                    {consultationEmail}
                  </a>
                  .
                </p>
                {submissionState !== "idle" ? (
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      submissionState === "error" ? "text-destructive" : "text-primary"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {submissionMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

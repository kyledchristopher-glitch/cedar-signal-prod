import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPackageByName } from "@/lib/packages";

const fieldClass = "rounded-md border-border bg-white text-foreground placeholder:text-muted-foreground focus-visible:ring-primary";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone";
const radioClass = "h-4 w-4 border-border text-primary focus:ring-primary";

const Onboarding = () => {
  const [params] = useSearchParams();
  const selectedPackage = getPackageByName(params.get("package"));
  const sessionId = params.get("session_id");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("package", selectedPackage.name);
    const response = await fetch("/api/intake", { method: "POST", body: formData }).catch(() => null);
    setMessage(response?.ok ? "Intake received." : "Intake captured. Connect the intake API env vars when ready.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="bg-[#0B0F14] px-6 pb-14 pt-32 text-center text-white md:px-12 md:pb-16 md:pt-36">
          <p className="eyebrow mb-4 text-primary">Project Intake</p>
          <h1 className="heading-balance mx-auto max-w-3xl text-4xl leading-[0.96] md:text-6xl">This should only take a few minutes.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
            Don&apos;t have time right now? We&apos;ve also sent you a link to this form by email. The sooner we get your information, the sooner your site goes live.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/52">
            Package: {selectedPackage.name}. {sessionId ? "Your checkout is complete." : "You can come back and finish this anytime."}
          </p>
        </section>

        <section className="bg-[#F7F5F2] px-6 py-16 md:px-12 md:py-20">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-7">
            <div className="soft-panel p-6 md:p-7">
              <p className="eyebrow mb-5 text-bronze">1. Your Info</p>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["contactName", "Contact Name", true],
                  ["bestEmail", "Best Email", true],
                  ["bestPhoneNumber", "Best Phone Number", false],
                  ["businessName", "Business Name", true],
                  ["businessAddress", "Business Address", false],
                  ["currentWebsiteUrl", "Current Website URL", false],
                ].map(([name, label, required]) => (
                  <div key={name as string}>
                    <label className={labelClass}>{label}</label>
                    <Input
                      name={name as string}
                      required={required as boolean}
                      className={`${fieldClass} h-12`}
                      placeholder={name === "currentWebsiteUrl" ? 'Paste your current website, or type "None"' : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-panel p-6 md:p-7">
              <p className="eyebrow mb-5 text-bronze">2. Your Business</p>
              <div className="space-y-5">
                {[
                  ["servicesOffered", "What Services Do You Offer?"],
                  ["serviceAreas", "What Cities or Areas Do You Serve?"],
                  ["differentiator", "What Makes Your Business Different?"],
                  ["customerCompliments", "What Do Customers Usually Compliment You On?"],
                  ["industryFrustrations", "What Frustrates You About Others In Your Industry?"],
                  ["oneSentenceDescription", "If Someone Described Your Business In One Sentence, What Would You Want Them To Say?"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className={labelClass}>{label}</label>
                    <Textarea name={name} className={`${fieldClass} min-h-24`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-panel p-6 md:p-7">
              <p className="eyebrow mb-5 text-bronze">3. Branding &amp; Style</p>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Do You Have A Logo?</label>
                  <div className="flex gap-6">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 text-sm text-foreground">
                        <input type="radio" name="hasLogo" value={option} className={radioClass} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Do You Have Photos We Can Use?</label>
                  <div className="flex gap-6">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-3 text-sm text-foreground">
                        <input type="radio" name="hasPhotos" value={option} className={radioClass} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>What Should The Website Feel Like?</label>
                  <Textarea
                    name="websiteFeel"
                    className={`${fieldClass} min-h-24`}
                    placeholder="Examples: premium, clean, modern, trustworthy, bold, luxury, simple, high-end, local, etc."
                  />
                </div>
                <div>
                  <label className={labelClass}>Any Websites You Like?</label>
                  <Textarea
                    name="inspirationWebsites"
                    className={`${fieldClass} min-h-24`}
                    placeholder="Paste links or describe styles you like."
                  />
                </div>
              </div>
            </div>

            <div className="soft-panel p-6 md:p-7">
              <p className="eyebrow mb-5 text-bronze">4. Final Details</p>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Anything You Definitely Want Included?</label>
                  <Textarea
                    name="mustInclude"
                    className={`${fieldClass} min-h-24`}
                    placeholder="Examples: phone number, quote form, financing, reviews, project gallery, service pages, etc."
                  />
                </div>
                <div>
                  <label className={labelClass}>Anything You Definitely Do NOT Want?</label>
                  <Textarea
                    name="mustAvoid"
                    className={`${fieldClass} min-h-24`}
                    placeholder="Anything to avoid in the design, copy, colors, tone, or layout."
                  />
                </div>
                <div>
                  <label className={labelClass}>File Uploads</label>
                  <Input name="brandFiles" type="file" multiple className={`${fieldClass} h-12 file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground`} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#0B0F14] p-6 text-white shadow-[0_18px_42px_hsl(222_32%_4%/0.16)]">
              <p className="text-2xl font-serif">Submit Project Intake</p>
              <p className="mt-2 text-sm text-white/70">We&apos;ll use this to create a website that feels true to your business.</p>
              <Button variant="hero" size="lg" className="mt-5" type="submit">Submit Project Intake</Button>
            </div>
            {message ? <p className="rounded-md border border-border bg-white p-4 text-sm">{message}</p> : null}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;

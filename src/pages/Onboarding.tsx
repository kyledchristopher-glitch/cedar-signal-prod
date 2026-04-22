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

const Onboarding = () => {
  const [params] = useSearchParams();
  const selectedPackage = getPackageByName(params.get("package"));
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
        <section className="bg-[#0B0F14] px-6 pb-12 pt-32 text-center text-white md:px-12 md:pt-36">
          <p className="eyebrow mb-4 text-primary">Onboarding</p>
          <h1 className="mx-auto max-w-2xl text-4xl leading-tight md:text-6xl">Tell us what we need to build the site right.</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">Package: {selectedPackage.name}. Keep it simple and clear.</p>
        </section>

        <section className="bg-[#F7F5F2] px-6 py-14 md:px-12">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-7">
            <div className="rounded-lg border border-border bg-white p-6 shadow-[0_20px_70px_hsl(222_28%_10%/0.07)]">
              <p className="eyebrow mb-5 text-bronze">Business basics</p>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["fullName", "Full name", true],
                  ["businessName", "Business name", true],
                  ["email", "Email", true],
                  ["phone", "Phone", false],
                  ["websiteUrl", "Website URL", false],
                  ["businessType", "Business type", false],
                  ["timeline", "Timeline", false],
                  ["serviceArea", "Service area", false],
                ].map(([name, label, required]) => (
                  <div key={name as string}>
                    <label className={labelClass}>{label}</label>
                    <Input name={name as string} required={required as boolean} className={`${fieldClass} h-12`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white p-6 shadow-[0_20px_70px_hsl(222_28%_10%/0.07)]">
              <p className="eyebrow mb-5 text-bronze">Project details</p>
              <div className="space-y-5">
                {[
                  ["services", "Services"],
                  ["targetAudience", "Target audience"],
                  ["stylePreferences", "Style preferences"],
                  ["pagesNeeded", "Pages needed"],
                  ["specialRequests", "Special requests"],
                  ["accessDetails", "Access / login details"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className={labelClass}>{label}</label>
                    <Textarea name={name} className={`${fieldClass} min-h-24`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white p-6 shadow-[0_20px_70px_hsl(222_28%_10%/0.07)]">
              <label className={labelClass}>Logo / files</label>
              <Input name="brandFiles" type="file" multiple className={`${fieldClass} h-12 file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground`} />
            </div>

            <div className="rounded-lg bg-[#0B0F14] p-6 text-white">
              <p className="text-2xl font-serif">Ready when you are.</p>
              <p className="mt-2 text-sm text-white/70">Submit this intake so the next step starts clean.</p>
              <Button variant="hero" size="lg" className="mt-5" type="submit">Submit intake</Button>
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fieldClass =
  "rounded-md border-white/15 bg-white/[0.06] text-white placeholder:text-white/38 focus-visible:ring-primary focus-visible:ring-offset-0";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <main className="mx-auto max-w-[96rem] px-4 pb-20 pt-32 md:px-8 md:pt-36 lg:px-12 xl:px-16">
        <section className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <p className="eyebrow mb-4 text-primary">Contact</p>
            <h1 className="max-w-2xl text-4xl leading-tight md:text-6xl">
              Prefer a conversation first? Send a quick note.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68 md:text-lg">
              Tell us what you are looking to improve. We will review the note and point you toward the right next step.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_28px_90px_hsl(0_0%_0%/0.22)] md:p-8">
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Name
                  </label>
                  <Input name="name" autoComplete="name" className={`${fieldClass} h-12`} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Email
                  </label>
                  <Input name="email" type="email" autoComplete="email" className={`${fieldClass} h-12`} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Phone
                </label>
                <Input name="phone" type="tel" autoComplete="tel" className={`${fieldClass} h-12`} />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  How can we help?
                </label>
                <Textarea name="howCanWeHelp" className={`${fieldClass} min-h-40`} />
              </div>
            </form>

            <Button variant="hero" size="lg" className="mt-7 w-full" asChild>
              <a href="tel:6196638196">Call Anytime: 619-663-8196</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

import type { Metadata } from "next";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: `Get in touch with ${site.name}`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
          Get in touch
        </h1>
        <p className="text-lg text-muted-foreground mb-16 max-w-[56ch] text-pretty">
          Have a question, project idea, or just want to say hi? Drop me a message.
        </p>

        <div className="grid md:grid-cols-[1fr_280px] gap-12">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                Contact Info
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${site.socials.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="size-4" />
                  {site.socials.email}
                </a>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {site.location}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                Social
              </h3>
              <div className="space-y-3">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
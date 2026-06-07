import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: site.pitch,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
          About me
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-12 md:mb-16 max-w-[56ch] text-pretty">
          {site.pitch}
        </p>

        <div className="flex flex-col md:grid md:grid-cols-[1fr_200px] gap-8 md:gap-12">
          <div className="space-y-5">
            {site.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="size-48 md:size-full max-w-[200px] rounded-xl overflow-hidden border border-border/60">
              <Image
                src="/profile.jpg"
                alt={site.name}
                width={200}
                height={200}
                className="object-cover size-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-border/60">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Connect
          </h2>
          <div className="flex flex-wrap gap-6">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
            >
              LinkedIn <ArrowUpRight className="size-3" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
            >
              GitHub <ArrowUpRight className="size-3" />
            </a>
            <a
              href={`mailto:${site.socials.email}`}
              className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
            >
              Email <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
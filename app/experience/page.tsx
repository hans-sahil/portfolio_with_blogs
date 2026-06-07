import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
  description: `Work experience of ${site.name}`,
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
          Selected Experience
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-12 md:mb-16 max-w-[56ch] text-pretty">
          A look at the companies and projects I've worked on.
        </p>

        <div className="space-y-12 md:space-y-16">
          {site.experience.map((job) => (
            <div key={job.role} className="relative pl-6 md:pl-8 border-l border-border">
              <div className="absolute -left-1 top-0 size-2 rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                <h2 className="text-lg md:text-xl font-medium">{job.role}</h2>
                <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <p className="text-primary text-sm mt-1 mb-3 md:mb-4">{job.company}</p>
              <ul className="text-muted-foreground text-sm max-w-[65ch] leading-relaxed text-pretty space-y-2 list-disc pl-4">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="py-10 md:py-16 px-6 border-t border-border/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-8">
        <div className="flex flex-wrap gap-4 md:gap-6">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
            Github
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${site.socials.email}`} className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
            Email
          </a>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
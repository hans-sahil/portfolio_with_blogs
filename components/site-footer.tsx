import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="py-16 px-6 border-t border-border/60 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex gap-6">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest">
            Github
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest">
            LinkedIn
          </a>
          <a href={`mailto:${site.socials.email}`} className="text-xs font-mono text-muted-foreground hover:text-primary uppercase tracking-widest">
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

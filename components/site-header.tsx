import { site } from "@/lib/site";
import Link from "next/link";

const links = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/contact", label: "Connect" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          <span className="font-mono text-sm font-medium tracking-tight uppercase group-hover:text-primary transition-colors">
            {site.name}
          </span>
        </Link>
        <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
            //   activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
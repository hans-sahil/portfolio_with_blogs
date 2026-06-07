"use client";

import { site } from "@/lib/site";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/about", label: "About" },
  { to: "/experience", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/contact", label: "Connect" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          <span className="font-mono text-sm font-medium tracking-tight uppercase group-hover:text-primary transition-colors">
            {site.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className="hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu panel */}
          <nav className="absolute top-full left-0 right-0 border-b border-border/60 bg-background/95 backdrop-blur-md z-50 md:hidden slide-down">
            <div className="px-6 py-6 space-y-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
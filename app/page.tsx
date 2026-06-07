import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog-card";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { blogRepo } from "@/lib/blog-repository-index";
import Image from "next/image";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.pitch,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.pitch,
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await blogRepo.listPublished();
  const latestPost = posts[0] ?? null;
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 md:py-20 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-10 lg:gap-16">
            <div className="flex-1">
              <p className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-4">
                {site.role}
              </p>
              {latestPost ? (
                <>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-secondary text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-4">
                    Latest post
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-balance mb-4">
                    {latestPost.title}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[56ch] text-pretty mb-6 leading-relaxed">
                    {latestPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-8">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(latestPost.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {latestPost.readingTime} min read
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/blog/${latestPost.slug}`}
                      className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm ring-1 ring-primary/20 hover:bg-primary/90 transition-all active:scale-95 inline-flex items-center"
                    >
                      Read latest post
                    </Link>
                    <Link
                      href="/blog"
                      className="h-10 px-4 rounded-md bg-secondary text-foreground font-medium text-sm ring-1 ring-black/5 hover:bg-secondary/80 transition-all inline-flex items-center"
                    >
                      All posts
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-balance mb-6">
                    Engineering resilient systems and refined interfaces for the modern web.
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-[56ch] text-pretty mb-10 leading-relaxed">
                    {site.pitch}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/blog"
                      className="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium text-sm ring-1 ring-primary/20 hover:bg-primary/90 transition-all active:scale-95 inline-flex items-center"
                    >
                      Read the blog
                    </Link>
                    <Link
                      href="/contact"
                      className="h-10 pl-3 pr-3 rounded-md bg-secondary text-foreground font-medium text-sm ring-1 ring-black/5 hover:bg-secondary/80 transition-all inline-flex items-center gap-2"
                    >
                      Get in touch
                      <ArrowUpRight className="size-4 opacity-70" />
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-full border border-border scale-95 group-hover:scale-100 transition-transform duration-500" />
                <div className="size-40 sm:size-48 lg:size-72 rounded-full relative z-10 overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 256px"
                    alt="Sahil Hans"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 md:py-20 lg:py-24 px-6 border-t border-border/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Technical Stack
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty max-w-[40ch]">
                A selected set of tools I use to build scalable product-led software.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {site.skills.map((s) => (
                <div
                  key={s.name}
                  className="p-3 sm:p-4 rounded-lg bg-surface ring-1 ring-black/5 border border-border/60 hover:border-primary/30 transition-colors"
                >
                  <p className="text-sm font-medium truncate">{s.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-tighter">
                    {s.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-20 lg:py-24 px-6 border-t border-border/60">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8 md:mb-12">
            Selected Experience
          </h2>
          <div className="space-y-10 md:space-y-12">
            {site.experience.map((job) => (
              <div key={job.role} className="relative pl-6 md:pl-8 border-l border-border">
                <div className="absolute -left-1 top-0 size-2 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-medium">{job.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-primary text-sm mt-1 mb-3 md:mb-4">{job.company}</p>
                <ul className="text-muted-foreground text-sm max-w-[75ch] leading-relaxed text-pretty space-y-2 list-disc pl-4">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-20 lg:py-24 px-6 border-t border-border/60">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="mb-6 md:mb-8">
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                About
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty max-w-[70ch]">
                A little more about who I am and how I work.
              </p>
            </div>
            <div className="space-y-5 max-w-[75ch]">
              {site.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed text-pretty"
                >
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
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
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 lg:py-24 px-6 border-t border-border/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Get in touch
              </h2>
              <p className="text-sm text-muted-foreground mt-1 mb-6 md:mb-8 max-w-[45ch] text-pretty">
                Have a question, project idea, or just want to say hi? Drop me a message.
              </p>
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
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
                  >
                    LinkedIn <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href={site.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline decoration-primary/30 inline-flex items-center gap-1"
                  >
                    GitHub <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 md:py-20 lg:py-24 px-6 border-t border-border/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Journal & Notes
              </h2>
              <p className="text-sm text-muted-foreground">
                Thoughts on engineering, AI tooling, and building products.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm text-primary hover:underline decoration-primary/30 shrink-0"
            >
              View all posts
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {recentPosts.map((post, idx) => (
                <div key={post.id} className={idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <BlogCard post={post} featured={idx === 0} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border/60 rounded-xl">
              <p className="text-muted-foreground text-sm">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
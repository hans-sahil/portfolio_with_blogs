import type { Metadata } from "next";
import { blogRepo } from "@/lib/blog-repository-index";
import { BlogCard } from "@/components/blog-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Sahil Hans",
  description: "Thoughts on engineering, AI tooling, and building products.",
};

export default async function BlogPage() {
  const posts = await blogRepo.listPublished();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground mb-6">
            <BookOpen className="size-3" />
            Blog
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-4">
            All posts
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-[56ch] text-pretty">
            Thoughts on engineering, AI tooling, and building products.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border/60 rounded-xl">
            <BookOpen className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
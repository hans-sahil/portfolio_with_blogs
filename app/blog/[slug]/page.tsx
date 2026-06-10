import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogRepo } from "@/lib/blog-repository-index";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://sahil-portfolio-ashen.vercel.app";

/** Extract the first valid image URL from HTML content.
 *  Skips base64 data URIs since they won't work in link previews. */
function firstImageFromHtml(html: string): string | null {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const match = imgRegex.exec(html);
  if (!match) return null;

  const src = match[1];
  // Skip base64 data URIs — social platforms can't render them
  if (src.startsWith("data:")) return null;

  // Convert relative paths to absolute
  if (src.startsWith("/")) return `${SITE_URL}${src}`;

  return src;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogRepo.getBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const firstImage = firstImageFromHtml(post.content) || `${SITE_URL}/profile.jpg`;

  return {
    title: `${post.title} — Sahil Hans`,
    description: post.excerpt,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: firstImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [firstImage],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await blogRepo.getBySlug(slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 md:mb-12"
        >
          <ArrowLeft className="size-4" />
          Back to all posts
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground text-pretty mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground border-b border-border/60 pb-6">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingTime} min read
              </span>
              <span className="hidden xs:inline">·</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div
            className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border/60 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostSummary } from "@/lib/types";

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group p-6 rounded-xl bg-card border border-border/60 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-3">
        <span className="inline-flex items-center gap-1">
          <Calendar className="size-3" />
          {date}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {post.readingTime} min read
        </span>
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-primary text-sm inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Read <ArrowRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}
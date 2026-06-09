import { ImageResponse } from "next/og";
import blogsData from "@/data/blogs.json";

export const runtime = "edge";

export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (blogsData as Array<{ slug: string; title: string; excerpt: string; author: string; publishedAt: string; tags: string[] }>).find((p) => p.slug === slug);

  const title = post?.title ?? "Blog Post";
  const excerpt = post?.excerpt ?? "";
  const author = post?.author ?? "Sahil Hans";
  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 4,
            borderRadius: 2,
            background: "#3b82f6",
            marginBottom: 32,
          }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  display: "flex",
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
            marginBottom: 20,
            maxWidth: 900,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title.length > 80 ? title.slice(0, 80) + "..." : title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p
            style={{
              display: "flex",
              fontSize: 22,
              color: "#94a3b8",
              lineHeight: 1.4,
              margin: 0,
              marginBottom: 32,
              maxWidth: 750,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {excerpt.length > 120 ? excerpt.slice(0, 120) + "..." : excerpt}
          </p>
        )}

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Bottom bar with author and date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "#3b82f6",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {author.charAt(0)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              {author}
            </span>
            {date && (
              <span
                style={{
                  fontSize: 14,
                  color: "#64748b",
                }}
              >
                {date}
              </span>
            )}
          </div>

          {/* Spacer */}
          <div style={{ display: "flex", flex: 1 }} />

          {/* Logo/badge */}
          <span
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: 8,
              background: "rgba(59,130,246,0.15)",
              color: "#60a5fa",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            sahilhans.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
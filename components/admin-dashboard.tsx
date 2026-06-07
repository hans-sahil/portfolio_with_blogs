"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  ExternalLink,
  Trash2,
  Edit3,
  LogOut,
} from "lucide-react";
import type { BlogPostSummary } from "@/lib/types";

interface AdminDashboardProps {
  posts: BlogPostSummary[];
}

export function AdminDashboard({ posts }: AdminDashboardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this post?")) return;
    setDeleting(slug);

    try {
      await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      router.refresh();
    } catch {
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <span className="font-mono text-sm font-medium tracking-tight uppercase">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View site <ExternalLink className="size-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1"
            >
              Logout <LogOut className="size-3" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/admin/new"
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all inline-flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            New post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border/60 rounded-xl">
            <FileText className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm mb-4">
              No posts yet.
            </p>
            <Link
              href="/admin/new"
              className="text-sm text-primary hover:underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/60 hover:border-border transition-all"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="text-sm font-medium hover:text-primary transition-colors block truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    {!post.published && (
                      <span className="text-[10px] font-mono text-destructive uppercase tracking-wider">
                        Draft
                      </span>
                    )}
                    {post.tags.length > 0 && (
                      <span className="text-[10px] font-mono text-muted-foreground truncate">
                        {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    title="Edit"
                  >
                    <Edit3 className="size-3.5" />
                  </Link>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    title="View"
                  >
                    <ExternalLink className="size-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    disabled={deleting === post.slug}
                    className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}